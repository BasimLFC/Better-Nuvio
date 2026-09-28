// CAPTURAS DA BUSCA, sem depender da resposta de rede.
//
// O teste existe para olhar a distancia de sofa: campo ativo, foco da grade,
// cursor, Descobrir no campo vazio e estado sem resultados depois de duas letras. A lista real e assincrona e fica
// para o teste manual do aparelho; aqui o importante e a casca da interacao.
#include "busca.h"
#include "discover.h"
#include "catalogo.h"
#include "buscasrec.h"
#include "dados.h"
#include "ajustes.h"
#include "rail_shot.h"
#include "gfx.h"
#include "text.h"
#include "tex_cache.h"
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static SDL_Window *janela;
static int emExplore;
static int quadrosCaptura = 45;

static void tecla(SDL_Keycode k) {
  SDL_Event e;
  memset(&e, 0, sizeof e);
  e.type = SDL_KEYDOWN;
  e.key.keysym.sym = k;
  busca_evento(&e);
}

static void quadro(void) {
  SDL_PumpEvents();
  txt_novo_quadro();
  tex_novo_quadro();
  tex_bombear(12);
  gfx_novo_quadro();
  if (emExplore) discover_atualizar(1.0f / 60.0f, SDL_GetTicks());
  else busca_atualizar(1.0f / 60.0f, SDL_GetTicks());
  if (rail_shot_ligado()) menu_atualizar(1.0f / 60.0f, SDL_GetTicks());
  glClearColor(0.051f, 0.051f, 0.051f, 1.0f);
  glClear(GL_COLOR_BUFFER_BIT);
  if (emExplore) discover_desenhar(SDL_GetTicks(), 1);
  else busca_desenhar(SDL_GetTicks());
  rail_shot_desenhar(emExplore ? MENU_DESCUBRIR : MENU_BUSCAR);
  SDL_GL_SwapWindow(janela);
}

static void captura(const char *nome) {
  unsigned char *pix = malloc(1920 * 1080 * 4);
  SDL_Surface *s;
  int i, y;
  assert(pix);
  rail_shot_aplicar();
  for (i = 0; i < quadrosCaptura; i++) quadro();
  quadro();
  glReadPixels(0, 0, 1920, 1080, GL_RGBA, GL_UNSIGNED_BYTE, pix);
  s = SDL_CreateRGBSurfaceWithFormat(0, 1920, 1080, 32, SDL_PIXELFORMAT_RGBA32);
  assert(s);
  for (y = 0; y < 1080; y++)
    memcpy((char *)s->pixels + y * s->pitch, pix + (1079 - y) * 1920 * 4,
           1920 * 4);
  assert(SDL_SaveBMP(s, nome) == 0);
  SDL_FreeSurface(s);
  free(pix);
  printf("captura: %s\n", nome);
}

int main(int argc, char **argv) {
  const char *saida = argc > 1 ? argv[1] : "/tmp/nuvio-busca";
  const char *dir = getenv("NUVIO_DADOS");
  char nome[600];
  SDL_GLContext gl;
  if (!dir || !*dir) return 2;
  assert(SDL_Init(SDL_INIT_VIDEO | SDL_INIT_TIMER) == 0);
  IMG_Init(IMG_INIT_PNG | IMG_INIT_JPG);
  SDL_GL_SetAttribute(SDL_GL_CONTEXT_MAJOR_VERSION, 2);
  SDL_GL_SetAttribute(SDL_GL_CONTEXT_MINOR_VERSION, 1);
  janela = SDL_CreateWindow("Nuvio: revisao da Busca", SDL_WINDOWPOS_CENTERED,
                           SDL_WINDOWPOS_CENTERED, 1920, 1080,
                           SDL_WINDOW_OPENGL | SDL_WINDOW_SHOWN);
  assert(janela);
  gl = SDL_GL_CreateContext(janela);
  assert(gl);
  SDL_GL_SetSwapInterval(0);
  glViewport(0, 0, 1920, 1080);
  gfx_tamanho_alvo(1920, 1080);
  assert(gfx_iniciar());
  assert(txt_iniciar("deploy/app", 1));
  tex_iniciar(96);
  gfx_icones_dir("deploy/app/art");
  dados_iniciar(dir);
  assert(!strcmp(dados_dir(), dir));
  ajustes_iniciar();
  busca_iniciar();

  snprintf(nome, sizeof nome, "%s-vazio.bmp", saida);
  captura(nome);
  tecla(SDLK_RIGHT);
  snprintf(nome, sizeof nome, "%s-foco.bmp", saida);
  captura(nome);
  tecla(SDLK_a);
  tecla(SDLK_g);
  snprintf(nome, sizeof nome, "%s-digitado.bmp", saida);
  captura(nome);

  // Com o campo vazio, Descobrir permanece visivel mesmo com historico.
  // Termos de tamanhos diferentes e um longo, para a quebra de linha e o
  // "Limpar" no fim aparecerem; registrados do mais antigo para o mais novo.
  { static const char *termos[] = {
      "up", "interestelar", "the office", "dune", "o senhor dos aneis",
      "breaking bad", "matrix", "fundacao", "stranger things", "cidade de deus" };
    int i;
    for (i = 0; i < 10; i++) buscasrec_registrar(termos[i]); }
  busca_iniciar();
  snprintf(nome, sizeof nome, "%s-descobrir.bmp", saida);
  captura(nome);
  // Da tecla "a" ate a ultima coluna e mais um: a ponte leva aos filtros de
  // Descobrir. Esquerda volta ao teclado, Tab abre as buscas recentes.
  { int i; for (i = 0; i < 6; i++) tecla(SDLK_RIGHT); }
  snprintf(nome, sizeof nome, "%s-descobrir-foco.bmp", saida);
  captura(nome);
  tecla(SDLK_LEFT);
  tecla(SDLK_TAB);
  snprintf(nome, sizeof nome, "%s-recentes.bmp", saida);
  captura(nome);
  tecla(SDLK_DOWN);
  snprintf(nome, sizeof nome, "%s-recentes-foco.bmp", saida);
  captura(nome);
  tecla(SDLK_RIGHT);
  snprintf(nome, sizeof nome, "%s-recentes-foco2.bmp", saida);
  captura(nome);
  // Ate o "Limpar": fim da ultima linha.
  { int i; tecla(SDLK_DOWN); for (i = 0; i < 10; i++) tecla(SDLK_RIGHT); }
  snprintf(nome, sizeof nome, "%s-recentes-limpar.bmp", saida);
  captura(nome);
  // Catálogo local do pacote: verifica a grade integrada com pôsteres reais.
  assert(cat_carregar("deploy/app/art"));
  busca_iniciar();
  snprintf(nome, sizeof nome, "%s-descobrir-grade.bmp", saida);
  captura(nome);
  { int i; for (i = 0; i < 6; i++) tecla(SDLK_RIGHT); }
  tecla(SDLK_DOWN);
  snprintf(nome, sizeof nome, "%s-descobrir-card.bmp", saida);
  captura(nome);
  tecla(SDLK_UP);
  tecla(SDLK_RETURN);
  tecla(SDLK_DOWN);
  tecla(SDLK_RETURN);
  snprintf(nome, sizeof nome, "%s-descobrir-series.bmp", saida);
  captura(nome);
  if (rail_shot_ligado()) {
    menu_abrir();
    snprintf(nome, sizeof nome, "%s-menu-aberto.bmp", saida);
    captura(nome);
  }
  busca_iniciar();
  tecla(SDLK_LEFT);
  assert(!busca_quer_sair());
  tecla(SDLK_UP);
  assert(!busca_quer_sair()); // da primeira letra para a linha de ações
  tecla(SDLK_UP);
  assert(busca_quer_sair() && !busca_quer_sair());
  // Confere o espaço entre a barra superior e o conteúdo de Explorar.
  menu_fechar();
  discover_iniciar_tela();
  emExplore = 1;
  snprintf(nome, sizeof nome, "%s-explorar.bmp", saida);
  captura(nome);
  { SDL_Event e = {0};
    e.type = SDL_KEYDOWN; e.key.keysym.sym = SDLK_RETURN;
    discover_evento(&e); }
  quadrosCaptura = 4;
  snprintf(nome, sizeof nome, "%s-explorar-abrindo.bmp", saida);
  captura(nome);
  quadrosCaptura = 45;
  snprintf(nome, sizeof nome, "%s-explorar-aberto.bmp", saida);
  captura(nome);
  puts("PASS: capturas da Busca gravadas.");
  return 0;
}
