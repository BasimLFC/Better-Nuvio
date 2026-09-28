// O clique do Magic Remote foca o cartaz e sintetiza OK no mesmo evento.
// A escolha deve ser o cartaz clicado, mesmo antes do proximo desenho.
#include <assert.h>
#include <string.h>
#include "../src/busca.c"

int main(void) {
  CatItem itens[2];
  HomeItem focado;
  SDL_Event ok;
  int indice = -1;
  memset(itens, 0, sizeof itens);
  snprintf(itens[0].titulo, sizeof itens[0].titulo, "Primeiro");
  snprintf(itens[0].poster, sizeof itens[0].poster, "poster-primeiro");
  snprintf(itens[1].titulo, sizeof itens[1].titulo, "Monstros");
  snprintf(itens[1].poster, sizeof itens[1].poster, "poster-monstros");
  cat_definir(itens, 2);
  discover_iniciar();

  nFil = 1;
  fil[0].n = 2;
  fil[0].itens[0] = 0;
  fil[0].itens[1] = 1;
  focus_iniciar(&focoRes, 1, (int[]){2});
  painel = 1;
  pedido = -1;
  rectRes[0][1] = (GfxRect){300, 400, 220, 330};
  ponteiroResultadoFocar(0, 1);

  SDL_zero(ok);
  ok.type = SDL_KEYDOWN;
  ok.key.keysym.sym = SDLK_RETURN;
  busca_evento(&ok);
  assert(busca_pediu_abrir(&indice));
  assert(indice == 1);
  assert(busca_item_focado(&focado));
  assert(focado.indice == indice);
  assert(!strcmp(focado.titulo, "Monstros"));
  assert(focado.rect.x == 300);
  assert(!busca_pediu_abrir(NULL));
  return 0;
}
