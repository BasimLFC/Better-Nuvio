#include "homelocal.h"
#include "ajustes.h"
#include "descoberta.h"
#include "js.h"
#include "rede.h"
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define HOMELOCAL_MAX 16
#define HOMELOCAL_TMDB "https://api.themoviedb.org/3"

typedef struct {
  char imdb[32], tipo[8], idioma[16];
  char titulo[160], sinopse[900];
  int pronto;
} HomeLocal;

typedef struct {
  HomeLocal item;
  char chave[64];
  long tmdb;
} HomeLocalPedido;

static HomeLocal cache[HOMELOCAL_MAX];
static int proxima, emVoo;
static pthread_mutex_t trava = PTHREAD_MUTEX_INITIALIZER;
static char tituloVisivel[160], sinopseVisivel[900];

static int mesmaChave(const HomeLocal *a, const HomeLocal *b) {
  return !strcmp(a->imdb, b->imdb) && !strcmp(a->tipo, b->tipo) &&
         !strcmp(a->idioma, b->idioma);
}

static void *consultar(void *arg) {
  HomeLocalPedido *pedido = arg;
  HomeLocal resultado = pedido->item;
  char url[420], *corpo;
  long tmdb = pedido->tmdb;
  if (!tmdb) {
    snprintf(url, sizeof url, "%s/find/%s?api_key=%s&external_source=imdb_id",
             HOMELOCAL_TMDB, pedido->item.imdb, pedido->chave);
    corpo = rede_baixar(url, 8);
    if (corpo) {
      const char *p = js_array(corpo, NULL,
                              !strcmp(pedido->item.tipo, "series")
                                  ? "tv_results" : "movie_results");
      if (p) tmdb = (long)js_num(p, js_fim(p), "id", 0);
      free(corpo);
    }
  }
  if (tmdb) {
    snprintf(url, sizeof url, "%s/%s/%ld?api_key=%s&language=%s",
             HOMELOCAL_TMDB,
             !strcmp(pedido->item.tipo, "series") ? "tv" : "movie",
             tmdb, pedido->chave, pedido->item.idioma);
    corpo = rede_baixar(url, 8);
    if (corpo) {
      js_texto_raiz(corpo,
                    !strcmp(pedido->item.tipo, "series") ? "name" : "title",
                    resultado.titulo, sizeof resultado.titulo);
      js_texto_raiz(corpo, "overview", resultado.sinopse,
                    sizeof resultado.sinopse);
      free(corpo);
    }
  }
  resultado.pronto = 1;
  pthread_mutex_lock(&trava);
  cache[proxima] = resultado;
  proxima = (proxima + 1) % HOMELOCAL_MAX;
  emVoo = 0;
  pthread_mutex_unlock(&trava);
  free(pedido);
  return NULL;
}

int homelocal_obter(const CatItem *item, const char **titulo,
                    const char **sinopse) {
  HomeLocal chave = {0};
  const char *api, *idioma;
  int i, localizado = 0;
  if (titulo) *titulo = NULL;
  if (sinopse) *sinopse = NULL;
  if (!item || !item->imdb[0] || strncmp(item->imdb, "tt", 2) ||
      (strcmp(item->tipo, "movie") && strcmp(item->tipo, "series")) ||
      !ajustes_tmdb_basico()) return 0;
  api = desc_chave_tmdb();
  idioma = desc_tmdb_idioma();
  if (!api || !api[0] || !idioma || !idioma[0]) return 0;
  snprintf(chave.imdb, sizeof chave.imdb, "%s", item->imdb);
  { char *ep = strchr(chave.imdb, ':'); if (ep) *ep = 0; }
  snprintf(chave.tipo, sizeof chave.tipo, "%s", item->tipo);
  snprintf(chave.idioma, sizeof chave.idioma, "%s", idioma);

  pthread_mutex_lock(&trava);
  for (i = 0; i < HOMELOCAL_MAX; i++) {
    if (!cache[i].pronto || !mesmaChave(&cache[i], &chave)) continue;
    snprintf(tituloVisivel, sizeof tituloVisivel, "%s", cache[i].titulo);
    snprintf(sinopseVisivel, sizeof sinopseVisivel, "%s", cache[i].sinopse);
    localizado = tituloVisivel[0] || sinopseVisivel[0];
    break;
  }
  if (i == HOMELOCAL_MAX && !emVoo) {
    HomeLocalPedido *pedido = calloc(1, sizeof *pedido);
    if (pedido) {
      pthread_t fio;
      pedido->item = chave;
      pedido->tmdb = item->tmdb;
      snprintf(pedido->chave, sizeof pedido->chave, "%s", api);
      emVoo = 1;
      if (pthread_create(&fio, NULL, consultar, pedido) == 0)
        pthread_detach(fio);
      else { emVoo = 0; free(pedido); }
    }
  }
  pthread_mutex_unlock(&trava);
  if (localizado) {
    if (titulo && tituloVisivel[0]) *titulo = tituloVisivel;
    if (sinopse && sinopseVisivel[0]) *sinopse = sinopseVisivel;
  }
  return localizado;
}
