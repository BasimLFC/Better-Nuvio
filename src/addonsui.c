#include "addonsui.h"
#include "addons.h"
#include "plugins.h"
#include "perfis.h"
#include "teclado.h"
#include "ajustes.h"
#include "anim.h"
#include "gfx.h"
#include "layout.h"
#include "qr.h"
#include "sync.h"
#include "text.h"
#include "fileiras.h"
#include "catordem.h"
#include "colecoes.h"
#include "descoberta.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

// O mesmo destino usado pela tela de Addons do Enhanced webOS. A conta no
// celular e quem altera a lista e a ordem; a TV apenas puxa o resultado.
#define ADDONS_CELULAR_URL "https://nuvio.tv/account?tab=addons"
#define PAINEL_X 520.0f
#define PAINEL_W 880.0f
#define BOTAO_H 132.0f
#define QR_MARGEM 4
#define QR_TAMANHO 392.0f

static int foco, sair, qrAberto, reordAberto;
static int modoPlugins;
static int reordLista[FIL_MAX], reordN, reordFoco, reordTopo, reordAcao;
static unsigned reordRev;
static unsigned reordCatRev, reordColRev;
static char reordChave[FIL_CHAVE];
static char feedbackPlugins[160];
static const char *ALFABETO_URL =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:/._-?&=%";
static float animFoco[PLUGIN_REPO_MAX+4];
static GLuint texQr;
static const char *urlCelular(void) {
  return ADDONS_CELULAR_URL;
}

static void prepararQr(void) {
  Qr q;
  unsigned char *px;
  int x, y, lado;
  if (texQr || !qr_gerar(&q, urlCelular())) return;
  lado = q.lado + QR_MARGEM * 2;
  px = malloc((size_t)lado * lado * 3);
  if (!px) return;
  memset(px, 255, (size_t)lado * lado * 3);
  for (y = 0; y < q.lado; ++y)
    for (x = 0; x < q.lado; ++x)
      if (qr_modulo(&q, x, y)) {
        size_t p = ((size_t)(y + QR_MARGEM) * lado + x + QR_MARGEM) * 3;
        px[p] = px[p + 1] = px[p + 2] = 0;
      }
  glGenTextures(1, &texQr);
  glBindTexture(GL_TEXTURE_2D, texQr);
  glPixelStorei(GL_UNPACK_ALIGNMENT, 1);
  glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, lado, lado, 0, GL_RGB,
               GL_UNSIGNED_BYTE, px);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
  gfx_tex_esquecer(0); // o bind foi feito fora de gfx_rect
  free(px);
}

void addonsui_abrir(void) {
  modoPlugins = 0;
  if (texQr) { glDeleteTextures(1, &texQr); texQr = 0; }
  foco = 0;
  sair = qrAberto = reordAberto = 0;
  reordN = reordFoco = reordTopo = 0;
  reordRev = ~0u;
  reordCatRev = reordColRev = ~0u;
  reordChave[0] = 0;
  feedbackPlugins[0] = 0;
  memset(animFoco,0,sizeof animFoco);
}

void addonsui_abrir_plugins(void) {
  addonsui_abrir(); modoPlugins = 1;
  plugins_local_perfil(perfis_dono(),perfis_ativo_plugins());
}

int addonsui_quer_sair(void) {
  int v = sair;
  sair = 0;
  return v;
}

int addonsui_modal_aberta(void) { return qrAberto || (modoPlugins && teclado_aberto()); }
int addonsui_reord_total(void) { return reordN; }
int addonsui_reord_contem(const char *chave) {
  if (!chave || !*chave) return 0;
  for (int i = 0; i < reordN; i++)
    if (!strcmp(fil_chave(reordLista[i]), chave)) return 1;
  return 0;
}

static int reordXperience(int linha) {
  const char *chave = fil_chave(linha);
  const char *addon = fil_linha_addon(linha);
  return !strncasecmp(chave, "app.xperience.", sizeof("app.xperience.") - 1) ||
         !strncasecmp(chave, "xperience_", sizeof("xperience_") - 1) ||
         !strncasecmp(addon, "Xperience", sizeof("Xperience") - 1);
}

static int reordIncluida(int linha) {
  const char *chave = fil_chave(linha);
  int origem = fil_linha_origem(linha);
  if (origem == FIL_ORIGEM_APP) return 0;
  if (origem == FIL_ORIGEM_COLECAO) return col_tem_chave_grupo(chave);
  if (fil_ligada_local(chave) || catordem_selecionada(chave)) return 1;
  // O Xperience publica centenas de linhas opcionais no manifesto. As nao
  // escolhidas no site nao fazem parte da Home nem desta lista. Os demais
  // addons continuam oferecendo seus catalogos para ativacao aqui na TV.
  if (reordXperience(linha))
    return !catordem_tem_configuracao() && !col_tem_conta() &&
           fil_linha_na_home(linha);
  return fil_linha_vista(linha) && fil_linha_addon(linha)[0];
}

static int reordDesligada(int linha);

static void reordMontar(int preservar) {
  int i, n = fil_n();
  reordN = 0;
  for (i = 0; i < n && reordN < FIL_MAX; i++)
    if (reordIncluida(i)) reordLista[reordN++] = i;
  if (preservar && reordChave[0])
    for (i = 0; i < reordN; i++)
      if (!strcmp(fil_chave(reordLista[i]), reordChave)) {
        reordFoco = i + 1; break;
      }
  if (reordFoco > reordN) reordFoco = reordN;
  if (reordFoco > 0 && reordFoco - 1 < reordTopo) reordTopo = reordFoco - 1;
  if (reordFoco > reordTopo + 4) reordTopo = reordFoco - 4;
  if (reordTopo > reordN - 4) reordTopo = reordN > 4 ? reordN - 4 : 0;
  snprintf(reordChave, sizeof reordChave, "%s",
           reordFoco > 0 ? fil_chave(reordLista[reordFoco - 1]) : "");
  reordRev = fil_revisao();
  reordCatRev = catordem_revisao();
  reordColRev = col_revisao();
}

static void reordReagir(void) {
  int i, vistos = 0, limite = fil_limite();
  desc_remontar_fileiras();
  for (i = 0; i < reordN && vistos < limite; i++) {
    int linha = reordLista[i];
    if (reordDesligada(linha)) continue;
    vistos++;
    if (!fil_linha_na_home(linha) &&
        (fil_linha_vista(linha) || fil_linha_origem(linha) == FIL_ORIGEM_CATALOGO)) {
      desc_repetir();
      break;
    }
  }
}

static void reordMover(int direcao) {
  int alvo, atual;
  if (reordFoco < 1 || reordFoco + direcao < 1 ||
      reordFoco + direcao > reordN) return;
  atual = reordLista[reordFoco - 1];
  alvo = reordLista[reordFoco - 1 + direcao];
  fil_trocar_posicoes(atual, alvo);
  reordFoco += direcao;
  reordMontar(0);
  reordReagir();
}

static int reordDesligada(int linha) {
  const char *chave = fil_chave(linha);
  if (fil_linha_origem(linha) == FIL_ORIGEM_CATALOGO &&
      (catordem_tem_configuracao() || col_tem_conta()) &&
      !catordem_selecionada(chave) && !fil_ligada_local(chave)) return 1;
  return fil_linha_oculta(linha) ||
         (catordem_oculta(chave, chave) && !fil_ligada_local(chave));
}

static void reordAlternar(void) {
  int i, linha;
  char chave[FIL_CHAVE];
  if (reordFoco < 1 || reordFoco > reordN) return;
  linha = reordLista[reordFoco - 1];
  snprintf(chave, sizeof chave, "%s", fil_chave(linha));
  if (reordDesligada(linha)) fil_adicionar(linha, NULL);
  else fil_remover(linha);
  reordMontar(0);
  for (i = 0; i < reordN; i++)
    if (!strcmp(fil_chave(reordLista[i]), chave)) { reordFoco = i + 1; break; }
  snprintf(reordChave, sizeof reordChave, "%s",
           reordFoco > 0 ? fil_chave(reordLista[reordFoco - 1]) : "");
  reordReagir();
}

static void reordEvento(const SDL_Event *e) {
  SDL_Keycode k = e->key.keysym.sym;
  if (k == SDLK_AC_BACK || k == SDLK_ESCAPE || k == SDLK_BACKSPACE ||
      k == SDLK_DELETE || e->key.keysym.scancode == NV_SCANCODE_BACK) {
    reordAberto = 0;
    return;
  }
  if (k == SDLK_UP && reordFoco > 0) reordFoco--;
  else if (k == SDLK_DOWN && reordFoco < reordN) reordFoco++;
  else if (k == SDLK_PAGEUP) { reordFoco -= 4; if (reordFoco < 0) reordFoco = 0; }
  else if (k == SDLK_PAGEDOWN) {
    reordFoco += 4; if (reordFoco > reordN) reordFoco = reordN;
  }
  else if (reordFoco == 0 && (k == SDLK_LEFT || k == SDLK_RIGHT)) {
    int atual = fil_limite();
    int novo = atual + (k == SDLK_RIGHT ? 1 : -1);
    if (novo >= FIL_LIMITE_MIN && novo <= FIL_LIMITE_MAX) {
      fil_definir_limite(novo);
      reordReagir();
    }
  }
  else if (reordFoco > 0 && k == SDLK_LEFT && reordAcao > 0) reordAcao--;
  else if (reordFoco > 0 && k == SDLK_RIGHT && reordAcao < 2) reordAcao++;
  else if (!e->key.repeat && (k == SDLK_RETURN || k == SDLK_KP_ENTER || k == SDLK_SPACE)) {
    if (reordFoco > 0) {
      if (reordAcao == 2) reordAlternar();
      else reordMover(reordAcao == 0 ? -1 : 1);
    }
  }
  if (reordFoco > 0 && reordFoco - 1 < reordTopo) reordTopo = reordFoco - 1;
  if (reordFoco > reordTopo + 4) reordTopo = reordFoco - 4;
  snprintf(reordChave, sizeof reordChave, "%s",
           reordFoco > 0 ? fil_chave(reordLista[reordFoco - 1]) : "");
}

void addonsui_evento(const SDL_Event *e) {
  SDL_Keycode k;
  if(modoPlugins && teclado_aberto()) {teclado_evento(e);return;}
  if (e->type != SDL_KEYDOWN) return;
  if (reordAberto) { reordEvento(e); return; }
  if (e->key.repeat) return;
  k = e->key.keysym.sym;
  if (qrAberto) {
    if (k == SDLK_RETURN || k == SDLK_KP_ENTER || k == SDLK_SPACE ||
        k == SDLK_AC_BACK || k == SDLK_ESCAPE || k == SDLK_BACKSPACE ||
        k == SDLK_DELETE || e->key.keysym.scancode == NV_SCANCODE_BACK) {
      qrAberto = 0;
      // Ao voltar do celular, atualiza a lista e a ordem sem reiniciar o app.
      sync_iniciar();
    }
    return;
  }
  switch (k) {
    case SDLK_UP: if (foco) --foco; else sair = 1; break;
    case SDLK_DOWN:
      if(foco < (modoPlugins ? plugins_n()+3 : 2)) ++foco;
      break;
    case SDLK_RIGHT:
      if(modoPlugins && foco>=4) {
        PluginRepo lista[PLUGIN_REPO_MAX];
        int n=plugins_copiar_lista(lista,PLUGIN_REPO_MAX);
        if(foco-4<n && plugins_remover_local(lista[foco-4].url)) {
          snprintf(feedbackPlugins,sizeof feedbackPlugins,
                   "Repositório local removido desta TV.");
          if(foco>plugins_n()+3) foco=plugins_n()+3;
        }
      }
      break;
    case SDLK_RETURN: case SDLK_KP_ENTER: case SDLK_SPACE:
      if (modoPlugins && foco == 0) {
        teclado_abrir_com("Adicionar repositório",
          "Digite a URL HTTPS do manifesto. Teclado físico também funciona.",
          220,ALFABETO_URL,NULL);
      }
      else if (modoPlugins && foco == 1)
        plugins_definir_global(!plugins_global_ativo());
      else if (modoPlugins && foco == 2)
        plugins_definir_agrupamento(!plugins_agrupados());
      else if (modoPlugins && foco == 3) sync_iniciar();
      else if (modoPlugins) {
        PluginRepo lista[PLUGIN_REPO_MAX];
        int n=plugins_copiar_lista(lista,PLUGIN_REPO_MAX);
        if(foco-4<n && foco>=4) {
          if(plugins_adicionar_local(lista[foco-4].url))
            snprintf(feedbackPlugins,sizeof feedbackPlugins,
                     "Repositório ativado nesta TV para busca de fontes.");
          else snprintf(feedbackPlugins,sizeof feedbackPlugins,
                        "Não foi possível ativar este repositório.");
        }
      }
      else if (foco == 0) { prepararQr(); qrAberto = 1; }
      else if (foco == 1) {
        reordAberto = 1; reordFoco = 1; reordTopo = 0; reordAcao = 1;
        reordMontar(0);
      }
      else sync_iniciar();
      break;
    case SDLK_AC_BACK: case SDLK_ESCAPE: case SDLK_BACKSPACE:
    case SDLK_DELETE: sair = 1; break;
    default: break;
  }
  if (e->key.keysym.scancode == NV_SCANCODE_BACK) sair = 1;
}

void addonsui_atualizar(float dt, Uint32 agora) {
  int i;
  if (reordAberto && (fil_revisao() != reordRev ||
      catordem_revisao() != reordCatRev || col_revisao() != reordColRev))
    reordMontar(1);
  if(modoPlugins) {
    teclado_atualizar(dt,agora);
    if(teclado_resultado()==TECLADO_PRONTO) {
      if(plugins_adicionar_local(teclado_texto()))
        snprintf(feedbackPlugins,sizeof feedbackPlugins,
                 "Repositório adicionado nesta TV. Abra um título para buscar fontes.");
      else snprintf(feedbackPlugins,sizeof feedbackPlugins,
                    "Use uma URL HTTPS válida e entre na sua conta.");
    }
  }
  for (i = 0; i < PLUGIN_REPO_MAX+4; ++i)
    animFoco[i] = anim_mola(animFoco[i], !qrAberto && !reordAberto && i == foco ? 1.0f : 0.0f,
                            dt, NV_MOLA_FOCO);
}

static void centro(TxtEstilo estilo, const char *s, int cor, float y) {
  TxtLinha l = txt_linha(estilo, s, cor, cor, cor, 255);
  txt_desenhar(l, (NV_TELA_W - l.w) * 0.5f, y);
}

static void botao(int i, float y, const char *titulo, const char *sub,
                  const char *icone, const char *cauda) {
  float f = animFoco[i], ar, ag, ab;
  int c = f > 0.5f ? ajustes_tinta_foco() : 242;
  int s = f > 0.5f ? ajustes_tinta_foco2() : 169;
  GfxRect r = { PAINEL_X, y, PAINEL_W, BOTAO_H };
  gfx_cor(r, 0.16f, 0.17f, 0.17f, 0.17f, 0.94f);
  if (f > 0.01f) {
    ajustes_acento(&ar, &ag, &ab);
    gfx_cor(r, 0.16f, ar, ag, ab, f);
  }
  if (!strcmp(icone, "aj_rows-3"))
    gfx_icone((GfxRect){r.x + 43.0f, y + 42.0f, 48.0f, 48.0f},
              icone, c / 255.0f, c / 255.0f, c / 255.0f, 1.0f);
  else {
    TxtLinha l = txt_linha(TXT_TITULO3, icone, c, c, c, 255);
    txt_desenhar(l, r.x + 34.0f, y + 33.0f);
  }
  { TxtLinha l = txt_linha(TXT_CALLOUT, titulo, c, c, c, 255);
    txt_desenhar(l, r.x + 132.0f, y + 21.0f); }
  { TxtLinha l = txt_linha_corta(TXT_CAPTION, sub, s, s, s, 255, r.w - 200.0f);
    txt_desenhar(l, r.x + 132.0f, y + 69.0f); }
  { TxtLinha l = txt_linha(TXT_HEADLINE, cauda, c, c, c, 255);
    txt_desenhar(l, r.x + r.w - 40.0f - l.w, y + 44.0f); }
}

static void opcaoPlugin(int i,float y,const char *titulo,const char *sub,
                        const char *valor) {
  float f=animFoco[i],ar,ag,ab;
  GfxRect r={PAINEL_X,y,PAINEL_W,91.0f};
  int c=f>0.5f?ajustes_tinta_foco():239;
  gfx_cor(r,0.16f,0.17f,0.17f,0.17f,0.94f);
  if(f>0.01f) { ajustes_acento(&ar,&ag,&ab); gfx_cor(r,0.16f,ar,ag,ab,f); }
  txt_desenhar(txt_linha(TXT_CALLOUT,titulo,c,c,c,255),r.x+28,y+8);
  txt_desenhar(txt_linha_corta(TXT_CAPTION,sub,158,158,158,255,620),r.x+28,y+50);
  { TxtLinha v=txt_linha(TXT_BODY,valor,c,c,c,255);
    txt_desenhar(v,r.x+r.w-v.w-27,y+24); }
}

static void reordAcaoDesenhar(GfxRect r, const char *rotulo, int selecionado,
                              int disponivel, int verde) {
  float ar, ag, ab;
  int c = disponivel ? (verde ? 106 : 218) : 98;
  ajustes_acento(&ar, &ag, &ab);
  gfx_cor(r, 0.22f, 0.15f, 0.15f, 0.15f, 1);
  if (selecionado) {
    gfx_anel(r, 0.22f, 2.5f, ar, ag, ab, 1);
    c = disponivel ? 255 : 130;
  }
  { TxtLinha t = txt_linha(TXT_BODY, rotulo, c, verde && !selecionado ? 184 : c,
                          verde && !selecionado ? 103 : c, 255);
    txt_desenhar(t, r.x + (r.w - t.w) * 0.5f, r.y + 17); }
}

static void reordDesenhar(void) {
  int p, primeiro = reordTopo, ultimo = reordTopo + 4;
  char texto[160];
  float ar, ag, ab;
  ajustes_acento(&ar, &ag, &ab);
  txt_desenhar(txt_linha(TXT_TITULO2, "Reordenar Home", 255,255,255,255), 96, 71);
  txt_desenhar(txt_linha(TXT_BODY,
    "Organize catálogos e coleções para a Home deste perfil nesta TV.",
    174,174,174,255), 99, 150);
  { GfxRect limite = { 1445, 183, 379, 68 };
    gfx_cor(limite, 0.22f, 0.15f, 0.15f, 0.15f, 1);
    if (reordFoco == 0) gfx_anel(limite, 0.22f, 2.5f, ar, ag, ab, 1);
    snprintf(texto, sizeof texto, "‹  Limite da Home: %d  ›", fil_limite());
    { TxtLinha t = txt_linha(TXT_CAPTION, texto, 224,224,224,255);
      txt_desenhar(t, limite.x + (limite.w - t.w) * 0.5f, limite.y + 16); }
  }
  if (!reordN) {
    centro(TXT_BODY, "Nenhum catálogo ou coleção selecionado para a Home.", 168, 508);
    centro(TXT_CAPTION, "Voltar  Addons", 128, 1014);
    return;
  }
  snprintf(texto, sizeof texto, "%d–%d de %d", primeiro + 1,
           reordN < ultimo ? reordN : ultimo, reordN);
  txt_desenhar(txt_linha(TXT_CAPTION, texto, 155,155,155,255), 100, 224);
  if (ultimo > reordN) ultimo = reordN;
  for (p = primeiro; p < ultimo; p++) {
    int linha = reordLista[p];
    int estado = reordDesligada(linha) ? FIL_FORA :
                 (fil_linha_na_home(linha) || p < fil_limite()
                    ? FIL_NA_HOME : FIL_NA_FILA);
    int focado = reordFoco == p + 1;
    float y = 282.0f + (p - primeiro) * 174.0f;
    GfxRect cartao = { 96, y, 1728, 156 };
    char info[256];
    const char *origem = fil_linha_origem(linha) == FIL_ORIGEM_COLECAO ?
                         "Coleção" : "Catálogo";
    const char *addon = fil_linha_addon(linha);
    const char *conteudo = fil_linha_conteudo(linha);
    gfx_cor(cartao, 0.13f, focado ? 0.18f : 0.15f,
            focado ? 0.17f : 0.15f, focado ? 0.15f : 0.15f, 1);
    if (focado) gfx_anel(cartao, 0.13f, 2.0f, ar, ag, ab, 0.9f);
    txt_desenhar(txt_linha_corta(TXT_CALLOUT, fil_titulo(linha),
                243,243,243,255,1240), 132, y + 19);
    if (addon && *addon)
      snprintf(info, sizeof info, "%s · %s%s%s", origem, addon,
               conteudo && *conteudo ? " · " : "", conteudo ? conteudo : "");
    else snprintf(info, sizeof info, "%s%s%s", origem,
                  conteudo && *conteudo ? " · " : "", conteudo ? conteudo : "");
    txt_desenhar(txt_linha_corta(TXT_CAPTION, info, 159,159,159,255,1250),
                132, y + 62);
    { const char *rotulo = estado == FIL_NA_HOME ? "Na Home" :
                           estado == FIL_NA_FILA ? "Na fila" : "Fora da Home";
      int cr = estado == FIL_FORA ? 201 : 113;
      int cg = estado == FIL_FORA ? 102 : 197;
      int cb = estado == FIL_FORA ? 120 : 132;
      txt_desenhar(txt_linha(TXT_CAPTION, rotulo, cr,cg,cb,255), 132, y + 105);
    }
    reordAcaoDesenhar((GfxRect){1461,y+46,76,65}, "↑",
                      focado && reordAcao == 0, p > 0, 0);
    reordAcaoDesenhar((GfxRect){1552,y+46,76,65}, "↓",
                      focado && reordAcao == 1, p + 1 < reordN, 0);
    reordAcaoDesenhar((GfxRect){1642,y+46,148,65},
                      estado == FIL_FORA ? "Ativar" : "Desativar",
                      focado && reordAcao == 2, 1, estado == FIL_FORA);
  }
  centro(TXT_CAPTION,
    "↑ ↓ escolher  ·  ← → selecionar ação ou alterar limite  ·  OK confirmar  ·  Voltar Addons",
    135, 1015);
}

void addonsui_desenhar(Uint32 agora) {
  char contagem[80];
  const char *estado;
  (void)agora;
  { GfxRect tela = { 0, 0, NV_TELA_W, NV_TELA_H };
    gfx_cor(tela, 0, NV_COR_FUNDO_R, NV_COR_FUNDO_G, NV_COR_FUNDO_B, 1); }
  if (reordAberto) { reordDesenhar(); return; }
  centro(TXT_TITULO2, modoPlugins ? "Plugins" : "Addons", 255,
         modoPlugins?125:201);
  centro(TXT_BODY, modoPlugins ? "Repositórios de fontes vinculados à sua conta." :
         "Gerencie addons pelo celular e organize a Home nesta TV.", 182,
         modoPlugins?207:284);
  if (modoPlugins) snprintf(contagem, sizeof contagem, "%d repositórios · %d ativos",
                             plugins_n(),plugins_ativos());
  else snprintf(contagem, sizeof contagem, "%d addons vinculados", addons_n());
  centro(TXT_CAPTION, contagem, 144, modoPlugins?248:354);
  estado = sync_estado() == SYNC_RODANDO ? "Atualizando a conta…" :
           sync_estado() == SYNC_FALHOU ? "Não foi possível atualizar. Tente novamente." :
           modoPlugins ? (feedbackPlugins[0]?feedbackPlugins:
                          "Adicione uma URL nesta TV ou sincronize a mesma conta.") :
           "Os addons são sincronizados com a sua conta.";
  centro(TXT_CAPTION, estado, 122, modoPlugins?290:393);
  if (modoPlugins) {
    PluginRepo lista[PLUGIN_REPO_MAX];
    int n=plugins_copiar_lista(lista,PLUGIN_REPO_MAX);
    int i,primeiro=foco>=5?foco-5:0;
    int mostrados=n-primeiro<2?n-primeiro:2;
    if(mostrados<0) mostrados=0;
    botao(0,335,"Adicionar repositório",
          "URL do manifesto de provedores JavaScript","+","›");
    opcaoPlugin(1,480,"Ativar provedores de plugin globalmente",
      "Incluir plugins na busca de fontes de reprodução",
      plugins_global_ativo()?"Ligado":"Desligado");
    opcaoPlugin(2,582,"Agrupar provedores por repositório",
      "Mostrar um nome por repositório na lista de fontes",
      plugins_agrupados()?"Ligado":"Desligado");
    opcaoPlugin(3,684,sync_estado()==SYNC_RODANDO?"Atualizando…":"Atualizar plugins",
      "Buscar mudanças da conta","›");
    { char secao[80];
      snprintf(secao,sizeof secao,"Repositórios (%d)",n);
      centro(TXT_BODY,secao,224,795); }
    for(i=0;i<mostrados;i++) {
      float y=835.0f+i*86.0f;
      GfxRect r={PAINEL_X,y,PAINEL_W,77.0f};
      PluginRepo *p=&lista[primeiro+i];
      const char *nome=p->nome[0]?p->nome:"Repositório";
      int local=plugins_eh_local(p->url);
      TxtLinha t,u;
      char detalhe[820];
      gfx_cor(r,0.15f,0.17f,0.17f,0.17f,0.96f);
      if(animFoco[primeiro+i+4]>0.01f) {
        float ar,ag,ab;
        ajustes_acento(&ar,&ag,&ab);
        gfx_cor(r,0.15f,ar,ag,ab,animFoco[primeiro+i+4]*0.8f);
      }
      t=txt_linha_corta(TXT_CALLOUT,nome,p->ativo?234:144,
                        p->ativo?234:144,p->ativo?234:144,255,700);
      txt_desenhar(t,r.x+28,y+9);
      snprintf(detalhe,sizeof detalhe,"%s · %s",
               !strcmp(p->tipo,"EXTERNAL_DEX")?"Código Android não compatível":
               local?"Ativo nesta TV · → remover":
               !p->ativo?"Desativado · OK para ativar":
               strcmp(p->tipo,"NUVIO_JS")?"Tipo não identificado · OK para ativar":"Ativo pela conta",
               p->url);
      u=txt_linha_corta(TXT_CAPTION,detalhe,135,135,135,255,800);
      txt_desenhar(u,r.x+28,y+47);
    }
    if(n>2) {
      char pagina[80];
      snprintf(pagina,sizeof pagina,"%d–%d de %d",primeiro+1,
               primeiro+mostrados,n);
      centro(TXT_CAPTION,pagina,150,1010);
    } else if(!n) {
      centro(TXT_BODY,"Nenhum plugin vinculado a este perfil.",155,850);
    }
    return;
  }
  botao(0, 460, "Gerenciar pelo celular",
        "Escaneie o QR para instalar, remover ou reorganizar", "QR", "›");
  botao(1, 610, "Reordenar Home",
        "Organize catálogos e coleções na Home desta TV", "aj_rows-3", "›");
  botao(2, 760, sync_estado() == SYNC_RODANDO ? "Atualizando…" : "Atualizar addons",
        "Buscar as mudanças feitas no celular", "↻", "›");
  centro(TXT_CAPTION, "Voltar  Ajustes", 125, 993);
}

void addonsui_modal_desenhar(Uint32 agora) {
  GfxRect fundo = { 0, 0, NV_TELA_W, NV_TELA_H };
  GfxRect cartao = { 485, 168, 950, 744 };
  GfxRect qrfundo = { (NV_TELA_W - QR_TAMANHO - 28) * 0.5f, 331,
                      QR_TAMANHO + 28, QR_TAMANHO + 28 };
  GfxRect qr = { (NV_TELA_W - QR_TAMANHO) * 0.5f, 345,
                 QR_TAMANHO, QR_TAMANHO };
  if(modoPlugins && teclado_aberto()) {teclado_desenhar(agora);return;}
  (void)agora;
  gfx_cor(fundo, 0, 0, 0, 0, 0.68f);
  gfx_cor(cartao, 0.07f, NV_COR_FUNDO_R, NV_COR_FUNDO_G, NV_COR_FUNDO_B, 1);
  centro(TXT_HEADLINE,"Gerenciar addons pelo celular",255,218);
  centro(TXT_CAPTION,"Escaneie para abrir a sua conta e reorganizar os addons.",185,286);
  prepararQr();
  if (texQr) {
    gfx_cor(qrfundo, 0.05f, 1, 1, 1, 1);
    gfx_tex_aspect_atual = 0.0f;
    gfx_rect(qr, texQr, GFX_SNAP, 0, 0, 0, 0, 0, 0, 0, 1);
  } else {
    centro(TXT_BODY, "Não foi possível gerar o QR Code.", 235, 515);
  }
  centro(TXT_CAPTION, urlCelular(), 167, 762);
  centro(TXT_CAPTION, "OK ou Voltar para fechar e atualizar", 176, 820);
}
