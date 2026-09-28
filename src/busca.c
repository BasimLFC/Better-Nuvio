// Busca para TV: teclado compacto e uniforme à esquerda, recomendações em
// grade à direita quando a consulta está vazia. O teclado próprio é necessário
// porque a versão SDL não abre um teclado do sistema.
#include "busca.h"
#include "idioma.h"
#include "gfx.h"
#include "text.h"
#include "tex_cache.h"
#include "focus.h"
#include "teclado.h"
#include "anim.h"
#include "revela.h"
#include "layout.h"
#include "ajustes.h"
#include "catalogo.h"
#include "descoberta.h"
#include "discover.h"
#include "buscasrec.h"
#include "botoes.h"
#include "ponteiro.h"
#include <string.h>
#include <stdio.h>

// Cabeçalho da busca na mesma coluna do teclado.
#define BU_HEAD_Y     190.0f
#define BU_HEAD_H      66.0f
#define BU_DIR       (NV_TELA_W - NV_CONTENT_PAD)   // 1816
#define BU_CAMPO_PADX 28.0f

// --- Teclado (divergencia deliberada; ver o topo) ----------------------------
#define BU_TECLA_W     70.0f
#define BU_TECLA_H     56.0f
#define BU_TECLA_GAP    5.0f
#define BU_KB_COLS      6
#define BU_KB_FILEIRAS  7            // espaço/apagar/limpar + 6 fileiras de letras
#define BU_KB_PASSO   (BU_TECLA_H + BU_TECLA_GAP)
#define BU_KB_W       (BU_KB_COLS * BU_TECLA_W + (BU_KB_COLS - 1) * BU_TECLA_GAP)
#define BU_KB_Y       280.0f
// Crescimento da tecla em foco. Menor que o do poster de proposito: a tecla e
// pequena e vizinha imediata das outras, e com 14% ela invade o gap de 12px.
#define BU_TECLA_ESCALA 0.015f
#define BU_TECLA_RAIO   0.08f
#define BU_MAX_CONSULTA 48

// --- Fileiras de resultado (geometria do web) --------------------------------
#define BU_RES_X       (BU_KB_X + BU_KB_W + 50.0f)
#define BU_RES_Y       280.0f
#define BU_RES_AREA_H  (NV_TELA_H - NV_MARGEM_Y - BU_RES_Y)
// 32 fixas, e nao FOCUS_MAX_FILEIRAS: aquele teto subiu para a grade da
// Biblioteca caber inteira, e a busca nao precisa de mais fileiras por isso.
#define BU_MAX_FILEIRAS 32
#define BU_MAX_POR_FIL  12

// O teclado (e tudo a direita dele, que sai de BU_KB_X) parte do mesmo x da
// home: 104 recolhida, 248 com a rail fixa. Era NV_CONTENT_PAD cravado, e com a
// rail presa a primeira coluna de teclas ficava embaixo dela (26/09). As
// fileiras de resultado so perdem largura — elas ja rolam na horizontal.
#define BU_KB_X        ajustes_conteudo_x()

// --- Buscas recentes (campo vazio; regras em buscasrec.h) ---------------------
// Pilulas de 56 (a altura do SECUNDARIO de botoes.h e das pilulas da Biblioteca)
// com o corpo TXT_DET_BOTAO 25/500 dos botoes: a 3 m e o menor corpo que este
// app usa em controle, e o termo e um controle, nao legenda. Correm em LINHAS
// que quebram na borda direita (BU_DIR), porque dez termos de tamanho livre nao
// cabem numa fileira rolavel sem esconder o "Limpar" no fim.
//   titulo "Buscas recentes" TXT_TITULO3 em BU_RES_Y (o topo das fileiras de
//   resultado, entao a tela nao pula quando a primeira letra entra);
//   pilulas a partir de +84, passo vertical 56 + 20, gap horizontal 16.
#define BU_REC_Y       (BU_RES_Y + 84.0f)
#define BU_REC_H       BOTAO_H_SECUNDARIO
#define BU_REC_PADX    BOTAO_PAD_X2
#define BU_REC_GAP     BOTAO_GAP
#define BU_REC_LINHA   (BU_REC_H + 20.0f)
#define BU_REC_ITENS   (BUSCASREC_MAX + 1)   // termos + "Limpar"

// --- Estado ------------------------------------------------------------------
static Foco  focoKb;
static Foco  focoRes;
// 0 = teclado, 1 = resultados, 2 = buscas recentes, 3 = Descobrir, 4 = atalhos.
static int   painel = 0;
static int   focoAtalho = 0;
static const char *atalhosBusca[] = {
  "Para você", "Séries", "Comédias", "Ação", "Terror", "Documentários"
};
#define BU_ATALHOS_N ((int)(sizeof atalhosBusca / sizeof atalhosBusca[0]))
static char  consulta[BU_MAX_CONSULTA];
static int   nConsulta = 0;
static char consultaFiltrada[BU_MAX_CONSULTA];
// Resultados agrupados por CATALOGO, como no web: uma fileira por catalogo que
// teve pelo menos um titulo casando. Guardamos indices do catalogo global.
static struct {
  const char *titulo;      // nome do catalogo ("Top 100 Today - Filme")
  const char *origem;      // "from <addon>"; vazio quando nao se sabe
  int itens[BU_MAX_POR_FIL];
  int n;
} fil[BU_MAX_FILEIRAS];
static int nFil = 0;
static int sair = 0;
static int pedido = -1;             // indice de catalogo escolhido, -1 = nenhum
static float animTecla[BU_KB_FILEIRAS][BU_KB_COLS];
static float animRes[BU_MAX_FILEIRAS][BU_MAX_POR_FIL];
// O pôster só pede o backdrop grande depois que o foco repousa. Ao trocar de
// resultado, fecha imediatamente para não exibir a arte do título anterior.
static int expFileira = -1, expColuna = -1, expItem = -1;
static Uint32 expDesde;
static float expAbre;
// Arte chegando e luz do foco, as mesmas da home (revela.h).
static RevelaArte  revRes[BU_MAX_FILEIRAS][BU_MAX_POR_FIL];
static RevelaVarre revVarre = { -1, 0, 0 };
static float scrollY = 0.0f, scrollAlvo = 0.0f;
static float scrollX[BU_MAX_FILEIRAS];
// Velocidade da mola de 2a ordem da rolagem (anim_mola2): partida macia e
// cauda exponencial, a MESMA curva que a home mede. A de 1a ordem que estava
// aqui partia na velocidade maxima e o primeiro quadro ja saltava 12%.
static float velY = 0.0f, velX[BU_MAX_FILEIRAS];
static float animCampo = 0.0f;
static HomeItem itemFoco;
static int   temItemFoco = 0;
static GfxRect rectRes[BU_MAX_FILEIRAS][BU_MAX_POR_FIL];

// Buscas recentes. focoRec vai de 0 a n (n = o "Limpar"). recRect/recLin sao
// preenchidos pelo DESENHO (a largura de cada pilula depende do texto
// rasterizado) e lidos pela navegacao: cima/baixo procuram a pilula de x mais
// proximo na linha vizinha, e isso so se sabe com a geometria real.
static int     focoRec = 0;
static float   animRec[BU_REC_ITENS];
static GfxRect recRect[BU_REC_ITENS];
static int     recLin[BU_REC_ITENS];
static int     nRecLayout = 0;
// Pressao longa na pilula: o tempo corre do KEYDOWN e a remocao DISPARA em
// busca_atualizar ao cruzar NV_HOLD_MS, com o dedo ainda no botao — como no
// guia (guia.c). Esperar o KEYUP deixaria o dono segurando sem saber se ja
// pode soltar. okLongo faz o KEYUP daquela pressao nao virar tambem um OK
// curto.
static int     okPress = 0, okLongo = 0;
static Uint32  okDesde = 0;

static const int KB_COLUNAS[BU_KB_FILEIRAS] = { 3, 6, 6, 6, 6, 6, 6 };
// Minusculas como no aparelho: o campo mostra o que foi digitado, e uma consulta
// em caixa alta le como grito. A comparacao ignora caixa de qualquer forma.
//
// O ALFABETO MORA EM teclado.c desde que a modal de digitacao existe. Ele
// estava escrito aqui, e este arquivo era a referencia que o servidor de
// recomendacoes cita para dizer que o codigo de pareamento e `a-z0-9`
// (servidor/recomendacoes/src/index.js) — com duas copias, a segunda a ganhar
// uma letra deixaria um codigo indigitavel numa das duas telas.
#define TECLAS (teclado_alfabeto())   // 36 = 6 fileiras x 6 colunas

// --- Normalizacao ------------------------------------------------------------
// Dobra uma letra latina acentuada (segundo byte de uma sequencia UTF-8 iniciada
// por 0xC3) na letra ASCII correspondente. Sem isto, buscar "fundacao" nao acha
// "Fundação" — o caso de uso mais obvio da tela, ja que ninguem digita cedilha
// num teclado de D-pad.
static char dobraLatina(unsigned char segundo) {
  unsigned cp = (unsigned)segundo + 0x40u;
  if (cp >= 0xC0 && cp <= 0xDE && cp != 0xD7) cp += 0x20;
  if (cp >= 0xE0 && cp <= 0xE6) return 'a';
  if (cp == 0xE7)               return 'c';
  if (cp >= 0xE8 && cp <= 0xEB) return 'e';
  if (cp >= 0xEC && cp <= 0xEF) return 'i';
  if (cp == 0xF0)               return 'd';
  if (cp == 0xF1)               return 'n';
  if ((cp >= 0xF2 && cp <= 0xF6) || cp == 0xF8) return 'o';
  if (cp >= 0xF9 && cp <= 0xFC) return 'u';
  if (cp == 0xFD || cp == 0xFF) return 'y';
  return ' ';
}

static void normalizar(const char *s, char *destino, size_t tam) {
  size_t k = 0;
  const unsigned char *p = (const unsigned char *)s;
  while (*p && k + 1 < tam) {
    unsigned char c = *p++;
    char saida;
    if (c < 0x80) {
      saida = (c >= 'A' && c <= 'Z') ? (char)(c + 32) : (char)c;
    } else if (c == 0xC3 && *p) {
      saida = dobraLatina(*p++);
    } else {
      while ((*p & 0xC0) == 0x80) p++;
      saida = ' ';
    }
    destino[k++] = saida;
  }
  destino[k] = 0;
}

// --- Filtro ------------------------------------------------------------------
// Uma fileira por CATALOGO, exatamente como o web monta `.search-results-row`.
// Antes isto era uma lista plana do acervo inteiro, o que perdia a informacao de
// ONDE cada resultado foi achado — e e essa informacao que o subtitulo "from
// <addon>" mostra.
static void refiltrar(void) {
  char alvo[BU_MAX_CONSULTA * 2];
  int anterior = -1, mesmaConsulta = !strcmp(consultaFiltrada, consulta);
  if (mesmaConsulta && painel == 1 && focoRes.fileira < nFil &&
      focoRes.coluna < fil[focoRes.fileira].n)
    anterior = fil[focoRes.fileira].itens[focoRes.coluna];
  snprintf(consultaFiltrada, sizeof consultaFiltrada, "%s", consulta);
  normalizar(consulta, alvo, sizeof alvo);
  nFil = 0;
  // Menos de 2 caracteres = estado vazio, como o web ("Digite ao menos 2
  // caracteres"). Buscar com uma letra devolve o acervo inteiro e nao ajuda.
  // So derruba o painel de RESULTADOS: o de buscas recentes vive justamente
  // com o campo vazio.
  if ((int)strlen(alvo) < 2) { if (painel == 1) painel = 0; return; }

  // BUSCA NA REDE. A tela so filtrava o que ja estava em memoria — as ~12
  // primeiras linhas de cada catalogo da home — entao qualquer titulo fora
  // disso simplesmente nao existia para a busca. Dispara e volta na hora; o
  // resultado aparece sozinho quando chegar, porque refiltrar roda a cada
  // tecla e desc_busca_n so responde para o termo corrente.
  desc_buscar(alvo);

  // UMA FILEIRA POR CATALOGO CONSULTADO, com a origem embaixo — igual ao web,
  // que monta uma `.search-results-row` por catalogo em vez de uma lista unica.
  //
  // Antes so o Cinemeta era consultado e tudo caia numa fileira "Resultados da
  // busca". Com dez alvos numa lista so o dono nao tinha como saber de onde
  // veio nada, e os resultados do addon lento pareciam nunca chegar (chegavam;
  // ficavam no fim de uma fileira de 12 que ja estava cheia de Cinemeta).
  //
  // Os itens entram no catalogo global via cat_acrescentar_lote porque a tela
  // abre titulo por INDICE de catalogo — um resultado que vivesse so aqui nao
  // seria abrivel.
  { int alvoIdx, nAlvos = desc_busca_n_alvos();
    for (alvoIdx = 0; alvoIdx < nAlvos && nFil < BU_MAX_FILEIRAS; alvoIdx++) {
      int nRem = desc_busca_alvo_n(alvoIdx, alvo), i;
      // DOIS PASSOS, e a separacao e o conserto: primeiro junta os que ainda
      // NAO estao no catalogo, depois acrescenta TODOS numa troca de bloco so.
      //
      // Antes era cat_acrescentar por resultado, e cada chamada copia o
      // catalogo inteiro: com 300 titulos, ~2,3 MB por copia, ate 40 vezes, no
      // fio de DESENHO, a cada tecla digitada. A busca engasgava por isso.
      CatItem novos[BU_MAX_POR_FIL];
      int idxNovos[BU_MAX_POR_FIL];
      int achou = 0, nNovos = 0;
      int posNovo[BU_MAX_POR_FIL];   // onde cada novo entra em fil[].itens
      if (nRem <= 0) continue;
      for (i = 0; i < nRem && achou < BU_MAX_POR_FIL; i++) {
        CatItem it;
        int idx;
        if (!desc_busca_alvo_item(alvoIdx, i, &it)) continue;
        // Ja esta no catalogo? Reaproveita o indice em vez de duplicar o card.
        idx = it.imdb[0] ? cat_indice_por_imdb(it.imdb) : -1;
        if (idx >= 0) {
          fil[nFil].itens[achou++] = idx;
        } else if (nNovos < BU_MAX_POR_FIL) {
          novos[nNovos] = it;
          posNovo[nNovos] = achou++;   // reserva o lugar; o indice vem depois
          nNovos++;
        }
      }
      if (nNovos > 0) {
        int entraram = cat_acrescentar_lote(novos, nNovos, idxNovos);
        for (i = 0; i < nNovos; i++)
          fil[nFil].itens[posNovo[i]] = (i < entraram) ? idxNovos[i] : -1;
        // O que nao coube (catalogo no teto) vira -1 e e COMPACTADO para fora.
        // So diminuir a contagem deixaria buracos no MEIO da fileira, e o card
        // do buraco apontaria para o item errado — pior que faltar um card.
        if (entraram < nNovos) {
          int r = 0, w = 0;
          for (r = 0; r < achou; r++)
            if (fil[nFil].itens[r] >= 0) fil[nFil].itens[w++] = fil[nFil].itens[r];
          achou = w;
        }
      }
      if (achou > 0) {
        fil[nFil].titulo = desc_busca_alvo_titulo(alvoIdx);
        fil[nFil].origem = desc_busca_alvo_addon(alvoIdx);
        fil[nFil].n = achou;
        nFil++;
      }
    } }

  // A busca consulta os catalogos pesquisaveis do addon. Filtrar as fileiras
  // ja carregadas da Home acrescentava "Continuar assistindo" e outras linhas
  // locais antes da resposta, escondendo a separacao Filme/Serie do manifesto.

  int cols[BU_MAX_FILEIRAS];
  for (int i = 0; i < nFil; i++) cols[i] = fil[i].n;
  focus_iniciar(&focoRes, nFil > 0 ? nFil : 1, nFil > 0 ? cols : (int[]){ 1 });
  if (anterior >= 0) {
    int encontrado = 0;
    for (int r = 0; r < nFil && !encontrado; r++)
      for (int c = 0; c < fil[r].n; c++)
        if (fil[r].itens[c] == anterior) {
          focoRes.fileira = r; focoRes.coluna = c;
          focoRes.colunaLembrada[r] = c;
          encontrado = 1; break;
        }
  }
  if (nFil == 0) painel = 0;
  if (painel != 1 || focoRes.fileira >= nFil ||
      focoRes.coluna >= fil[focoRes.fileira].n ||
      fil[focoRes.fileira].itens[focoRes.coluna] != expItem) {
    expFileira = expColuna = expItem = -1;
    expDesde = 0; expAbre = 0;
  }
  memset(animRes, 0, sizeof animRes); memset(revRes, 0, sizeof revRes);
  if (!mesmaConsulta) {
    memset(scrollX, 0, sizeof scrollX); memset(velX, 0, sizeof velX);
    scrollY = scrollAlvo = 0.0f; velY = 0.0f;
  }
}

// --- Buscas recentes --------------------------------------------------------
// QUANDO UMA BUSCA CONTA COMO FEITA. Nao a cada letra: refiltrar roda por
// tecla, e gravar ali encheria a lista de "ma", "mat", "matr". Conta quando o
// dono DEMONSTRA que a busca serviu — entrou nos resultados, abriu um titulo,
// saiu da tela ou apagou o campo com resultado na tela (viu e desistiu; o que
// viu ainda e o que ele buscou), ou refez pela pilula. O limite de 2
// caracteres e o dedupe ficam em buscasrec.c.
static void registrarConsulta(void) {
  if (nConsulta >= 2 && nFil > 0) buscasrec_registrar(consulta);
}

static int recentesVisiveis(void) { return nConsulta == 0 && buscasrec_n() > 0; }

static void recentesAjustarFoco(void) {
  int n = buscasrec_n();
  if (focoRec > n) focoRec = n;
  if (focoRec < 0) focoRec = 0;
  if (n == 0 && painel == 2) painel = 0;
}

// Entrar na lista vindo do teclado: a pilula da linha mais proxima, na altura,
// da tecla em foco — a mesma continuidade que a ponte teclado->resultados tem.
// Sem geometria ainda (primeiro quadro), a primeira pilula.
static void recentesEntrar(void) {
  float ky = BU_KB_Y + focoKb.fileira * BU_KB_PASSO + BU_TECLA_H * 0.5f;
  float melhor = 1e9f;
  int i;
  painel = 2;
  focoRec = 0;
  for (i = 0; i < nRecLayout; i++) {
    float d = recRect[i].y + recRect[i].h * 0.5f - ky;
    if (d < 0) d = -d;
    if (d < melhor - 0.5f) { melhor = d; focoRec = i; }
  }
  recentesAjustarFoco();
}

// Cima/baixo: a pilula da linha vizinha cujo CENTRO em x esta mais perto.
static void recentesVertical(int dy) {
  int alvoLin, i, melhorI = -1;
  float cx, melhor = 1e9f;
  if (focoRec >= nRecLayout) return;
  alvoLin = recLin[focoRec] + dy;
  cx = recRect[focoRec].x + recRect[focoRec].w * 0.5f;
  for (i = 0; i < nRecLayout; i++) {
    float d;
    if (recLin[i] != alvoLin) continue;
    d = recRect[i].x + recRect[i].w * 0.5f - cx;
    if (d < 0) d = -d;
    if (d < melhor) { melhor = d; melhorI = i; }
  }
  if (melhorI >= 0) focoRec = melhorI;
}

// OK curto: refaz a busca com o termo (e ele sobe para o topo), ou, no
// "Limpar", apaga tudo. O foco volta ao TECLADO depois de refazer: os
// resultados chegam da rede em seguida e a ponte -> e a mesma de sempre;
// deixar o foco numa lista que acabou de sumir o poria em lugar nenhum.
static void recentesAcionar(void) {
  int n = buscasrec_n();
  if (focoRec >= n) { buscasrec_limpar(); recentesAjustarFoco(); return; }
  snprintf(consulta, sizeof consulta, "%s", buscasrec_termo(focoRec));
  nConsulta = (int)strlen(consulta);
  buscasrec_registrar(consulta);
  painel = 0;
  refiltrar();
}

// Pressao longa: remove o termo em foco; no "Limpar", o mesmo que o OK curto.
static void recentesRemover(void) {
  if (focoRec >= buscasrec_n()) buscasrec_limpar();
  else buscasrec_remover(focoRec);
  recentesAjustarFoco();
}

// --- Teclas ------------------------------------------------------------------
static void aplicarTecla(void) {
  if (focoKb.fileira > 0) {
    int k = (focoKb.fileira - 1) * BU_KB_COLS + focoKb.coluna;
    if (nConsulta + 1 < BU_MAX_CONSULTA) consulta[nConsulta++] = TECLAS[k];
  } else if (focoKb.coluna == 0) {
    // espaco no comeco nao entra: nao muda o filtro e so acumula lixo no campo
    if (nConsulta > 0 && nConsulta + 1 < BU_MAX_CONSULTA) consulta[nConsulta++] = ' ';
  } else if (focoKb.coluna == 1) {
    if (nConsulta > 0) nConsulta--;
  } else {
    registrarConsulta();
    nConsulta = 0;
  }
  consulta[nConsulta] = 0;
  refiltrar();
}

static GfxRect retanguloTecla(int fileira, int coluna) {
  GfxRect r;
  r.y = BU_KB_Y + fileira * BU_KB_PASSO;
  r.h = BU_TECLA_H;
  if (fileira > 0) {
    r.x = BU_KB_X + coluna * (BU_TECLA_W + BU_TECLA_GAP);
    r.w = BU_TECLA_W;
  } else {
    r.w = (BU_KB_W - 2 * BU_TECLA_GAP) / 3;
    r.x = BU_KB_X + coluna * (r.w + BU_TECLA_GAP);
  }
  return r;
}

// --- Ciclo de vida -----------------------------------------------------------
int busca_iniciar(void) {
  focus_iniciar(&focoKb, BU_KB_FILEIRAS, KB_COLUNAS);
  focoKb.fileira = 1;
  discover_iniciar();
  painel = 0; sair = 0; pedido = -1;
  focoAtalho = 0;
  nConsulta = 0; consulta[0] = 0;
  consultaFiltrada[0] = 0;
  scrollY = scrollAlvo = 0.0f; velY = 0.0f;
  animCampo = 0.0f;
  temItemFoco = 0;
  expFileira = expColuna = expItem = -1; expDesde = 0; expAbre = 0;
  memset(animTecla, 0, sizeof animTecla);
  memset(animRes, 0, sizeof animRes); memset(revRes, 0, sizeof revRes);
  memset(scrollX, 0, sizeof scrollX); memset(velX, 0, sizeof velX);
  memset(animRec, 0, sizeof animRec);
  focoRec = 0; nRecLayout = 0;
  okPress = okLongo = 0; okDesde = 0;
  refiltrar();
  return 1;
}

void busca_encerrar(void) { temItemFoco = 0; }
int  busca_quer_sair(void) { int v = sair; sair = 0; return v; }

int busca_pediu_abrir(int *indiceCatalogo) {
  if (discover_pediu_abrir(indiceCatalogo)) return 1;
  if (pedido < 0) return 0;
  if (indiceCatalogo) *indiceCatalogo = pedido;
  pedido = -1;
  return 1;
}

int busca_item_focado(HomeItem *out) {
  if (painel == 3 || !temItemFoco || !out) return 0;
  *out = itemFoco;
  return 1;
}

// O Magic Remote muda o foco no evento de mouse, antes do proximo desenho.
// Atualizar tambem o HomeItem aqui evita que o OK abra o card que estava
// selecionado no quadro anterior quando o usuario clica em outro cartaz.
static void ponteiroResultadoFocar(int r, int c) {
  const CatItem *ci;
  int idx;
  if (r < 0 || r >= nFil || c < 0 || c >= fil[r].n) return;
  idx = fil[r].itens[c];
  ci = cat_item(idx);
  if (!ci) return;
  painel = 1;
  focoRes.fileira = r;
  focoRes.coluna = c;
  focoRes.colunaLembrada[r] = c;
  itemFoco.indice = idx;
  itemFoco.rect = rectRes[r][c];
  itemFoco.arte = ci->backdrop[0] ? ci->backdrop : ci->poster;
  itemFoco.titulo = ci->titulo;
  itemFoco.genero = ci->genero;
  itemFoco.meta = ci->meta;
  temItemFoco = 1;
}

void busca_evento(const SDL_Event *e) {
  if (e->type == SDL_QUIT) { sair = 1; return; }
  SDL_Keycode k = e->key.keysym.sym;

  // OK NA PILULA DECIDE NA SOLTURA: so ali se sabe se foi toque ou pressao
  // longa. KEYUP sem KEYDOWN visto aqui nao e clique (a barra superior decide no
  // KEYDOWN e o KEYUP do mesmo toque cai nesta tela — o issue #8 da home).
  if ((k == SDLK_RETURN || k == SDLK_KP_ENTER) && painel == 2) {
    if (e->type == SDL_KEYDOWN) {
      if (!okPress) { okPress = 1; okLongo = 0; okDesde = SDL_GetTicks(); }
    } else if (e->type == SDL_KEYUP && okPress) {
      Uint32 dur = SDL_GetTicks() - okDesde;
      okPress = 0; okDesde = 0;
      if (okLongo) okLongo = 0;
      else if (dur >= NV_HOLD_MS) recentesRemover();
      else recentesAcionar();
    }
    return;
  }
  if (e->type == SDL_KEYUP && (k == SDLK_RETURN || k == SDLK_KP_ENTER)) {
    okPress = 0; okLongo = 0; okDesde = 0;
  }
  if (e->type != SDL_KEYDOWN) return;

  if (painel == 4) {
    if (!(e->key.keysym.mod & (KMOD_CTRL | KMOD_ALT | KMOD_GUI)) &&
        ((k >= SDLK_a && k <= SDLK_z) || (k >= SDLK_0 && k <= SDLK_9)))
      painel = 0;
    else {
      if (k == SDLK_ESCAPE || k == SDLK_AC_BACK || k == SDLK_BACKSPACE)
        painel = 0;
      else if (k == SDLK_UP) {
        if (focoAtalho > 0) focoAtalho--;
        else painel = 0;
      } else if (k == SDLK_DOWN && focoAtalho + 1 < BU_ATALHOS_N) focoAtalho++;
      else if (k == SDLK_LEFT) painel = 0;
      else if (k == SDLK_RIGHT) painel = 3;
      else if (k == SDLK_RETURN || k == SDLK_KP_ENTER) {
        discover_atalho(focoAtalho);
        painel = 3;
      }
      return;
    }
  }

  if (painel == 3 && (k == SDLK_AC_BACK || k == SDLK_ESCAPE ||
                      k == SDLK_BACKSPACE)) {
    discover_evento(e);
    if (discover_quer_sair()) painel = 0;
    return;
  }

  if (k == SDLK_BACKSPACE && painel == 0) {
    if (nConsulta > 0) { consulta[--nConsulta] = 0; refiltrar(); }
    return;
  }
  if (k == SDLK_AC_BACK || k == SDLK_ESCAPE || k == SDLK_BACKSPACE) {
    // Nos resultados, o Back volta ao teclado: e o movimento inverso do que
    // levou ate la. So do teclado ele fecha a tela.
    if (painel != 0) painel = 0;
    else { registrarConsulta(); sair = 1; }
    return;
  }

  if (painel == 2) {
    // Letra do teclado FISICO com o foco nas pilulas: vai para o teclado da
    // tela e digita — o dono comecou uma busca nova, nao quer escolher pilula.
    if (!(e->key.keysym.mod & (KMOD_CTRL | KMOD_ALT | KMOD_GUI)) &&
        ((k >= SDLK_a && k <= SDLK_z) || (k >= SDLK_0 && k <= SDLK_9))) {
      painel = 0;
    } else {
      switch (k) {
        case SDLK_TAB: painel = 0; break;
        case SDLK_LEFT:
          // Primeira pilula da LINHA devolve ao teclado, como a primeira coluna
          // dos resultados. Nas outras, anda para a anterior.
          if (focoRec == 0 || focoRec >= nRecLayout || focoRec - 1 >= nRecLayout ||
              recLin[focoRec - 1] != recLin[focoRec]) painel = 0;
          else focoRec--;
          break;
        case SDLK_RIGHT:
          // Fim da linha para: pular para a linha de baixo pela direita
          // desencontra do ESQUERDA, que no comeco da linha volta ao teclado.
          if (focoRec + 1 < nRecLayout && recLin[focoRec + 1] == recLin[focoRec])
            focoRec++;
          break;
        case SDLK_UP:
          if (recLin[focoRec] == 0) sair = 1;
          else recentesVertical(-1);
          break;
        case SDLK_DOWN: recentesVertical(1);  break;
        default: break;
      }
      return;
    }
  }

  if (painel == 3) {
    // Quem começa a digitar no teclado físico volta à busca no mesmo toque.
    if (!(e->key.keysym.mod & (KMOD_CTRL | KMOD_ALT | KMOD_GUI)) &&
        ((k >= SDLK_a && k <= SDLK_z) || (k >= SDLK_0 && k <= SDLK_9) ||
         k == SDLK_SPACE)) { discover_ocultar(); painel = 0; }
    else {
      discover_evento(e);
      if (discover_quer_sair()) {
        if (k == SDLK_UP && recentesVisiveis()) recentesEntrar();
        else painel = 0;
      }
      return;
    }
  }

  if (painel == 0) {
    if (!(e->key.keysym.mod & (KMOD_CTRL | KMOD_ALT | KMOD_GUI)) &&
        ((k >= SDLK_a && k <= SDLK_z) || (k >= SDLK_0 && k <= SDLK_9) || k == SDLK_SPACE)) {
      if (nConsulta + 1 < BU_MAX_CONSULTA && (k != SDLK_SPACE || nConsulta)) {
        consulta[nConsulta++] = (char)k; consulta[nConsulta] = 0; refiltrar();
      }
      return;
    }
    if (k == SDLK_TAB && nFil > 0) { registrarConsulta(); painel = 1; return; }
    if (k == SDLK_TAB && recentesVisiveis()) { recentesEntrar(); return; }
    if (k == SDLK_TAB && nConsulta == 0) { painel = 3; return; }
    switch (k) {
      case SDLK_LEFT:
        // Na borda da grade, esquerda permanece na Busca. O menu fica acima.
        (void)focus_mover_grade(&focoKb, -1, 0);
        break;
      case SDLK_RIGHT:
        // Passar da ULTIMA coluna do teclado entra nos resultados. E a unica
        // ponte entre os dois paineis, e por isso ela nao pode falhar em
        // silencio: sem resultado nenhum, o foco fica onde esta.
        // Com o campo vazio a ponte leva ao Descobrir integrado.
        if (focoKb.coluna >= KB_COLUNAS[focoKb.fileira] - 1) {
          if (nFil > 0) { registrarConsulta(); painel = 1; }
          else if (nConsulta == 0) painel = 3;
        } else focus_mover_grade(&focoKb, 1, 0);
        break;
      // GRADE, e nao fileiras: ver focus_mover_grade. Era daqui que saia o
      // salto para uma letra aleatoria ao subir ou descer no teclado.
      case SDLK_UP:
        if (focoKb.fileira == 0) sair = 1;
        else focus_mover_grade(&focoKb, 0, -1);
        break;
      case SDLK_DOWN:
        if (focoKb.fileira == BU_KB_FILEIRAS - 1 && nConsulta == 0) {
          painel = 4; focoAtalho = 0;
        } else focus_mover_grade(&focoKb, 0, 1);
        break;
      case SDLK_RETURN: case SDLK_KP_ENTER: aplicarTecla(); break;
      default: break;
    }
    return;
  }

  switch (k) {
    case SDLK_TAB: painel = 0; break;
    case SDLK_LEFT:
      // Voltar da primeira coluna dos resultados devolve o foco ao teclado.
      if (focoRes.coluna == 0) painel = 0;
      else focus_mover(&focoRes, -1, 0);
      break;
    case SDLK_RIGHT:
      // Na busca, cada toque deve selecionar o proximo titulo visivel.
      focus_mover(&focoRes, 1, 0);
      break;
    case SDLK_UP:
      if (focoRes.fileira == 0) sair = 1;
      else focus_mover(&focoRes, 0, -1);
      break;
    case SDLK_DOWN: focus_mover(&focoRes, 0,  1); break;
    case SDLK_RETURN: case SDLK_KP_ENTER:
      if (focoRes.fileira < nFil && focoRes.coluna < fil[focoRes.fileira].n) {
        registrarConsulta();
        pedido = fil[focoRes.fileira].itens[focoRes.coluna];
      }
      break;
    default: break;
  }
}

void busca_atualizar(float dt, Uint32 agora) {
  if (nConsulta == 0) discover_atualizar(dt, agora);
  // O RESULTADO DA REDE CHEGA DEPOIS DA TECLA. refiltrar() so roda quando o
  // dono digita, entao sem isto a resposta do addon chegava, ficava guardada
  // e NUNCA aparecia — a tela seguia mostrando o filtro local do momento em que
  // a ultima letra foi apertada. Aqui a contagem do termo corrente e vigiada
  // por quadro, e uma mudanca remonta a lista uma vez so.
  { char alvo[BU_MAX_CONSULTA * 2];
    static int ultimoRemoto = -1, ultimaGeracao = -1;
    normalizar(consulta, alvo, sizeof alvo);
    if ((int)strlen(alvo) >= 2) {
      int n = desc_busca_n(alvo), g = desc_busca_geracao();
      if (n != ultimoRemoto || g != ultimaGeracao) {
        ultimoRemoto = n;
        refiltrar();
        ultimaGeracao = desc_busca_geracao();
      }
    } else {
      ultimoRemoto = -1;
      ultimaGeracao = -1;
    } }
  for (int f = 0; f < BU_KB_FILEIRAS; f++)
    for (int c = 0; c < KB_COLUNAS[f]; c++) {
      float alvo = (painel == 0 && focus_indice(&focoKb, f, c)) ? 1.0f : 0.0f;
      animTecla[f][c] = anim_mola(animTecla[f][c], alvo, dt,
                                  alvo > animTecla[f][c] ? NV_MOLA_FOCO : NV_MOLA_DESFOCO);
    }
  for (int r = 0; r < BU_MAX_FILEIRAS; r++)
    for (int c = 0; c < BU_MAX_POR_FIL; c++) {
      float alvo = (painel == 1 && focus_indice(&focoRes, r, c)) ? 1.0f : 0.0f;
      animRes[r][c] = anim_mola(animRes[r][c], alvo, dt,
                                alvo > animRes[r][c] ? NV_MOLA_FOCO : NV_MOLA_DESFOCO);
    }
  { int item = painel == 1 && focoRes.fileira < nFil &&
                 focoRes.coluna < fil[focoRes.fileira].n
                 ? fil[focoRes.fileira].itens[focoRes.coluna] : -1;
    if (item < 0 || !ajustes_expandir_poster()) {
      expFileira = expColuna = expItem = -1; expDesde = 0; expAbre = 0;
    } else {
      if (expFileira != focoRes.fileira || expColuna != focoRes.coluna || expItem != item) {
        expFileira = focoRes.fileira; expColuna = focoRes.coluna;
        expItem = item; expDesde = agora; expAbre = 0;
      }
      if (agora - expDesde >= (Uint32)(ajustes_expandir_poster_atraso() * 1000.0f)) {
        const CatItem *ci = cat_item(item);
        // A imagem larga só começa a abrir quando chegou; o pôster fica no
        // lugar durante o pedido de rede.
        if (ci && ci->backdrop[0] &&
            tex_obter_larg(ci->backdrop, NV_BUSCA_POSTER_H * 16.0f / 9.0f))
          expAbre = ajustes_animacoes_reduzidas() ? 1.0f
                    : anim_mola(expAbre, 1.0f, dt, NV_MOLA_TELA);
      }
    } }
  animCampo = anim_mola(animCampo, painel == 0 ? 1.0f : 0.0f, dt, NV_MOLA_FOCO);
  if (painel == 2 && okPress && !okLongo && agora - okDesde >= NV_HOLD_MS) {
    okLongo = 1;
    recentesRemover();
  }
  if (painel != 2) { okPress = 0; okLongo = 0; }
  for (int i = 0; i < BU_REC_ITENS; i++) {
    float alvo = (painel == 2 && i == focoRec) ? 1.0f : 0.0f;
    animRec[i] = anim_mola(animRec[i], alvo, dt,
                           alvo > animRec[i] ? NV_MOLA_FOCO : NV_MOLA_DESFOCO);
  }

  // Rola so o necessario para a fileira em foco caber inteira na area util —
  // rolagem proporcional ao indice esconderia a primeira fileira antes de o
  // usuario ter chegado nela.
  if (painel == 1 && nFil > 0) {
    float topo = focoRes.fileira * NV_BUSCA_ROW_PASSO;
    // O cartaz em foco cresce para baixo; reservar tambem essa altura evita
    // cortar o nome e os metadados no fim da area rolavel.
    float base = topo + NV_BUSCA_ROW_TRILHO + NV_BUSCA_POSTER_H * 1.055f + 70.0f;
    if (topo - scrollAlvo < 0.0f)             scrollAlvo = topo;
    if (base - scrollAlvo > BU_RES_AREA_H)    scrollAlvo = base - BU_RES_AREA_H;

    // Rolagem horizontal da fileira em foco, mesma regra da home.
    int r = focoRes.fileira;
    float util = BU_DIR - BU_RES_X;
    float esq = focoRes.coluna * NV_BUSCA_CARD_PASSO;
    float dir = esq + NV_BUSCA_CARD_W;
    float alvoX = scrollX[r];
    if (r == expFileira && expAbre > 0.0f)
      dir += (NV_BUSCA_POSTER_H * 1.055f * 16.0f / 9.0f
              - NV_BUSCA_CARD_W * 1.055f) * expAbre;
    if (dir - alvoX > util) alvoX = dir - util;
    if (esq - alvoX < 0.0f) alvoX = esq;
    if (alvoX < 0.0f) alvoX = 0.0f;
    scrollX[r] = anim_mola2(&velX[r], scrollX[r], alvoX, dt, NV_MOLA2_SCROLL);
  } else {
    scrollAlvo = 0.0f;
  }
  if (scrollAlvo < 0.0f) scrollAlvo = 0.0f;
  scrollY = anim_mola2(&velY, scrollY, scrollAlvo, dt, NV_MOLA2_SCROLL);
}

// --- Desenho -----------------------------------------------------------------
// Campo de consulta: nenhum botao decorativo que nao possa receber foco.
static void desenhaCabecalho(Uint32 agora) {
  float x = BU_KB_X;
  float raio = 0.5f;
  GfxRect campo = { x, BU_HEAD_Y, BU_KB_W, BU_HEAD_H };
  float ar, ag, ab;
  ajustes_acento(&ar, &ag, &ab);
  { float lum = 0.105f + 0.015f * animCampo;
    gfx_cor(campo, raio, lum, lum + 0.004f, lum + 0.014f, 1.0f); }
  // A LUPA, dentro do campo: e o que diz "isto e uma busca" sem o placeholder,
  // que some assim que a primeira letra entra.
  { float ci = 0.48f + 0.16f * animCampo;
    gfx_icone((GfxRect){ campo.x + BU_CAMPO_PADX,
                         campo.y + (campo.h - 32.0f) * 0.5f, 32.0f, 32.0f },
              "menu_search", ci, ci, ci + 0.02f, 1.0f); }

  float tx = campo.x + BU_CAMPO_PADX + 32.0f + 20.0f;
  if (nConsulta) {
    TxtLinha l = txt_linha_corta(TXT_HEADLINE, consulta, 245, 246, 250, 255,
                                campo.w - 2 * BU_CAMPO_PADX - 12 - 56);
    txt_desenhar(l, tx, campo.y + (campo.h - l.h) * 0.5f);
    tx += l.w + 6.0f;
  } else {
    // Mesmo texto do placeholder do web.
    TxtLinha l = txt_linha_corta(TXT_HEADLINE, "Buscar filmes e séries",
                                 255, 255, 255, 255, campo.w - 112.0f);
    txt_desenhar_alpha(l, tx, campo.y + (campo.h - l.h) * 0.5f, 0.40f);
  }
  // O cursor pulsa na mesma cor do realce, e nao em branco fixo. O brilho
  // pisca so quando a entrada esta ativa, portanto e feedback e nao ornamento.
  if (painel == 0 && nConsulta > 0 && (agora / 500) % 2 == 0) {
    GfxRect cur = { tx, campo.y + 18.0f, 3.0f, campo.h - 36.0f };
    gfx_cor(cur, 0.5f, ar, ag, ab, 0.95f);
  }
}

static void desenhaTeclado(void) {
  char rotulo[8];
  for (int f = 0; f < BU_KB_FILEIRAS; f++) {
    for (int c = 0; c < KB_COLUNAS[f]; c++) {
      float k = animTecla[f][c];
      GfxRect base = retanguloTecla(f, c);
      float esc = 1.0f + BU_TECLA_ESCALA * k;
      GfxRect t = { base.x - base.w * (esc - 1.0f) * 0.5f,
                    base.y - base.h * (esc - 1.0f) * 0.5f,
                    base.w * esc, base.h * esc };
      // A matriz permanece uniforme mesmo quando o foco muda de tecla.
      { float ar, ag, ab; ajustes_acento(&ar, &ag, &ab);
        gfx_cor(t, BU_TECLA_RAIO, 0.16f, 0.17f, 0.19f, 0.98f);
        if (k > 0.01f) {
          gfx_cor(t, BU_TECLA_RAIO, ar, ag, ab, k);
        } }
      const char *s;
      if (f > 0) {
        rotulo[0] = TECLAS[(f - 1) * BU_KB_COLS + c]; rotulo[1] = 0;
        s = rotulo;
      } else s = (c == 0) ? i18n("espaço") : (c == 1 ? i18n("apagar") : i18n("limpar"));
      int tom = (int)anim_mistura(224.0f, (float)ajustes_tinta_foco(), k);
      TxtEstilo est = (f > 0) ? TXT_TITULO3 : TXT_PG_FIM;
      TxtLinha l = txt_linha(est, s, tom, tom, tom, 255);
      txt_desenhar(l, t.x + (t.w - l.w) * 0.5f, t.y + (t.h - l.h) * 0.5f);
    }
  }
  if(nConsulta == 0) {
    float y=BU_KB_Y+BU_KB_FILEIRAS*BU_KB_PASSO+17.0f;
    TxtLinha titulo=txt_linha(TXT_COND_CAPTION2,"Explore por interesse",168,172,180,255);
    txt_desenhar_alpha(titulo,BU_KB_X,y,1);
    for(int i=0;i<BU_ATALHOS_N;i++) {
      float yy=y+38+i*42;
      int sel=painel==4 && focoAtalho==i;
      if(sel) {
        float ar,ag,ab; ajustes_acento(&ar,&ag,&ab);
        gfx_cor((GfxRect){BU_KB_X-12,yy+6,4,28},.5f,ar,ag,ab,1);
      }
      int c=sel?248:190;
      TxtLinha label=txt_linha(TXT_COND_PG_FIM,atalhosBusca[i],c,c,c,255);
      txt_desenhar_alpha(label,BU_KB_X,yy,1);
    }
  } else {
    float y=BU_KB_Y+BU_KB_FILEIRAS*BU_KB_PASSO+18.0f;
    const char *d1=nFil?i18n("→   Resultados"):i18n("OK   Digitar");
    TxtLinha dica=txt_linha(TXT_CAPTION2,d1,150,154,163,255);
    txt_desenhar_alpha(dica,BU_KB_X,y,.9f);
  }
}

// Estado vazio do web: titulo 56/600 e apoio 24/400 rgb(179,179,179). Aqui ele
// fica a DIREITA, no lugar das fileiras, porque a faixa central esta com o
// teclado.
static void desenhaVazio(void) {
  int carregando = nConsulta >= 2 && desc_busca_carregando();
  const char *t1 = carregando ? "Buscando nos addons..."
                 : nConsulta >= 2 ? "Nenhum título recebido" : "O que vamos assistir?";
  const char *t2 = carregando ? "Filmes e séries aparecem assim que cada catálogo responder."
                 : nConsulta >= 2 ? "Os resultados dos addons aparecem aqui."
                 : "Digite ao menos 2 letras de um filme ou série.";
  TxtLinha l1 = txt_linha(TXT_COND_TITULO2, t1, 255, 255, 255, 255);
  TxtLinha l2 = txt_linha(TXT_COND_DET_META, t2, 179, 179, 179, 255);
  float cx = BU_RES_X + (BU_DIR - BU_RES_X) * 0.5f;
  float y = BU_RES_Y + 180.0f;
  txt_desenhar_alpha(l1, cx - l1.w * 0.5f, y, 0.96f);
  txt_desenhar_alpha(l2, cx - l2.w * 0.5f, y + l1.h + 18.0f, 0.85f);
  if (nConsulta >= 2 && !carregando) {
    TxtLinha ajuda = txt_linha(TXT_CAPTION2,
        "Se não aparecerem, confira a conexão ou tente outro nome.", 179, 183, 190, 255);
    txt_desenhar(ajuda, cx - ajuda.w * 0.5f, y + l1.h + l2.h + 42);
  }
}

// Buscas recentes, no lugar do estado vazio. Termo: superficie de repouso
// 0.10/0.11/0.13 (a das linhas da Biblioteca — e conteudo do dono, nao um
// comando) e realce cheio no foco, com a luz difusa de botoes.h por tras e a
// tinta de ajustes_tinta_foco(). "Limpar": o SECUNDARIO de botoes.h (so
// contorno em repouso), para nao ser lido como mais um termo a um metro dele.
// A dica embaixo diz o que o OK e o OK segurado fazem — sem ela a remocao e
// invisivel. Durante a pressao, um filete na base da pilula enche ate
// NV_HOLD_MS: e o aviso de "solte agora e nao apaga".
static void desenhaRecentes(Uint32 agora) {
  int n = buscasrec_n(), i, lin = 0;
  float x = BU_RES_X, y = BU_REC_Y, maxW = BU_DIR - BU_RES_X;
  const char *limpar = i18n("Limpar");
  TxtLinha tt = txt_linha(TXT_COND_TITULO3, i18n("Buscas recentes"), 255, 255, 255, 255);
  txt_desenhar(tt, BU_RES_X, BU_RES_Y);
  nRecLayout = 0;
  for (i = 0; i <= n && i < BU_REC_ITENS; i++) {
    float f = animRec[i];
    int tinta = f > 0.5f ? ajustes_tinta_foco() : 235;
    float w;
    TxtLinha l = { 0 };
    if (i < n) {
      l = txt_linha_corta(TXT_DET_BOTAO, buscasrec_termo(i), tinta, tinta, tinta, 255,
                          maxW - 2.0f * BU_REC_PADX);
      w = (float)l.w + 2.0f * BU_REC_PADX;
    } else {
      w = botao_largura(limpar, NULL, 0);
    }
    if (x > BU_RES_X && x + w > BU_DIR) { x = BU_RES_X; y += BU_REC_LINHA; lin++; }
    recRect[i] = (GfxRect){ x, y, w, BU_REC_H };
    recLin[i] = lin;
    nRecLayout = i + 1;
    if (i < n) {
      float ar, ag, ab;
      ajustes_acento(&ar, &ag, &ab);
      botao_luz(recRect[i], f, 1.0f);
      if (f > 0.01f) gfx_cor(recRect[i], NV_RAIO_PILL, ar, ag, ab, f);
      if (f < 0.99f) gfx_cor(recRect[i], NV_RAIO_PILL, 0.10f, 0.11f, 0.13f, 1.0f - f);
      txt_desenhar(l, x + BU_REC_PADX, y + (BU_REC_H - l.h) * 0.5f);
    } else {
      botao_pilula(recRect[i], limpar, NULL, f, 0, 0, 1.0f);
    }
    if (painel == 2 && i == focoRec && okPress && !okLongo) {
      float p = anim_clamp((agora - okDesde) / (float)NV_HOLD_MS, 0.0f, 1.0f);
      int t = ajustes_tinta_foco();
      GfxRect barra = { x + BU_REC_PADX, y + BU_REC_H - 10.0f,
                        (w - 2.0f * BU_REC_PADX) * p, 4.0f };
      if (barra.w > 1.0f) gfx_cor(barra, 0.5f, t / 255.0f, t / 255.0f, t / 255.0f, 0.9f);
    }
    x += w + BU_REC_GAP;
  }
  { TxtLinha d = txt_linha(TXT_CAPTION2, i18n("OK   Buscar de novo      Segure OK   Remover"),
                           150, 153, 162, 255);
    txt_desenhar_alpha(d, BU_RES_X, y + BU_REC_H + 32.0f, 0.9f); }
}

static void desenhaResultados(Uint32 agora) {
  // Uma varredura por foco novo na grade de resultados (revela.h).
  float varreFoco = revela_varre(&revVarre, painel == 1
                                 ? focoRes.fileira * 64 + focoRes.coluna : -1, agora);
  temItemFoco = 0;
  if (nConsulta == 0) {
    if (painel == 2 && recentesVisiveis()) desenhaRecentes(agora);
    else { nRecLayout = 0; discover_desenhar(agora,painel==3); }
    return;
  }
  nRecLayout = 0;
  if (nFil == 0) { desenhaVazio(); return; }

  gfx_recorte(BU_RES_X - 8.0f, BU_RES_Y - 30.0f,
              (BU_DIR - BU_RES_X) + 16.0f, BU_RES_AREA_H + 30.0f);

  for (int r = 0; r < nFil; r++) {
    float ry = BU_RES_Y + r * NV_BUSCA_ROW_PASSO - scrollY;
    if (ry > NV_TELA_H + 100.0f || ry + NV_BUSCA_ROW_PASSO < -100.0f) continue;

    // Titulo do catalogo 48/600 e a origem 20/400 logo abaixo (margin-top 4).
    TxtLinha tt = txt_linha_corta(TXT_COND_TITULO3, fil[r].titulo, 255, 255, 255, 255,
                                  BU_DIR - BU_RES_X);
    txt_desenhar(tt, BU_RES_X, ry);
    if (fil[r].origem) {
      char org[96];
      snprintf(org, sizeof org, i18n("de %s"), fil[r].origem);
      TxtLinha ts = txt_linha_corta(TXT_COND_CAPTION2, org, 179, 179, 179, 255,
                                   BU_DIR - BU_RES_X);
      txt_desenhar_alpha(ts, BU_RES_X, ry + NV_BUSCA_ROW_SUB, 0.95f);
    }

    float cardY = ry + NV_BUSCA_ROW_TRILHO;
    // Dois passes: o item em foco tem de ficar POR CIMA dos vizinhos, senao a
    // borda do poster ao lado corta o anel de foco.
    for (int passe = 0; passe < 2; passe++)
      for (int c = 0; c < fil[r].n && c < BU_MAX_POR_FIL; c++) {
        float f = animRes[r][c];
        if ((passe == 1) != (f > 0.01f)) continue;
        const CatItem *ci = cat_item(fil[r].itens[c]);
        if (!ci) continue;

        float px = BU_RES_X + c * NV_BUSCA_CARD_PASSO - scrollX[r];
        float escala = 1.0f + 0.055f * f;
        float baseW = NV_BUSCA_CARD_W * escala;
        float ph = NV_BUSCA_POSTER_H * escala;
        float abertura = r == expFileira ? expAbre : 0.0f;
        float extra = (ph * 16.0f / 9.0f - baseW) * abertura;
        if (extra < 0.0f) extra = 0.0f;
        if (r == expFileira && c > expColuna) {
          float escF = 1.0f + 0.055f * animRes[r][expColuna];
          px += (NV_BUSCA_POSTER_H * escF * 16.0f / 9.0f
                 - NV_BUSCA_CARD_W * escF) * abertura;
        }
        if (px > BU_DIR || px + NV_BUSCA_CARD_W < BU_RES_X - NV_BUSCA_CARD_W) continue;
        float abre = r == expFileira && c == expColuna ? abertura : 0.0f;
        float pw = baseW + extra * (abre > 0.0f);
        // O subtitulo do addon fica logo acima. Ancorar o topo do cartaz ao
        // trilho deixa a ampliacao acontecer para baixo sem cobrir esse texto.
        GfxRect poster = { px - (baseW - NV_BUSCA_CARD_W) * 0.5f,
                           cardY, pw, ph };
        float ar, ag, ab;
        // O foco e uma aproximacao curta, nao um salto de tamanho: o poster
        // chega para frente com a cor do tema e a legenda acompanha o movimento.
        //
        // O DIVISOR E A ALTURA. Estava `/ NV_BUSCA_CARD_W`, e num cartaz
        // (retrato) a largura e o MENOR lado — mas o `r` do FS_SDF e medido
        // contra a meia-ALTURA, entao 22/248 pedia 0,089 de 372, ou seja 33 px
        // em vez dos 22 do web. Mesmo erro que estava em home.c e detail.c.
        float raio = NV_BUSCA_RAIO / NV_BUSCA_POSTER_H;
        if (f > 0.01f) {
          GfxRect luz = { poster.x - 22.0f, poster.y - 22.0f,
                          poster.w + 44.0f, poster.h + 44.0f };
          ajustes_acento(&ar, &ag, &ab);
          gfx_rect(luz, 0, GFX_SOMBRA, 1.0f, 0, 0, 0.5f,
                   ar, ag, ab, 0.24f * f);
          // 3 px encostados no cartaz e CONCENTRICOS: o anel crescia 3 px de
          // cada lado mas reusava o raio normalizado do cartaz, entao o canto
          // dele fechava ~3 px antes do que devia.
          gfx_anel_fora(poster, raio, 0.0f, 3.0f, ar, ag, ab, f);
        }

        const char *arte = abre > 0.5f && ci->backdrop[0] ? ci->backdrop
                         : ci->poster[0] ? ci->poster
                         : (ci->backdrop[0] ? ci->backdrop : NULL);
        if (arte && tex_falhou(arte)) {
          const char *alternativa = arte == ci->poster ? ci->backdrop : ci->poster;
          if (alternativa[0] && !tex_falhou(alternativa)) arte = alternativa;
        }
        if (abre > 0.01f && ci->backdrop[0] && abre <= 0.5f)
          (void)tex_obter_larg(ci->backdrop, ph * 16.0f / 9.0f);
        GLuint tex = arte ? tex_obter_larg(arte, poster.w) : 0;
        if (!tex && abre > 0.5f && ci->poster[0]) {
          arte = ci->poster;
          tex = tex_obter_larg(arte, baseW);
        }
        float aArte = revela_arte(&revRes[r][c], tex != 0, agora);
        if (tex) {
          // Sem o aspecto a arte 2:3 estica; e o poster e justamente onde isso
          // salta aos olhos, porque todos ficam lado a lado.
          if (aArte < 0.999f)
            gfx_cor(poster, raio, NV_COR_ESQUELETO_R, NV_COR_ESQUELETO_G,
                    NV_COR_ESQUELETO_B, 1.0f);
          gfx_tex_aspect_atual = tex_aspecto(arte);
          if (painel == 1 && focoRes.fileira == r && focoRes.coluna == c)
            gfx_varre_atual = varreFoco;
          gfx_rect(poster, tex, GFX_CARD, f, 0.0f, 0.0f, raio, 0, 0, 0, aArte);
          gfx_varre_atual = 0.0f;
          gfx_tex_aspect_atual = 0.0f;
        } else {
          // Esqueleto VISIVEL, o mesmo da home: #2C2C2C. Ver a nota la — placeholder
          // do tom do fundo le como card quebrado, nao como carregando. Com a
          // luz passando enquanto a arte ainda pode chegar.
          if (arte && !tex_falhou(arte))
            gfx_esqueleto(poster, raio, NV_COR_ESQUELETO_R, NV_COR_ESQUELETO_G,
                          NV_COR_ESQUELETO_B, 1.0f);
          else
            gfx_cor(poster, raio, NV_COR_ESQUELETO_R, NV_COR_ESQUELETO_G,
                    NV_COR_ESQUELETO_B, 1.0f);
        }

        if (abre > 0.5f) {
          gfx_rect(poster, 0, GFX_VEU, 0, 0, 0, raio, 0, 0, 0,
                   (abre - 0.5f) * 1.45f);
          { GLuint logo = ci->logo[0] ? tex_obter_larg(ci->logo, poster.w * 0.42f) : 0;
            float asp = logo ? tex_aspecto(ci->logo) : 0.0f;
            if (logo && asp > 0.0f) {
              float lw = poster.w * 0.42f, lh = lw / asp;
              if (lh > 80.0f) { lh = 80.0f; lw = lh * asp; }
              gfx_rect((GfxRect){poster.x + 20.0f, poster.y + poster.h - lh - 20.0f,
                                  lw, lh}, logo,
                       tex_marca_escura(ci->logo) ? GFX_MARCA : GFX_TEXTO,
                       0, 0, 0, 0, 1, 1, 1, abre);
            } else {
              TxtLinha nome = txt_linha_corta(TXT_COND_CALLOUT, ci->titulo,
                                              255, 255, 255, 255, poster.w - 40.0f);
              txt_desenhar_alpha(nome, poster.x + 20.0f,
                                 poster.y + poster.h - nome.h - 22.0f, abre);
            } }
        }

        // Nome 28/500 branco a 8 do poster; ano 20/400 rgb(179) a 4 do nome.
        TxtLinha tn = txt_linha_corta(TXT_COND_CALLOUT, ci->titulo, 255, 255, 255, 255,
                                      baseW);
        float ny = poster.y + poster.h + NV_BUSCA_NOME_GAP;
        txt_desenhar_alpha(tn, poster.x, ny,
                           anim_mistura(0.82f, 1.0f, f) * (1.0f - abre));
        if (ci->meta[0]) {
          TxtLinha td = txt_linha_corta(TXT_COND_CAPTION2, ci->meta, 179, 179, 179, 255,
                                        baseW);
          txt_desenhar_alpha(td, poster.x, ny + tn.h + NV_BUSCA_DATA_GAP,
                             0.92f * (1.0f - abre));
        }

        if (painel == 1 && focus_indice(&focoRes, r, c)) {
          itemFoco.indice = fil[r].itens[c];
          itemFoco.rect   = poster;
          itemFoco.arte   = ci->backdrop[0] ? ci->backdrop : ci->poster;
          itemFoco.titulo = ci->titulo;
          itemFoco.genero = ci->genero;
          itemFoco.meta   = ci->meta;
          temItemFoco = 1;
        }
        rectRes[r][c] = poster;
        // O card expandido pode ultrapassar o recorte dos resultados. O alvo
        // do cursor cobre somente a parte que a pessoa realmente ve.
        { float x0 = poster.x > BU_RES_X ? poster.x : BU_RES_X;
          float y0 = poster.y > BU_RES_Y - 30.0f ? poster.y : BU_RES_Y - 30.0f;
          float x1 = poster.x + poster.w < BU_DIR ? poster.x + poster.w : BU_DIR;
          float limiteY = BU_RES_Y + BU_RES_AREA_H;
          float y1 = poster.y + poster.h < limiteY ? poster.y + poster.h : limiteY;
          ponteiro_alvo(x0, y0, x1 - x0, y1 - y0,
                        ponteiroResultadoFocar, NULL, r, c); }
      }
  }
  gfx_sem_recorte();
}

void busca_desenhar(Uint32 agora) {
  // Fundo #0d0d0d, medido no .search-screen-shell do web — mais escuro que o
  // cinza da home, e o web usa o mesmo tom nas duas.
  GfxRect tela = { 0, 0, NV_TELA_W, NV_TELA_H };
  // A tela ja foi limpa com ESTA MESMA COR por glClearColor/glClear em
  // main.c antes de app_desenhar. Pintar por cima era uma camada de tela
  // cheia jogada fora por quadro — e o custo dominante nesta GPU e fill
  // rate (gfx.c registra que DUAS camadas de tela cheia derrubavam a
  // Mali-G71 para ~40fps). Nao repor sem antes mudar a cor do clear.
  (void)tela;
  desenhaCabecalho(agora);
  desenhaTeclado();
  desenhaResultados(agora);
}
