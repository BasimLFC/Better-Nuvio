#include "login.h"
#include "sessao.h"
#include "nuvem.h"
#include "qr.h"
#include "gfx.h"
#include "text.h"
#include "anim.h"
#include "layout.h"
#include "extras.h"
#include "tex_cache.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// O servidor entrega um codigo hexadecimal de 32 caracteres, nao o codigo
// curto do layout de referencia. O QR continua sendo o caminho principal;
// a URL sem query e o codigo ficam abaixo como alternativa manual.
#define LG_PAINEL_X       980.0f
#define LG_PAINEL_Y       105.0f
#define LG_PAINEL_W       840.0f
#define LG_PAINEL_H       870.0f
#define LG_QR_LADO        368.0f
#define LG_QR_MOLDURA     400.0f
#define LG_MARCA_X        168.0f
#define LG_MARCA_Y        314.0f
#define LG_MARCA_W        570.0f
#define LG_MARCA_H        (LG_MARCA_W * 344.0f / 1085.0f)
#define LG_PILL_W         360.0f
#define LG_PILL_H          72.0f
// Zona de silencio: 4 modulos claros em volta, exigidos pela norma. Vao DENTRO
// da textura para que nenhum ajuste de layout possa comer a margem por
// acidente — sem ela, leitor nenhum acha o simbolo.
#define LG_QR_MARGEM       4

static float animBotao;
static float pulso;

static GLuint texQr;
static char   qrDe[512];   // conteudo ja desenhado, para nao refazer por quadro

// Sobe o simbolo como textura em vez de desenhar um retangulo por modulo: a
// versao 4 tem 33x33 = 1089 modulos, e mil chamadas de desenho por quadro
// custam mais que a tela inteira.
static void gerarTexQr(const char *texto) {
  Qr q;
  int n, lado, x, y;
  unsigned char *px;
  if (!texto || !texto[0]) return;
  if (!strcmp(qrDe, texto) && texQr) return;
  if (!qr_gerar(&q, texto)) { printf("[login] URL nao cabe num QR: %s\n", texto); return; }

  lado = q.lado + 2 * LG_QR_MARGEM;
  px = (unsigned char *)malloc((size_t)lado * lado * 3);
  if (!px) return;
  memset(px, 255, (size_t)lado * lado * 3);   // fundo claro, inclusive a margem
  for (y = 0; y < q.lado; y++)
    for (x = 0; x < q.lado; x++)
      if (qr_modulo(&q, x, y)) {
        size_t i = ((size_t)(y + LG_QR_MARGEM) * lado + (x + LG_QR_MARGEM)) * 3;
        px[i] = px[i + 1] = px[i + 2] = 0;
      }

  if (!texQr) glGenTextures(1, &texQr);
  glBindTexture(GL_TEXTURE_2D, texQr);
  // NEAREST, nao LINEAR: um modulo borrado com o vizinho e o jeito mais rapido
  // de tornar o simbolo ilegivel numa camera de celular.
  glPixelStorei(GL_UNPACK_ALIGNMENT, 1);
  glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, lado, lado, 0, GL_RGB, GL_UNSIGNED_BYTE, px);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
  free(px);
  n = snprintf(qrDe, sizeof qrDe, "%s", texto);
  (void)n;
}

void login_iniciar(void) {
  animBotao = 0.0f;
  pulso = 0.0f;
  // Pedir o codigo JA, sem esperar o OK: a pessoa que acabou de instalar o app
  // nao tem nada para decidir nesta tela, e um botao "entrar" antes do codigo
  // so acrescenta um toque e uns segundos de espera depois dele.
  if (!sessao_logada()) sessao_login_comecar();
}

void login_evento(const SDL_Event *e) {
  if (e->type != SDL_KEYDOWN) return;
  { SDL_Keycode k = e->key.keysym.sym;
    if (k == SDLK_RETURN || k == SDLK_KP_ENTER || k == SDLK_SPACE) {
      // OK so faz sentido quando ha o que refazer. Com o codigo na tela ele nao
      // faz nada de proposito: reiniciar o fluxo aqui trocaria o codigo que a
      // pessoa acabou de digitar no celular.
      if (sessao_estado() == SES_ERRO || sessao_estado() == SES_DESLOGADO)
        sessao_login_comecar();
    } }
}

void login_atualizar(float dt, Uint32 agora) {
  sessao_passo((unsigned)agora);
  animBotao = anim_mola(animBotao, 1.0f, dt, NV_MOLA_FOCO);
  pulso += dt;
}

static void linhaPainel(TxtEstilo est, const char *s, int r, int g, int b,
                        float y, float alpha) {
  TxtLinha l = txt_linha_corta(est, s, r, g, b, 255, LG_PAINEL_W - 88.0f);
  txt_desenhar_alpha(l, LG_PAINEL_X + (LG_PAINEL_W - l.w) * 0.5f, y, alpha);
}

void login_desenhar(Uint32 agora) {
  SesEstado st = sessao_estado();
  GfxRect painel = { LG_PAINEL_X, LG_PAINEL_Y, LG_PAINEL_W, LG_PAINEL_H };
  const char *marca = extras_caminho_marca_nome("better_nuvio");
  GLuint logo = tex_obter_larg(marca, LG_MARCA_W);
  (void)agora;

  { GfxRect tela = { 0, 0, NV_TELA_W, NV_TELA_H };
    gfx_cor(tela, 0.0f, 0.032f, 0.035f, 0.041f, 1.0f); }
  // A marca e a mesma da escolha de perfis. O arquivo tem o simbolo e NUVIO;
  // BETTER ocupa o espaco acima do wordmark, sem criar outra arte no pacote.
  if (logo) gfx_rect((GfxRect){ LG_MARCA_X, LG_MARCA_Y, LG_MARCA_W, LG_MARCA_H },
                     logo, GFX_TEXTO, 0, 0, 0, 0, 1, 1, 1, 1);
  txt_tracking(TXT_CAPTION, "BETTER", 252, 249, 246,
               LG_MARCA_X + LG_MARCA_W * 0.355f, LG_MARCA_Y + 10.0f,
               1.0f, 22.0f);
  { TxtLinha t = txt_linha_corta(TXT_TITULO2, "Entrar com QR Code",
                                 250, 250, 252, 255, 730.0f);
    txt_desenhar(t, LG_MARCA_X, 580.0f); }
  { TxtLinha t = txt_linha_corta(TXT_BODY,
                                 "Use o celular para entrar no Better Nuvio.",
                                 170, 173, 182, 255, 710.0f);
    txt_desenhar(t, LG_MARCA_X, 670.0f); }

  gfx_cor(painel, 0.027f, 0.060f, 0.063f, 0.070f, 1.0f);
  gfx_anel(painel, 0.027f, 1.0f, 0.18f, 0.19f, 0.21f, 0.7f);
  linhaPainel(TXT_HEADLINE, "Conecte sua conta", 248, 248, 250, 158.0f, 1.0f);

  if (!nuvem_pronta()) {
    // Este caso e de COMPILACAO, nao do usuario: o pacote saiu sem a
    // configuracao do servidor. Dizer "erro ao entrar" mandaria a pessoa tentar
    // de novo para sempre contra algo que nunca vai funcionar.
    linhaPainel(TXT_HEADLINE, "Este pacote foi montado sem servidor.",
                236, 108, 108, 430.0f, 1.0f);
    linhaPainel(TXT_BODY,
                "Quem gerou o .ipk precisa informar a URL e a chave do projeto.",
                176, 178, 186, 496.0f, 1.0f);
    return;
  }

  switch (st) {
    case SES_PEDINDO:
      linhaPainel(TXT_BODY, "Preparando o código…", 210, 212, 220, 430.0f, 1.0f);
      break;

    case SES_AGUARDANDO: {
      const char *url = sessao_url_login();
      const char *base = nuvem_base_login();
      const char *codigo = sessao_codigo();
      linhaPainel(TXT_CAPTION, "Escaneie o QR e aprove no celular.",
                  174, 177, 185, 218.0f, 1.0f);

      gerarTexQr(url);
      if (texQr) {
        GfxRect moldura = { LG_PAINEL_X + (LG_PAINEL_W - LG_QR_MOLDURA) * 0.5f,
                            280.0f, LG_QR_MOLDURA, LG_QR_MOLDURA };
        GfxRect r = { moldura.x + 16.0f, moldura.y + 16.0f,
                      LG_QR_LADO, LG_QR_LADO };
        gfx_cor(moldura, 0.06f, 1.0f, 1.0f, 1.0f, 1.0f);
        gfx_tex_aspect_atual = 0.0f;   // 1:1, sem recorte
        gfx_rect(r, texQr, GFX_SNAP, 0, 0.0f, 0.0f, 0.0f, 0, 0, 0, 1.0f);
      } else {
        linhaPainel(TXT_BODY, "não consegui desenhar o código",
                    236, 108, 108, 450.0f, 1.0f);
      }
      // O codigo longo e o que o servidor realmente aceita. A URL exibida
      // nao contem a query do QR, para continuar legivel na TV.
      linhaPainel(TXT_CAPTION2, "Ou acesse no celular:",
                  153, 156, 165, 700.0f, 1.0f);
      if (base[0]) linhaPainel(TXT_BODY, base, 226, 228, 233, 730.0f, 1.0f);
      linhaPainel(TXT_CAPTION2, "Código de acesso", 153, 156, 165, 777.0f, 1.0f);
      if (codigo[0]) linhaPainel(TXT_BODY, codigo, 244, 245, 249, 807.0f, 1.0f);

      // Sinal de vida. Sem ele a tela fica parada por minutos e parece travada
      // — e a pessoa reinicia o app no meio do login. Respiracao lenta (ciclo
      // de 2s), nao piscada: piscar em texto de espera le como alerta.
      { float a = 0.5f + 0.5f * sinf(pulso * 3.14159f);
        GfxRect espera = { LG_PAINEL_X + 36.0f, 872.0f,
                           LG_PAINEL_W - 72.0f, 62.0f };
        gfx_cor(espera, 0.5f, 0.13f, 0.14f, 0.16f, 1.0f);
        linhaPainel(TXT_CAPTION, "Aguardando a autorização…",
                    196, 199, 208, 890.0f, 0.72f + 0.25f * a); }
      break;
    }

    case SES_TROCANDO:
      linhaPainel(TXT_BODY, "Autorizado. Entrando…", 210, 212, 220, 430.0f, 1.0f);
      break;

    case SES_LOGADO:
      linhaPainel(TXT_BODY, "Pronto.", 210, 212, 220, 430.0f, 1.0f);
      break;

    case SES_ERRO:
    case SES_DESLOGADO:
    default: {
      const char *msg = sessao_erro();
      linhaPainel(TXT_BODY, msg[0] ? msg : "Não consegui falar com o servidor.",
                  236, 108, 108, 424.0f, 1.0f);
      { GfxRect pill = { LG_PAINEL_X + (LG_PAINEL_W - LG_PILL_W) * 0.5f,
                         555.0f, LG_PILL_W, LG_PILL_H };
        TxtLinha t;
        gfx_cor(pill, NV_RAIO_PILL, 1.0f, 1.0f, 1.0f, 0.92f * animBotao);
        t = txt_linha(TXT_BODY, "Tentar de novo", 24, 24, 26, 255);
        txt_desenhar_alpha(t, pill.x + (LG_PILL_W - t.w) * 0.5f,
                           pill.y + (LG_PILL_H - t.h) * 0.5f, animBotao); }
      break;
    }
  }
}

int login_concluido(void) { return sessao_logada(); }
