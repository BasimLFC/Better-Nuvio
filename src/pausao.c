#include "pausao.h"
#include "catalogo.h"
#include "ajustes.h"
#include "gfx.h"
#include "text.h"
#include "anim.h"
#include "layout.h"
#include "artehero.h"
#include "tex_cache.h"
#include <stdio.h>
#include <string.h>
#include <time.h>

// Os cinco segundos do web (playerScreen.js:567). Nao e um numero de gosto: e o
// que separa "parei um instante" de "parei para ler". Encurtar faz o painel
// pular na cara de quem so ajustou o volume.
#define PAUSAO_ESPERA_MS  5000u

// Mesmas medidas do overlay de pausa do Enhanced webOS em 1920x1080.
#define PAUSAO_X          56.0f
#define PAUSAO_LARG     1808.0f
#define PAUSAO_LD_SIN     40.0f
#define PAUSAO_SIN_LINHAS     4
#define PAUSAO_TETO       80.0f
#define PAUSAO_CHIP_H     44.0f
#define PAUSAO_CHIP_PAD   18.0f
#define PAUSAO_CHIP_GAP   10.0f

#define PAUSAO_ELENCO_MAX 8

static int    visivel;
static float  anim;            // 0..1, a entrada por mola
static Uint32 desdeQuando;     // quando a condicao passou a valer; 0 = nao vale
static int    idxItem = -1;
static char   epLinha[220];

void pausao_fechar(void) {
  visivel = 0;
  anim = 0.0f;
  desdeQuando = 0;
  idxItem = -1;
  epLinha[0] = 0;
}

void pausao_atualizar(float dt, Uint32 agora, int podeSubir, int idx,
                      const char *linhaEp) {
  idxItem = idx;
  snprintf(epLinha, sizeof epLinha, "%s", linhaEp ? linhaEp : "");

  // O ajuste e consultado AQUI e nao na abertura: desligar a opcao com o painel
  // de pe tem de derrubar o painel, e nao valer so no filme seguinte.
  if (!podeSubir || !ajustes_pausa_overlay()) {
    // schedulePauseOverlay/syncPauseOverlayState (:7397): condicao que cai
    // derruba o painel e ZERA o relogio. Rearmar de onde parou faria uma
    // sequencia de pausas curtas somar cinco segundos e o painel subir sozinho
    // no meio de uma cena.
    visivel = 0;
    desdeQuando = 0;
  } else {
    if (!desdeQuando) desdeQuando = agora;
    if (!visivel && agora - desdeQuando >= PAUSAO_ESPERA_MS) visivel = 1;
  }

  anim = anim_mola(anim, visivel ? 1.0f : 0.0f, dt,
                   visivel ? NV_MOLA_FOCO : NV_MOLA_DESFOCO);
  if (!visivel && anim < 0.004f) anim = 0.0f;
}

// Enquanto o painel ainda esta saindo ele continua desenhado, mas ja NAO e
// visivel para quem pergunta: se fosse, o player manteria os controles
// recolhidos durante a saida e a barra so voltaria depois do fade.
int pausao_visivel(void) { return visivel; }

int pausao_evento(const SDL_Event *e) {
  SDL_Keycode k;
  if (!visivel || !e || e->type != SDL_KEYDOWN) return PAUSAO_LIVRE;
  k = e->key.keysym.sym;

  // O Back NAO e tratado aqui, e essa e uma divergencia deliberada do web. La
  // (:22138) o Back derruba o painel e ainda segue para a regra seguinte;
  // aqui o Back e a unica saida da reproducao, e roubar o primeiro toque para
  // fechar um painel informativo faria a pessoa apertar duas vezes para sair de
  // um filme. Quem quer sair, sai.
  if (k == SDLK_ESCAPE || k == SDLK_AC_BACK || k == SDLK_BACKSPACE ||
      k == SDLK_DELETE) return PAUSAO_LIVRE;

  visivel = 0;
  desdeQuando = 0;

  // playerScreen.js:22212 — OK/Play com o painel de pe derruba o painel E
  // retoma. E o gesto obvio: quem esta olhando a ficha e aperta o centro quer
  // voltar ao filme, nao so fechar uma caixa.
  if (k == SDLK_RETURN || k == SDLK_KP_ENTER || k == SDLK_SPACE)
    return PAUSAO_RETOMAR;

  // Qualquer outra tecla (:22218): derruba o painel e devolve os controles. O
  // relogio dos 5s recomeca sozinho no proximo `pausao_atualizar`, porque
  // `desdeQuando` foi zerado — que e o `schedulePauseOverlay()` do web.
  return PAUSAO_CONSUMIU;
}

void pausao_desenhar(Uint32 agora, float baseY) {
  const CatItem *c;
  float a = anim, y, alt = 0.0f, hSin = 0.0f, larg;
  float logoW = 0.0f, logoH = 0.0f;
  GLuint logo = 0;
  const char *marca;
  char meta[192];
  const char *sepEp = NULL;
  TxtLinha lKick, lTit, lMeta, lEp, lCast;
  int temMeta = 0, temEp = 0, temCast, i;
  (void)agora;
  (void)baseY;

  if (a <= 0.004f) return;
  c = cat_item(idxItem);
  if (!c) return;

  larg = PAUSAO_LARG;
  marca = artehero_logo_sessao(c);
  logo = marca ? tex_obter_larg_qualquer(marca, 520) : 0;
  if (logo) {
    float ar = tex_aspecto(marca);
    logoW = 520.0f;
    logoH = ar > 0.0f ? logoW / ar : 120.0f;
    if (logoH > 120.0f) { logoH = 120.0f; logoW = logoH * ar; }
  }
  lKick = txt_linha(TXT_MINI, "VOCÊ ESTÁ ASSISTINDO", 214, 216, 222, 255);
  lTit  = txt_linha_corta(TXT_TITULO2, c->titulo, 255, 255, 255, 255, larg);
  alt = (float)lKick.h + 14.0f + (logo ? logoH : (float)lTit.h) + 14.0f;

  meta[0] = 0;
  // O Enhanced mostra apenas ano e codigo do episodio, sem genero/temporadas.
  if (c->meta[0] && c->meta[0] >= '0' && c->meta[0] <= '9')
    snprintf(meta, sizeof meta, "%.4s", c->meta);
  if (epLinha[0]) {
    const char *sep = strstr(epLinha, " · ");
    size_t n = sep ? (size_t)(sep - epLinha) : strlen(epLinha);
    sepEp = sep;
    if (n > 0 && n < 32) {
      char cod[32];
      snprintf(cod, sizeof cod, "%.*s", (int)n, epLinha);
      if (meta[0]) {
        char junto[192];
        snprintf(junto, sizeof junto, "%s • %s", meta, cod);
        snprintf(meta, sizeof meta, "%s", junto);
      } else {
        snprintf(meta, sizeof meta, "%s", cod);
      }
    }
  }
  if (meta[0]) {
    lMeta = txt_linha_corta(TXT_PG_FIM, meta, 232, 234, 240, 255, larg);
    temMeta = 1;
    alt += (float)lMeta.h + 14.0f;
  }
  if (sepEp && sepEp[3]) {
    lEp = txt_linha_corta(TXT_PLR_CORPO, sepEp + 3, 240, 241, 246, 255, larg);
    temEp = 1;
    alt += (float)lEp.h + 14.0f;
  }
  // x = -1 mede sem desenhar. E o mesmo recurso que detail.c usa para saber a
  // altura da sinopse antes de decidir o resto da coluna.
  if (c->sinopse[0]) {
    hSin = txt_bloco(TXT_DET_SIN, c->sinopse, 214, 216, 222, -1.0f, 0.0f,
                     larg, PAUSAO_LD_SIN, 0.0f, PAUSAO_SIN_LINHAS);
    alt += hSin + 14.0f;
  }
  temCast = c->nElenco > 0;
  if (temCast) {
    lCast = txt_linha(TXT_MINI, "Elenco", 226, 228, 234, 255);
    alt += 20.0f + (float)lCast.h + 12.0f + PAUSAO_CHIP_H;
  }
  y = (NV_TELA_H - alt) * 0.5f;
  if (y < PAUSAO_TETO) y = PAUSAO_TETO;

  // A sombra cobre a cena inteira, como as duas rampas do CSS. Um unico shader
  // compoe a queda para a base e para a direita sem custo de blur na GPU da TV.
  { GfxRect tela = {0, 0, NV_TELA_W, NV_TELA_H};
    gfx_cor(tela, 0, 0, 0, 0, 0.28f * a);
    gfx_rect(tela, 0, GFX_VEU, 0, 0, 0, 0, 0, 0, 0, 0.72f * a); }
  { time_t t = time(NULL); struct tm lt; char hora[8];
    localtime_r(&t, &lt); strftime(hora, sizeof hora, "%H:%M", &lt);
    TxtLinha lh = txt_linha(TXT_PG_RELOGIO, hora, 255, 255, 255, 255);
    txt_desenhar_alpha(lh, NV_TELA_W - PAUSAO_X - lh.w, PAUSAO_X, a * 0.90f); }

  txt_desenhar_alpha(lKick, PAUSAO_X, y, a * 0.64f);
  y += lKick.h + 14.0f;
  if (logo) {
    gfx_rect((GfxRect){PAUSAO_X, y, logoW, logoH}, logo,
             tex_marca_escura(marca) ? GFX_MARCA : GFX_TEXTO,
             0, 0, 0, 0, 1, 1, 1, a);
    y += logoH + 14.0f;
  } else {
    txt_desenhar_alpha(lTit, PAUSAO_X, y, a);
    y += lTit.h + 14.0f;
  }
  if (temMeta) { txt_desenhar_alpha(lMeta, PAUSAO_X, y, a * 0.72f); y += lMeta.h + 14.0f; }
  if (temEp)   { txt_desenhar_alpha(lEp, PAUSAO_X, y, a * 0.94f); y += lEp.h + 14.0f; }
  if (hSin > 0.0f) {
    // PASSO ENTRE LINHAS, nao vao entre elas. O valor anterior era 8, e por
    // isso as duas linhas da sinopse eram desenhadas quase uma sobre a outra —
    // o "texto embolado" da foto. 40 e o mesmo passo que a pagina de titulo usa
    // para este estilo (NV_DETW2_LD_SIN).
    txt_bloco(TXT_DET_SIN, c->sinopse, 214, 216, 222, PAUSAO_X, y, larg,
              PAUSAO_LD_SIN, a * 0.84f, PAUSAO_SIN_LINHAS);
    y += hSin + 14.0f;
  }

  // ELENCO. Pastilhas so com o NOME, como o .player-pause-cast-chip do web
  // (:7480) — o papel do personagem esta no CatItem, mas o web nao o mostra
  // nesta tela e acrescenta-lo dobraria a largura de cada pastilha.
  if (temCast) {
    float x = PAUSAO_X;
    y += 20.0f;
    txt_desenhar_alpha(lCast, PAUSAO_X, y, a * 0.58f);
    y += lCast.h + 12.0f;
    for (i = 0; i < c->nElenco && i < PAUSAO_ELENCO_MAX; i++) {
      TxtLinha l = txt_linha(TXT_MINI, c->elenco[i].nome, 240, 241, 246, 255);
      float w = (float)l.w + PAUSAO_CHIP_PAD * 2.0f;
      GfxRect chip;
      if (x + w > PAUSAO_X + larg) break;   // uma fileira so
      chip.x = x; chip.y = y; chip.w = w; chip.h = PAUSAO_CHIP_H;
      gfx_cor(chip, 12.0f / PAUSAO_CHIP_H, 1, 1, 1, 0.10f * a);
      txt_desenhar_alpha(l, x + PAUSAO_CHIP_PAD,
                         y + (PAUSAO_CHIP_H - (float)l.h) * 0.5f, a * 0.92f);
      x += w + PAUSAO_CHIP_GAP;
    }
  }
}
