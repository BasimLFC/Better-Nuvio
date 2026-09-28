// Descobrir funciona na Busca e como tela própria na navegação superior.
#include "discover.h"
#include "idioma.h"
#include "descoberta.h"
#include "catalogo.h"
#include "addons.h"
#include "gfx.h"
#include "text.h"
#include "tex_cache.h"
#include "ajustes.h"
#include "layout.h"
#include "anim.h"
#include "buscasrec.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

static int telaCheia;
#define DC_COLS (telaCheia ? 6 : 4)
#define DC_MAX (CAT_MAX + VT_MAX)
#define DC_X (telaCheia ? 52.0f : ajustes_conteudo_x() + 495.0f)
#define DC_RIGHT (telaCheia ? NV_TELA_W - 52.0f : NV_TELA_W - NV_CONTENT_PAD)
#define DC_GAP_X 14.0f
#define DC_W ((DC_RIGHT - DC_X - (DC_COLS - 1) * DC_GAP_X) / DC_COLS)
#define DC_H (DC_W * 1.5f)
#define DC_GAP_Y (telaCheia ? 78.0f : 18.0f)
#define DC_Y (telaCheia ? 340.0f : 334.0f)
#define DC_FILTRO_Y (telaCheia ? 230.0f : 268.0f)
#define DC_FILTRO_H (telaCheia ? 76.0f : 48.0f)
#define DC_FILTRO_GAP 10.0f
#define DC_FILTRO_W ((DC_RIGHT - DC_X - 2.0f * DC_FILTRO_GAP) / 3.0f)

static const struct { const char *id, *nome; } generos[] = {
  {"", "Todos os gêneros"}, {"Action", "Ação"}, {"Adventure", "Aventura"},
  {"Animation", "Animação"}, {"Comedy", "Comédia"}, {"Crime", "Crime"},
  {"Documentary", "Documentário"}, {"Drama", "Drama"},
  {"Family", "Família"}, {"Fantasy", "Fantasia"}, {"Horror", "Terror"},
  {"Mystery", "Mistério"}, {"Romance", "Romance"}, {"Sci-Fi", "Ficção científica"},
  {"Thriller", "Suspense"}
};
#define DC_GEN_N ((int)(sizeof generos / sizeof generos[0]))

static int tipo, catalogo, genero, campo, lista, cursor, foco, sair, pedido;
static int visiveis[DC_MAX], nVisiveis, ultimoN = -1;
// Índices abertos por IMDb: catálogos diferentes repetem o mesmo título.
// A revisão do catálogo pode mudar durante o carregamento, então reconstruir
// a grade precisa custar O(n), inclusive na TV.
static int vistos[4096];
static unsigned ultimaRevisao;
static float scrollY, velY;
static float chevronAberto[3], chevronVel[3];
static DescCatalogo escolhido;
static int temEscolhido;
// "Todos" começa com a Home e continua, página a página, pelos catálogos.
// Guardamos as páginas fora de cat_* para não alterar as fileiras da Home.
static CatItem *maisItens;
static int maisN, maisCap, todosCat, todosLidos, todosAberto;

static void limparTodos(void) {
  free(maisItens); maisItens = NULL; maisN = maisCap = 0;
  todosCat = todosLidos = todosAberto = 0;
}

static const char *tipoId(void) { return tipo ? "series" : "movie"; }
static int catalogoN(void) { return desc_discover_n(tipoId()); }

static int contem(const char *texto, const char *busca) {
  if (!texto || !busca || !*busca) return 0;
  size_t n = strlen(busca);
  for (; *texto; texto++) if (!strncasecmp(texto, busca, n)) return 1;
  return 0;
}
static int passaGenero(const CatItem *it) {
  if (!genero) return 1;
  return contem(it->genero, generos[genero].id) ||
         contem(it->genero, generos[genero].nome);
}
static int itemBruto(int i, CatItem *out) {
  if (catalogo) return desc_vertudo_item(i, out);
  if (i >= cat_n()) {
    i -= cat_n();
    if (i < 0 || i >= maisN) return 0;
    *out = maisItens[i];
    return 1;
  }
  const CatItem *p = cat_item(i);
  if (!p) return 0;
  *out = *p;
  return 1;
}
static void reconstruir(void) {
  int n = catalogo ? desc_vertudo_n() : cat_n() + maisN;
  unsigned rev = catalogo ? 0 : cat_revisao();
  if (n == ultimoN && rev == ultimaRevisao) return;
  ultimoN = n; ultimaRevisao = rev; nVisiveis = 0;
  memset(vistos, 0, sizeof vistos);
  for (int i = 0; i < n && nVisiveis < DC_MAX; i++) {
    CatItem it;
    if (!itemBruto(i, &it) || strcmp(it.tipo, tipoId()) ||
        !it.titulo[0] || !passaGenero(&it)) continue;
    // O mesmo filme pode chegar em várias fileiras da Home.
    if (!catalogo && it.imdb[0]) {
      unsigned hash = 2166136261u;
      for (const unsigned char *p = (const unsigned char *)it.imdb; *p; p++)
        hash = (hash ^ *p) * 16777619u;
      unsigned pos = hash & 4095u;
      while (vistos[pos]) {
        CatItem outro;
        if (itemBruto(vistos[pos] - 1, &outro) && !strcmp(outro.imdb, it.imdb)) break;
        pos = (pos + 1u) & 4095u;
      }
      if (vistos[pos]) continue;
      vistos[pos] = i + 1;
    }
    visiveis[nVisiveis++] = i;
  }
  if (foco >= nVisiveis) foco = nVisiveis ? nVisiveis - 1 : 0;
}
static void abrirCatalogo(void) {
  limparTodos();
  ultimoN = -1; foco = 0; scrollY = velY = 0;
  temEscolhido = catalogo > 0 &&
    desc_discover_item(tipoId(), catalogo - 1, &escolhido);
  if (!temEscolhido) { catalogo = 0; return; }
  const char *base = addons_base(escolhido.addon);
  if (!base || !base[0]) { catalogo = 0; temEscolhido = 0; return; }
  desc_vertudo_filtro(base, tipoId(), escolhido.id,
                      genero && escolhido.aceitaGenero ? generos[genero].id : "");
}

void discover_iniciar(void) {
  telaCheia = 0;
  limparTodos();
  tipo = catalogo = genero = campo = lista = cursor = foco = sair = 0;
  pedido = -1; temEscolhido = 0; ultimoN = -1; ultimaRevisao = 0;
  scrollY = velY = 0;
  memset(chevronAberto, 0, sizeof chevronAberto);
  memset(chevronVel, 0, sizeof chevronVel);
}
void discover_iniciar_tela(void) {
  discover_iniciar();
  telaCheia = 1;
}
void discover_atalho(int indice) {
  static const int tipos[] = {0,1,0,0,0,0};
  static const int generosAtalho[] = {0,0,4,1,10,6};
  if (indice < 0 || indice >= 6) return;
  tipo = tipos[indice];
  catalogo = 0;
  genero = generosAtalho[indice];
  campo = -1;
  foco = 0;
  lista = 0;
  abrirCatalogo();
  reconstruir();
}
void discover_ocultar(void) { lista = 0; sair = 0; }
int discover_quer_sair(void) { int v = sair; sair = 0; return v; }
int discover_pediu_abrir(int *indice) {
  if (pedido < 0) return 0;
  if (indice) *indice = pedido;
  pedido = -1;
  return 1;
}
static int opcoes(void) {
  return lista == 1 ? 2 : lista == 2 ? 1 + catalogoN() : DC_GEN_N;
}
void discover_evento(const SDL_Event *e) {
  if (e->type != SDL_KEYDOWN) return;
  SDL_Keycode k = e->key.keysym.sym;
  if (k == SDLK_ESCAPE || k == SDLK_AC_BACK || k == SDLK_BACKSPACE ||
      e->key.keysym.scancode == NV_SCANCODE_BACK) {
    if (lista) lista = 0; else sair = 1;
    return;
  }
  if (lista) {
    if (k == SDLK_DOWN && cursor + 1 < opcoes()) cursor++;
    else if (k == SDLK_UP && cursor > 0) cursor--;
    else if (k == SDLK_RETURN || k == SDLK_KP_ENTER) {
      if (lista == 1) { tipo = cursor; catalogo = genero = 0; abrirCatalogo(); }
      else if (lista == 2) { catalogo = cursor; abrirCatalogo(); }
      else { genero = cursor; abrirCatalogo(); }
      lista = 0;
    }
    return;
  }
  if (campo >= 0) {
    if (k == SDLK_LEFT && campo > 0) campo--;
    else if (k == SDLK_LEFT && !telaCheia) sair = 1;
    else if (k == SDLK_RIGHT && campo < 2) campo++;
    else if (k == SDLK_DOWN && nVisiveis) { campo = -1; foco = 0; }
    else if (k == SDLK_UP) sair = 1; // devolve o foco ao teclado da Busca
    else if (k == SDLK_RETURN || k == SDLK_KP_ENTER) {
      lista = campo + 1;
      cursor = campo == 0 ? tipo : campo == 1 ? catalogo : genero;
    }
    return;
  }
  if (k == SDLK_LEFT && foco > 0) foco--;
  else if (k == SDLK_LEFT && !telaCheia) sair = 1;
  else if (k == SDLK_RIGHT && foco + 1 < nVisiveis) foco++;
  else if (k == SDLK_DOWN && foco + DC_COLS < nVisiveis) foco += DC_COLS;
  else if (k == SDLK_UP) {
    if (foco < DC_COLS) campo = foco == 0 ? 0 : foco == 1 ? 1 : 2;
    else foco -= DC_COLS;
  } else if ((k == SDLK_RETURN || k == SDLK_KP_ENTER) && foco < nVisiveis) {
    CatItem it;
    if (itemBruto(visiveis[foco], &it)) {
      int idx = catalogo || visiveis[foco] >= cat_n()
              ? cat_indice_por_imdb(it.imdb) : visiveis[foco];
      if (idx < 0) idx = cat_acrescentar(&it);
      if (idx >= 0) pedido = idx;
    }
  }
  if (catalogo && foco >= nVisiveis - DC_COLS * 2 && !desc_vertudo_fim())
    desc_vertudo_mais();
}

static void carregarTodos(void) {
  if (maisN >= VT_MAX || todosCat >= catalogoN()) return;
  if (!todosAberto) {
    DescCatalogo c;
    if (!desc_discover_item(tipoId(), todosCat, &c)) return;
    const char *base = addons_base(c.addon);
    if (!base || !*base) { todosCat++; return; }
    desc_vertudo_filtro(base, tipoId(), c.id,
                        genero && c.aceitaGenero ? generos[genero].id : "");
    todosLidos = 0;
    todosAberto = 1;
    return;
  }
  int n = desc_vertudo_n();
  while (todosLidos < n && maisN < VT_MAX) {
    if (maisN == maisCap) {
      int cap = maisCap ? maisCap * 2 : 64;
      if (cap > VT_MAX) cap = VT_MAX;
      CatItem *p = realloc(maisItens, sizeof *p * (size_t)cap);
      if (!p) return;
      maisItens = p; maisCap = cap;
    }
    if (desc_vertudo_item(todosLidos, &maisItens[maisN])) maisN++;
    todosLidos++;
  }
  if (!desc_vertudo_carregando()) {
    if (desc_vertudo_fim() || desc_vertudo_erro()) {
      todosCat++; todosAberto = 0;
    } else desc_vertudo_mais();
  }
}
void discover_atualizar(float dt, Uint32 agora) {
  (void)agora;
  for (int i = 0; i < 3; i++)
    chevronAberto[i] = anim_mola2(&chevronVel[i], chevronAberto[i],
                                  lista == i + 1 ? 1.0f : 0.0f, dt, 24.0f);
  if (catalogo) {
    DescCatalogo atual;
    if (!temEscolhido || !desc_discover_item(tipoId(), catalogo - 1, &atual) ||
        atual.addon != escolhido.addon || strcmp(atual.id, escolhido.id) ||
        !addons_base(escolhido.addon)[0]) abrirCatalogo();
  }
  else if (foco >= nVisiveis - DC_COLS * 2) carregarTodos();
  reconstruir();
  float alvo = campo >= 0 ? 0 : (float)(foco / DC_COLS) * (DC_H + DC_GAP_Y) - 65.0f;
  float maxY = DC_Y + (float)((nVisiveis + DC_COLS - 1) / DC_COLS) *
               (DC_H + DC_GAP_Y) - NV_TELA_H + 50.0f;
  if (maxY < 0) maxY = 0;
  if (alvo < 0) alvo = 0;
  if (alvo > maxY) alvo = maxY;
  scrollY = anim_mola2(&velY, scrollY, alvo, dt, NV_MOLA2_SCROLL);
}
static void linha(TxtEstilo estilo, const char *s, float x, float y,
                  float max, int cor) {
  TxtLinha t = txt_linha_corta(estilo, s, cor, cor, cor, 255, max);
  txt_desenhar(t, x, y);
}
static void tracoChevron(float ax, float ay, float bx, float by,
                         float r, float g, float b) {
  const float margem = 2.0f;
  GfxRect q = {fminf(ax,bx)-margem, fminf(ay,by)-margem,
               fabsf(bx-ax)+2.0f*margem, fabsf(by-ay)+2.0f*margem};
  gfx_rect(q, 0, GFX_LINHA, 1.8f/q.h,
           (bx-ax)*(by-ay) < 0.0f ? 1.0f : 0.0f, 0, margem/q.h,
           r,g,b,1);
}
static void desenhaChevron(float cx, float cy, float aberto,
                           float ar, float ag, float ab) {
  // Os tres vertices giram em torno do centro geometrico do filtro. Um glifo
  // de texto muda de caixa e alinhamento conforme a fonte usada pela TV.
  const float px[3] = {-9.0f, 0.0f, 9.0f};
  const float py[3] = {-5.0f, 5.0f, -5.0f};
  float x[3], y[3], ang = 3.14159265f * aberto;
  float c = cosf(ang), s = sinf(ang);
  float r = .68f + (ar-.68f)*aberto;
  float g = .68f + (ag-.68f)*aberto;
  float b = .68f + (ab-.68f)*aberto;
  for (int i = 0; i < 3; i++) {
    x[i] = cx + px[i]*c - py[i]*s;
    y[i] = cy + px[i]*s + py[i]*c;
  }
  tracoChevron(x[0],y[0],x[1],y[1],r,g,b);
  tracoChevron(x[1],y[1],x[2],y[2],r,g,b);
}
void discover_desenhar(Uint32 agora, int ativo) {
  (void)agora;
  if (telaCheia) gfx_cor((GfxRect){0,0,NV_TELA_W,NV_TELA_H},0,.028f,.028f,.025f,1);
  linha(TXT_COND_TITULO3,
        telaCheia ? "Explorar" : "Recomendações para você", DC_X,
        telaCheia ? 138.0f : 188.0f,
        DC_RIGHT - DC_X, 248);
  if (telaCheia) linha(TXT_COND_CAPTION2, "Seleção do seu catálogo", DC_X, 188,
                       DC_RIGHT - DC_X, 178);
  const char *rot[3] = {"Tipo", "Catálogo", "Gênero"};
  const char *val[3] = {tipo ? "Séries" : "Filmes", "Todos", generos[genero].nome};
  if (temEscolhido) val[1] = escolhido.nome;
  for (int i = 0; i < 3; i++) {
    float x = DC_X + i * (DC_FILTRO_W + DC_FILTRO_GAP);
    GfxRect r = {x, DC_FILTRO_Y, DC_FILTRO_W, DC_FILTRO_H};
    float ar,ag,ab; ajustes_acento(&ar,&ag,&ab);
    gfx_cor(r, .4f, .13f, .13f, .14f, 1);
    if (ativo && campo == i)
      gfx_anel((GfxRect){x-3,DC_FILTRO_Y-3,DC_FILTRO_W+6,DC_FILTRO_H+6},.4f,3,ar,ag,ab,1);
    char label[200];
    snprintf(label,sizeof label,"%s: %s",i18n(rot[i]),i18n(val[i]));
    if (telaCheia) {
      linha(TXT_COND_CAPTION, i18n(rot[i]), x+20, DC_FILTRO_Y+10, DC_FILTRO_W-50, 165);
      linha(TXT_COND_BODY, i18n(val[i]), x+20, DC_FILTRO_Y+34, DC_FILTRO_W-55, 235);
    } else linha(TXT_COND_CAPTION2,label,x+16,DC_FILTRO_Y+10,DC_FILTRO_W-45,226);
    desenhaChevron(x + DC_FILTRO_W - (telaCheia ? 42.0f : 24.0f),
                   DC_FILTRO_Y + DC_FILTRO_H * .5f,
                   chevronAberto[i], ar, ag, ab);
  }
  gfx_recorte(DC_X-8, DC_Y-8, DC_RIGHT-DC_X+16, NV_TELA_H-DC_Y+8);
  for (int i = 0; i < nVisiveis; i++) {
    float x = DC_X + (i % DC_COLS) * (DC_W + DC_GAP_X);
    float y = DC_Y + (i / DC_COLS) * (DC_H + DC_GAP_Y) - scrollY;
    if (y > NV_TELA_H || y + DC_H + 70 < DC_Y) continue;
    CatItem it;
    if (!itemBruto(visiveis[i], &it)) continue;
    float ar,ag,ab; ajustes_acento(&ar,&ag,&ab);
    if (ativo && campo < 0 && i == foco)
      gfx_cor((GfxRect){x-4,y-4,DC_W+8,DC_H+8},.05f,ar,ag,ab,1);
    GfxRect r = {x,y,DC_W,DC_H};
    const char *arte = it.poster[0] ? it.poster : it.backdrop;
    GLuint t = arte[0] ? tex_obter_larg(arte, DC_W) : 0;
    if (t) {
      gfx_tex_aspect_atual = tex_aspecto(arte);
      gfx_rect(r,t,GFX_CARD,0,0,0,.05f,0,0,0,1);
      gfx_tex_aspect_atual = 0;
    } else gfx_cor(r,.05f,NV_COR_ESQUELETO_R,NV_COR_ESQUELETO_G,NV_COR_ESQUELETO_B,1);
    if (!t) {
      linha(TXT_COND_CALLOUT,it.titulo,x+14,y+DC_H-62,DC_W-28,236);
    }
    if (telaCheia) {
      linha(TXT_COND_CALLOUT,it.titulo,x,y+DC_H+10,DC_W,238);
      linha(TXT_COND_CAPTION,it.meta,x,y+DC_H+42,DC_W,165);
    }
  }
  gfx_sem_recorte();
  if (!nVisiveis) {
    const char *estado = (catalogo || todosAberto) && desc_vertudo_carregando() ? "Carregando títulos…" :
      catalogo && desc_vertudo_erro() ? "Não foi possível carregar o catálogo." :
      desc_discover_n(tipoId()) == 0 ? "Aguardando os catálogos dos addons…" :
      "Nenhum título para estes filtros.";
    linha(TXT_COND_CALLOUT,estado,DC_X,DC_Y+30,DC_RIGHT-DC_X,188);
  }
  // O menu fica por cima da grade, ancorado ao filtro ativo.
  if (lista) {
    int total = opcoes(), inicio = cursor > 4 ? cursor - 4 : 0;
    if (inicio + 6 > total) inicio = total > 6 ? total - 6 : 0;
    float x = DC_X + (lista - 1) * (DC_FILTRO_W + DC_FILTRO_GAP);
    float y = DC_FILTRO_Y + DC_FILTRO_H + 8.0f;
    int mostrado = total - inicio; if (mostrado > 6) mostrado = 6;
    gfx_cor((GfxRect){x,y,DC_FILTRO_W,mostrado*56.0f+14},.06f,.12f,.115f,.11f,1);
    for (int j = 0; j < mostrado; j++) {
      int ix = inicio+j;
      char nome[200];
      if (lista == 1) snprintf(nome,sizeof nome,"%s",ix ? "Séries":"Filmes");
      else if (lista == 3) snprintf(nome,sizeof nome,"%s",generos[ix].nome);
      else if (!ix) snprintf(nome,sizeof nome,"Todos");
      else { DescCatalogo c; nome[0]=0;
        if (desc_discover_item(tipoId(),ix-1,&c))
          snprintf(nome,sizeof nome,"%s · %s",c.nome,c.nomeAddon);
      }
      if (ix == cursor) {
        float ar,ag,ab; ajustes_acento(&ar,&ag,&ab);
        gfx_cor((GfxRect){x+7,y+7+j*56.0f,DC_FILTRO_W-14,50},.18f,ar,ag,ab,.55f);
      }
      linha(TXT_COND_CALLOUT,nome,x+18,y+17+j*56.0f,DC_FILTRO_W-36,240);
    }
  }
}
