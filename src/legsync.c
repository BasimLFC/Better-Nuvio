#include "legsync.h"
#include <math.h>
#include <string.h>

void legsync_limpar(LegSync *s) { if (s) memset(s, 0, sizeof *s); }

int legsync_marcar(LegSync *s, double video, double legenda, int *atrasoMs) {
  int i, pos = 0;
  if (!s || !atrasoMs || !isfinite(video) || !isfinite(legenda) || video < 0 || legenda < 0)
    return 0;
  // Uma marca perto da anterior e um novo ajuste de atraso, nao uma medida
  // confiavel de FPS. A pessoa pode ter selecionado a fala adjacente.
  for (i = 0; i < s->n; i++) if (fabs(video - s->video[i]) < 120.0) {
    legsync_limpar(s);
    break;
  }
  if (!s->n) {
    if (fabs(legenda - video) > 180.0) return 0;
    s->video[0] = video;
    s->legenda[0] = legenda;
    s->n = 1;
    *atrasoMs = (int)lround((legenda - video) * 1000.0);
    return 1;
  }
  if (video < s->video[0]) {
    legsync_limpar(s);
    return legsync_marcar(s, video, legenda, atrasoMs);
  }
  while (pos < s->n && s->video[pos] < video) pos++;
  // Um pareamento errado nao pode produzir uma taxa absurda para o resto do
  // filme. 0,94..1,06 inclui as conversoes 23,976/25 e 25/23,976.
  if (pos > 0) {
    double taxa = (legenda - s->legenda[pos-1]) / (video - s->video[pos-1]);
    if (taxa < .94 || taxa > 1.06) return 0;
  }
  if (pos < s->n) {
    double taxa = (s->legenda[pos] - legenda) / (s->video[pos] - video);
    if (taxa < .94 || taxa > 1.06) return 0;
  }
  if (s->n == LEGSYNC_MAX_PONTOS) {
    // Mantem o primeiro ponto (base do atraso manual) e os mais recentes.
    memmove(s->video + 1, s->video + 2, (LEGSYNC_MAX_PONTOS-2) * sizeof(double));
    memmove(s->legenda + 1, s->legenda + 2, (LEGSYNC_MAX_PONTOS-2) * sizeof(double));
    s->n--;
    if (pos > 1) pos--;
  }
  memmove(s->video + pos + 1, s->video + pos, (size_t)(s->n - pos) * sizeof(double));
  memmove(s->legenda + pos + 1, s->legenda + pos, (size_t)(s->n - pos) * sizeof(double));
  s->video[pos] = video;
  s->legenda[pos] = legenda;
  s->n++;
  return 2;
}

double legsync_tempo(const LegSync *s, double video, int atrasoMs) {
  int i = 0;
  double taxa, base, manual;
  if (!s || s->n < 2) return video + atrasoMs / 1000.0;
  while (i + 2 < s->n && video > s->video[i+1]) i++;
  taxa = (s->legenda[i+1] - s->legenda[i]) / (s->video[i+1] - s->video[i]);
  base = s->legenda[i] + (video - s->video[i]) * taxa;
  manual = atrasoMs / 1000.0 - (s->legenda[0] - s->video[0]);
  return base + manual;
}
