// Exercita o agrupamento real da folha, sem abrir janela ou acessar a rede.
#include "../src/faixas.c"
#include <assert.h>

static Legenda externas[5];
static int nExternas = 5, filtro = 1;

const char *i18n(const char *s) { return s; }
int video_n_legenda(void) { return 2; }
int video_legenda_atual(void) { return -1; }
int addons_n_legendas(void) { return nExternas; }
const Legenda *addons_legenda(int i) { return i >= 0 && i < nExternas ? &externas[i] : NULL; }
const char *ling_legenda(void) { return "pt-br"; }
const char *ling_legenda2(void) { return "en"; }
const char *ling_grupo_codigo(const char *c) {
  if (!strcasecmp(c, "pob") || !strcasecmp(c, "pt-br")) return "pt-br";
  if (!strcasecmp(c, "eng") || !strcasecmp(c, "en")) return "en";
  return c;
}
const char *ling_nome(const char *c) { return c; }
int ling_casa(const char *c, const char *p) {
  return !strcasecmp(ling_grupo_codigo(c), ling_grupo_codigo(p));
}
int ling_legenda_visivel(const char *c) { return !filtro || strcasecmp(c, "fr") != 0; }

int main(void) {
  const char *idiomas[] = { "fr", "eng", "pob", "und", "en" };
  for (int i = 0; i < nExternas; i++)
    snprintf(externas[i].idioma, sizeof externas[i].idioma, "%s", idiomas[i]);
  montarGrupos();
  assert(nGrupos == 5);
  assert(!strcmp(grupos[0].nome, "Desativada"));
  assert(!strcmp(grupos[1].nome, "Embutidas") && grupos[1].total == 2);
  assert(!strcmp(grupos[2].codigo, "pt-br") && faixaDaOpcao(2, 0) == 4);
  assert(!strcmp(grupos[3].codigo, "en") && grupos[3].total == 2);
  assert(faixaDaOpcao(1, 0) == 0 && faixaDaOpcao(1, 1) == 1);
  assert(grupoDaFaixa(0) == 1 && grupoDaFaixa(2) == 0);
  // Uma legenda externa ativa permanece visivel mesmo fora do filtro.
  legExterna = 2; // primeira externa: frances
  montarGrupos();
  assert(nGrupos == 6 && !strcmp(grupos[4].codigo, "fr"));
  assert(grupoDaFaixa(legExterna) == 4 && faixaDaOpcao(4, 0) == 2);
  focoIdioma = 3;
  filtro = 0;
  montarGrupos();
  assert(!strcmp(grupos[focoIdioma].codigo, "en"));
  assert(!strcmp(grupos[nGrupos-1].codigo, "und"));
  puts("faixas_grupos: ok");
  return 0;
}
