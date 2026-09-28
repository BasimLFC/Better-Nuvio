#include "video_mac.h"
#include "gfx.h"
#include <SDL2/SDL.h>
#include <assert.h>
#include <stdio.h>
#include <string.h>

// O teste exercita o decodificador sem uma janela GL; o app real fornece o
// desenho do quadro com gfx_rect no fio principal.
void gfx_rect(GfxRect r, GLuint t, GfxModo m, float f, float px, float py,
              float ra, float cr, float cg, float cb, float ca) {
  (void)r; (void)t; (void)m; (void)f; (void)px; (void)py;
  (void)ra; (void)cr; (void)cg; (void)cb; (void)ca;
}
void gfx_tex_esquecer(GLuint tex) { (void)tex; }

int main(int argc, char **argv) {
  assert(argc == 2);
  assert(SDL_Init(SDL_INIT_TIMER) == 0);
  assert(mac_video_tocar(argv[1], ""));
  Uint64 ate = SDL_GetTicks64() + 3000;
  while (!mac_video_pronto() && !mac_video_falhou() && SDL_GetTicks64() < ate)
    SDL_Delay(10);
  assert(mac_video_pronto() && !mac_video_falhou());
  assert(mac_video_largura() == 320 && mac_video_altura() == 180);
  assert(mac_video_duracao() > 4.8 && mac_video_duracao() < 5.2);
  assert(mac_video_n_legenda() == 1);
  assert(mac_video_legenda(0));
  mac_video_escolher_legenda(0);
  assert(mac_video_legenda_atual() == 0);

  SDL_Delay(150);
  double antes = mac_video_pos();
  mac_video_pausar(1);
  SDL_Delay(150);
  assert(mac_video_pos() - antes < 0.05);
  mac_video_buscar(2.0);
  SDL_Delay(100);
  assert(mac_video_pos() > 1.95 && mac_video_pos() < 2.10);
  mac_video_pausar(0);
  SDL_Delay(500);
  assert(mac_video_pos() > 2.15);
  { char texto[768] = "";
    assert(mac_video_legenda_nativa(texto, sizeof texto));
    assert(strstr(texto, "Teste embutido"));
    mac_video_escolher_legenda(-1);
    assert(!mac_video_legenda_nativa(texto, sizeof texto)); }

  mac_video_parar();
  assert(!mac_video_ativo());
  SDL_Quit();
  puts("PASS: video Mac abre, decodifica, exibe legenda embutida, pausa, busca e encerra");
  return 0;
}
