#include "legsync.h"
#include <assert.h>
#include <math.h>
#include <stdio.h>

static void perto(double a, double b) { assert(fabs(a-b) < .002); }

int main(void) {
  LegSync s = {0};
  int atraso = 0;
  // Legenda 25 fps em um video 24 fps: a segunda fala corrige a deriva.
  assert(legsync_marcar(&s, 60, 62.5, &atraso) == 1);
  assert(atraso == 2500);
  perto(legsync_tempo(&s, 660, atraso), 662.5);
  assert(legsync_marcar(&s, 660, 687.5, &atraso) == 2);
  perto(legsync_tempo(&s, 360, atraso), 375.0);
  perto(legsync_tempo(&s, 960, atraso), 1000.0);
  // Um corte/trecho de outra edicao e ancorado localmente, sem deslocar o
  // inicio inteiro. Mudar atraso manual continua transladando a faixa toda.
  assert(legsync_marcar(&s, 1260, 1322.5, &atraso) == 2);
  perto(legsync_tempo(&s, 60, atraso), 62.5);
  perto(legsync_tempo(&s, 960, atraso), 1005.0);
  perto(legsync_tempo(&s, 960, atraso+100), 1005.1);
  // Pareamento improvavel nao contamina o resto do episodio.
  assert(legsync_marcar(&s, 1600, 1900, &atraso) == 0);
  perto(legsync_tempo(&s, 960, atraso), 1005.0);
  legsync_limpar(&s);
  // Mais de tres minutos de deriva no fim de um filme ainda e um segundo
  // ponto valido: so o atraso INICIAL fica limitado a tres minutos.
  assert(legsync_marcar(&s, 60, 62.5, &atraso) == 1);
  assert(legsync_marcar(&s, 5400, 5625, &atraso) == 2);
  perto(legsync_tempo(&s, 5400, atraso), 5625.0);
  legsync_limpar(&s);
  perto(legsync_tempo(&s, 960, 0), 960.0);
  puts("legsync: ok");
  return 0;
}
