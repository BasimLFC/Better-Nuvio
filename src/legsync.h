#ifndef NV_LEGSYNC_H
#define NV_LEGSYNC_H

// Relogio da legenda externa. Um ponto corrige o atraso; dois ou mais
// corrigem tambem a deriva de taxa (24/25 fps) e cortes locais.
#define LEGSYNC_MAX_PONTOS 16
typedef struct {
  int n;
  double video[LEGSYNC_MAX_PONTOS];
  double legenda[LEGSYNC_MAX_PONTOS];
} LegSync;

void legsync_limpar(LegSync *s);
// 1 = ponto inicial/novo inicio; 2 = correcao progressiva ativa.
int legsync_marcar(LegSync *s, double video, double legenda, int *atrasoMs);
double legsync_tempo(const LegSync *s, double video, int atrasoMs);

#endif
