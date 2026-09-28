#include "perfilsel.h"
#include "idioma.h"
#include "perfis.h"
#include "sync.h"
#include "gfx.h"
#include "text.h"
#include "tex_cache.h"
#include "corviva.h"
#include "gif.h"
#include "anim.h"
#include "layout.h"
#include "ajustes.h"
#include "sessao.h"
#include "extras.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <stdatomic.h>

// --- MEDIDAS -----------------------------------------------------------------
//
// UMA FILEIRA, nunca uma grade. A grade 4x4 que estava aqui obrigava o D-pad a
// ter quatro direcoes numa tela cuja pergunta e linear ("qual destes?"), e com
// 5 perfis deixava um orfao sozinho na segunda linha. Numa fileira o CIMA e o
// BAIXO ficam livres — e e por isso que o teclado do PIN pode nascer embaixo
// sem disputar tecla com nada.
//
// A fileira inclui o cartao "Adicionar" quando ha espaco. O limite de seis
// segue o app Enhanced; a criacao usa a mesma RPC de sincronizacao.
#define PS_MAX_PERFIS      6
#define PS_AV_MAX      228.0f
#define PS_AV_MIN      152.0f
#define PS_VAO_MAX     128.0f
#define PS_VAO_MIN      56.0f
#define PS_TITULO_Y     278.0f
#define PS_SUB_Y        392.0f
#define PS_FILA_Y       500.0f
#define PS_NOME_GAP      28.0f
#define PS_DICA_Y       970.0f
#define PS_MARCA_W      430.0f
#define PS_MARCA_H      (PS_MARCA_W * 344.0f / 1085.0f)
#define PS_MARCA_X      ((NV_TELA_W - PS_MARCA_W) * 0.5f)
#define PS_MARCA_Y      102.0f

// --- PIN ---------------------------------------------------------------------
//
// Teclado 3x4, na ordem do telefone. O que havia aqui era 5 colunas com 12
// teclas: as duas ultimas (apagar e OK) sobravam sozinhas numa terceira linha
// encostada a esquerda, e o olho procurava o OK no canto errado toda vez.
#define PS_PIN_MAX       8
#define PS_TECLA        96.0f
#define PS_TECLA_GAP    18.0f
#define PS_TECLA_COLS       3
#define PS_TECLA_LINS       4
#define PS_PIN_APAGAR       9
#define PS_PIN_ZERO        10
#define PS_PIN_OK          11
#define PS_PONTO        22.0f    // diametro do ponto que mascara um digito
#define PS_PONTO_PASSO  40.0f

static int foco;
static int concluido, sair, repetir;
static int infoAdicionar;
static int editorIndice;
static int opcoesPerfil, opcoesFoco;
static char editorNome[64];
static PerfilAvatar editorAvatares[64];
static int editorN, editorCategoria, editorFiltrados[64], editorFilN;
static int editorFocoAvatar, editorSelecionado = -1, editorSecao, editorTecla;
static int criando, erroCriar;
static _Atomic int resultadoCriar;
static pthread_t fioCriar;
static pthread_t fioAvatares;
static _Atomic int avataresCarregados;
static const char *const editorCats[] =
  { "Todos", "Animais", "Linear", "Originais", "Retratos", "Desenhos" };
static const char *const editorCatIds[] =
  { "", "animals", "linear", "originals", "portraits", "sketches" };
static const char *const editorTeclas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
static int modoGerenciar;
static int modoTrocaManual;
static int aguardaSilencioOk;
static Uint32 ultimoOkDoMenu;
#define PS_OK_REPOUSO_MS 250u
static float animFoco[CONTA_PERFIL_MAX + 1];
static float animEntrada;        // 0..1: a tela sobe e aparece uma vez so
static float animPin;            // 0..1: o veu e o teclado do PIN
static float fundoR = .80f, fundoG = .12f, fundoB = .09f;

// Estado do PIN: -1 = nenhum perfil pedindo PIN.
static int pinDe = -1;
// 0 desbloquear, 1 criar, 2 trocar, 3 remover.
static int pinOperacao, pinConfirmando;
static char pinNovo[5], pinAnterior[5];
static char pin[PS_PIN_MAX + 1];
static int pinFoco;              // indice na grade 3x4; ver PS_PIN_*
static int pinErrado, pinRede;
static pthread_t fioPin;
static int verificando;
static _Atomic int resultadoPin; // 0 pendente, 1 ok, -1 PIN incorreto, -2 rede
static _Atomic unsigned pinGeracao;
typedef struct { unsigned geracao; int slot, indice; char valor[PS_PIN_MAX + 1]; } PinTarefa;

static int corDe(const char *hex, float *r, float *g, float *b) {
  unsigned v = 0;
  if (!hex || hex[0] != '#' || strlen(hex) < 7) return 0;
  if (sscanf(hex + 1, "%6x", &v) != 1) return 0;
  *r = ((v >> 16) & 255) / 255.0f;
  *g = ((v >> 8) & 255) / 255.0f;
  *b = (v & 255) / 255.0f;
  return 1;
}

// A cor da conta pode vir escura demais para ser vista contra o #0D0D0D do
// fundo (MEDIDO: ha perfis com #1A1A1A no servidor). Sem um piso de
// luminancia, o avatar desses perfis some e a tela mostra um buraco no lugar
// da pessoa. Clareia proporcionalmente, preservando o matiz.
static void corLegivel(float *r, float *g, float *b) {
  float lum = 0.2126f * *r + 0.7152f * *g + 0.0722f * *b;
  if (lum >= 0.16f) return;
  { float k = lum > 0.001f ? 0.16f / lum : 0.0f;
    if (k > 6.0f) k = 6.0f;
    *r = anim_clamp(*r * k + 0.10f, 0.0f, 1.0f);
    *g = anim_clamp(*g * k + 0.10f, 0.0f, 1.0f);
    *b = anim_clamp(*b * k + 0.10f, 0.0f, 1.0f); }
}

// Primeiro CARACTERE, nao primeiro byte: "Álvaro" tem dois bytes na primeira
// letra e cortar no byte produz um glifo invalido.
static void inicialDe(const char *nome, char *dst, size_t tam) {
  size_t z = 1;
  if (tam < 5) { if (tam) dst[0] = 0; return; }
  if (!nome || !nome[0]) { dst[0] = '?'; dst[1] = 0; return; }
  while (z < 4 && (nome[z] & 0xc0) == 0x80) z++;
  memcpy(dst, nome, z);
  dst[z] = 0;
}

static float diametro(int m) {
  float util = NV_TELA_W - 2.0f * NV_MARGEM_X;
  float d, vao;
  if (m <= 0) return PS_AV_MAX;
  vao = m <= 4 ? PS_VAO_MAX : PS_VAO_MIN;
  d = (util - (float)(m - 1) * vao) / (float)m;
  return anim_clamp(d, PS_AV_MIN, PS_AV_MAX);
}

static float vaoDe(int m, float d) {
  (void)d;
  return m <= 4 ? PS_VAO_MAX : PS_VAO_MIN;
}

static int temAdicionar(int m) { return m > 0 && m < PS_MAX_PERFIS; }

static void editorFiltrar(void) {
  editorFilN = 0;
  for (int i = 0; i < editorN; i++) {
    if (!editorCategoria || !strcmp(editorAvatares[i].categoria,editorCatIds[editorCategoria]))
      editorFiltrados[editorFilN++] = i;
  }
  if (editorFocoAvatar >= editorFilN) editorFocoAvatar = editorFilN ? editorFilN-1 : 0;
}

static void *fioCarregarAvatares(void *u) {
  (void)u;
  perfis_carregar_avatares();
  atomic_store(&avataresCarregados,1);
  return NULL;
}

static void editorAbrir(int indice) {
  const ContaPerfil *p = NULL;
  infoAdicionar = 1;
  editorIndice = indice;
  editorNome[0] = 0;
  for (int i = 0; i < perfis_n(); i++)
    if (perfis_item(i)->indice == indice) p = perfis_item(i);
  if (p) snprintf(editorNome, sizeof editorNome, "%s", p->nome);
  editorN = perfis_avatares(editorAvatares,64);
  editorCategoria = editorFocoAvatar = editorTecla = editorSecao = 0;
  editorSelecionado = -1;
  criando = erroCriar = 0;
  atomic_store(&avataresCarregados,editorN > 0);
  atomic_store(&resultadoCriar,0);
  editorFiltrar();
  if (!editorN && pthread_create(&fioAvatares,NULL,fioCarregarAvatares,NULL) == 0)
    pthread_detach(fioAvatares);
  SDL_StartTextInput();
}

typedef struct { char nome[64], avatarId[64], corHex[10]; int indice; } CriarTarefa;
static void *fioCriarPerfil(void *u) {
  CriarTarefa *t = u;
  int indice = t->indice
    ? perfis_editar(t->indice,t->nome,t->avatarId[0]?t->avatarId:NULL,
                   t->corHex[0]?t->corHex:NULL)
    : perfis_criar(t->nome,t->avatarId,t->corHex);
  free(t);
  atomic_store(&resultadoCriar,indice > 0 ? indice : -1);
  return NULL;
}

static void editorAcrescentar(const char *s) {
  size_t n = strlen(editorNome), z = s ? strlen(s) : 0;
  if (z && n+z < sizeof editorNome) memcpy(editorNome+n,s,z+1);
}

static void editorEvento(SDL_Keycode k) {
  if (criando) return;
  if (k == SDLK_ESCAPE || k == SDLK_AC_BACK) {
    SDL_StopTextInput(); infoAdicionar = 0; return;
  }
  if (k == SDLK_BACKSPACE && editorSecao == 0) {
    size_t z = strlen(editorNome);
    if (z) {
      do { z--; } while (z && ((unsigned char)editorNome[z] & 0xc0) == 0x80);
      editorNome[z] = 0;
    }
    return;
  }
  if (k == SDLK_UP) {
    if (editorSecao == 0) { if (editorTecla >= 6) editorTecla -= 6; else editorSecao = 4; }
    else if (editorSecao == 1) editorSecao = 3;
    else if (editorSecao == 2) {
      if (editorFocoAvatar >= 4) editorFocoAvatar -= 4; else editorSecao = 1;
    } else if (editorSecao == 3) editorSecao = 2;
    else editorSecao = 0;
    return;
  }
  if (k == SDLK_DOWN) {
    if (editorSecao == 0) {
      if (editorTecla + 6 < 28) editorTecla += 6; else editorSecao = 4;
    } else if (editorSecao == 1) editorSecao = 2;
    else if (editorSecao == 2) {
      if (editorFocoAvatar + 4 < editorFilN) editorFocoAvatar += 4;
      else editorSecao = 3;
    } else if (editorSecao == 3) editorSecao = 4;
    else editorSecao = 0;
    return;
  }
  if (k == SDLK_LEFT) {
    if (editorSecao == 0) { if (editorTecla % 6) editorTecla--; }
    else if (editorSecao == 1) {
      if (editorCategoria) { editorCategoria--; editorFiltrar(); }
      else editorSecao = 0;
    } else if (editorSecao == 2) {
      if (editorFocoAvatar % 4) editorFocoAvatar--; else editorSecao = 0;
    } else if (editorSecao == 3) editorSecao = 4;
    else editorSecao = 0;
    return;
  }
  if (k == SDLK_RIGHT) {
    if (editorSecao == 0) { if (editorTecla % 6 < 5 && editorTecla < 27) editorTecla++; else editorSecao = 1; }
    else if (editorSecao == 1) {
      if (editorCategoria < 5) { editorCategoria++; editorFiltrar(); }
    } else if (editorSecao == 2) {
      if (editorFocoAvatar % 4 < 3 && editorFocoAvatar+1 < editorFilN) editorFocoAvatar++;
    } else if (editorSecao == 4) editorSecao = 3;
    return;
  }
  if (k != SDLK_RETURN && k != SDLK_KP_ENTER && k != SDLK_SPACE) return;
  if (editorSecao == 0) {
    if (editorTecla < 26) {
      char c[2] = { editorTeclas[editorTecla],0 }; editorAcrescentar(c);
    } else if (editorTecla == 26) editorAcrescentar(" ");
    else { size_t z = strlen(editorNome);
      if (z) { do { z--; } while (z && ((unsigned char)editorNome[z] & 0xc0) == 0x80);
        editorNome[z] = 0; } }
  } else if (editorSecao == 2 && editorFilN) {
    editorSelecionado = editorFiltrados[editorFocoAvatar];
  } else if (editorSecao == 4) {
    SDL_StopTextInput(); infoAdicionar = 0;
  } else if (editorSecao == 3) {
    CriarTarefa *t;
    size_t z = strlen(editorNome);
    while (z && editorNome[z-1] == ' ') editorNome[--z] = 0;
    if (!z) { erroCriar = 2; return; }
    t = calloc(1,sizeof *t);
    if (!t) { erroCriar = 1; return; }
    snprintf(t->nome,sizeof t->nome,"%s",editorNome);
    t->indice = editorIndice;
    if (editorSelecionado >= 0) {
      PerfilAvatar *av = &editorAvatares[editorSelecionado];
      snprintf(t->avatarId,sizeof t->avatarId,"%s",av->id);
      snprintf(t->corHex,sizeof t->corHex,"%s",av->corHex);
    }
    if (!t->indice && !t->corHex[0]) snprintf(t->corHex,sizeof t->corHex,"#1E88E5");
    criando = 1; erroCriar = 0;
    if (pthread_create(&fioCriar,NULL,fioCriarPerfil,t) == 0) pthread_detach(fioCriar);
    else { free(t); criando = 0; erroCriar = 1; }
  }
}

void perfilsel_iniciar(void) {
  int i;
  modoGerenciar = modoTrocaManual = 0;
  aguardaSilencioOk = 0;
  opcoesPerfil = opcoesFoco = editorIndice = 0;
  concluido = sair = repetir = infoAdicionar = 0;
  editorN = criando = erroCriar = 0;
  pinDe = -1;
  pinOperacao = pinConfirmando = 0;
  pinNovo[0] = pinAnterior[0] = 0;
  pin[0] = 0;
  pinFoco = PS_PIN_OK;
  pinErrado = 0;
  pinRede = 0;
  verificando = 0;
  animEntrada = 0.0f;
  animPin = 0.0f;
  atomic_fetch_add(&pinGeracao, 1);
  atomic_store(&resultadoPin, 0);
  // O cursor nasce no perfil ativo. A regra vive em perfis.c porque e ela que
  // um teste sem SDL consegue provar.
  foco = perfis_indice_sugerido();
  for (i = 0; i <= CONTA_PERFIL_MAX; i++) animFoco[i] = (i == foco) ? 1.0f : 0.0f;
  { const ContaPerfil *p = perfis_item(foco);
    if (p) corDe(p->corHex, &fundoR, &fundoG, &fundoB); }
}

void perfilsel_iniciar_gerenciar(void) {
  perfilsel_iniciar();
  modoGerenciar = 1;
}

void perfilsel_iniciar_trocar(void) {
  perfilsel_iniciar();
  modoTrocaManual = 1;
  // O menu abre esta tela enquanto o OK longo ainda esta pressionado. Algumas
  // TVs repetem KEYDOWN/KEYUP em pares: so a soltura nao distingue novo toque.
  // Esperar um intervalo sem OK impede confirmar o perfil que nasce focado.
  aguardaSilencioOk = 1;
  ultimoOkDoMenu = SDL_GetTicks();
}

static void escolher(int i);
void perfilsel_iniciar_trocar_para(int slot) {
  perfilsel_iniciar_trocar();
  if (!perfis_item(slot)) return;
  foco = slot;
  for (int i = 0; i <= CONTA_PERFIL_MAX; i++)
    animFoco[i] = i == slot ? 1.0f : 0.0f;
  escolher(slot);
}

int perfilsel_modo_gerenciar(void) { return modoGerenciar; }

static void *fioVerificar(void *u) {
  PinTarefa *t = u;
  // A verificacao mora em perfis.c, que e o unico lugar que monta o corpo da
  // RPC. Aqui havia uma segunda copia com snprintf, e ela nao escapava o PIN:
  // uma aspa digitada quebrava o JSON e o servidor recusava tudo.
  // Tres respostas: 1 aceitou, 0 recusou, -1 nao deu para perguntar. O ultimo
  // caso vira -2 aqui (o codigo de "sem conexao" desta tela), e nao -1: dizer
  // "PIN incorreto" a quem esta sem rede e acusar a pessoa do erro do aparelho.
  int v = perfis_verificar_pin(t->indice, t->valor);
  // O PIN sai da memoria assim que deixa de ser necessario. Nao ha log dele em
  // lugar nenhum deste arquivo, e nao pode passar a haver.
  memset(t->valor, 0, sizeof t->valor);
  if (t->geracao == atomic_load(&pinGeracao) && pinDe == t->slot && verificando)
    atomic_store(&resultadoPin, v > 0 ? 1 : (v < 0 ? -2 : -1));
  free(t);
  return NULL;
}

typedef struct {
  unsigned geracao;
  int slot, indice, operacao;
  char novo[5], atual[5];
} PinSalvarTarefa;

static void *fioSalvarPin(void *u) {
  PinSalvarTarefa *t = u;
  int ok = t->operacao == 3
    ? perfis_remover_pin(t->indice, t->atual)
    : perfis_definir_pin(t->indice, t->novo, t->atual);
  if (t->geracao == atomic_load(&pinGeracao) &&
      pinDe == t->slot && verificando)
    atomic_store(&resultadoPin, ok ? 1 : -2);
  memset(t, 0, sizeof *t);
  free(t);
  return NULL;
}

static void salvarPin(void) {
  const ContaPerfil *p = perfis_item(pinDe);
  PinSalvarTarefa *t;
  if (!p) return;
  t = calloc(1, sizeof *t);
  if (!t) { pinRede = 1; return; }
  t->geracao = atomic_load(&pinGeracao);
  t->slot = pinDe;
  t->indice = p->indice;
  t->operacao = pinOperacao;
  snprintf(t->novo, sizeof t->novo, "%s", pinNovo);
  snprintf(t->atual, sizeof t->atual, "%s", pinAnterior);
  verificando = 1;
  pinRede = pinErrado = 0;
  atomic_store(&resultadoPin, 0);
  if (pthread_create(&fioPin, NULL, fioSalvarPin, t) == 0) pthread_detach(fioPin);
  else { memset(t, 0, sizeof *t); free(t); verificando = 0; pinRede = 1; }
}

static void escolher(int i) {
  const ContaPerfil *p = perfis_item(i);
  switch (perfis_acao(i)) {
    case PERFIL_ACAO_PIN:
      pinDe = i; pin[0] = 0; pinFoco = PS_PIN_OK; pinErrado = pinRede = 0;
      return;
    case PERFIL_ACAO_ENTRAR:
      if (p) perfis_definir_ativo(p->indice);
      concluido = 1;
      return;
    default:
      return;
  }
}

static void eventoPin(SDL_Keycode k) {
  if (verificando) {
    if (k == SDLK_AC_BACK || k == SDLK_ESCAPE) {
      atomic_fetch_add(&pinGeracao, 1); atomic_store(&resultadoPin, 0);
      verificando = 0; pinRede = 0; pinErrado = 0;
      memset(pinNovo, 0, sizeof pinNovo);
      memset(pinAnterior, 0, sizeof pinAnterior);
      pinConfirmando = 0;
      pinDe = -1;
    }
    return;
  }
  if (k == SDLK_AC_BACK || k == SDLK_ESCAPE) {
    if (pin[0]) { pin[strlen(pin) - 1] = 0; pinErrado = pinRede = 0; }
    else {
      pinDe = -1;
      pinNovo[0] = pinAnterior[0] = 0;
      pinConfirmando = pinOperacao = 0;
    }
    return;
  }
  if (k == SDLK_LEFT)  { if (pinFoco % PS_TECLA_COLS > 0) pinFoco--; return; }
  if (k == SDLK_RIGHT) { if (pinFoco % PS_TECLA_COLS < PS_TECLA_COLS - 1) pinFoco++; return; }
  if (k == SDLK_UP)    { if (pinFoco >= PS_TECLA_COLS) pinFoco -= PS_TECLA_COLS; return; }
  if (k == SDLK_DOWN)  { if (pinFoco + PS_TECLA_COLS < PS_TECLA_COLS * PS_TECLA_LINS)
                           pinFoco += PS_TECLA_COLS; return; }
  if (k != SDLK_RETURN && k != SDLK_KP_ENTER) return;

  if (pinFoco == PS_PIN_APAGAR) { if (pin[0]) pin[strlen(pin) - 1] = 0; return; }
  if (pinFoco == PS_PIN_OK) {
    PinTarefa *t;
    const ContaPerfil *p = perfis_item(pinDe);
    if (!pin[0]) return;
    if (pinOperacao) {
      if (strlen(pin) != 4) { pinErrado = 3; return; }
      if (pinOperacao >= 2 && !pinAnterior[0]) {
        snprintf(pinAnterior, sizeof pinAnterior, "%s", pin);
        memset(pin, 0, sizeof pin);
        if (pinOperacao == 3) salvarPin();
        return;
      }
      if (!pinConfirmando) {
        snprintf(pinNovo, sizeof pinNovo, "%s", pin);
        memset(pin, 0, sizeof pin);
        pinConfirmando = 1;
        return;
      }
      if (strcmp(pinNovo, pin)) {
        memset(pin, 0, sizeof pin);
        memset(pinNovo, 0, sizeof pinNovo);
        pinConfirmando = 0;
        pinErrado = 2;
        return;
      }
      memset(pin, 0, sizeof pin);
      salvarPin();
      return;
    }
    t = malloc(sizeof *t);
    if (!t || !p) { free(t); pinRede = 1; return; }
    t->geracao = atomic_load(&pinGeracao); t->slot = pinDe; t->indice = p->indice;
    snprintf(t->valor, sizeof t->valor, "%s", pin);
    verificando = 1;
    pinErrado = pinRede = 0;
    atomic_store(&resultadoPin, 0);
    // Verificar BLOQUEIA (uma viagem ao servidor). Num fio, para a tela nao
    // congelar por um segundo a cada tentativa.
    if (pthread_create(&fioPin, NULL, fioVerificar, t) == 0) pthread_detach(fioPin);
    else { memset(t->valor, 0, sizeof t->valor); free(t); verificando = 0; pinRede = 1; }
    return;
  }
  { size_t z = strlen(pin);
    int digito = (pinFoco == PS_PIN_ZERO) ? 0 : pinFoco + 1;
    if (z < PS_PIN_MAX) { pin[z] = (char)('0' + digito); pin[z + 1] = 0; } }
}

void perfilsel_evento(const SDL_Event *e) {
  SDL_Keycode k;
  int m = perfis_n();
  if (aguardaSilencioOk &&
      (e->type == SDL_KEYDOWN || e->type == SDL_KEYUP)) {
    SDL_Keycode ok = e->key.keysym.sym;
    if (ok == SDLK_RETURN || ok == SDLK_KP_ENTER) {
      Uint32 agora = SDL_GetTicks();
      if (e->type == SDL_KEYUP ||
          agora - ultimoOkDoMenu < PS_OK_REPOUSO_MS) {
        ultimoOkDoMenu = agora;
        return;
      }
      aguardaSilencioOk = 0;
    } else if (e->type == SDL_KEYDOWN) aguardaSilencioOk = 0;
  }
  if (e->type == SDL_KEYUP) return;
  if (infoAdicionar && e->type == SDL_TEXTINPUT) {
    editorAcrescentar(e->text.text); return;
  }
  if (e->type != SDL_KEYDOWN) return;
  k = e->key.keysym.sym;
  if (pinDe >= 0) { eventoPin(k); return; }
  if (infoAdicionar) {
    editorEvento(k);
    return;
  }
  if (opcoesPerfil) {
    const ContaPerfil *p = perfis_item(foco);
    int total = p && p->temPin ? 3 : 2;
    if (k == SDLK_ESCAPE || k == SDLK_AC_BACK || k == SDLK_BACKSPACE) {
      opcoesPerfil = 0; return;
    }
    if (k == SDLK_UP && opcoesFoco > 0) opcoesFoco--;
    else if (k == SDLK_DOWN && opcoesFoco < total - 1) opcoesFoco++;
    else if ((k == SDLK_RETURN || k == SDLK_KP_ENTER) && p) {
      opcoesPerfil = 0;
      if (opcoesFoco == 0) editorAbrir(p->indice);
      else {
        pinDe = foco;
        pinOperacao = opcoesFoco == 2 ? 3 : (p->temPin ? 2 : 1);
        pin[0] = pinNovo[0] = pinAnterior[0] = 0;
        pinConfirmando = pinErrado = pinRede = 0;
        pinFoco = PS_PIN_OK;
      }
    }
    return;
  }

  if (k == SDLK_ESCAPE || k == SDLK_AC_BACK || k == SDLK_BACKSPACE) { sair = 1; return; }
  // Com a lista na tela, o OK escolhe. Sem ela (rede caida), o OK e a unica
  // acao que faz sentido: tentar de novo.
  if (m == 0 && sync_estado() == SYNC_FALHOU &&
      (k == SDLK_RETURN || k == SDLK_KP_ENTER)) { repetir = 1; return; }
  if (k == SDLK_RIGHT) { if (foco < m - 1 + temAdicionar(m)) foco++; }
  else if (k == SDLK_LEFT) { if (foco > 0) foco--; }
  else if (k == SDLK_RETURN || k == SDLK_KP_ENTER) {
    if (foco == m && temAdicionar(m)) editorAbrir(0);
    else if (modoGerenciar && foco < m) { opcoesPerfil = 1; opcoesFoco = 0; }
    else escolher(foco);
  }
}

void perfilsel_atualizar(float dt, Uint32 agora) {
  int i, reduzida = ajustes_animacoes_reduzidas();
  (void)agora;

  if (dt < 0.0f) dt = 0.0f;
  if (dt > 0.05f) dt = 0.05f;

  if (infoAdicionar) {
    int resultado = atomic_exchange(&resultadoCriar,0);
    if (!editorN) { editorN = perfis_avatares(editorAvatares,64); editorFiltrar(); }
    if (criando && resultado) {
      criando = 0;
      if (resultado > 0) {
        for (int i = 0; i < perfis_n(); i++) {
          const ContaPerfil *p = perfis_item(i);
          if (p && p->indice == resultado) { foco = i; break; }
        }
        SDL_StopTextInput();
        infoAdicionar = 0;
      } else erroCriar = 1;
    }
  }

  animEntrada = anim_reduzida(anim_mola(animEntrada, 1.0f, dt, NV_MOLA_TELA),
                              1.0f, reduzida);
  animPin = anim_reduzida(anim_mola(animPin, pinDe >= 0 ? 1.0f : 0.0f, dt, NV_MOLA_TELA),
                          pinDe >= 0 ? 1.0f : 0.0f, reduzida);
  { const ContaPerfil *p = perfis_item(foco);
    float r=fundoR, g=fundoG, b=fundoB;
    CorvivaPaleta pal;
    if (p) {
      corDe(p->corHex,&r,&g,&b);
      // A imagem decide o degrade assim que sua textura termina de carregar.
      // A cor configurada no perfil serve de fallback durante o carregamento.
      if (p->avatarUrl[0] && corviva_paleta(p->avatarUrl,&pal) && pal.ok) {
        r=pal.acento[0]; g=pal.acento[1]; b=pal.acento[2];
      }
      fundoR = anim_reduzida(anim_mola(fundoR,r,dt,NV_MOLA_TELA),r,reduzida);
      fundoG = anim_reduzida(anim_mola(fundoG,g,dt,NV_MOLA_TELA),g,reduzida);
      fundoB = anim_reduzida(anim_mola(fundoB,b,dt,NV_MOLA_TELA),b,reduzida);
    }
  }
  for (i = 0; i <= CONTA_PERFIL_MAX; i++) {
    float alvo = (i == foco && pinDe < 0) ? 1.0f : 0.0f;
    animFoco[i] = anim_mola(animFoco[i], alvo, dt,
                            alvo > animFoco[i] ? NV_MOLA_FOCO : NV_MOLA_DESFOCO);
    if (reduzida) animFoco[i] = alvo;
  }

  { int resultado = atomic_load(&resultadoPin);
  if (verificando && resultado) {
    atomic_store(&resultadoPin, 0);
    verificando = 0;
    if (resultado == 1) {
      if (pinOperacao) {
        pinDe = -1;
        pinOperacao = pinConfirmando = 0;
        memset(pinNovo, 0, sizeof pinNovo);
        memset(pinAnterior, 0, sizeof pinAnterior);
        memset(pin, 0, sizeof pin);
      } else {
        const ContaPerfil *p = perfis_item(pinDe);
        // O perfil so muda depois da verificacao do PIN no servidor.
        if (p) perfis_definir_ativo(p->indice);
        memset(pin, 0, sizeof pin);
        pinDe = -1;
        concluido = 1;
      }
    } else if (resultado == -2) {
      pinRede = 1;
      memset(pin, 0, sizeof pin);
      if (pinOperacao) {
        memset(pinNovo, 0, sizeof pinNovo);
        memset(pinAnterior, 0, sizeof pinAnterior);
        pinConfirmando = 0;
      }
    } else {
      pinErrado = 1;
      memset(pin, 0, sizeof pin);
    }
  }
  }
  if (foco >= perfis_n() + temAdicionar(perfis_n()))
    foco = perfis_n() > 0 ? perfis_n() - 1 + temAdicionar(perfis_n()) : 0;

  // NAO concluir enquanto o ciclo que BUSCA os perfis ainda esta rodando E a
  // lista ainda esta vazia.
  //
  // O defeito que isto conserta: app.c troca para esta tela logo depois de
  // chamar sync_iniciar(), que e assincrono. No primeiro quadro perfis_n() e 0
  // porque a resposta nao chegou — e "0 perfis" e indistinguivel de "conta de
  // uma pessoa so". A tela se dispensava sozinha ANTES de existir, e uma conta
  // de duas pessoas caia no perfil 1 em silencio: o app sincronizava e
  // ESCREVIA progresso no perfil errado, sem nunca perguntar.
  //
  // Com o cache em disco a lista costuma existir no primeiro quadro, e ai a
  // tela ja e util enquanto o ciclo confirma — por isso a guarda olha tambem o
  // perfis_n(), e nao so o estado do sync.
  if (sync_estado() == SYNC_RODANDO && perfis_n() == 0) return;

  // Terminado o ciclo, "nenhum ou um destravado" e resposta de verdade: seguir
  // direto. Um erro de rede nunca equivale a "uma conta sem perfis", entao so
  // com SYNC_PRONTO. A pergunta e perfis_sem_escolha() e nao
  // perfis_precisa_escolher(): esta tela tambem e aberta DE PROPOSITO pelo
  // "trocar de perfil" do menu, e ali a bandeira de sessao ja esta ligada — a
  // tela se fecharia sozinha no quadro seguinte.
  if (!modoGerenciar && !modoTrocaManual && !infoAdicionar && sync_estado() == SYNC_PRONTO &&
      perfis_sem_escolha() && pinDe < 0) concluido = 1;
}

int perfilsel_quer_sair(void) { int v=sair; sair=0; return v; }
int perfilsel_pediu_repetir(void) { int v=repetir; repetir=0; return v; }
void perfilsel_continuar_ativo(void) {
  // O Voltar so chega aqui depois de perfis_pode_dispensar(): ha um perfil
  // gravado e ele nao esta protegido por PIN. E a mesma conclusao de uma
  // escolha explicita, para que a Home e o trailer nao fiquem em estado
  // intermediario depois de manter o perfil anterior.
  concluido = 1;
}

// --- DESENHO -----------------------------------------------------------------

// GIF NO AVATAR (issue #45). A foto de perfil pode ser um .gif subido pela
// conta, e ate aqui ele virava a primeira imagem parada — todo arquivo passa
// pelo decodificador de UM quadro. So o perfil em foco anima (gif.c segura
// UMA animacao por vez) e so no Tizen: no webOS gif_textura devolve 0 e fica
// a foto parada, a mesma regra das capas de colecao (#29).
static const ContaPerfil *gifDono;
static int    gifAnima = -1;
static GLuint gifTex;

// O circulo do perfil: soquete escuro, cor da conta por cima e, quando ha,
// a foto. Tres camadas e nao uma porque a cor precisa DIMINUIR fora do foco
// sem virar um buraco preto sobre a arte de fundo — o soquete e o que garante
// que o dimming seja igual com arte e sem arte.
static void disco(GfxRect a, const ContaPerfil *p, float f, float alfa,
                  int focado) {
  float cr = 0.12f, cg = 0.53f, cb = 0.90f;
  float vivo = 0.86f + 0.14f * f;
  GLuint foto;
  int emGif = 0;
  corDe(p->corHex, &cr, &cg, &cb);
  corLegivel(&cr, &cg, &cb);
  gfx_rect(a, 0, GFX_DISCO, 0, 0, 0, 0, 0.09f, 0.09f, 0.10f, alfa);
  gfx_rect(a, 0, GFX_DISCO, 0, 0, 0, 0, cr, cg, cb, vivo * alfa);
  foto = p->avatarUrl[0] ? tex_obter_larg(p->avatarUrl, a.w) : 0;
  if (focado && gif_pode_animar() && !ajustes_animacoes_reduzidas()
      && p->avatarUrl[0] && strstr(p->avatarUrl, ".gif")) {
    // O arquivo e pedido a cada quadro em que este perfil e o foco — fora
    // dele nenhum download comeca (ver a nota de gif_pode_animar em gif.h).
    const char *arq = tex_arquivo(p->avatarUrl);
    if (gifDono != p) { gifDono = p; gifAnima = -1; gifTex = 0; gif_parar(); }
    if (gifAnima < 0 && arq) gifAnima = gif_animado(arq);
    if (arq && gifAnima > 0) {
      // A cada desenho: o relogio e de gif.c, e sem quadro vencido a chamada
      // nao sobe nada (1.4.7; o passo de 67 ms prendia o GIF a 15 fps).
      GLuint m = gif_textura(arq, (int)a.w);
      if (m) gifTex = m;
      if (gifTex) { foto = gifTex; emGif = 1; }
    }
  }
  if (foto) {
    // O GIF vem na proporcao dele: o aspecto registrado e da foto parada,
    // que nao vale para o quadro animado. Zero deixa a moldura decidir.
    gfx_tex_aspect_atual = emGif ? 0 : tex_aspecto(p->avatarUrl);
    gfx_rect(a, foto, GFX_AVATAR, 0, 0, 0, 0, 1, 1, 1, vivo * alfa);
    gfx_tex_aspect_atual = 0;
  } else {
    char ini[8];
    TxtLinha l;
    inicialDe(p->nome, ini, sizeof ini);
    l = txt_linha(a.w >= 230.0f ? TXT_TITULO1 : TXT_TITULO2, ini, 255, 255, 255, 255);
    txt_desenhar_alpha(l, a.x + (a.w - l.w) * 0.5f, a.y + (a.h - l.h) * 0.5f,
                       (0.80f + 0.20f * f) * alfa);
  }
}

// A cor de fundo vem do avatar do perfil em foco e muda suavemente com o D-pad.
static void desenhaFundo(void) {
  GfxRect tela = { 0, 0, NV_TELA_W, NV_TELA_H };
  gfx_cor(tela, 0, .012f+fundoR*.022f, .012f+fundoG*.022f,
          .012f+fundoB*.022f, 1);
  gfx_rect((GfxRect){ -850, -650, 2750, 2050 }, 0, GFX_SOMBRA,
           1, 0, 0, 0.5f, .03f+fundoR*.50f, .03f+fundoG*.50f,
           .03f+fundoB*.50f, .72f);
  gfx_rect((GfxRect){ -750, 310, 2130, 1260 }, 0, GFX_SOMBRA,
           1, 0, 0, 0.5f, fundoR*.26f, fundoG*.26f, fundoB*.26f, .36f);
  gfx_rect(tela, 0, GFX_VEU_BAIXO, 0, 0, 0, 0,
           .015f, .015f, .018f, .76f);
}

static void desenhaPin(void) {
  static const char *ROT[PS_TECLA_COLS * PS_TECLA_LINS] =
    { "1","2","3", "4","5","6", "7","8","9", "←","0","OK" };
  const ContaPerfil *p = perfis_item(pinDe);
  float largura = PS_TECLA_COLS * PS_TECLA + (PS_TECLA_COLS - 1) * PS_TECLA_GAP;
  float x0 = (NV_TELA_W - largura) * 0.5f;
  float y0 = 540.0f;
  float a = animPin;
  int i;
  size_t n = strlen(pin), mostrar;

  { GfxRect tela = { 0, 0, NV_TELA_W, NV_TELA_H };
    gfx_cor(tela, 0.0f, 0.02f, 0.02f, 0.025f, 0.88f * a); }
  if (!p) return;

  // Quem esta sendo destravado, com a cara dele. Sem o avatar aqui o teclado
  // pode ser o de qualquer perfil, e num teclado numerico nao ha nada na tela
  // que diga de quem e a fechadura.
  { GfxRect av = { (NV_TELA_W - 132.0f) * 0.5f, 176.0f, 132.0f, 132.0f };
    disco(av, p, 1.0f, a, 1); }

  { char t[128];
    TxtLinha l;
    if (!pinOperacao)
      snprintf(t, sizeof t, i18n("PIN de %s"), p->nome[0] ? p->nome : i18n("perfil"));
    else if (pinOperacao >= 2 && !pinAnterior[0])
      snprintf(t, sizeof t, "%s", i18n("Digite o PIN atual"));
    else if (pinOperacao == 3)
      snprintf(t, sizeof t, "%s", i18n("Removendo PIN…"));
    else if (pinConfirmando)
      snprintf(t, sizeof t, "%s", i18n("Confirme o novo PIN"));
    else snprintf(t, sizeof t, "%s", i18n("Crie um PIN de 4 dígitos"));
    l = txt_linha(TXT_TITULO3, t, 255, 255, 255, 255);
    txt_desenhar_alpha(l, (NV_TELA_W - l.w) * 0.5f, 344.0f, a); }

  // Pontos, nunca os digitos: alguem passando na sala nao precisa ler o PIN.
  // Discos e nao asteriscos — o '*' da fonte fica na ALTURA DAS MAIUSCULAS, ou
  // seja flutuando no alto da linha, e a fila lia como sujeira em vez de senha.
  mostrar = n > 4 ? n : 4;
  if (mostrar > PS_PIN_MAX) mostrar = PS_PIN_MAX;
  { float total = (float)mostrar * PS_PONTO_PASSO - (PS_PONTO_PASSO - PS_PONTO);
    float px = (NV_TELA_W - total) * 0.5f;
    size_t k;
    for (k = 0; k < mostrar; k++) {
      GfxRect d = { px + (float)k * PS_PONTO_PASSO, 434.0f, PS_PONTO, PS_PONTO };
      gfx_rect(d, 0, GFX_DISCO, 0, 0, 0, 0, 1, 1, 1, (k < n ? 0.96f : 0.20f) * a);
    } }

  { const char *aviso = NULL;
    int cr = 236, cg = 108, cb = 108;
    if (verificando)   { aviso = "verificando…"; cr = 200; cg = 202; cb = 210; }
    else if (pinRede)  { aviso = pinOperacao ? "Não foi possível salvar o PIN. Tente novamente."
                                           : "Sem conexão. Tente novamente."; cg = 150; cb = 150; }
    else if (pinErrado == 2) aviso = "Os PINs não coincidem.";
    else if (pinErrado == 3) aviso = "Digite 4 dígitos.";
    else if (pinErrado){ aviso = "PIN incorreto"; }
    if (aviso) {
      TxtLinha l = txt_linha(TXT_BODY, aviso, cr, cg, cb, 255);
      txt_desenhar_alpha(l, (NV_TELA_W - l.w) * 0.5f, 486.0f, a);
    } }

  for (i = 0; i < PS_TECLA_COLS * PS_TECLA_LINS; i++) {
    int col = i % PS_TECLA_COLS, lin = i / PS_TECLA_COLS;
    GfxRect r = { x0 + col * (PS_TECLA + PS_TECLA_GAP),
                  y0 + lin * (PS_TECLA + PS_TECLA_GAP), PS_TECLA, PS_TECLA };
    int f = (i == pinFoco && !verificando);
    TxtLinha l;
    // FOCO EM SUPERFICIE: fundo ESCURO (--focus-bg #303030) com texto branco e
    // o anel de 4px por fora. Esta tela fazia o contrario — pilula branca com
    // texto preto —, que e exatamente o padrao que a nota de NV_COR_FOCO em
    // layout.h descreve como o errado e manda nao repetir.
    if (f) {
      gfx_cor(r, NV_RAIO_PILL, NV_COR_FOCO_R, NV_COR_FOCO_G, NV_COR_FOCO_B, a);
      float ar, ag, ab; ajustes_acento(&ar, &ag, &ab);
      gfx_anel_fora(r, NV_RAIO_PILL, 0.0f, NV_ANEL_FOCO, ar, ag, ab, a);
    } else {
      gfx_cor(r, NV_RAIO_PILL, 1.0f, 1.0f, 1.0f, 0.09f * a);
    }
    l = txt_linha(TXT_TITULO3, ROT[i], f ? 255 : 214, f ? 255 : 216, f ? 255 : 224, 255);
    txt_desenhar_alpha(l, r.x + (r.w - l.w) * 0.5f, r.y + (r.h - l.h) * 0.5f, a);
  }
}

static void desenhaOpcoes(void) {
  const ContaPerfil *p = perfis_item(foco);
  int total = p && p->temPin ? 3 : 2;
  float x = 630.0f, y = 330.0f, w = 660.0f;
  if (!p) return;
  gfx_cor((GfxRect){0,0,NV_TELA_W,NV_TELA_H},0,.0f,.0f,.0f,.72f);
  gfx_cor((GfxRect){x,y,w,150.0f+total*76.0f},.035f,.105f,.105f,.105f,1);
  { char titulo[128];
    snprintf(titulo,sizeof titulo,"%s %s",i18n("Gerenciar"),p->nome);
    TxtLinha t=txt_linha_corta(TXT_TITULO2,titulo,255,255,255,255,w-70.0f);
    txt_desenhar(t,x+35.0f,y+30.0f); }
  for (int i=0;i<total;i++) {
    const char *nome = i==0 ? "Editar perfil" :
      i==1 ? (p->temPin ? "Alterar PIN" : "Definir PIN") : "Remover PIN";
    GfxRect r={x+30.0f,y+112.0f+i*76.0f,w-60.0f,64.0f};
    int ativo=i==opcoesFoco;
    float ar,ag,ab;
    ajustes_acento(&ar,&ag,&ab);
    gfx_cor(r,.5f,ativo?ar:.18f,ativo?ag:.18f,ativo?ab:.18f,1);
    TxtLinha t=txt_linha(TXT_BODY,i18n(nome),
                        ativo?ajustes_tinta_foco():242,
                        ativo?ajustes_tinta_foco():242,
                        ativo?ajustes_tinta_foco():242,255);
    txt_desenhar(t,r.x+28.0f,r.y+(r.h-t.h)*.5f);
  }
}

static void desenhaEditor(void) {
  GfxRect caixa = {70,65,1780,950};
  GfxRect criar = {1600,112,176,66}, cancelar = {1380,112,200,66};
  const float avatarTopo = 225.0f;
  const float categoriasTopo = 250.0f;
  const float gradeTopo = 340.0f;
  const PerfilAvatar *av = editorSelecionado >= 0 ? &editorAvatares[editorSelecionado] : NULL;
  gfx_cor(caixa,.025f,.075f,.066f,.065f,.98f);
  txt_desenhar(txt_linha(TXT_TITULO2,i18n(editorIndice ? "Editar perfil" : "Criar Perfil"),255,255,255,255),145,117);
  gfx_cor(criar,.2f,editorSecao==3?.94f:.22f,editorSecao==3?.70f:.20f,
          editorSecao==3?.18f:.18f,1);
  gfx_cor(cancelar,.2f,editorSecao==4?.35f:.17f,editorSecao==4?.34f:.16f,
          editorSecao==4?.36f:.17f,1);
  { TxtLinha l=txt_linha(TXT_BODY,criando?i18n("Salvando…"):i18n(editorIndice ? "Salvar" : "Criar"),255,255,255,255);
    txt_desenhar(l,criar.x+(criar.w-l.w)*.5f,criar.y+(criar.h-l.h)*.5f);
    l=txt_linha(TXT_BODY,i18n("Cancelar"),240,240,242,255);
    txt_desenhar(l,cancelar.x+(cancelar.w-l.w)*.5f,cancelar.y+(cancelar.h-l.h)*.5f);
  }

  { GfxRect foto = {282,avatarTopo,200,200};
    float r=.12f,g=.53f,b=.9f;
    if (av) corDe(av->corHex,&r,&g,&b);
    else if (editorIndice) for (int j=0;j<perfis_n();j++)
      if (perfis_item(j)->indice==editorIndice)
        corDe(perfis_item(j)->corHex,&r,&g,&b);
    gfx_cor(foto,.5f,r,g,b,1);
    if (av) {
      GLuint t = tex_obter_larg(av->url,200);
      if (t) gfx_rect(foto,t,GFX_AVATAR,0,0,0,0,1,1,1,1);
    } else if (editorIndice) {
      for (int j=0;j<perfis_n();j++) if (perfis_item(j)->indice==editorIndice) {
        GLuint t = tex_obter_larg(perfis_item(j)->avatarUrl,200);
        if (t) gfx_rect(foto,t,GFX_AVATAR,0,0,0,0,1,1,1,1);
      }
    } else {
      TxtLinha q=txt_linha(TXT_TITULO1,"?",255,255,255,255);
      txt_desenhar(q,foto.x+(foto.w-q.w)*.5f,foto.y+(foto.h-q.h)*.5f);
    }
  }
  txt_desenhar(txt_linha(TXT_HEADLINE,i18n("Nome do perfil"),195,195,198,255),179,447);
  gfx_cor((GfxRect){178,505,450,70},.13f,.16f,.15f,.15f,1);
  txt_desenhar(txt_linha_corta(TXT_BODY,editorNome[0]?editorNome:i18n("Nome do perfil"),
                              editorNome[0]?255:150,editorNome[0]?255:150,
                              editorNome[0]?255:150,255,420),200,520);
  for (int i=0;i<28;i++) {
    int lin=i/6,col=i%6;
    GfxRect tecla={179+col*75.0f,605+lin*60.0f,66,54};
    char rot[3]={0};
    if (i<26) { rot[0]=editorTeclas[i]; }
    else if (i==26) { rot[0]='_'; }
    else { rot[0]='<'; }
    gfx_cor(tecla,.12f,editorSecao==0&&editorTecla==i?.85f:.22f,
            editorSecao==0&&editorTecla==i?.63f:.21f,
            editorSecao==0&&editorTecla==i?.17f:.22f,1);
    TxtLinha l=txt_linha(TXT_BODY,rot,255,255,255,255);
    txt_desenhar(l,tecla.x+(tecla.w-l.w)*.5f,tecla.y+(tecla.h-l.h)*.5f);
  }
  txt_desenhar(txt_linha(TXT_BODY,i18n("Escolher Avatar"),195,195,198,255),800,204);
  for (int i=0;i<6;i++) {
    GfxRect cat={800+i*162.0f,categoriasTopo,152,55};
    int ativo=i==editorCategoria, focado=editorSecao==1&&ativo;
    gfx_cor(cat,.3f,focado?.80f:ativo?.26f:.16f,
            focado?.58f:ativo?.20f:.16f,focado?.16f:ativo?.14f:.16f,1);
    TxtLinha l=txt_linha_corta(TXT_PG_ROTULO,i18n(editorCats[i]),240,240,242,255,142);
    txt_desenhar(l,cat.x+(cat.w-l.w)*.5f,cat.y+(cat.h-l.h)*.5f);
  }
  { int primeiraLinha=editorFocoAvatar/4-2;
    if (primeiraLinha<0) primeiraLinha=0;
    for (int j=primeiraLinha*4; j<editorFilN && j<primeiraLinha*4+12; j++) {
      int pos=editorFiltrados[j], col=j%4, lin=j/4-primeiraLinha;
      PerfilAvatar *a=&editorAvatares[pos];
      GfxRect foto={830+col*230.0f,gradeTopo+lin*178.0f,130,130};
      float r=.14f,g=.40f,b=.7f;
      int focado=editorSecao==2&&j==editorFocoAvatar;
      corDe(a->corHex,&r,&g,&b);
      gfx_cor(foto,.5f,r,g,b,1);
      GLuint t=tex_obter_larg(a->url,130);
      if (t) gfx_rect(foto,t,GFX_AVATAR,0,0,0,0,1,1,1,1);
      if (focado||pos==editorSelecionado)
        gfx_anel_fora(foto,.5f,0,focado?5:3,1,.77f,.26f,1);
      TxtLinha l=txt_linha_corta(TXT_PG_FIM,a->nome,190,190,195,255,176);
      txt_desenhar(l,foto.x+(foto.w-l.w)*.5f,foto.y+134);
    }
  }
  if (erroCriar) {
    const char *s=erroCriar==2?i18n("Digite um nome para o perfil."):
                             i18n("Não foi possível salvar o perfil. Tente novamente.");
    txt_desenhar(txt_linha(TXT_BODY,s,240,125,125,255),800,910);
  } else if (!editorN) {
    txt_desenhar(txt_linha(TXT_BODY,atomic_load(&avataresCarregados)
                 ? i18n("Nenhum avatar disponível. Você pode criar com a inicial.")
                 : i18n("Carregando avatares…"),170,170,175,255),800,910);
  }
}

void perfilsel_desenhar(Uint32 agora) {
  int i, m = perfis_n(), total = m + temAdicionar(m);
  float d, vao, largura, x, subida, a;
  const char *marca = extras_caminho_marca_nome("better_nuvio");
  GLuint logo;
  (void)agora;

  desenhaFundo();
  if (infoAdicionar) { desenhaEditor(); return; }
  subida = (1.0f - animEntrada) * 20.0f;
  a = animEntrada;

  logo = tex_obter_larg(marca, PS_MARCA_W);
  if (logo) gfx_rect((GfxRect){ PS_MARCA_X, PS_MARCA_Y + subida,
                               PS_MARCA_W, PS_MARCA_H }, logo,
                     GFX_TEXTO, 0, 0, 0, 0, 1, 1, 1, a);
  {
    const char *s = "BETTER";
    // A referencia alinha BETTER ao inicio do wordmark, nao ao centro dele.
    // O espacamento acompanha a proporcao da marca transparente do pacote.
    txt_tracking(TXT_CAPTION, s, 252, 249, 246,
                 PS_MARCA_X + PS_MARCA_W * 0.355f,
                 PS_MARCA_Y + 7.0f + subida, a, 22.0f);
  }

  { const char *titulo = modoGerenciar ? "Gerenciar Perfis" : "Quem está assistindo?";
    TxtLinha t = txt_linha(TXT_COND_TITULO1, titulo, 255, 255, 255, 255);
    txt_desenhar_alpha(t, (NV_TELA_W - t.w) * 0.5f,
                       PS_TITULO_Y + subida, a); }
  { TxtLinha t = txt_linha(TXT_COND_HEADLINE,
                           modoGerenciar ? "Selecione para editar, configurar PIN ou adicionar."
                                         : "Selecione um perfil para continuar.",
                           177, 170, 169, 255);
    txt_desenhar_alpha(t, (NV_TELA_W - t.w) * 0.5f, PS_SUB_Y + subida, a); }

  if (m == 0) {
    const char *msg = sync_estado() == SYNC_FALHOU
      ? "Não foi possível carregar os perfis. OK: tentar novamente"
      : (sync_estado() == SYNC_PRONTO ? "Nenhum perfil encontrado nesta conta."
                                        : "Carregando os perfis da sua conta…");
    TxtLinha e = txt_linha(TXT_COND_CALLOUT, msg, 190, 180, 179, 255);
    txt_desenhar_alpha(e, (NV_TELA_W - e.w) * 0.5f, 570 + subida, a);
  } else {
    d = diametro(total);
    vao = vaoDe(total, d);
    largura = (float)total * d + (float)(total - 1) * vao;
    x = (NV_TELA_W - largura) * 0.5f;
    for (i = 0; i < total; i++) {
      const ContaPerfil *p = i < m ? perfis_item(i) : NULL;
      float f = animFoco[i], cx = x + (float)i * (d + vao) + d * 0.5f;
      float tamanho = d + 12.0f * f;
      float y = PS_FILA_Y + subida - 6.0f * f;
      GfxRect anel = { cx - tamanho * 0.5f, y, tamanho, tamanho };
      GfxRect av = { anel.x + 17, anel.y + 17, anel.w - 34, anel.h - 34 };
      TxtLinha nome;
      const char *rotulo = p ? p->nome : "Adicionar Perfil";
      int cor = p ? (int)(178 + 77 * f) : (int)(130 + 125 * f);

      gfx_cor(anel, 0.5f, 0.15f, 0.11f, 0.11f, 0.55f * a);
      gfx_anel(anel, 0.5f, f > 0.01f ? 5.0f : 2.0f,
               f > 0.01f ? 1.0f : 0.27f,
               f > 0.01f ? 0.78f : 0.23f,
               f > 0.01f ? 0.29f : 0.22f, a);
      if (p) {
        disco(av, p, f, a, i == foco && pinDe < 0);
        if (p->primario) {
          GfxRect selo = { anel.x + anel.w - 39, anel.y + anel.h - 39, 48, 48 };
          TxtLinha estrela = txt_linha(TXT_BODY, "★", 255, 255, 255, 255);
          gfx_rect(selo, 0, GFX_DISCO, 0, 0, 0, 0, 1.0f, 0.69f, 0.0f, a);
          gfx_anel_fora(selo, 0.5f, 0, 3, 0.12f, 0.08f, 0.07f, a);
          txt_desenhar_alpha(estrela, selo.x + (selo.w - estrela.w) * 0.5f,
                             selo.y + (selo.h - estrela.h) * 0.5f, a);
        }
      } else {
        const float ladoMais = 50.0f, tracoMais = 6.0f;
        float meioY = anel.y + tamanho * 0.5f;
        float cr = 0.53f + 0.42f * f;
        float cg = 0.49f + 0.46f * f;
        float cb = 0.48f + 0.47f * f;
        gfx_rect(av, 0, GFX_DISCO, 0, 0, 0, 0,
                 0.24f, 0.19f, 0.18f, (0.42f + f * 0.24f) * a);
        gfx_cor((GfxRect){ cx - ladoMais*.5f, meioY - tracoMais*.5f,
                            ladoMais, tracoMais },
                0.5f, cr, cg, cb, a);
        // gfx_cor mede o raio como fracao da ALTURA. Na barra vertical, 0.5
        // criava uma capsula de raio 25px numa largura de 6px: o miolo virava
        // o losango visto na TV. Ambas as barras agora tem raio de 3px.
        gfx_cor((GfxRect){ cx - tracoMais*.5f, meioY - ladoMais*.5f,
                            tracoMais, ladoMais },
                tracoMais/(2.0f*ladoMais), cr, cg, cb, a);
      }

      nome = txt_linha_corta(total >= 6 ? TXT_COND_DET_BOTAO : TXT_COND_HEADLINE, rotulo,
                             cor, cor, cor, 255, d + vao * 0.65f);
      txt_desenhar_alpha(nome, cx - nome.w * 0.5f,
                         PS_FILA_Y + d + PS_NOME_GAP + subida, a);
      if (p && p->primario) {
        const char *s = "PRINCIPAL";
        float w = txt_tracking(TXT_COND_CAPTION, s, 255, 179, 0, -1, 0, 0, 1.7f);
        txt_tracking(TXT_COND_CAPTION, s, 255, 179, 0, cx - w * 0.5f,
                     PS_FILA_Y + d + 80 + subida, a, 1.7f);
      } else if (p && p->temPin) {
        TxtLinha pinTxt = txt_linha(TXT_COND_CAPTION, "PIN", 180, 175, 174, 255);
        txt_desenhar_alpha(pinTxt, cx - pinTxt.w * 0.5f,
                           PS_FILA_Y + d + 80 + subida, a);
      }
    }
  }

  { const char *s = foco == m && temAdicionar(m)
      ? "Adicione perfis no Better Nuvio"
      : (modoGerenciar ? "Selecione um perfil para gerenciar." :
                         "Selecione um perfil para continuar.");
    TxtLinha l = txt_linha(TXT_COND_CALLOUT, s, 142, 135, 133, 255);
    txt_desenhar_alpha(l, (NV_TELA_W - l.w) * 0.5f, PS_DICA_Y, a); }

  if (opcoesPerfil) desenhaOpcoes();
  if (animPin > 0.004f) desenhaPin();
}

#ifdef NV_PERFILSEL_TEST
void perfilsel_teste_estado(PerfilSelTesteEstado *e) {
  int i;
  if (!e) return;
  memset(e, 0, sizeof *e);
  for (i = 0; i <= CONTA_PERFIL_MAX; i++) e->foco[i] = animFoco[i];
  e->pin = animPin;
  e->info_adicionar = infoAdicionar;
  e->opcoes_perfil = opcoesPerfil;
}
#endif

int perfilsel_concluido(void) { return concluido; }
