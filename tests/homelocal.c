#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include "../src/homelocal.h"

static int ligado = 1, pedidos;
int ajustes_tmdb_basico(void) { return ligado; }
const char *desc_chave_tmdb(void) { return "0123456789abcdef0123456789abcdef"; }
const char *desc_tmdb_idioma(void) { return "pt-BR"; }
char *rede_baixar(const char *url, int segundos) {
  (void)segundos;
  __sync_add_and_fetch(&pedidos, 1);
  if (strstr(url, "/find/tt1196946"))
    return strdup("{\"tv_results\":[{\"id\":5920}],\"movie_results\":[]}");
  if (strstr(url, "/tv/5920"))
    return strdup("{\"created_by\":[{\"name\":\"Pessoa\"}],"
                  "\"name\":\"O Mentalista\",\"overview\":\"Sinopse em português.\"}");
  return NULL;
}

int main(void) {
  CatItem item = {0};
  const char *titulo = NULL, *sinopse = NULL;
  snprintf(item.imdb, sizeof item.imdb, "tt1196946:1:1");
  snprintf(item.tipo, sizeof item.tipo, "series");
  snprintf(item.titulo, sizeof item.titulo, "The Mentalist");
  assert(!homelocal_obter(&item, &titulo, &sinopse));
  for (int i = 0; i < 2000 && !homelocal_obter(&item, &titulo, &sinopse); i++)
    usleep(1000);
  assert(titulo && !strcmp(titulo, "O Mentalista"));
  assert(sinopse && !strcmp(sinopse, "Sinopse em português."));
  assert(pedidos == 2);
  assert(homelocal_obter(&item, &titulo, &sinopse) && pedidos == 2);
  // Quando o Trakt ja mandou ids.tmdb, basta a resposta localizada.
  snprintf(item.imdb, sizeof item.imdb, "tt1196947:1:1");
  item.tmdb = 5920;
  assert(!homelocal_obter(&item, &titulo, &sinopse));
  for (int i = 0; i < 2000 && !homelocal_obter(&item, &titulo, &sinopse); i++)
    usleep(1000);
  assert(titulo && !strcmp(titulo, "O Mentalista"));
  assert(pedidos == 3);
  ligado = 0;
  assert(!homelocal_obter(&item, &titulo, &sinopse));
  puts("ok  home: titulo e sinopse localizados, sem bloquear ou repetir pedidos");
  return 0;
}
