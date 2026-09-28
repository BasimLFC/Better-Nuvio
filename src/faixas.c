#include "faixas.h"
#include "idioma.h"
#include "player.h"
#include "video.h"
#include "addons.h"
#include "gfx.h"
#include "text.h"
#include "anim.h"
#include "layout.h"
#include "legenda.h"
#include "mkvass.h"
#include "assrender.h"
#include "ajustes.h"
#include "catalogo.h"
#include "linguas.h"
#include <stdio.h>
#include <string.h>
#include <strings.h>

// O painel webOS do Enhanced mede 640px e fica a 64px da borda direita.
#define FX_LINHA   76.0f
#define FX_X       1216.0f
#define FX_W       640.0f
#define FX_MAX_GRUPOS (NV_FAIXA_MAX + LEG_MAX + 1)

static int aberta, coluna, foco[3];
// Rolagem do audio e do estilo; idiomas e opcoes de legenda tem janelas proprias.
static int rolagem[3];
// Quantas linhas cabem no painel. Calculada no desenho (depende da altura
// escolhida ali) e lida pelo tratamento de tecla, que roda antes.
static int visiveis = 8;
static void ajustarRolagem(void);
static float anim;
static int paginaEstilo, paginaMix, focoCabecalho, focoIdioma, focoOpcao, focoOpcoes;
static int rolagemIdioma, rolagemOpcao;
static int estiloLado = -1;
static int syncFala, syncCapturado, syncN, syncFoco, syncAviso;
static int syncDeslocamento, syncInicio, syncTotal;
static double syncTempo;
static LegendaCue syncCues[7];

static int carregarFalas(int deslocamento) {
  return legenda_falas(player_leg_tempo_arquivo(syncTempo),
                       deslocamento, syncCues, 7, &syncFoco,
                       &syncInicio, &syncTotal);
}

static void corFocoFaixa(float *r, float *g, float *b) {
  float ar, ag, ab, lum, k = 0.74f;
  ajustes_acento(&ar, &ag, &ab);
  lum = 0.2126f * ar + 0.7152f * ag + 0.0722f * ab;
  if (lum > 0.88f) k = 0.88f;
  *r = 0.055f + (ar - 0.055f) * k;
  *g = 0.058f + (ag - 0.058f) * k;
  *b = 0.068f + (ab - 0.068f) * k;
}

// Qual legenda EXTERNA (OpenSubtitles) esta valendo, em indice da lista
// combinada — ou -1 quando a ativa e embutida ou nao ha nenhuma.
//
// Isto vive aqui e nao no video.c porque o pipeline nao devolve essa
// informacao: video_legenda_externa manda o setSubtitleSource com a URL e o
// legAtual do video.c fica intocado, apontando para a legenda EMBUTIDA de
// antes. Sem esta variavel, escolher uma legenda do OpenSubtitles fazia a
// marca de "ativa" ficar em outra linha (ou em "Desativada") e a folha
// reabria com o foco no lugar errado — a legenda certa tocava, so a folha
// mentia sobre qual era.
static int legExterna = -1;

// LEGENDA EMBUTIDA DE TEXTO PELO OVERLAY (#92). `legOverlay` e o indice da
// faixa embutida cujo texto o mkvass.c esta colhendo do MKV por Range para o
// overlay do app desenhar — o pipeline da TV fica com a legenda DESLIGADA
// (video_escolher_legenda(-1)), entao video_legenda_atual() diz -1 e, sem
// esta variavel, a folha marcaria "Nenhuma" como ativa. Mesmo motivo do
// legExterna acima.
//
// `legOverlayNoGo` e a faixa em que o mkvass DESISTIU (arquivo sem indice da
// legenda, servidor sem Range): a folha voltou a entregar a faixa ao pipeline
// e mostra o motivo; escolher a mesma faixa de novo vai direto ao pipeline,
// sem tentar outra vez.
//
// Na LG o player nativo e silenciado enquanto o app coleta e compoe a faixa;
// em no-go, a selecao volta ao uMS. NA SAMSUNG ESTE RAMO NAO RODA: o
// video_tizen.c nao preenche `codec`, entao ehAss e sempre falso la e a faixa
// vai ao AVPlay, cujo texto o player desenha pelo onsubtitlechange (#122).
static int legOverlay = -1, legOverlayNoGo = -1;

// Faixa embutida escolhida ANTES de a sonda do cabecalho voltar (#92, webOS
// 25). Sem a sonda nao se sabe o codec nem o ordinal, e a 1.4.2 mandava a
// faixa para a TV EM SILENCIO — sem log, sem aviso — e la ficava: era o "liga
// e desliga, metade da frase" do relato, numa TV em que o buffer demorava a
// dar os 20 s que disparavam a sonda. Agora a faixa vai a TV so ENQUANTO a
// sonda corre (disparada na hora); quando ela volta, faixas_atualizar decide
// e diz no log por que ficou onde ficou.
static int legOverlayEsperando = -1;

// LEGENDA AUTOMATICA DA SESSAO (#129): 1 do inicio de uma reproducao ate a
// decisao (ligou, nao havia o que ligar, ou a pessoa escolheu na folha).
// `legAutoDesde` e o instante em que o video ficou pronto, base dos prazos.
static int legAuto;
static Uint32 legAutoDesde;

// NO-GO PASSAGEIRO x DEFINITIVO. Um Range que falhou (rede, timeout, 5xx,
// freio do CDN, o servidor que devolveu o arquivo inteiro uma vez) nao e
// motivo para entregar a faixa a TV DE VEZ: o mkvass tenta de novo com recuo
// (mkvass_recuo_ms: 2, 5, 15, 30, 60 s...), SEM LIMITE enquanto a faixa estiver
// escolhida. Nas primeiras MKVASS_TENTATIVAS_OVERLAY o overlay fica com o que
// ja colheu; dali em diante (ou logo, se nao colheu nada) a TV desenha POR
// ENQUANTO (`legOverlayTV`) e, quando uma tentativa volta a entregar fala
// nova, a faixa volta ao app. So o definitivo (nao e MKV, codec, sem indice,
// Range recusado de novo, recusa HTTP definitiva) devolve a faixa de vez, com o
// motivo no log e no aviso. Contado por ESCOLHA de faixa; `legOverlayFalhas`
// zera quando chega fala nova (`legOverlayColhidos` e a marca).
//
// #92, 1.4.5: tres falhas seguidas davam "a TV vai desenhar (falha de rede)"
// e a faixa ficava na TV — que corta metade das falas — ate o fim do episodio.
static int legOverlayFalhas, legOverlayRecusas, legOverlayNoGoEstado;
static int legOverlayTV, legOverlayColhidos;
static Uint32 legOverlayRetomar;       // 0 = nada agendado

static int ehAss(const VideoFaixa *f) {
  return f && (!strncmp(f->codec, "S_TEXT/ASS", 10) || !strncmp(f->codec, "S_TEXT/SSA", 10));
}

static int ehTextoSimples(const VideoFaixa *f) {
  return f && !strcmp(f->codec, "S_TEXT/UTF8");
}

static int ehOverlay(const VideoFaixa *f) { return ehAss(f) || ehTextoSimples(f); }

// O overlay do app assume a faixa embutida `i` (ordinal `ord` no arquivo): a
// legenda nativa da TV e DESLIGADA (video_escolher_legenda(-1) manda
// setSubtitleEnable false ao uMS / desliga no AVPlay) e o mkvass comeca a
// colher. A linha de log e a prova de que o app assumiu — se a TV continuar
// desenhando por cima, o firmware ignorou o setSubtitleEnable, e isso e
// outro bug (a resposta do uMS sai logo abaixo como "[video] {...}").
static void overlayAssumir(int i, int ord) {
  const VideoFaixa *f = video_legenda(i);
  video_escolher_legenda(-1);
  mkvass_iniciar_ordinal(video_url_atual(), ord);
  legOverlay = i;
  legOverlayFalhas = legOverlayRecusas = 0; legOverlayRetomar = 0;
  legOverlayTV = legOverlayColhidos = 0;
  printf("[legenda] faixa %d (%s, %s) -> app: ordinal %d; legenda nativa desligada\n",
         i, f ? f->rotulo : "?", f ? f->codec : "?", ord);
  fflush(stdout);
}

// Por que a faixa embutida `i` NAO vai ao overlay do app. Uma string, para o
// log e para a folha nao divergirem.
static const char *motivoTV(int i) {
  const VideoFaixa *f = video_legenda(i);
  int sond = video_mkv_sondado();
  if (!f) return "faixa inexistente";
  if (!video_url_atual()[0]) return "sem URL da fonte";
  if (i == legOverlayNoGo) return "mkvass ja desistiu desta faixa nesta sessao";
  if (sond == 2) return "fonte nao e MKV (nao ha sonda)";
  if (sond == 0) return "sonda do cabecalho ainda nao voltou";
  if (!f->codec[0]) return "sonda voltou sem par para esta faixa (ver [mkv] legendas da TV x arquivo)";
  if (!ehOverlay(f)) return "codec de legenda nao suportado pelo overlay";
  if (video_legenda_ordinal_mkv(i) < 0) return "sem ordinal no arquivo";
  return "?";
}

// Chamada quando uma sessao de reproducao nova comeca: a legenda externa e da
// sessao, nao do aparelho. Sem isto o titulo seguinte abriria a folha marcando
// como ativa uma legenda que nao foi escolhida para ele.
void faixas_reiniciar(void) {
  legExterna = -1; legOverlay = legOverlayNoGo = legOverlayEsperando = -1; aberta = 0;
  syncFala = 0;
  legOverlayFalhas = legOverlayRecusas = legOverlayNoGoEstado = 0; legOverlayRetomar = 0;
  legOverlayTV = legOverlayColhidos = 0;
  mkvass_parar(); legenda_desligar();
  legAuto = 1; legAutoDesde = 0;
}

// Indice da legenda que a folha deve marcar como ATIVA.
static int legendaAtiva(void) {
  if (legExterna >= 0) return legExterna;
  if (legOverlay >= 0) return legOverlay;
  return video_legenda_atual();
}

// Paineis separados: 0 = Audio, 1 = Legendas. Cada um tem cabecalho e paginas.
static int modo;
// O painel de legenda tem idiomas e faixas empilhados; Estilo e outra pagina.
#define FX_COL_ESTILO 2
#define FX_N_ESTILO   10

typedef struct { char codigo[32]; char nome[72]; int total; } FxGrupo;
static FxGrupo grupos[FX_MAX_GRUPOS];
static int nGrupos;

static const char *idiomaFaixa(int i) {
  int emb = video_n_legenda();
  if (i < emb) {
    const VideoFaixa *f = video_legenda(i);
    return f ? f->idioma : "";
  }
  const Legenda *l = addons_legenda(i - emb);
  return l ? l->idioma : "";
}

static void montarGrupos(void) {
  nGrupos = 1;
  memset(grupos, 0, sizeof grupos);
  snprintf(grupos[0].nome, sizeof grupos[0].nome, "%s", i18n("Desativada"));
  for (int i = 0; i < video_n_legenda() + addons_n_legendas(); i++) {
    const char *cod = idiomaFaixa(i);
    if (!cod || !*cod) cod = "und";
    if (!ling_legenda_visivel(cod)) continue;
    cod = ling_grupo_codigo(cod);
    int g;
    for (g = 1; g < nGrupos; g++) if (!strcasecmp(grupos[g].codigo, cod)) break;
    if (g == nGrupos) {
      if (nGrupos >= FX_MAX_GRUPOS) continue;
      snprintf(grupos[g].codigo, sizeof grupos[g].codigo, "%s", cod);
      snprintf(grupos[g].nome, sizeof grupos[g].nome, "%s",
               !strcmp(cod, "und") ? i18n("Idioma desconhecido") : i18n(ling_nome(cod)));
      nGrupos++;
    }
    grupos[g].total++;
  }
}

static int grupoDaFaixa(int i) {
  const char *cod;
  if (i < 0) return 0;
  cod = idiomaFaixa(i);
  if (!cod || !*cod) cod = "und";
  cod = ling_grupo_codigo(cod);
  for (int g = 1; g < nGrupos; g++) if (!strcasecmp(grupos[g].codigo, cod)) return g;
  return 0;
}

static int faixaDaOpcao(int grupo, int opcao) {
  if (grupo <= 0 || grupo >= nGrupos) return -1;
  for (int i = 0; i < video_n_legenda() + addons_n_legendas(); i++) {
    if (grupoDaFaixa(i) != grupo) continue;
    if (opcao-- == 0) return i;
  }
  return -1;
}

static int nLinhas(int col);

void faixas_abrir(void) { faixas_abrir_em(0); }

// Abre o painel pedido pelo icone do player, na pagina de faixas.
void faixas_abrir_em(int col) {
  int n;
  aberta = 1;
  modo = (col == 1) ? 1 : 0;
  coluna = modo;                 // audio -> col 0; legenda -> col 1
  paginaEstilo = paginaMix = 0;
  syncFala = 0;
  estiloLado = -1;
  focoCabecalho = !modo && video_n_audio() == 0;
  rolagemIdioma = rolagemOpcao = 0;
  montarGrupos();
  focoIdioma = grupoDaFaixa(legendaAtiva());
  focoOpcoes = focoIdioma > 0;
  focoOpcao = 0;
  for (int i = 0; i < grupos[focoIdioma].total; i++)
    if (faixaDaOpcao(focoIdioma, i) == legendaAtiva()) { focoOpcao = i; break; }
  foco[0] = video_audio_atual();
  // A legenda pode estar desligada (-1); a primeira linha da coluna e sempre
  // "Desativada", entao o indice da lista e deslocado em um.
  foco[1] = legendaAtiva() + 1;
  // A folha pode abrir enquanto o video e varias buscas ainda disputam RAM.
  // A sonda do MKV continua no primeiro uso de uma faixa embutida (aplicar),
  // quando codec/ordinal sao de fato necessarios para reproduzi-la.
  if (modo) txt_podar_inativas(120);
  // Clamp nas duas colunas. A lista de legendas CRESCE durante a sessao (as do
  // OpenSubtitles chegam depois) e a de audio so existe apos o sourceInfo:
  // guardar um indice de antes e reabrir sem conferir poe o foco fora do vetor.
  { int c; for (c = 0; c < 3; c++) {
      n = nLinhas(c);
      if (foco[c] >= n) foco[c] = n > 0 ? n - 1 : 0;
      if (foco[c] < 0)  foco[c] = 0;
    rolagem[c] = 0;
    } }
}

int faixas_aberta(void) { return aberta; }

static int nLegendas(void) {
  int n = video_n_legenda() + addons_n_legendas();
  return n;
}

static int nLinhas(int col) {
  if (col == FX_COL_ESTILO) return FX_N_ESTILO;
  if (col == 0) { int n = video_n_audio(); return n; }
  return nLegendas() + 1;   // +1 pela linha "Desativada"
}

// --- COLUNA DE ESTILO --------------------------------------------------------
//
// Oito linhas "rotulo: valor". OK cicla o valor e aplica NA HORA. A ultima
// linha restaura o conjunto inteiro sem exigir dezenas de toques no controle.
static const char *const EST_ROT[FX_N_ESTILO] = {
  "Tamanho", "Negrito", "Cor", "Opacidade", "Fundo", "Posição", "Contorno", "Atraso",
  "Sincronizar por fala", "Restaurar padrão"
};
static const char *const EST_FUNDO[5] = { "Nenhum", "Escuro 25%", "Escuro 50%",
                                          "Escuro 75%", "Escuro 100%" };
static const char *const EST_OPAC[4]  = { "100%", "75%", "50%", "25%" };

/* Com o ASS desenhado pelo libass, cor, fundo e posicao sao do
 * arquivo: mexer nelas desmontava karaoke e placas (ou nao fazia nada). A
 * linha continua na folha, esmaecida, dizendo por que nao muda — como o app
 * web faz desde o 1.2.0. Tamanho vira escala proporcional; opacidade e atraso
 * valem igual. */
static int estiloPreservadoAss(int linha) {
  return assrender_ativo() && (linha == 2 || linha == 4 || linha == 5);
}

static void valorEstilo(int linha, char *dst, size_t tam) {
  const VideoLegendaEstilo *e = player_leg_estilo();
  if (estiloPreservadoAss(linha)) {
    snprintf(dst, tam, "%s", i18n("Preservado pelo ASS"));
    return;
  }
  switch (linha) {
    case 0:
      if (assrender_ativo())
        snprintf(dst, tam, "%d%% \xc2\xb7 ASS \xc3\x97%.2f", e->tamanho, e->tamanho / 100.0);
      else
        snprintf(dst, tam, "%d%%", e->tamanho);
      break;
    case 1: snprintf(dst, tam, "%s", i18n(e->negrito ? "Ligado" : "Desligado")); break;
    case 2: snprintf(dst, tam, "%s", VIDEO_LEG_CORES_PT[e->cor % VIDEO_LEG_NCORES]); break;
    case 3: snprintf(dst, tam, "%s", EST_OPAC[e->opacidade > 3 ? 3 : e->opacidade]); break;
    case 4: snprintf(dst, tam, "%s", EST_FUNDO[e->fundo > 4 ? 4 : e->fundo]); break;
    case 5: snprintf(dst, tam, "%d", e->posicao); break;
    case 6: snprintf(dst, tam, "%s", i18n(e->borda ? "Ligado" : "Desligado")); break;
    case 7: {
      int a = e->atrasoMs;
      if (!a) snprintf(dst, tam, "0 s");
      else    snprintf(dst, tam, "%+.2f s", a / 1000.0f);
      break; }
    case 8: snprintf(dst, tam, "%s", i18n("Abrir")); break;
    default: snprintf(dst, tam, "Aplicar"); break;
  }
}

static int voltaIndice(int valor, int delta, int n) {
  return (valor + delta + n) % n;
}

static void ajustarEstilo(int linha, int dir) {
  VideoLegendaEstilo *e = player_leg_estilo();
  if (estiloPreservadoAss(linha)) return;
  switch (linha) {
    case 0:
      e->tamanho += dir * 10;
      if (e->tamanho > 200) e->tamanho = 50;
      if (e->tamanho < 50) e->tamanho = 200;
      break;
    case 1: e->negrito = !e->negrito; break;
    // COR: marca que a pessoa mexeu — dai em diante ela vence a cor que o
    // arquivo ASS pede (ver player_leg_estilo_tocou em player.h).
    case 2: e->cor     = voltaIndice(e->cor,dir,VIDEO_LEG_NCORES); player_leg_estilo_tocou(PLR_LEG_COR); break;
    case 3: e->opacidade = voltaIndice(e->opacidade,dir,4); break;
    case 4: e->fundo   = voltaIndice(e->fundo,dir,5); break;
    case 5:
      e->posicao += dir * 5;
      if (e->posicao < -20) e->posicao = -20;
      if (e->posicao > 50) e->posicao = 50;
      break;
    case 6: e->borda   = e->borda ? 0 : 2; break;
    // O alcance e o passo seguem o Enhanced. Na borda mantemos o valor, sem
    // saltar de +180 s para -180 s ao pressionar mais uma vez.
    case 7:
      e->atrasoMs += dir * 100;
      if (e->atrasoMs > 180000) e->atrasoMs = 180000;
      if (e->atrasoMs < -180000) e->atrasoMs = -180000;
      break;
    case 8: return;
    default:
      *e = (VideoLegendaEstilo){ 100, 0, 0, 5, 2, 0, 0, 0 };
      // Restaurar e voltar ao normal do app, e o normal e respeitar o arquivo.
      player_leg_estilo_tocou(PLR_LEG_NADA);
      break;
  }
  player_leg_estilo_mudou();
}

// Rotulo da linha `i` da coluna de legenda. Ate video_n_legenda() sao as
// embutidas; depois vem as do OpenSubtitles.
static const char *rotuloLegenda(int i, const char **marca) {
  int emb = video_n_legenda();
  *marca = NULL;
  if (i < emb) {
    const VideoFaixa *f = video_legenda(i);
    // SELO "ASS" (#92): a faixa S_TEXT/ASS e a que o pipeline da TV desenha
    // sem posicao e comendo eventos simultaneos. Dizer isso na folha e o que
    // permite a pessoa preferir uma legenda externa enquanto a faixa
    // embutida nao passa pelo overlay proprio.
    if (i == legOverlayEsperando)
      *marca = i18n("Incorporada (lendo o \xc3\xadndice do arquivo\xe2\x80\xa6)");
    else if (ehOverlay(f)) {
      if (i == legOverlay) {
        int e = mkvass_estado();
        *marca = legOverlayTV
               ? i18n("A TV desenha por enquanto (o app tenta de novo\xe2\x80\xa6)")
               : legOverlayRetomar
               ? i18n("Incorporada (desenhada pelo app, tentando de novo\xe2\x80\xa6)")
               : e == MKVASS_PREPARANDO
               ? i18n("Incorporada (lendo o \xc3\xadndice do arquivo\xe2\x80\xa6)")
               : mkvass_varredura()
               ? i18n("Incorporada (desenhada pelo app, varrendo o arquivo)")
               : i18n("Incorporada (desenhada pelo app)");
      } else if (i == legOverlayNoGo) {
        int e = legOverlayNoGoEstado;
        *marca = e == MKVASS_NOGO_SEM_RANGE ? i18n("A TV desenha (servidor sem Range)")
               : e == MKVASS_NOGO_HTTP     ? i18n("A TV desenha (o servidor recusou)")
               : e == MKVASS_NOGO_NAO_MKV  ? i18n("A TV desenha (a fonte n\xc3\xa3o \xc3\xa9 MKV)")
               : e == MKVASS_NOGO_FAIXA    ? i18n("A TV desenha (formato incompat\xc3\xadvel)")
               : i18n("A TV desenha (arquivo sem \xc3\xadndice)");
      } else
        *marca = ehAss(f) ? i18n("Incorporada \xc2\xb7 ASS") : i18n("Incorporada \xc2\xb7 texto");
    }
    return f ? f->rotulo : "";
  }
  { const Legenda *l = addons_legenda(i - emb);
    if (!l) return "";
    *marca = l->provedor[0] ? l->provedor : "Legenda";
    return l->rotulo; }
}

// Liga a legenda `i` da lista combinada (-1 desliga; embutidas primeiro, depois
// as de addon). E o OK da folha, e tambem o que a legenda automatica usa: os
// dois tem de passar pelo mesmo caminho, senao uma faixa ASS escolhida sozinha
// iria a TV sem o overlay e sem a linha de log que a folha deixa.
static void escolherLegenda(int i) {
  player_leg_sincronizacao_limpar();
  {
    int emb = video_n_legenda();
    const VideoFaixa *fe = (i >= 0 && i < emb) ? video_legenda(i) : NULL;
    int vaiAoApp = fe && ehOverlay(fe) && i != legOverlayNoGo && video_url_atual()[0] &&
                   video_legenda_ordinal_mkv(i) >= 0;
    // Qualquer escolha encerra a colheita anterior: o fio do mkvass nao pode
    // continuar entregando ao overlay uma faixa que a pessoa acabou de trocar.
    // MENOS quando a escolha vai ao overlay: mkvass_iniciar_ordinal ja troca a
    // geracao (o fio velho sai sozinho) e, se for a faixa da PRE-BUSCA (#92,
    // v1.4.7), adota o fio vivo com o que ele ja leu antes do video — parar
    // aqui jogaria isso fora.
    if (!vaiAoApp) mkvass_parar();
    legOverlay = -1; legOverlayEsperando = -1; legOverlayRetomar = 0; legOverlayTV = 0;
    if (i < 0)        { video_escolher_legenda(-1); legenda_desligar(); legExterna = -1; }
    else if (i < emb) {
      const VideoFaixa *f = video_legenda(i);
      int ord = video_legenda_ordinal_mkv(i);
      legenda_desligar(); legExterna = -1;
      // FAIXA DE TEXTO: o overlay do app assume. O pipeline fica com a legenda
      // desligada e o mkvass colhe o texto do MKV a frente do playhead; se ele
      // declarar no-go, faixas_atualizar devolve a faixa ao pipeline. Uma
      // faixa em que ja desistimos vai direto ao pipeline.
      //
      // PELO ORDINAL NOS DOIS ALVOS (#92). Na LG isto passava f->numero — o
      // trackNum da TV — como se fosse TrackNumber do Matroska, e o overlay
      // colhia a faixa de outra lingua. O ordinal e resolvido contra as
      // TrackEntry na sonda do cabecalho.
      //
      // SEM ORDINAL AINDA (sonda nao voltou): a faixa vai a TV por enquanto,
      // a sonda e disparada ja e faixas_atualizar troca para o overlay quando
      // ela voltar com o par. NUNCA em silencio: cada caminho deixa uma linha
      // "[legenda] faixa N -> TV: motivo" — e a linha que faltou no #92 para
      // separar "o app desistiu" de "a TV desenha mal".
      if (vaiAoApp)
        overlayAssumir(i, ord);
      else {
        const char *motivo = motivoTV(i);
        if (f && i != legOverlayNoGo && video_url_atual()[0] && video_mkv_sondado() == 0) {
          legOverlayEsperando = i;
          video_sondar_mkv_agora();
        }
        printf("[legenda] faixa %d (%s, codec=%s) -> TV: %s\n", i, f ? f->rotulo : "?",
               f && f->codec[0] ? f->codec : "?", motivo);
        fflush(stdout);
        video_escolher_legenda(i);
      }
    }
    else {
      const Legenda *l = addons_legenda(i - emb);
      // So marca como ativa se houve o que aplicar: sem a URL o uMS nao recebe
      // nada, e a folha diria "ativa" sobre uma legenda que nunca subiu.
      if (l) {
        /* A fonte e os 16 tamanhos agora sao nossos, nao do firmware webOS. */
        video_escolher_legenda(-1); legenda_carregar(l->url); legExterna = i;
      }
    }
  }
}

static void aplicar(void) {
  if (coluna == 0) {
    if (video_n_audio() > 0) video_escolher_audio(foco[0]);
  } else {
    // A pessoa escolheu: a automatica nao mexe mais nesta sessao, nem se a
    // escolha foi "Desativada".
    legAuto = 0;
    escolherLegenda(foco[1] - 1);
  }
}

// LEGENDA AUTOMATICA (#129). Roda a cada quadro enquanto `legAuto` esta de pe,
// e so decide quando da para decidir bem (ling_legenda_auto). Os prazos existem
// porque as duas listas podem nunca "fechar": a sonda do MKV so dispara com
// buffer saudavel, e numa fonte lenta isso demora; o fio de legendas consulta
// cada addon com 25 s de teto. Vencido o prazo, decide-se com o que ha.
#define FX_AUTO_EMB_MS  30000u   // espera pelos idiomas das embutidas
#define FX_AUTO_FIM_MS  60000u   // desiste de vez: legenda ligada no minuto 5 assusta
static void legendaAutomatica(Uint32 agora) {
  const char *emb[NV_FAIXA_MAX], *add[LEG_MAX];
  const CatItem *ci;
  int nEmb, nAdd = 0, embFechado, addFechado = 1, i, r;
  Uint32 passou;
  if (!legAuto || aberta || !player_aberto() || !player_com_video()) return;
  // Canal ao vivo nao tem legenda de addon nem idioma no arquivo que valha.
  if (player_id_canal()[0]) { legAuto = 0; return; }
  // A lista de faixas so existe depois do sourceInfo (LG) / lerFaixas (Tizen).
  // Antes dele a sonda "ja voltou" por falta de pendencia (ver
  // video_mkv_sondado) e as embutidas pareceriam fechadas e vazias.
  if (!legAutoDesde) legAutoDesde = agora | 1u;
  passou = agora - legAutoDesde;
  if (!video_n_audio() && !video_n_legenda() && passou < 8000u) return;
  nEmb = video_n_legenda();
  if (nEmb > NV_FAIXA_MAX) nEmb = NV_FAIXA_MAX;
  for (i = 0; i < nEmb; i++) { const VideoFaixa *f = video_legenda(i); emb[i] = f ? f->idioma : ""; }
  embFechado = video_mkv_sondado() != 0 || passou >= FX_AUTO_EMB_MS;
  // So confia na lista dos addons quando ela e DESTE titulo: sem imdb o app
  // nao pede legenda nenhuma (app.c), e o que estiver em memoria e do anterior.
  ci = cat_item(player_indice());
  if (ci && ci->imdb[0]) {
    nAdd = addons_n_legendas();
    if (nAdd > LEG_MAX) nAdd = LEG_MAX;
    for (i = 0; i < nAdd; i++) { const Legenda *l = addons_legenda(i); add[i] = l ? l->idioma : ""; }
    addFechado = addons_legendas_prontas();
  }
  if (passou >= FX_AUTO_FIM_MS) embFechado = addFechado = 1;
  r = ling_legenda_auto(ling_legenda(), emb, nEmb, embFechado, add, nAdd, addFechado);
  if (r == LING_AUTO_ESPERA) return;
  legAuto = 0;
  if (r == LING_AUTO_NADA) {
    if (ling_legenda()[0] && strcasecmp(ling_legenda(), "none"))
      printf("[legenda] automatica: nada em '%s' (%d embutida(s), %d de addon)\n",
             ling_legenda(), nEmb, nAdd);
    fflush(stdout);
    return;
  }
  // Ja esta nela (o arquivo marcou a faixa como padrao): nao religa — a nao
  // ser que seja ASS com a TV desenhando: ai o overlay do app assume, que e o
  // motivo do #92 (e o que adota a pre-busca feita antes do video).
  if (r == legendaAtiva() &&
      !(r < nEmb && legOverlay != r && ehOverlay(video_legenda(r)) && video_legenda_ordinal_mkv(r) >= 0))
    return;
  printf("[legenda] automatica: '%s' -> %s %d (%s) aos %u ms\n", ling_legenda(),
         r < nEmb ? "embutida" : "addon", r < nEmb ? r : r - nEmb,
         r < nEmb ? emb[r] : add[r - nEmb], (unsigned)passou);
  fflush(stdout);
  escolherLegenda(r);
}

void faixas_evento(const SDL_Event *e) {
  SDL_Keycode k;
  if (!aberta || e->type != SDL_KEYDOWN) return;
  k = e->key.keysym.sym;
  if (syncFala) {
    if (k == SDLK_AC_BACK || k == SDLK_ESCAPE || k == SDLK_BACKSPACE) {
      syncFala = 0;
    } else if (!syncCapturado && (k == SDLK_RETURN || k == SDLK_KP_ENTER || k == SDLK_SPACE)) {
      // Captura no mesmo relogio que desenha a legenda. posSeg sozinho e a
      // ultima amostra do pipeline e pode atrasar ate uma atualizacao inteira.
      syncTempo = player_posicao_legenda_seg();
      syncDeslocamento = 0;
      syncN = carregarFalas(syncDeslocamento);
      syncAviso = syncN == 0;
      if (syncN) syncCapturado = 1;
    } else if (syncCapturado) {
      int passo = k == SDLK_UP ? -1 : k == SDLK_DOWN ? 1
                : k == SDLK_LEFT || k == SDLK_PAGEUP ? -7
                : k == SDLK_RIGHT || k == SDLK_PAGEDOWN ? 7 : 0;
      if (passo) {
        int anterior = syncInicio + syncFoco;
        syncN = carregarFalas(syncDeslocamento + passo);
        if (syncN) {
          syncDeslocamento += syncInicio + syncFoco - anterior;
          syncAviso = 0;
        } else {
          syncCapturado = 0;
          syncAviso = 1;
        }
      } else if (k == SDLK_RETURN || k == SDLK_KP_ENTER || k == SDLK_SPACE) {
        // legenda_cues consulta posicao + atraso: este e o sinal inverso ao
        // atraso do HTML. Compensamos 300 ms do tempo de reacao ao controle.
        int ajuste;
        ajuste = player_leg_sincronizar_fala(syncTempo, syncCues[syncFoco].inicio);
        if (!ajuste) { syncAviso = 3; return; }
        player_toast(i18n(ajuste == 2
          ? "Deriva da legenda corrigida. Repita em outra parte se necessário."
          : "Atraso corrigido. Repita mais adiante para corrigir o FPS."), 4500);
        syncFala = 0;
      }
    }
    return;
  }
  montarGrupos();
  if (focoIdioma >= nGrupos) focoIdioma = nGrupos - 1;
  if (grupoDaFaixa(legendaAtiva()) == 0) focoOpcoes = 0;
  if (k == SDLK_AC_BACK || k == SDLK_ESCAPE || k == SDLK_BACKSPACE) {
    if (paginaEstilo || paginaMix) {
      paginaEstilo = paginaMix = 0;
      focoCabecalho = !modo && video_n_audio() == 0;
      coluna = modo;
    } else aberta = 0;
    return;
  }
  if (focoCabecalho) {
    if (k == SDLK_RETURN || k == SDLK_KP_ENTER || k == SDLK_SPACE) {
      if (modo) { paginaEstilo = !paginaEstilo; coluna = paginaEstilo ? FX_COL_ESTILO : 1; estiloLado = -1; }
      else paginaMix = !paginaMix;
      focoCabecalho = 0;
      return;
    }
    if (k == SDLK_DOWN && (modo || (video_n_audio() > 0 && !paginaMix))) focoCabecalho = 0;
    return;
  }
  if (paginaMix) {
    if (k == SDLK_UP) focoCabecalho = 1;
    return;
  }
  if (paginaEstilo) {
    if (k == SDLK_UP) {
      if (foco[FX_COL_ESTILO] > 0) foco[FX_COL_ESTILO]--;
      else focoCabecalho = 1;
    } else if (k == SDLK_DOWN && foco[FX_COL_ESTILO] < FX_N_ESTILO - 1)
      foco[FX_COL_ESTILO]++;
    else if (k == SDLK_LEFT) {
      estiloLado = -1;
      if (foco[FX_COL_ESTILO] == 7) ajustarEstilo(7, -1);
    }
    else if (k == SDLK_RIGHT) {
      estiloLado = 1;
      if (foco[FX_COL_ESTILO] == 7) ajustarEstilo(7, 1);
    }
    else if (k == SDLK_RETURN || k == SDLK_KP_ENTER || k == SDLK_SPACE) {
      if (foco[FX_COL_ESTILO] == 8) {
        syncFala = 1; syncCapturado = syncN = syncAviso = 0;
        syncDeslocamento = syncInicio = syncTotal = 0;
      } else ajustarEstilo(foco[FX_COL_ESTILO],estiloLado);
    }
    ajustarRolagem();
    return;
  }
  if (!modo) {
    coluna = 0;
    if (k == SDLK_UP) {
      if (foco[0] > 0) foco[0]--;
      else focoCabecalho = 1;
    } else if (k == SDLK_DOWN && foco[0] < nLinhas(0) - 1) foco[0]++;
    else if (k == SDLK_RETURN || k == SDLK_KP_ENTER || k == SDLK_SPACE) aplicar();
    ajustarRolagem();
    return;
  }
  coluna = 1;
  if (k == SDLK_UP) {
    if (focoOpcoes) {
      if (focoOpcao > 0) focoOpcao--;
      else focoOpcoes = 0;
    } else if (focoIdioma > 0) focoIdioma--;
    else focoCabecalho = 1;
  } else if (k == SDLK_DOWN) {
    if (focoOpcoes) {
      int g = grupoDaFaixa(legendaAtiva());
      if (g > 0 && focoOpcao < grupos[g].total - 1) focoOpcao++;
    } else if (focoIdioma < nGrupos - 1) focoIdioma++;
    else if (grupoDaFaixa(legendaAtiva()) > 0) focoOpcoes = 1;
  } else if (k == SDLK_RIGHT) {
    if (grupoDaFaixa(legendaAtiva()) > 0) focoOpcoes = 1;
  } else if (k == SDLK_LEFT) focoOpcoes = 0;
  else if (k == SDLK_RETURN || k == SDLK_KP_ENTER || k == SDLK_SPACE) {
    int faixa;
    if (focoOpcoes) faixa = faixaDaOpcao(grupoDaFaixa(legendaAtiva()), focoOpcao);
    else faixa = focoIdioma ? faixaDaOpcao(focoIdioma, 0) : -1;
    if (faixa >= -1 && (faixa >= 0 || !focoIdioma)) {
      foco[1] = faixa + 1;
      aplicar();
      if (!focoOpcoes && faixa >= 0) { focoOpcoes = 1; focoOpcao = 0; }
    }
  }
}

static const char *motivoNoGo(int e) {
  return e == MKVASS_NOGO_NAO_MKV    ? "nao e MKV"
       : e == MKVASS_NOGO_SEM_RANGE  ? "servidor sem Range"
       : e == MKVASS_NOGO_FAIXA      ? "formato de legenda incompatível"
       : e == MKVASS_NOGO_SEM_INDICE ? "sem indice da faixa"
       : e == MKVASS_NOGO_SEM_REL    ? "sem CueRelativePosition"
       : e == MKVASS_NOGO_REDE       ? "rede"
       : e == MKVASS_NOGO_HTTP       ? "servidor recusou"
       : e == MKVASS_NOGO_RESTO      ? "servidor recusou o resto" : "?";
}

// O aviso da queda DEFINITIVA, com o motivo que o mkvass viu. Antes todo
// no-go que nao fosse "sem Range" ou "rede" dizia "arquivo sem indice".
static void avisarQueda(int e) {
  char b[160]; int http = 0;
  mkvass_ultima_falha(&http, NULL);
  if (e == MKVASS_NOGO_HTTP && http > 0)
    snprintf(b, sizeof b, i18n("Legenda: a TV vai desenhar (o servidor recusou: HTTP %d)"), http);
  else
    snprintf(b, sizeof b, "%s",
             e == MKVASS_NOGO_SEM_RANGE ? i18n("Legenda: a TV vai desenhar (servidor sem Range)")
             : e == MKVASS_NOGO_HTTP    ? i18n("Legenda: a TV vai desenhar (o servidor recusou)")
             : e == MKVASS_NOGO_NAO_MKV ? i18n("Legenda: a TV vai desenhar (a fonte n\xc3\xa3o \xc3\xa9 MKV)")
             : e == MKVASS_NOGO_FAIXA   ? i18n("Legenda: a TV vai desenhar (formato incompat\xc3\xadvel)")
             : i18n("Legenda: a TV vai desenhar (arquivo sem \xc3\xadndice)"));
  player_toast(b, 6000);
}

void faixas_atualizar(float dt, Uint32 agora) {
  anim = anim_mola(anim, aberta ? 1.0f : 0.0f, dt, NV_MOLA_TELA);
  legendaAutomatica(agora);
  // Recuo vencido: a MESMA faixa de novo. O overlay nao foi desligado — o que
  // ja estava colhido continua na tela, e o fio novo retoma do sidecar parcial.
  if (legOverlay >= 0 && legOverlayRetomar && (Sint32)(agora - legOverlayRetomar) >= 0) {
    legOverlayRetomar = 0;
    printf("[legenda] faixa %d: nova tentativa %d do mkvass (%s)\n", legOverlay, legOverlayFalhas,
           legOverlayTV ? "a TV desenha enquanto isso" : "overlay do app mantido");
    fflush(stdout);
    // Com a TV desenhando, o fio novo so religa o overlay com fala NOVA: o
    // sidecar parcial nao volta por cima da legenda da TV.
    if (legOverlayTV) mkvass_retomar_segurando(); else mkvass_retomar();
  }
  // PROGRESSO: chegou fala nova desde a ultima falha (ou a faixa fechou).
  // Zera a contagem, e se a TV estava desenhando por enquanto, a faixa VOLTA
  // ao overlay: nativa desligada, o app desenha o que acabou de entregar.
  if (legOverlay >= 0 && !legOverlayRetomar && !mkvass_nogo() &&
      (legOverlayFalhas || legOverlayTV)) {
    int col = 0, e = mkvass_estado();
    mkvass_estatisticas(NULL, NULL, &col, NULL);
    if ((e == MKVASS_COMPLETO || (e == MKVASS_COLHENDO && col > legOverlayColhidos)) &&
        legenda_ligada_em(legenda_geracao())) {
      printf("[legenda] faixa %d: o mkvass voltou a entregar (%d blocos, depois de %d falha(s))%s\n",
             legOverlay, col, legOverlayFalhas, legOverlayTV ? ": a faixa VOLTA ao app (nativa desligada)" : "");
      fflush(stdout);
      if (legOverlayTV) {
        video_escolher_legenda(-1);
        player_toast(i18n("Legenda: o app voltou a desenhar"), 4000);
      }
      legOverlayTV = 0; legOverlayFalhas = 0; legOverlayColhidos = col;
    }
  }
  // O mkvass declarou no-go. Passageiro: agenda outra tentativa — sempre — e
  // a faixa fica com o app nas primeiras; depois a TV desenha por enquanto.
  // Definitivo: devolve a faixa ao pipeline da TV de vez, e a folha diz por
  // que. Polling por quadro e o que ha: o no-go nasce num fio de rede e este
  // modulo nao tem callback — e uma comparacao de inteiro.
  if (legOverlay >= 0 && !legOverlayRetomar && mkvass_nogo()) {
    int i = legOverlay, e = mkvass_estado(), http = 0, curl = 0, col = 0;
    long recuo = mkvass_recuo_ms(e, legOverlayFalhas, legOverlayRecusas);
    mkvass_ultima_falha(&http, &curl);
    mkvass_estatisticas(NULL, NULL, &col, NULL);
    if (recuo > 0) {
      legOverlayFalhas++;
      if (e == MKVASS_NOGO_SEM_RANGE) legOverlayRecusas++;
      legOverlayRetomar = (agora + (Uint32)recuo) | 1u;
      if (col > legOverlayColhidos) legOverlayColhidos = col;
      printf("[legenda] mkvass falha PASSAGEIRA %d (%s, HTTP %d, curl %d) na faixa %d: tentativa %d em %ld ms, %s\n",
             e, motivoNoGo(e), http, curl, i, legOverlayFalhas, recuo,
             legOverlayTV ? "a TV segue desenhando por enquanto" : "overlay do app mantido");
      // Recuo LONGO, e dito com todas as letras: o registro do relato mostrava
      // tentativas a 2 s e 5 s batendo na mesma recusa.
      if (e == MKVASS_NOGO_RESTO)
        printf("[mkvass] servidor recusou o resto: esperando %ld s\n", recuo / 1000);
      fflush(stdout);
      // Sem nada colhido nao ha o que manter no overlay; depois de
      // MKVASS_TENTATIVAS_OVERLAY tentativas sem fala nova, a pessoa ja
      // ficou tempo demais sem legenda. Nos dois casos a TV desenha POR
      // ENQUANTO, e a tentativa seguinte que entregar traz a faixa de volta.
      if (!legOverlayTV && (col == 0 || legOverlayFalhas > MKVASS_TENTATIVAS_OVERLAY)) {
        legOverlayTV = 1;
        printf("[legenda] faixa %d: a TV desenha POR ENQUANTO (%d colhidos), o app segue tentando\n", i, col);
        fflush(stdout);
        player_toast(i18n("Legenda: a TV desenha por enquanto (falha de rede); o app tenta de novo"), 6000);
        legenda_desligar();
        video_escolher_legenda(i);
      }
    } else {
      int estavaNaTV = legOverlayTV;
      legOverlay = -1; legOverlayNoGo = i; legOverlayNoGoEstado = e; legOverlayTV = 0;
      printf("[legenda] mkvass no-go %d (%s, HTTP %d, curl %d) na faixa %d: a legenda VOLTA para a TV "
             "(nativa religada)\n", e, motivoNoGo(e), http, curl, i);
      fflush(stdout);
      // Aviso na tela: antes a queda era muda e a pessoa so via a legenda
      // piscar e cortar, sem saber que o app tinha desistido.
      avisarQueda(e);
      // O overlay tinha o que colheu antes de desistir: sai, senao a TV e o
      // app desenhariam a mesma fala.
      legenda_desligar();
      if (!estavaNaTV) video_escolher_legenda(i);
    }
  }
  // A sonda voltou para uma faixa escolhida antes dela: agora da para decidir.
  if (legOverlayEsperando >= 0) {
    int i = legOverlayEsperando;
    const VideoFaixa *f = video_legenda(i);
    video_sondar_mkv_agora();          // se o sourceInfo chegou depois da escolha
    if (video_mkv_sondado() != 0) {
      int ord = video_legenda_ordinal_mkv(i);
      legOverlayEsperando = -1;
      if (f && ehOverlay(f) && ord >= 0 && video_legenda_atual() == i && video_url_atual()[0]) {
        printf("[legenda] sonda voltou: faixa %d compatível, o app assume\n", i);
        overlayAssumir(i, ord);
      } else {
        printf("[legenda] sonda voltou: faixa %d (%s, codec=%s) fica na TV: %s\n", i,
               f ? f->rotulo : "?", f && f->codec[0] ? f->codec : "?", motivoTV(i));
        fflush(stdout);
        // Sem par no arquivo e uma falha do casamento, nao da TV: avisa, para
        // a pessoa poder mandar o log em vez de achar que a legenda e assim.
        if (f && !f->codec[0] && video_mkv_sondado() == 1)
          player_toast(i18n("Legenda: n\xc3\xa3o deu para casar as faixas com o arquivo; a TV desenha"), 6000);
      }
    }
  }
}

// Traz a linha focada para dentro da janela visivel, mexendo o MINIMO: so
// quando o foco passa de uma das bordas. Rolar sempre para centralizar faria a
// lista inteira andar a cada tecla, que num D-pad e desorientador.
static void ajustarRolagem(void) {
  int n = nLinhas(coluna), f = foco[coluna], *r = &rolagem[coluna];
  if (visiveis < 1) return;
  if (f < *r) *r = f;
  else if (f >= *r + visiveis) *r = f - visiveis + 1;
  if (*r > n - visiveis) *r = n - visiveis;
  if (*r < 0) *r = 0;
}

static void linhaPainel(float x, float y, float w, const char *rot,
                         const char *sub, int focado, int ativo, int apagado,
                         float a) {
  GfxRect r = { x, y, w, 70 };
  float fr, fg, fb;
  corFocoFaixa(&fr, &fg, &fb);
  if (focado) {
    gfx_cor(r, .27f, fr, fg, fb, a);
    gfx_anel(r, .27f, 2, fr, fg, fb, a);
  } else if (ativo) gfx_cor(r, .27f, fr, fg, fb, .13f * a);
  int c = focado ? ajustes_tinta_foco() : apagado ? 128 : 245;
  int s = focado ? ajustes_tinta_foco2() : apagado ? 112 : 170;
  float textoW = w - (ativo ? 104 : 52);
  txt_desenhar_alpha(txt_linha_corta(TXT_BODY, rot, c,c,c,255,textoW),
                    x+22, y+(sub && *sub ? 6 : 19), a);
  if (sub && *sub)
    txt_desenhar_alpha(txt_linha_corta(TXT_PG_FIM, sub, s,s,s,255,textoW),
                      x+22, y+37, a);
  if (ativo)
    txt_desenhar_alpha(txt_linha(TXT_BODY,"✓",c,c,c,255),x+w-43,y+17,a);
}

static void linhaEstilo(float x, float y, float w, int i, int focado, float a) {
  char valor[64];
  int apagado = estiloPreservadoAss(i);
  valorEstilo(i,valor,sizeof valor);
  if (i == 8 || i == FX_N_ESTILO-1) {
    linhaPainel(x,y,w,i18n(EST_ROT[i]),valor,focado,0,apagado,a);
    return;
  }
  GfxRect menos = {x+8,y+9,52,52}, mais = {x+w-60,y+9,52,52};
  GfxRect passo[2] = {menos,mais};
  float fr,fg,fb; corFocoFaixa(&fr,&fg,&fb);
  for (int j=0;j<2;j++) {
    int sel = focado && !apagado && (j ? estiloLado>0 : estiloLado<0);
    gfx_cor(passo[j],.3f,sel?fr:.15f,sel?fg:.15f,sel?fb:.15f,
            (sel?1.f:.75f)*a);
    gfx_anel(passo[j],.3f,2,sel?fr:.8f,sel?fg:.8f,sel?fb:.8f,
              (sel?1.f:.18f)*a);
    const char *simbolo = j ? "+" : "−";
    TxtLinha t = txt_linha(TXT_BODY,simbolo,
                           sel?ajustes_tinta_foco():apagado?110:235,
                           sel?ajustes_tinta_foco():apagado?110:235,
                           sel?ajustes_tinta_foco():apagado?110:235,255);
    txt_desenhar_alpha(t,passo[j].x+(passo[j].w-t.w)*.5f,
                        passo[j].y+(passo[j].h-t.h)*.5f,a);
  }
  int c=apagado?128:245, sub=apagado?112:170;
  TxtLinha l=txt_linha_corta(TXT_BODY,i18n(EST_ROT[i]),c,c,c,255,w-160);
  txt_desenhar_alpha(l,x+(w-l.w)*.5f,y+5,a);
  l=txt_linha_corta(TXT_PG_FIM,valor,sub,sub,sub,255,w-160);
  txt_desenhar_alpha(l,x+(w-l.w)*.5f,y+38,a);
}

static int rolarPara(int focoLinha, int total, int vis, int atual) {
  if (vis < 1) return 0;
  if (focoLinha < atual) atual = focoLinha;
  if (focoLinha >= atual + vis) atual = focoLinha - vis + 1;
  if (atual > total - vis) atual = total - vis;
  return atual < 0 ? 0 : atual;
}

void faixas_desenhar(Uint32 agora) {
  (void)agora;
  if (anim < .01f) return;
  float a = anim, h, y, contentX = FX_X + 32, contentW = FX_W - 64;
  int ativoGrupo, nAudio = video_n_audio();
  montarGrupos();
  ativoGrupo = grupoDaFaixa(legendaAtiva());
  if (focoIdioma >= nGrupos) focoIdioma = nGrupos - 1;
  if (modo) h = paginaEstilo || ativoGrupo > 0 ? 850 : 152 + nGrupos*FX_LINHA;
  else h = paginaMix ? 340 : 260 + (nAudio > 2 ? (nAudio-2)*FX_LINHA : 0);
  if (h > (modo ? 850 : 720)) h = modo ? 850 : 720;
  y = 1024 - h;
  gfx_cor((GfxRect){0,0,NV_TELA_W,NV_TELA_H},0,0,0,0,.58f*a);
  gfx_cor((GfxRect){FX_X,y,FX_W,h},.06f,.02f,.02f,.02f,.96f*a);
  const char *titulo = modo ? paginaEstilo ? i18n("ESTILO DA LEGENDA") : i18n("LEGENDAS")
                           : paginaMix ? i18n("MIXAGEM") : i18n("ÁUDIO");
  const char *acao = modo ? paginaEstilo ? i18n("Legendas") : i18n("Ajustes")
                         : paginaMix ? i18n("Áudio") : i18n("Ajustes");
  txt_desenhar_alpha(txt_linha(TXT_PG_ROTULO,titulo,172,172,172,255),
                    contentX+20,y+42,a);
  GfxRect bot = { FX_X+FX_W-210, y+27, 174, 52 };
  gfx_cor(bot,.3f, focoCabecalho ? .30f : .12f,
          focoCabecalho ? .30f : .12f, focoCabecalho ? .30f : .12f,
          focoCabecalho ? a : .70f*a);
  if (focoCabecalho) {
    float fr,fg,fb; corFocoFaixa(&fr,&fg,&fb);
    gfx_cor(bot,.3f,fr,fg,fb,a);
    gfx_anel(bot,.3f,2,fr,fg,fb,a);
  } else gfx_anel(bot,.3f,2,.7f,.7f,.7f,.28f*a);
  TxtLinha bt = txt_linha(TXT_PG_ROTULO,acao,
                          focoCabecalho?ajustes_tinta_foco():242,
                          focoCabecalho?ajustes_tinta_foco():242,
                          focoCabecalho?ajustes_tinta_foco():242,255);
  txt_desenhar_alpha(bt,bot.x+(bot.w-bt.w)*.5f,bot.y+(bot.h-bt.h)*.5f,a);
  gfx_cor((GfxRect){contentX+8,y+96,contentW-16,1},0,1,1,1,.18f*a);
  float inicio = y+116, fim = y+h-28;
  if (paginaMix) {
    linhaPainel(contentX,inicio,contentW,i18n("Amplificação de áudio"),
                i18n("Indisponível neste dispositivo"),0,0,1,a);
    linhaPainel(contentX,inicio+FX_LINHA,contentW,
                i18n("Salvar amplificação: Desligado"),
                i18n("A mixagem não está disponível no player nativo"),0,0,1,a);
    return;
  }
  if (paginaEstilo) {
    int vis = (int)((fim-inicio)/FX_LINHA);
    if (vis < 1) vis = 1;
    visiveis = vis; coluna = FX_COL_ESTILO; ajustarRolagem();
    gfx_recorte(contentX,inicio,contentW,fim-inicio);
    for (int i = rolagem[FX_COL_ESTILO]; i < FX_N_ESTILO && i < rolagem[FX_COL_ESTILO]+vis; i++) {
      linhaEstilo(contentX,inicio+(i-rolagem[FX_COL_ESTILO])*FX_LINHA,
                  contentW,i,!focoCabecalho && foco[FX_COL_ESTILO]==i,a);
    }
    gfx_sem_recorte();
    if (syncFala) {
      GfxRect caixa = { 340, 165, 1240, 750 };
      gfx_cor((GfxRect){0,0,NV_TELA_W,NV_TELA_H},0,0,0,0,.82f*a);
      gfx_cor(caixa,.04f,.055f,.055f,.065f,a);
      txt_desenhar_alpha(txt_linha(TXT_TITULO3,i18n("Sincronizar por fala"),255,255,255,255),
                        caixa.x+56,caixa.y+42,a);
      if (!syncCapturado) {
        const char *aviso = syncAviso
          ? i18n("Sem falas disponíveis. Escolha uma legenda renderizada pelo app.")
          : i18n("Aperte OK no início da fala e escolha-a. Repita mais adiante para corrigir a deriva.");
        txt_bloco(TXT_BODY,aviso,205,205,210,caixa.x+56,caixa.y+180,
                  caixa.w-112,42,a,3);
      } else {
        txt_desenhar_alpha(txt_linha(TXT_BODY,i18n("Selecione a fala que você ouviu:"),205,205,210,255),
                          caixa.x+56,caixa.y+122,a);
        char contador[48];
        snprintf(contador,sizeof contador,"%d / %d",syncInicio+syncFoco+1,syncTotal);
        TxtLinha cont = txt_linha(TXT_PG_ROTULO,contador,180,180,185,255);
        txt_desenhar_alpha(cont,caixa.x+caixa.w-56-cont.w,caixa.y+122,a);
        for (int i = 0; i < syncN; i++) {
          GfxRect linha = {caixa.x+48,caixa.y+192+i*69,caixa.w-96,62};
          if (i == syncFoco) {
            float fr,fg,fb; corFocoFaixa(&fr,&fg,&fb);
            gfx_cor(linha,.08f,fr,fg,fb,a);
          }
          char rot[890];
          int min = (int)syncCues[i].inicio / 60;
          double seg = syncCues[i].inicio - min*60;
          snprintf(rot,sizeof rot,"%02d:%05.2f  %s",min,seg,syncCues[i].texto);
          for (char *p = rot; *p; p++) if (*p == '\n' || *p == '\r') *p = ' ';
          txt_desenhar_alpha(txt_linha_corta(TXT_BODY,rot,235,235,240,255,linha.w-32),
                            linha.x+16,linha.y+10,a);
        }
      }
      txt_desenhar_alpha(txt_linha(TXT_PG_FIM,
                        syncAviso == 3
                          ? i18n("Falas incompatíveis ou ajuste inicial acima de 3 min. Tente outra fala.")
                          : i18n("↑↓ falas · ←→ pular 7 · OK confirmar · Voltar cancelar"),
                        syncAviso == 3 ? 230 : 165,
                        syncAviso == 3 ? 170 : 165,
                        syncAviso == 3 ? 120 : 170,255),
                        caixa.x+56,caixa.y+caixa.h-52,a);
    }
    return;
  }
  if (!modo) {
    int vis = (int)((fim-inicio)/FX_LINHA);
    if (vis < 1) vis = 1;
    visiveis = vis; coluna = 0; ajustarRolagem();
    gfx_recorte(contentX,inicio,contentW,fim-inicio);
    for (int i = rolagem[0]; i < nAudio && i < rolagem[0]+vis; i++) {
      const VideoFaixa *f = video_audio(i);
      linhaPainel(contentX,inicio+(i-rolagem[0])*FX_LINHA,contentW,
                   f ? f->rotulo : "",f ? i18n(ling_nome(f->idioma)) : "",
                   !focoCabecalho && foco[0]==i,i==video_audio_atual(),0,a);
    }
    gfx_sem_recorte();
    if (!nAudio)
      txt_bloco(TXT_PG_FIM,i18n("Nenhuma faixa de áudio disponível nesta fonte."),
                180,180,180,contentX+20,inicio+22,contentW-40,28,a,2);
    return;
  }
  int linguaVis = (int)((ativoGrupo > 0 ? 300.f : fim-inicio)/FX_LINHA);
  if (linguaVis < 1) linguaVis = 1;
  if (linguaVis > nGrupos) linguaVis = nGrupos;
  rolagemIdioma = rolarPara(focoIdioma,nGrupos,linguaVis,rolagemIdioma);
  float linguaH = linguaVis*FX_LINHA;
  gfx_recorte(contentX,inicio,contentW,linguaH);
  for (int g = rolagemIdioma; g < nGrupos && g < rolagemIdioma+linguaVis; g++) {
    char sub[64];
    if (g) snprintf(sub,sizeof sub,i18n("%d faixa(s)"),grupos[g].total);
    else sub[0]=0;
    linhaPainel(contentX,inicio+(g-rolagemIdioma)*FX_LINHA,contentW,
                grupos[g].nome,sub,!focoCabecalho && !focoOpcoes && focoIdioma==g,
                g==ativoGrupo,0,a);
  }
  gfx_sem_recorte();
  if (ativoGrupo <= 0) return;
  float optsY = inicio+linguaH+28;
  gfx_cor((GfxRect){contentX+8,optsY-14,contentW-16,1},0,1,1,1,.14f*a);
  int optsVis = (int)((fim-optsY)/FX_LINHA);
  if (optsVis < 1) optsVis = 1;
  if (focoOpcao >= grupos[ativoGrupo].total) focoOpcao = grupos[ativoGrupo].total-1;
  if (focoOpcao < 0) focoOpcao = 0;
  rolagemOpcao = rolarPara(focoOpcao,grupos[ativoGrupo].total,optsVis,rolagemOpcao);
  gfx_recorte(contentX,optsY,contentW,fim-optsY);
  for (int o=rolagemOpcao; o<grupos[ativoGrupo].total && o<rolagemOpcao+optsVis; o++) {
    int i = faixaDaOpcao(ativoGrupo,o);
    const char *marca = NULL, *rot = rotuloLegenda(i,&marca);
    if (!marca) marca = i < video_n_legenda() ? i18n("Incorporada") : "OpenSubtitles";
    linhaPainel(contentX,optsY+(o-rolagemOpcao)*FX_LINHA,contentW,
                rot,marca,!focoCabecalho && focoOpcoes && focoOpcao==o,
                i==legendaAtiva(),0,a);
  }
  gfx_sem_recorte();
}
