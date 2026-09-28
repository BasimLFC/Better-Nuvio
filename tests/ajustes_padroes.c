// PADROES DE FABRICA DOS AJUSTES, conferidos contra o comentario de cada um.
//
// `valor[]` em ajustes.c e POSICIONAL. Em 876742e entrou nele um padrao de
// uma opcao que nao existe no enum ("resetar foco ao iniciar") e cada padrao
// de AJ_RAIL a AJ_RESOLUCAO passou a cair na opcao seguinte — so reapareceu
// como defeito visivel em 22/09, quando uma captura rodou sem ajustes.txt e
// os cartoes sairam pilulas (arredondamento 126 dp, o padrao da LARGURA).
// Este teste le o vetor ja compilado, antes de qualquer arquivo, e confere a
// faixa que desalinhou mais as duas opcoes novas da arte do destaque.
#include "../src/ajustes.c"
#include <assert.h>
#include <unistd.h>

static void testarMigracaoDoFundo(void) {
  char dir[] = "/tmp/nuvio-fundo-v2-XXXXXX", caminho[256];
  FILE *f;
  assert(mkdtemp(dir));
  snprintf(caminho, sizeof caminho, "%s/ajustes.txt", dir);
  f = fopen(caminho, "w"); assert(f);
  fputs("heroFundoLocal 7\n", f); fclose(f);
  ajustes_dir(dir);
  assert(ajustes_hero_fonte() == ARTEHERO_ANIME);
  f = fopen(caminho, "w"); assert(f);
  fputs("heroFundoLocal 6\n", f); fclose(f);
  ajustes_dir(dir);
  assert(ajustes_hero_fonte() == ARTEHERO_AUTO);
  f = fopen(caminho, "w"); assert(f);
  fputs("heroFundoLocalV2 6\n", f); fclose(f);
  ajustes_dir(dir);
  assert(ajustes_hero_fonte() == ARTEHERO_ANIME);
  unlink(caminho);
  rmdir(dir);
}

int main(void) {
  // Home: layout e arte do destaque.
  assert(valor[AJ_HERO_FUNDO] == 0);          // Automatico
  assert(valor[AJ_HERO_ARTE_DIF] == 1);       // Desligado: mesma foto do card
  assert(valor[AJ_HERO_TRAILER] == 0);
  // A faixa que andava uma casa.
  assert(valor[AJ_RAIL] == 0);                // recolhida
  assert(valor[AJ_RAIL_MODERNA] == 1);        // desligada
  assert(valor[AJ_RAIL_BLUR] == 0);
  assert(valor[AJ_ROTULOS] == 1);             // rotulos desligados
  assert(valor[AJ_CW_LIGADO] == 0);
  assert(valor[AJ_DET_VEU] == 100);
  // Fonte do trailer (trailerfonte.h): nasce Automatica, e deste aparelho,
  // e a chave nao colide com nada da conta.
  assert(valor[AJ_TRAILER_FONTE] == 0);
  assert(OPCOES[AJ_TRAILER_FONTE].n == 4);
  assert(!strcmp(CHAVE[AJ_TRAILER_FONTE], "trailerFonteLocal"));
  assert(!strcmp(CHAVE[AJ_TRAILER_ASPECTO], "trailerAspecto"));
  assert(!strcmp(CHAVE[AJ_TRAILER_FONTE + 1], "focusedPosterBackdropExpandEnabled"));
  assert(somenteDesteAparelho(AJ_TRAILER_FONTE));
  assert(valor[AJ_EXPANDIR] == 0);
  assert(valor[AJ_EXPANDIR_ATRASO] == 3);
  assert(valor[AJ_PROF] == 1);                // profundidade desligada
  assert(valor[AJ_PROF_BORDA] == 28);         // cardDepthEdgeStrength
  assert(valor[AJ_PROF_BRILHO] == 10);        // cardDepthSheenStrength
  assert(valor[AJ_LARGURA_DP] == 126);
  assert(valor[AJ_RAIO_DP] == 12);            // canto normal, nao pilula
  assert(valor[AJ_QUALIDADE_IMG] == 1);       // Padrao
  assert(valor[AJ_IDIOMA] == 1);              // English (release publico)
  assert(valor[AJ_ANIM] == 0);                // animacoes completas
  assert(valor[AJ_RESOLUCAO] == 0);           // 1080p
  assert(valor[AJ_TEMA] == 0);
  // Depois do tema o vetor ja estava certo; o "+" salva no Trakt.
  assert(valor[AJ_SALVOS_DEST] == 1);
  // A lista de fontes acompanha os indices gravados em heroFundoLocalV2.
  assert(OPCOES[AJ_HERO_FUNDO].n == ARTEHERO_N_ESCOLHAS);
  assert(!strcmp(V_HERO_FONTE[ARTEHERO_TRAKT], "Trakt"));
  assert(!strcmp(V_HERO_FONTE[ARTEHERO_APPLE], "Apple TV"));
  assert(!strcmp(V_HERO_FONTE[ARTEHERO_ANIME], "Anime (Kitsu / AniList)"));
  assert(!strcmp(CHAVE[AJ_HERO_FUNDO], "heroFundoLocalV2"));
  assert(!strcmp(CHAVE[AJ_DIAGNOSTICO - 1], "mdblist_show_mal"));
  assert(valor[AJ_DIAGNOSTICO] == 0);
  assert(valor[AJ_MDB_MAL] == 0);
  testarMigracaoDoFundo();
  puts("ajustes_padroes: ok");
  return 0;
}
