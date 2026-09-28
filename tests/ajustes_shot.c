// CAPTURA DA TELA DE AJUSTES, sem interacao e sem rede.
//
// Existe pelo motivo que tests/player_regression.c ja registra: interface de TV
// julgada so por codigo sai ilegivel a 3 m. Aqui as duas telas que mudam neste
// trabalho — Ajustes e Addons > Reordenar Home — sao desenhadas com dados de
// mentira e gravadas em BMP, para serem OLHADAS.
//
// NAO CHAMA dados_iniciar DE PROPOSITO. Sem ela `dados_dir()` e "", entao
// fileiras.c nao le nem escreve arquivo nenhum: a lista comeca vazia (o estado
// de quem nunca abriu o app) e a captura nao mexe no fileirasui.txt de quem
// roda o teste.
#include "ajustes.h"
#include "corviva.h"
#include "addonsui.h"
#include "rail_shot.h"
#include "fileiras.h"
#include "catordem.h"
#include "colecoes.h"
#include "gfx.h"
#include "text.h"
#include "tex_cache.h"
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static void tecla(SDL_Keycode k) {
  SDL_Event e = { 0 };
  e.type = SDL_KEYDOWN;
  e.key.keysym.sym = k;
  ajustes_evento(&e);
  // O roteiro fotografa apenas Ajustes: quando sobe alem da primeira linha,
  // o app real consome o pedido e entrega o foco ao menu superior.
  if (k == SDLK_UP) (void)ajustes_quer_sair();
}

static int capturarAddons;
static void teclaAddons(SDL_Keycode k) {
  SDL_Event e = { 0 };
  e.type = SDL_KEYDOWN;
  e.key.keysym.sym = k;
  addonsui_evento(&e);
}

static void irAba(int indice) {
  int i;
  if (!ajustes_foco_no_indice()) tecla(SDLK_LEFT);
  for (i = 0; i < 12; i++) tecla(SDLK_LEFT);
  for (i = 0; i < indice; i++) tecla(SDLK_RIGHT);
}

static void captura(const char *nome, SDL_Window *win) {
  int i;
  static int modalCapturado;
  rail_shot_aplicar();
  for (i = 0; i < 60; i++) {
    SDL_PumpEvents();
    txt_novo_quadro();
    tex_novo_quadro();
    tex_bombear(6);
    if (capturarAddons) addonsui_atualizar(1.0f / 60.0f, SDL_GetTicks());
    else ajustes_atualizar(1.0f / 60.0f, SDL_GetTicks());
    glClearColor(0.025f, 0.025f, 0.03f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT);
    int modal = capturarAddons ? addonsui_modal_aberta() : ajustes_modal_aberta();
    int desfoque = modal && gfx_snap_ok() && gfx_borrao_disponivel(2);
    if (!modal) modalCapturado = 0;
    if (!desfoque || !modalCapturado) {
      if (desfoque) {
        gfx_snap_comecar();
        gfx_sem_recorte();
        glClearColor(0.025f, 0.025f, 0.03f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);
      }
      if (capturarAddons) addonsui_desenhar(SDL_GetTicks());
      else {
        ajustes_desenhar(SDL_GetTicks());
        rail_shot_desenhar(MENU_AJUSTES);
      }
      if (desfoque) {
        gfx_sem_recorte();
        gfx_snap_terminar();
        gfx_borrao_gerar(2, gfx_snap_textura(), 0.0f);
        modalCapturado = 1;
      }
    }
    if (desfoque) {
      gfx_snap_desenhar();
      gfx_borrao_desenhar(2, (GfxRect){0, 0, 1920, 1080}, 0.10f);
    }
    if (modal) {
      if (capturarAddons) addonsui_modal_desenhar(SDL_GetTicks());
      else ajustes_modal_desenhar(SDL_GetTicks());
    }
    if (i == 59) {
      unsigned char *pix = malloc(1920 * 1080 * 4);
      SDL_Surface *s;
      int y;
      assert(pix);
      glReadPixels(0, 0, 1920, 1080, GL_RGBA, GL_UNSIGNED_BYTE, pix);
      s = SDL_CreateRGBSurfaceWithFormat(0, 1920, 1080, 32, SDL_PIXELFORMAT_RGBA32);
      assert(s);
      for (y = 0; y < 1080; y++)
        memcpy((char *)s->pixels + y * s->pitch, pix + (1079 - y) * 1920 * 4, 1920 * 4);
      assert(SDL_SaveBMP(s, nome) == 0);
      SDL_FreeSurface(s);
      free(pix);
    }
    SDL_GL_SwapWindow(win);
  }
  printf("captura: %s\n", nome);
}

int main(int argc, char **argv) {
  const char *saida = argc > 1 ? argv[1] : "/tmp/nuvio-ajustes";
  char nome[600];
  SDL_Window *w;
  SDL_GLContext gl;
  int i;

  assert(SDL_Init(SDL_INIT_VIDEO | SDL_INIT_TIMER) == 0);
  IMG_Init(IMG_INIT_PNG | IMG_INIT_JPG);
  SDL_GL_SetAttribute(SDL_GL_CONTEXT_MAJOR_VERSION, 2);
  SDL_GL_SetAttribute(SDL_GL_CONTEXT_MINOR_VERSION, 1);
  w = SDL_CreateWindow("Nuvio: revisao dos Ajustes", SDL_WINDOWPOS_CENTERED,
                       SDL_WINDOWPOS_CENTERED, 1920, 1080,
                       SDL_WINDOW_OPENGL | SDL_WINDOW_SHOWN);
  assert(w);
  gl = SDL_GL_CreateContext(w);
  assert(gl);
  SDL_GL_SetSwapInterval(0);
  glViewport(0, 0, 1920, 1080);
  gfx_tamanho_alvo(1920, 1080);
  assert(gfx_iniciar());
  assert(gfx_snap_iniciar(1920, 1080));
  assert(gfx_borrao_iniciar(480, 270));
  assert(txt_iniciar("deploy/app", 1));
  tex_iniciar(64);
  gfx_icones_dir("deploy/app/art");

  // FILEIRAS DE MENTIRA cobrindo as origens que a folha sabe distinguir: o
  // catalogo de addon (com nome de addon e tipo), o grupo de colecoes, e as
  // fileiras que o proprio app monta.
  fil_registrar("continue_watching", "Continuar assistindo", "", "", 12);
  fil_registrar("social_activity", "Entre amigos", "", "", 6);
  fil_registrar("com.linvo.cinemeta_movie_top", "Popular", "Cinemeta", "movie", 40);
  fil_registrar("xperience_series_foryou", "For You", "Xperience", "series", 24);
  fil_registrar("collection_a24", "A24", "", "", 9);
  fil_registrar("tmdb.addon_movie_trending", "Em alta", "TMDB", "movie", 20);
  fil_registrar("aiostreams_series_novos", "Séries novas", "AIOStreams", "series", 18);
  fil_registrar("akashi_movie_anime", "Anime", "Akashi", "movie", 30);
  fil_registrar("mdblist_movie_oscar", "Vencedores do Oscar", "MDBList", "movie", 15);
  fil_registrar("sem.nome_movie_x", "", "", "", -1);
  // Mais catalogos do que o limite (7): os que passam ficam NA FILA. E dois
  // removidos, para a aba "Fora da Home" ter o que agrupar por addon.
  fil_registrar("xperience_movie_acao", "Ação", "Xperience", "movie", 12);
  fil_registrar("xperience_movie_terror", "Terror", "Xperience", "movie", 12);
  fil_registrar("xperience_series_animes", "Animes", "Xperience", "series", 12);
  fil_registrar("aiostreams_movie_top", "Top 100", "AIOStreams", "movie", 12);
  fil_registrar("akashi_series_dorama", "Doramas", "Akashi", "series", 12);
  fil_registrar("akashi_movie_bollywood", "Bollywood", "Akashi", "movie", 12);
  fil_remover(7);   // Anime
  fil_remover(9);   // sem nome
  fil_remover(12);  // Animes

  ajustes_iniciar();

  if (argc > 2 && !strcmp(argv[2], "--addons")) {
    // Centenas de declaracoes do Xperience, zero linhas escolhidas, 14 grupos
    // com 296 pastas e um catalogo disponivel do FenixFlix.
    char json[80000] = "{\"collections\":[";
    for (i = 0; i < 700; i++) {
      char chave[96];
      snprintf(chave, sizeof chave, "xperience_movie_fake_%03d", i);
      fil_registrar(chave, "Catálogo não escolhido", "Xperience", "movie", -1);
    }
    for (i = 0; i < 14; i++) {
      char trecho[600], chave[96], titulo[96];
      snprintf(trecho, sizeof trecho,
        "%s{\"id\":\"c%02d\",\"title\":\"Coleção %02d\",\"folders\":[",
        i ? "," : "", i, i);
      strncat(json, trecho, sizeof json - strlen(json) - 1);
      for (int p = 0; p < (i == 13 ? 23 : 21); p++) {
        snprintf(trecho, sizeof trecho,
          "%s{\"id\":\"f%02d_%02d\",\"title\":\"Pasta\",\"sources\":["
          "{\"provider\":\"addon\",\"addonId\":\"xperience\","
          "\"type\":\"movie\",\"catalogId\":\"fake_%03d\"}]}",
          p ? "," : "", i, p, i);
        strncat(json, trecho, sizeof json - strlen(json) - 1);
      }
      strncat(json, "]}", sizeof json - strlen(json) - 1);
      snprintf(chave, sizeof chave, "collection_c%02d", i);
      snprintf(titulo, sizeof titulo, "Coleção %02d", i);
      fil_registrar(chave, titulo, "", "", 1);
    }
    fil_registrar("fenixflix_movie_popular", "Populares (Fenix)",
                  "FenixFlix", "movie", -1);
    strncat(json, "]}", sizeof json - strlen(json) - 1);
    assert(col_definir_json(json) == 296);
    assert(col_tem_chave_grupo("collection_c13"));
    assert(catordem_ler("[{\"settings_json\":{\"items\":[]}}]"));
    capturarAddons = 1;
    addonsui_abrir();
    snprintf(nome, sizeof nome, "%s-addons.bmp", saida);
    captura(nome, w);
    teclaAddons(SDLK_DOWN);
    snprintf(nome, sizeof nome, "%s-addons-foco.bmp", saida);
    captura(nome, w);
    teclaAddons(SDLK_RETURN);
    assert(addonsui_reord_total() >= 15);
    assert(addonsui_reord_contem("collection_c13"));
    assert(addonsui_reord_contem("fenixflix_movie_popular"));
    assert(!addonsui_reord_contem("xperience_movie_fake_000"));
    snprintf(nome, sizeof nome, "%s-reordenar.bmp", saida);
    captura(nome, w);
    teclaAddons(SDLK_DOWN);
    snprintf(nome, sizeof nome, "%s-reordenar-segundo.bmp", saida);
    captura(nome, w);
    for (i = 0; i < addonsui_reord_total(); i++) teclaAddons(SDLK_DOWN);
    snprintf(nome, sizeof nome, "%s-reordenar-fenix.bmp", saida);
    captura(nome, w);
    tex_encerrar(); txt_encerrar(); gfx_encerrar();
    SDL_GL_DeleteContext(gl); SDL_DestroyWindow(w); SDL_Quit();
    return 0;
  }

  // Inspecao curta da nova composicao: abas horizontais, seletor visual de
  // tema e cartoes das demais categorias, sem executar o roteiro extenso.
  if (argc > 2 && !strcmp(argv[2], "--quick")) {
    snprintf(nome, sizeof nome, "%s-conta.bmp", saida);
    captura(nome, w);
    tecla(SDLK_RIGHT);                         // Aparencia nas abas
    snprintf(nome, sizeof nome, "%s-aparencia-aba.bmp", saida);
    captura(nome, w);
    tecla(SDLK_DOWN);                          // seletor de cor
    snprintf(nome, sizeof nome, "%s-aparencia-cor.bmp", saida);
    captura(nome, w);
    tecla(SDLK_LEFT);
    tecla(SDLK_RIGHT);                         // Layout
    tecla(SDLK_DOWN);
    snprintf(nome, sizeof nome, "%s-layout.bmp", saida);
    captura(nome, w);
    tex_encerrar(); txt_encerrar(); gfx_encerrar();
    SDL_GL_DeleteContext(gl); SDL_DestroyWindow(w); SDL_Quit();
    return 0;
  }

  // Um seletor de tres itens e um interruptor real, pelo caminho do controle.
  if (argc > 2 && !strcmp(argv[2], "--choices")) {
    tecla(SDLK_RIGHT);                         // Aparencia
    tecla(SDLK_DOWN);                          // cor (excecao: segue lateral)
    tecla(SDLK_DOWN);                          // Fonte do App
    tecla(SDLK_RETURN);
    assert(ajustes_modal_aberta());
    snprintf(nome, sizeof nome, "%s-escolha-fonte.bmp", saida);
    captura(nome, w);
    tecla(SDLK_DOWN);
    tecla(SDLK_ESCAPE);                        // cancela sem mudar
    assert(!ajustes_modal_aberta() && ajustes_fonte_app() == 0);
    tecla(SDLK_RETURN);
    tecla(SDLK_DOWN);
    tecla(SDLK_RETURN);                        // escolhe DM Sans
    assert(!ajustes_modal_aberta() && ajustes_fonte_app() == 1);
    tecla(SDLK_UP);                            // cor mantem a galeria lateral
    tecla(SDLK_RETURN);
    assert(!ajustes_modal_aberta());
    tecla(SDLK_RIGHT);
    tecla(SDLK_RETURN);
    irAba(8);                                  // Sobre
    tecla(SDLK_DOWN);
    tecla(SDLK_DOWN); tecla(SDLK_DOWN); tecla(SDLK_DOWN);
    snprintf(nome, sizeof nome, "%s-interruptor.bmp", saida);
    captura(nome, w);
    assert(!ajustes_envio_auto());
    tecla(SDLK_RETURN);
    assert(ajustes_envio_auto());
    snprintf(nome, sizeof nome, "%s-interruptor-ligado.bmp", saida);
    captura(nome, w);
    tex_encerrar(); txt_encerrar(); gfx_encerrar();
    SDL_GL_DeleteContext(gl); SDL_DestroyWindow(w); SDL_Quit();
    return 0;
  }

  // A TELA ABRE COM O FOCO NA COLUNA DE CATEGORIAS, na primeira (Conta), e a
  // lista mostra o que ha nela.
  snprintf(nome, sizeof nome, "%s-lista.bmp", saida);
  captura(nome, w);
  tecla(SDLK_LEFT);                            // borda esquerda permanece na tela
  assert(!ajustes_quer_sair());
  tecla(SDLK_RETURN);                          // Conta > Trocar perfil
  tecla(SDLK_RETURN);
  assert(ajustes_pediu_trocar_perfil());
  tecla(SDLK_LEFT);                            // volta ao indice

  // Todo caminho daqui em diante e o do CONTROLE: setas, OK e Voltar. As
  // categorias sao as de TELA[] em ajustes.c, na ordem do web: 0 Conta,
  // 1 Aparencia, 2 Layout, 3 Conteudo, 4 Integracoes, 5 Reproducao, 6 Trakt e
  // Simkl, 7 Avancado, 8 Sobre. Quem mudar a ordem la conserta os numeros aqui.
  irAba(2);                                    // Layout, ainda nas abas
  snprintf(nome, sizeof nome, "%s-indice.bmp", saida);
  captura(nome, w);
  tecla(SDLK_RETURN);                          // entra: foco no 1o grupo, fechado
  snprintf(nome, sizeof nome, "%s-secao.bmp", saida);
  captura(nome, w);
  tecla(SDLK_RETURN);                          // abre "Layout da Home"
  snprintf(nome, sizeof nome, "%s-grupo.bmp", saida);
  captura(nome, w);
  tecla(SDLK_DOWN);                            // Posteres horizontais: interruptor
  snprintf(nome, sizeof nome, "%s-interruptor.bmp", saida);
  captura(nome, w);

  // Voltar fecha o grupo e devolve o foco ao cabecalho. No grupo seguinte,
  // Conteudo da Home, ficam as demais preferencias; a ordem foi para Addons.
  tecla(SDLK_ESCAPE);
  tecla(SDLK_DOWN);
  tecla(SDLK_RETURN);
  tecla(SDLK_DOWN);                            // Mostrar destaque
  snprintf(nome, sizeof nome, "%s-conteudo-home.bmp", saida);
  captura(nome, w);

  // "MEMORIA USADA POR IMAGENS" (Avancado, 5a linha): o painel da direita
  // ganha barra, grafico e estatisticas do cache. Dois Voltar: fecha o grupo
  // (o foco sobe ao cabecalho) e volta ao indice.
  tecla(SDLK_ESCAPE);
  tecla(SDLK_ESCAPE);
  irAba(7);                                    // Avancado
  tecla(SDLK_RETURN);
  for (i = 0; i < 4; i++) tecla(SDLK_DOWN);
  snprintf(nome, sizeof nome, "%s-imagens.bmp", saida);
  captura(nome, w);

  // A PREVIA DO CARTAZ: Layout > Estilo dos cartoes (6o grupo) > Largura.
  tecla(SDLK_LEFT);                            // a esquerda tambem leva ao indice
  irAba(2);                                    // Layout
  tecla(SDLK_RETURN);
  for (i = 0; i < 5; i++) tecla(SDLK_DOWN);    // grupos todos fechados
  tecla(SDLK_RETURN);
  tecla(SDLK_DOWN);
  snprintf(nome, sizeof nome, "%s-previa-cartaz.bmp", saida);
  captura(nome, w);

  // MODO EDICAO numa lista de valores: Reproducao > Qualidade maxima.
  tecla(SDLK_ESCAPE); tecla(SDLK_ESCAPE);      // grupo -> cabecalho -> indice
  irAba(5);                                    // Reproducao
  tecla(SDLK_RETURN);
  for (i = 0; i < 4; i++) tecla(SDLK_DOWN);    // pula os dois rotulos de bloco
  tecla(SDLK_RETURN);
  snprintf(nome, sizeof nome, "%s-edicao.bmp", saida);
  captura(nome, w);

  // SAIR DA CONTA PEDE DOIS OK: o primeiro so arma. A captura para no armado.
  tecla(SDLK_ESCAPE); tecla(SDLK_ESCAPE);
  irAba(0);                                    // Conta
  tecla(SDLK_RETURN);
  tecla(SDLK_DOWN); tecla(SDLK_DOWN);
  tecla(SDLK_RETURN);
  snprintf(nome, sizeof nome, "%s-sair-armado.bmp", saida);
  captura(nome, w);
  assert(!ajustes_quer_sair());                // um OK nao sai

  // COR DE DESTAQUE ROSA (a da captura aprovada no DESIGN.md), e as duas
  // telas principais de novo com ela: Aparencia > Cor de destaque, seis passos.
  tecla(SDLK_LEFT);
  irAba(1);                                    // Aparencia
  tecla(SDLK_RETURN);
  tecla(SDLK_RETURN);
  for (i = 0; i < 6; i++) tecla(SDLK_RIGHT);
  tecla(SDLK_RETURN);
  snprintf(nome, sizeof nome, "%s-rosa-aparencia.bmp", saida);
  captura(nome, w);
  tecla(SDLK_LEFT);
  irAba(2);                                    // Layout
  tecla(SDLK_RETURN);
  tecla(SDLK_DOWN);                            // Conteudo da Home
  tecla(SDLK_RETURN);
  for (i = 0; i < 4; i++) tecla(SDLK_DOWN);    // Barra lateral moderna
  snprintf(nome, sizeof nome, "%s-rosa-grupo.bmp", saida);
  captura(nome, w);
  tecla(SDLK_LEFT);
  snprintf(nome, sizeof nome, "%s-rosa-indice.bmp", saida);
  captura(nome, w);

  // Conteudo agora mostra apenas Addons.
  irAba(3);                                    // Conteudo
  tecla(SDLK_RETURN);
  snprintf(nome, sizeof nome, "%s-conteudo.bmp", saida);
  captura(nome, w);

  // No tema dinamico a cor do logo e aplicada automaticamente, sem uma linha
  // propria na interface. A captura verifica a lista de Aparencia simplificada.
  tecla(SDLK_ESCAPE);
  irAba(1);                                    // Aparencia
  tecla(SDLK_RETURN);
  tecla(SDLK_RETURN);                          // edita a cor (esta em Rosa)
  for (i = 0; i < 6; i++) tecla(SDLK_RIGHT);   // Rosa(6) -> Dinamica imersiva(12)
  tecla(SDLK_RETURN);
  snprintf(nome, sizeof nome, "%s-aparencia-cor.bmp", saida);
  captura(nome, w);
  assert(ajustes_cor_viva() == CORVIVA_IMERSIVA);
  assert(ajustes_cor_logo());
  // De volta ao Rosa: sem titulo em cena o dinamico nao tem arte de onde tirar
  // a cor, e as paginas abaixo sao para julgar a tela, nao a cor viva.
  tecla(SDLK_RETURN);
  for (i = 0; i < 6; i++) tecla(SDLK_LEFT);
  tecla(SDLK_RETURN);
  assert(ajustes_cor_viva() == 0);
  tecla(SDLK_DOWN);

  // AVANCADO > DIAGNOSTICO: o teste de velocidade colado no diagnostico.
  tecla(SDLK_LEFT);
  irAba(7);                                    // Avancado
  tecla(SDLK_RETURN);
  for (i = 0; i < 6; i++) tecla(SDLK_DOWN);    // pula o rotulo "Diagnóstico"
  snprintf(nome, sizeof nome, "%s-avancado-velocidade.bmp", saida);
  captura(nome, w);
  tecla(SDLK_RETURN);                          // OK pede a tela do teste
  assert(ajustes_pediu_velocidade());

  // TODAS AS LINHAS, categoria a categoria e grupo a grupo, para serem olhadas
  // (o merge da 1.5 tirou o icone das linhas e o pos nas categorias e nos
  // grupos). Paginas de 6 passos. `LINHAS` e quantos itens com foco a
  // categoria tem no nivel de cima (grupos contam um); `GRUPOS`, as linhas de
  // cada grupo — espelho de TELA[] em ajustes.c.
  { static const int LINHAS[9] = { 3, 4, 6, 8, 3, 9, 3, 7, 4 };
    static const int GRUPOS[9][6] = {
      [2] = { 5, 15, 9, 9, 3, 11 },            // Layout
      [4] = { 14, 10, 1 },                     // Integracoes
    };
    int c, g, p, k;
    for (c = 0; c < 9; c++) {
      irAba(c);
      tecla(SDLK_RETURN);
      for (p = 0; p * 6 < LINHAS[c]; p++) {
        snprintf(nome, sizeof nome, "%s-todas-c%d-%d.bmp", saida, c, p);
        captura(nome, w);
        for (k = 0; k < 6; k++) tecla(SDLK_DOWN);
      }
      // E A ULTIMA LINHA: os saltos de 6 param antes dela quando a conta nao
      // fecha (Reproducao tem 9 — os idiomas ficavam de fora).
      if (LINHAS[c] > 6) {
        for (k = 0; k < 12; k++) tecla(SDLK_DOWN);
        snprintf(nome, sizeof nome, "%s-todas-c%d-fim.bmp", saida, c);
        captura(nome, w);
      }
      for (g = 0; g < 6 && GRUPOS[c][g]; g++) {
        irAba(c);
        tecla(SDLK_RETURN);
        for (i = 0; i < g; i++) tecla(SDLK_DOWN);
        tecla(SDLK_RETURN);                    // abre o grupo g
        for (p = 0; p * 6 < GRUPOS[c][g]; p++) {
          for (k = 0; k < (p ? 6 : 1); k++) tecla(SDLK_DOWN);
          snprintf(nome, sizeof nome, "%s-todas-c%d-g%d-%d.bmp", saida, c, g, p);
          captura(nome, w);
        }
        // Aqui SEM passar do fim: abaixo da ultima opcao vem o cabecalho do
        // grupo seguinte, e dele o Voltar iria ao indice em vez de fechar.
        if (GRUPOS[c][g] > 6 && GRUPOS[c][g] > 1 + 6 * (p - 1)) {
          for (k = 1 + 6 * (p - 1); k < GRUPOS[c][g]; k++) tecla(SDLK_DOWN);
          snprintf(nome, sizeof nome, "%s-todas-c%d-g%d-fim.bmp", saida, c, g);
          captura(nome, w);
        }
        tecla(SDLK_ESCAPE);                    // fecha; foco volta ao cabecalho
      }
    } }

  // "EXPERIMENTAR A COR VIVA" (cartao de novidades): a tela reabre ja em
  // Aparencia, com o foco na lista, na linha da cor.
  ajustes_abrir_na_cor();
  ajustes_iniciar();
  assert(!ajustes_foco_no_indice());
  snprintf(nome, sizeof nome, "%s-abrir-na-cor.bmp", saida);
  captura(nome, w);

  tex_encerrar();
  txt_encerrar();
  gfx_encerrar();
  SDL_GL_DeleteContext(gl);
  SDL_DestroyWindow(w);
  SDL_Quit();
  puts("PASS: capturas da tela de Ajustes gravadas.");
  return 0;
}
