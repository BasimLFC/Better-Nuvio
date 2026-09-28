// CAPTURAS DA TELA DE ESCOLHA DE PERFIL, sem rede e sem conta.
//
// Existe pelo mesmo motivo de tests/player_regression.c --profile: interface de
// TV nao se revisa lendo codigo. A tela e olhada a 3 m, e coisas que so
// aparecem no pixel (nome que estoura a coluna, cinza sobre cinza, foco que nao
// se acha) sao invisiveis numa leitura.
//
// A LISTA VEM DO CACHE EM DISCO, pela API publica: o teste escreve perfis.txt
// numa pasta temporaria e chama perfis_carregar_ativo(). Ou seja, alem de
// desenhar a tela, ele exercita o mesmo caminho de arranque que a TV usa.
//
// Os avatares apontam para arte do pacote; as capturas rodam sem rede e sem
// tocar nos dados reais da conta.
//
//   bash tests/perfilsel.sh --capturas
#include "perfilsel.h"
#include "perfis.h"
#include "dados.h"
#include "gfx.h"
#include "text.h"
#include "tex_cache.h"
#include "ajustes.h"
#include "extras.h"
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <assert.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static SDL_Window *win;
static int capturaQuadros = 90;

static const char *shotPath(const char *nome) {
  static char caminho[768];
  const char *prefixo = getenv("NUVIO_PERFILSEL_SHOT_PREFIX");
  const char *base;
  if (!prefixo || !*prefixo) return nome;
  base = strrchr(nome, '/');
  base = base ? base + 1 : nome;
  snprintf(caminho, sizeof caminho, "%s-%s", prefixo, base);
  return caminho;
}

static void salvarTela(const char *nome) {
  unsigned char *pix = malloc(1920 * 1080 * 4);
  SDL_Surface *s;
  int y;
  assert(pix);
  glReadPixels(0, 0, 1920, 1080, GL_RGBA, GL_UNSIGNED_BYTE, pix);
  s = SDL_CreateRGBSurfaceWithFormat(0, 1920, 1080, 32, SDL_PIXELFORMAT_RGBA32);
  assert(s);
  for (y = 0; y < 1080; y++)
    memcpy((char *)s->pixels + y * s->pitch,
           pix + (1079 - y) * 1920 * 4, 1920 * 4);
  assert(SDL_SaveBMP(s, nome) == 0);
  SDL_FreeSurface(s); free(pix);
}

static void escreverCache(const char *conteudo, int ativo) {
  char linha[16];
  assert(dados_gravar("perfis.txt", conteudo));
  snprintf(linha, sizeof linha, "%d\n", ativo);
  assert(dados_gravar("perfil.txt", linha));
}

static void ajustesDeTeste(int reduzidas) {
  FILE *f;
  char caminho[700];
  snprintf(caminho, sizeof caminho, "%s/ajustes.txt", dados_dir());
  f = fopen(caminho, "w");
  assert(f);
  fprintf(f, "animacoes %d\nidioma 0\n", reduzidas);
  fclose(f);
  ajustes_dir(dados_dir());
}

// 90 quadros: tempo de sobra para a mola do foco assentar (120 ms medidos) e
// para o decode das texturas subir para a GPU.
static void captura(const char *nome) {
  int i;
  for (i = 0; i < capturaQuadros; i++) {
    SDL_PumpEvents();
    txt_novo_quadro(); tex_novo_quadro(); tex_bombear(6); gfx_novo_quadro();
    perfilsel_atualizar(1.0f / 60.0f, SDL_GetTicks());
    glClearColor(0.051f, 0.051f, 0.051f, 1); glClear(GL_COLOR_BUFFER_BIT);
    perfilsel_desenhar(SDL_GetTicks());
    // GL_BACK ainda e valido neste ponto. Depois do SwapWindow o back buffer
    // pode ser descartado, portanto a captura do frame final fica aqui.
    if (i == capturaQuadros - 1) salvarTela(shotPath(nome));
    SDL_GL_SwapWindow(win); SDL_Delay(4);
  }
  // Captura o quadro realmente final da simulação. O antigo `if (i == 89)`
  // fazia a captura cair no quadro 89 mesmo quando o settled tinha 600.
  printf("  %s  (preenchimento %.2f telas, %d desenhos)\n",
         shotPath(nome), gfx_fill, gfx_n_rect);
}

static void tecla(SDL_Keycode k) {
  SDL_Event e = {0};
  e.type = SDL_KEYDOWN; e.key.keysym.sym = k;
  perfilsel_evento(&e);
}

static void verificaAnimacoes(void) {
  PerfilSelTesteEstado antes, depois;
  int i;
  perfilsel_teste_estado(&antes);
  tecla(SDLK_RIGHT);
  perfilsel_atualizar(10.0f, SDL_GetTicks());
  perfilsel_teste_estado(&depois);
  assert(depois.foco[0] < antes.foco[0]);
  assert(depois.foco[1] > antes.foco[1] && depois.foco[1] < 1.0f);
  for (i = 0; i < 6; i++) perfilsel_atualizar(0.05f, SDL_GetTicks());
  perfilsel_teste_estado(&depois);
  assert(depois.foco[1] > 0.99f);
  tecla(SDLK_LEFT);
  for (i = 0; i < 6; i++) perfilsel_atualizar(0.05f, SDL_GetTicks());
}

static void verificaReducedMotion(void) {
  PerfilSelTesteEstado e;
  tecla(SDLK_RIGHT);
  perfilsel_atualizar(0.04f, SDL_GetTicks());
  perfilsel_teste_estado(&e);
  assert(e.foco[5] == 1.0f);
  tecla(SDLK_LEFT);
  perfilsel_atualizar(0.04f, SDL_GetTicks());
}

int main(void) {
  const char *arte = "deploy/app/art";
  SDL_GLContext gl;

  assert(SDL_Init(SDL_INIT_VIDEO | SDL_INIT_TIMER) == 0);
  IMG_Init(IMG_INIT_PNG | IMG_INIT_JPG);
  SDL_GL_SetAttribute(SDL_GL_CONTEXT_MAJOR_VERSION, 2);
  SDL_GL_SetAttribute(SDL_GL_CONTEXT_MINOR_VERSION, 1);
  win = SDL_CreateWindow("Nuvio: revisao da escolha de perfil",
                         SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED,
                         1920, 1080, SDL_WINDOW_OPENGL | SDL_WINDOW_SHOWN);
  assert(win);
  gl = SDL_GL_CreateContext(win); assert(gl);
  SDL_GL_SetSwapInterval(0);
  glViewport(0, 0, 1920, 1080); gfx_tamanho_alvo(1920, 1080);
  assert(gfx_iniciar());
  assert(txt_iniciar("deploy/app", 1));
  tex_iniciar(64);
  gfx_icones_dir(arte);
  extras_carregar(arte);
  // O ARGUMENTO DE dados_iniciar E A PASTA DE ARTE, nao um desvio dos dados: o
  // desvio e a variavel NUVIO_DADOS. Passando a pasta temporaria aqui o teste
  // escrevia em ~/.nuvio — os perfis REAIS de quem roda — e o perfis_esquecer()
  // logo abaixo apagava os arquivos de la. Aconteceu uma vez; esta guarda
  // existe para que nao aconteca duas.
  dados_iniciar(NULL);
  { const char *d = dados_dir();
    const char *tmp = getenv("NUVIO_TESTE_DIR");
    if (!tmp || !*tmp || !d || strcmp(d, tmp)) {
      fprintf(stderr,
              "perfilsel_visual: recusando rodar fora de uma pasta descartavel.\n"
              "  dados_dir()=%s   NUVIO_TESTE_DIR=%s\n"
              "  Rode por tests/perfilsel.sh --capturas, que exporta NUVIO_DADOS.\n",
              d && *d ? d : "(nenhuma)", tmp ? tmp : "(vazia)");
      return 1;
    } }

  // indice \t temPin \t primario \t usaAddons \t cor \t nome \t avatar \t fundo
  escreverCache("1\t0\t1\t0\t#1E88E5\tHenrique\t\tdeploy/app/art/03.jpg\n", 1);
  perfis_carregar_ativo();
  ajustesDeTeste(0);
  perfilsel_iniciar();
  assert(!perfilsel_concluido());
  perfilsel_continuar_ativo();
  assert(perfilsel_concluido());
  captura("/tmp/nuvio-perfilsel-1.bmp");

  escreverCache("1\t0\t1\t0\t#1E88E5\tHenrique\t\tdeploy/app/art/03.jpg\n"
                "2\t0\t0\t1\t#E53935\tÁlvaro\t\t\n", 2);
  perfis_esquecer(); dados_iniciar(NULL);
  escreverCache("1\t0\t1\t0\t#1E88E5\tHenrique\t\tdeploy/app/art/03.jpg\n"
                "2\t0\t0\t1\t#E53935\tÁlvaro\t\t\n", 2);
  perfis_carregar_ativo();
  ajustesDeTeste(0);
  perfilsel_iniciar();
  captura("/tmp/nuvio-perfilsel-2.bmp");
  tecla(SDLK_RIGHT); // perfil 2 -> Adicionar Perfil
  perfilsel_atualizar(0.05f, SDL_GetTicks());
  tecla(SDLK_RETURN);
  { PerfilSelTesteEstado e;
    perfilsel_teste_estado(&e);
    assert(e.info_adicionar);
    assert(!perfilsel_concluido()); }
  captura("/tmp/nuvio-perfilsel-adicionar-info.bmp");
  tecla(SDLK_AC_BACK);
  { PerfilSelTesteEstado e;
    perfilsel_teste_estado(&e);
    assert(!e.info_adicionar); }
  perfilsel_iniciar_gerenciar();
  assert(perfilsel_modo_gerenciar());
  captura("/tmp/nuvio-perfilsel-gerenciar.bmp");
  { PerfilSelTesteEstado e;
    int ativo = perfis_ativo();
    tecla(SDLK_RETURN);
    perfilsel_teste_estado(&e);
    assert(e.opcoes_perfil && !perfilsel_concluido());
    assert(perfis_ativo() == ativo);
    captura("/tmp/nuvio-perfilsel-gerenciar-opcoes.bmp");
    tecla(SDLK_AC_BACK);
    perfilsel_teste_estado(&e);
    assert(!e.opcoes_perfil); }

  // A entrada pelo OK longo do avatar acontece antes do KEYUP. Os KEYDOWNs
  // repetidos da mesma pressao nao podem confirmar o perfil ativo.
  perfilsel_iniciar_trocar();
  { SDL_Event soltar = {0};
    int ativo = perfis_ativo();
    tecla(SDLK_RETURN);
    tecla(SDLK_RETURN);
    assert(!perfilsel_concluido() && perfis_ativo() == ativo);
    soltar.type = SDL_KEYUP;
    soltar.key.keysym.sym = SDLK_RETURN;
    perfilsel_evento(&soltar);
    tecla(SDLK_RETURN); // alguns controles repetem em pares down/up
    perfilsel_evento(&soltar);
    assert(!perfilsel_concluido() && perfis_ativo() == ativo);
    tecla(SDLK_LEFT);
    tecla(SDLK_RETURN);
    assert(perfilsel_concluido() && perfis_ativo() != ativo);
    perfilsel_iniciar_trocar();
    perfilsel_evento(&soltar);
    SDL_Delay(270);
    tecla(SDLK_RETURN);
    assert(perfilsel_concluido() && perfis_ativo() != ativo); }

  // A escolha no popup seleciona diretamente o slot tocado. Ela nao pode
  // confirmar o perfil que estava focado antes de abrir a tela de troca.
  perfilsel_iniciar_trocar_para(1);
  assert(perfilsel_concluido() && perfis_ativo() == 2);

  perfis_esquecer(); dados_iniciar(NULL);
  escreverCache("1\t0\t1\t0\t#1E88E5\tHenrique\t"
                "deploy/app/art/poster/00.jpg\tdeploy/app/art/03.jpg\n"
                "2\t0\t0\t1\t#E53935\tÁlvaro Nascimento da Silva\t\t\n"
                "3\t1\t0\t0\t#43A047\tInfantil\t\tdeploy/app/art/07.jpg\n"
                "4\t0\t0\t0\t#8E24AA\tVisitas\t\t\n", 1);
  perfis_carregar_ativo();
  ajustesDeTeste(0);
  perfilsel_iniciar_trocar_para(2);
  assert(!perfilsel_concluido() && perfis_ativo() == 1);
  perfilsel_atualizar(0.016f, SDL_GetTicks());
  { PerfilSelTesteEstado e;
    perfilsel_teste_estado(&e);
    assert(e.pin > 0.0f); }
  perfilsel_iniciar();
  captura("/tmp/nuvio-perfilsel-4.bmp");
  verificaAnimacoes();

  // O terceiro perfil e o travado: tres DIREITA e a tela do selo de PIN em foco.
  tecla(SDLK_RIGHT); tecla(SDLK_RIGHT);
  captura("/tmp/nuvio-perfilsel-4-travado.bmp");

  // OK sobre ele abre o teclado. Depois, quatro digitos e um erro de rede
  // fabricado nao — este e o estado normal de digitacao.
  tecla(SDLK_RETURN);
  { PerfilSelTesteEstado antes, depois;
    perfilsel_teste_estado(&antes);
    perfilsel_atualizar(10.0f, SDL_GetTicks());
    perfilsel_teste_estado(&depois);
    assert(depois.pin > antes.pin && depois.pin < 1.0f); }
  tecla(SDLK_UP); tecla(SDLK_UP); tecla(SDLK_UP);   // sobe para a linha do "1"
  tecla(SDLK_RETURN);                               // 1
  tecla(SDLK_RIGHT); tecla(SDLK_RETURN);            // 2
  tecla(SDLK_DOWN); tecla(SDLK_RETURN);             // 5
  tecla(SDLK_DOWN); tecla(SDLK_RETURN);             // 8
  captura("/tmp/nuvio-perfilsel-pin.bmp");

  // Oito perfis: o pior caso do layout (CONTA_PERFIL_MAX).
  perfis_esquecer(); dados_iniciar(NULL);
  escreverCache("1\t0\t1\t0\t#1E88E5\tHenrique\t\tdeploy/app/art/03.jpg\n"
                "2\t0\t0\t0\t#E53935\tÁlvaro\t\t\n"
                "3\t1\t0\t0\t#43A047\tInfantil\t\t\n"
                "4\t0\t0\t0\t#8E24AA\tVisitas\t\t\n"
                "5\t0\t0\t0\t#FB8C00\tMariana\t\t\n"
                "6\t0\t0\t0\t#00ACC1\tRoberto\t\t\n"
                "7\t1\t0\t0\t#C0CA33\tCarla\t\t\n"
                "8\t0\t0\t0\t#5E35B1\tPedro\t\t\n", 5);
  perfis_carregar_ativo();
  ajustesDeTeste(0);
  perfilsel_iniciar();
  captura("/tmp/nuvio-perfilsel-8.bmp");

  // Acessibilidade: o foco responde imediatamente com animacoes reduzidas.
  ajustesDeTeste(1);
  perfilsel_iniciar();
  verificaReducedMotion();
  captura("/tmp/nuvio-perfilsel-8-reduzido.bmp");
  ajustesDeTeste(0);

  tex_encerrar(); txt_encerrar(); gfx_encerrar();
  SDL_GL_DeleteContext(gl); SDL_DestroyWindow(win); SDL_Quit();
  puts("PASS: capturas em /tmp/nuvio-perfilsel-*.bmp (dados de teste, sem conta real).");
  return 0;
}
