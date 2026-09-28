// As regras de "proximo episodio" sao logica pura: nao tocam rede, catalogo
// nem tela. Entao rodam aqui contra vetores montados a mao, sem SDL.
#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "../src/proximo.c"

#define AGORA 1770000000000LL   // 2026-02-02, aproximadamente

static CatEp ep(int t, int e, const char *nome, const char *data) {
  CatEp x;
  memset(&x, 0, sizeof x);
  x.temporada = t; x.episodio = e;
  snprintf(x.nome, sizeof x.nome, "%s", nome);
  snprintf(x.data, sizeof x.data, "%s", data);
  return x;
}

static CatItem serie(int t, int e, int progresso) {
  CatItem c;
  memset(&c, 0, sizeof c);
  snprintf(c.tipo, sizeof c.tipo, "series");
  snprintf(c.titulo, sizeof c.titulo, "Serie");
  c.temporada = t; c.episodio = e; c.progresso = progresso;
  return c;
}

int main(void) {
  ProxSugestao s;

  // --- data ------------------------------------------------------------
  assert(prox_data_ms("27 de janeiro de 2023") == prox_data_ms("2023-01-27"));
  assert(prox_data_ms("2026") == PROX_SEM_DATA);   // so o ano nao e data
  assert(prox_data_ms("") == PROX_SEM_DATA);
  assert(prox_data_ms(NULL) == PROX_SEM_DATA);
  // Data antes da epoca e um negativo legitimo, nao ausencia de data.
  assert(prox_data_ms("31 de dezembro de 1969") == -86400000LL);

  // --- politica da serie nao acompanhada (nextUpWatchingPolicy.js) ------
  assert(!prox_mostrar_nao_acompanhada(0, PROX_SEM_DATA, AGORA));      // sem data
  assert(prox_mostrar_nao_acompanhada(0, AGORA, AGORA));                // hoje
  assert(prox_mostrar_nao_acompanhada(0, AGORA + PROX_JANELA_NOVIDADE_MS, AGORA));
  assert(!prox_mostrar_nao_acompanhada(0, AGORA + PROX_JANELA_NOVIDADE_MS + 1, AGORA));
  assert(!prox_mostrar_nao_acompanhada(0, AGORA - PROX_JANELA_NOVIDADE_MS - 1, AGORA));
  // Lancado ANTES de a pessoa parar: nao e novidade, e acervo.
  assert(!prox_mostrar_nao_acompanhada(AGORA, AGORA - 1000, AGORA));

  // --- ancora absoluta (nextUpEpisodeAnchor.js) -------------------------
  {
    CatEp v[4] = { ep(1,1,"a","1 de janeiro de 2026"), ep(1,2,"b",""),
                   ep(2,1,"c",""), ep(2,2,"d","") };
    assert(prox_ancora_absoluta(v, 4, 1, 3) == 2);   // o 3o da lista inteira
    assert(prox_ancora_absoluta(v, 4, 1, 5) == -1);  // passou do fim
    assert(prox_ancora_absoluta(v, 4, 1, 0) == -1);
    assert(prox_ancora_absoluta(v, 4, 2, 1) == -1);  // absoluta e sempre T1
    // Sem o marcador explicito, S1E3 e S1E3 e nao existe.
    assert(prox_ancora(v, 4, 1, 3, 0) == -1);
    assert(prox_ancora(v, 4, 1, 3, 1) == 2);
    assert(prox_ancora(v, 4, 2, 2, 0) == 3);
  }

  // --- lista com especiais: T0 nunca conta nem e oferecido --------------
  {
    CatEp v[4] = { ep(0,1,"especial",""), ep(1,1,"a",""),
                   ep(1,2,"b","1 de fevereiro de 2026"), ep(0,2,"outro","") };
    CatItem c = serie(1, 1, 100);
    assert(prox_ancora_absoluta(v, 4, 1, 1) == 1);
    assert(prox_para_item(&c, v, 4, AGORA, &s));
    assert(s.temporada == 1 && s.episodio == 2);
  }

  // --- meio de uma temporada -------------------------------------------
  {
    CatEp v[3] = { ep(1,1,"a",""), ep(1,2,"b","5 de fevereiro de 2026"),
                   ep(1,3,"c","") };
    CatItem c = serie(1, 1, 100);
    assert(prox_para_item(&c, v, 3, AGORA, &s));
    assert(s.temporada == 1 && s.episodio == 2 && !strcmp(s.nome, "b"));
  }

  // --- ultimo episodio de uma temporada vai para a proxima --------------
  {
    CatEp v[3] = { ep(1,1,"a",""), ep(1,2,"fim da T1",""),
                   ep(2,1,"estreia da T2","20 de janeiro de 2026") };
    CatItem c = serie(1, 2, 100);
    assert(prox_para_item(&c, v, 3, AGORA, &s));
    assert(s.temporada == 2 && s.episodio == 1);
  }

  // --- ultima temporada terminada: nada -------------------------------
  {
    CatEp v[2] = { ep(2,1,"a",""), ep(2,2,"ultimo","1 de janeiro de 2020") };
    CatItem c = serie(2, 2, 100);
    memset(&s, 0, sizeof s);
    assert(!prox_para_item(&c, v, 2, AGORA, &s));
    assert(s.episodio == 0);
  }

  // --- serie sem progresso nenhum: o card fica como esta ---------------
  {
    CatEp v[2] = { ep(1,1,"a",""), ep(1,2,"b","1 de fevereiro de 2026") };
    CatItem c = serie(1, 1, 0);
    assert(!prox_para_item(&c, v, 2, AGORA, &s));
    c.progresso = PROX_CONCLUIDO - 1;             // ainda em andamento
    assert(!prox_para_item(&c, v, 2, AGORA, &s));
    c.progresso = PROX_CONCLUIDO;                 // agora sim
    assert(prox_para_item(&c, v, 2, AGORA, &s));
  }

  // --- acervo: proximo existe, mas estreou ha anos ---------------------
  {
    CatEp v[2] = { ep(1,1,"a",""), ep(1,2,"b","1 de janeiro de 2015") };
    CatItem c = serie(1, 1, 100);
    assert(!prox_para_item(&c, v, 2, AGORA, &s));
  }

  // --- sem data legivel: caminho conservador ---------------------------
  {
    CatEp v[2] = { ep(1,1,"a",""), ep(1,2,"b","") };
    CatItem c = serie(1, 1, 100);
    assert(!prox_para_item(&c, v, 2, AGORA, &s));
  }

  // --- filme e lista vazia nunca entram na regra -----------------------
  {
    CatEp v[2] = { ep(1,1,"a",""), ep(1,2,"b","1 de fevereiro de 2026") };
    CatItem c = serie(1, 1, 100);
    snprintf(c.tipo, sizeof c.tipo, "movie");
    assert(!prox_para_item(&c, v, 2, AGORA, &s));
    snprintf(c.tipo, sizeof c.tipo, "series");
    assert(!prox_para_item(&c, NULL, 0, AGORA, &s));
  }

  puts("proximo: PASS (ancora absoluta, janela de novidade, virada de temporada,"
       " fim da serie, sem progresso)");
  return 0;
}
