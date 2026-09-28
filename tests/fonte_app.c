// Exercita as tres familias embarcadas e a troca com cache ja preenchido.
// Compilado com text.c no mesmo TU para conferir a familia REAL aberta pelo
// FreeType, em vez de testar apenas o indice guardado em Ajustes.
#include <assert.h>
#include <string.h>
#include "../src/text.c"

const char *i18n(const char *s) { return s; }
void marco(const char *nome) { (void)nome; }
void gfx_tex_esquecer(GLuint tex) { (void)tex; }
void gfx_rect(GfxRect r, GLuint tex, GfxModo modo, float foco,
              float parx, float pary, float raio,
              float cr, float cg, float cb, float ca) {
  (void)r; (void)tex; (void)modo; (void)foco; (void)parx; (void)pary;
  (void)raio; (void)cr; (void)cg; (void)cb; (void)ca;
}

int main(void) {
  assert(SDL_Init(0) == 0);
  assert(txt_definir_fonte_app(1));
  assert(txt_iniciar("deploy/app", 1));
  assert(strstr(TTF_FontFaceFamilyName(fontes[TXT_BODY]), "DM Sans"));
  assert(strstr(TTF_FontFaceFamilyName(fontes[TXT_DET_BOTAO]), "DM Sans"));
  assert(strstr(TTF_FontFaceFamilyName(fontes[TXT_COND_CW_TITULO]), "Roboto Condensed"));
  assert(strstr(TTF_FontFaceFamilyName(
      fonteLegendaDe(TXT_LEG_100, "Legenda", TXT_FAMILIA_INTER, 0)), "Inter"));

  cache[0].ocupado = 1; // textura 0: valida invalidacao sem precisar de GL
  assert(txt_definir_fonte_app(2));
  assert(!cache[0].ocupado);
  assert(strstr(TTF_FontFaceFamilyName(fontes[TXT_BODY]), "Open Sans"));
  assert(strstr(TTF_FontFaceFamilyName(fontes[TXT_DET_BOTAO]), "Open Sans"));
  assert(strstr(TTF_FontFaceFamilyName(fontes[TXT_COND_DET_SIN]), "Roboto Condensed"));
  assert(strstr(TTF_FontFaceFamilyName(
      fonteLegendaDe(TXT_LEG_100, "Legenda", TXT_FAMILIA_INTER, 0)), "Inter"));

  assert(!txt_definir_fonte_app(9));
  assert(strstr(TTF_FontFaceFamilyName(fontes[TXT_BODY]), "Open Sans"));
  assert(txt_definir_fonte_app(0));
  assert(strstr(TTF_FontFaceFamilyName(fontes[TXT_BODY]), "Inter Display"));
  assert(strstr(TTF_FontFaceFamilyName(fontes[TXT_DET_BOTAO]), "Inter Display"));
  assert(strstr(TTF_FontFaceFamilyName(fontes[TXT_COND_PAINEL_ITEM]), "Roboto Condensed"));
  {
    int larguraApp = 0, larguraEditorial = 0;
    assert(TTF_SizeUTF8(fontes[TXT_CW_TITULO], "Continuar assistindo", &larguraApp, NULL) == 0);
    assert(TTF_SizeUTF8(fontes[TXT_COND_CW_TITULO], "Continuar assistindo", &larguraEditorial, NULL) == 0);
    assert(larguraEditorial < larguraApp * 0.95f);
  }
  // A família da interface conserva a largura compacta das referências.
  {
    TTF_Font *comum = TTF_OpenFont("deploy/app/fonts/Inter-Medium.ttf", 28);
    int largo = 0, compacto = 0;
    assert(comum);
    assert(TTF_SizeUTF8(comum, "Continuar assistindo", &largo, NULL) == 0);
    assert(TTF_SizeUTF8(fontes[TXT_CW_TITULO], "Continuar assistindo", &compacto, NULL) == 0);
    assert(compacto < largo * 0.96f);
    TTF_CloseFont(comum);
  }
  txt_encerrar();
  SDL_Quit();
  return 0;
}
