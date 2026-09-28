#include "simklauth.h"
#include "idioma.h"
#include "nuvem.h"
#include "dados.h"
#include "rede.h"
#include "sync.h"
#include "js.h"
#include "jsw.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <time.h>

// O VINCULO E POR PERFIL (simkl-p<N>.txt), pelo mesmo motivo e com a mesma
// migracao do Trakt (ver o topo de traktauth.c): o simkl.txt antigo e do
// perfil 1 — antes dos perfis o app so sincronizava o 1 — e e RENOMEADO para
// simkl-p1.txt, nunca copiado para outro perfil.
#define SMK_ARQ_LEGADO "simkl.txt"
#define SMK_ARQ_FMT    "simkl-p%d.txt"
#define SMK_PERFIS     16   // o logout varre p0..16, como fontepref/traktauth
#define SMK_BASE "https://api.simkl.com"
#define SMK_POLL_MS 5000u

static SmkEstado estado = SMK_PARADO;
static char userCode[48];
static char url[300], deviceCode[300];
static char erro[200];
static char token[300], refresh[300];
static unsigned proximoPoll, comecouMs, limiteMs = 900000u;
static unsigned pollMs = SMK_POLL_MS, proximoRefresh;
static long expiraEm;

static pthread_t fio;
static int fioVivo, fioPronto, tokenNovo;

// DE QUEM E O ESTADO ACIMA. Mesma costura de traktauth.c: a troca de perfil
// sobe `geracao`, e um fio que saiu antes dela nunca publica nas variaveis
// vivas — um PIN autorizado depois da troca vai para o arquivo do perfil que
// o pediu.
static int perfil = 1;
static unsigned geracao, gerFio;
static int perfilFio;
static char deviceCodeFio[300], refreshFio[300];
static pthread_mutex_t trava = PTHREAD_MUTEX_INITIALIZER;

// A chave desta instalacao e AUTH V2. Os endpoints /oauth/pin (AUTH V1)
// respondem unauthorized_client para ela; V2 usa POST form-urlencoded.
static char *postarOauth(const char *caminho, const char *campos, int *status) {
  char completo[200];
  const char *cab[] = { "Accept: application/json",
                        "Content-Type: application/x-www-form-urlencoded",
                        "User-Agent: BetterNuvio/1.0", NULL };
  snprintf(completo, sizeof completo, "%s%s", SMK_BASE, caminho);
  return rede_postar_st(completo, 20, cab, campos, status);
}

static void corpoDevice(char *dst, size_t tam) {
  char cid[220];
  nuvem_url_escapar(nuvem_simkl_cliente(), cid, sizeof cid);
  snprintf(dst, tam, "client_id=%s&scope=media%%3Aread+media%%3Awrite", cid);
}

static void corpoToken(char *dst, size_t tam, const char *grant,
                       const char *codigo) {
  char cid[220], valor[420];
  nuvem_url_escapar(nuvem_simkl_cliente(), cid, sizeof cid);
  nuvem_url_escapar(codigo, valor, sizeof valor);
  if (!strcmp(grant, "refresh_token"))
    snprintf(dst, tam, "grant_type=refresh_token&client_id=%s&refresh_token=%s",
             cid, valor);
  else
    snprintf(dst, tam,
             "grant_type=urn%%3Aietf%%3Aparams%%3Aoauth%%3Agrant-type%%3Adevice_code"
             "&client_id=%s&device_code=%s", cid, valor);
}

// ---------------------------------------------------------------- disco

// Por valor, nao em buffer estatico: o fio do poll monta o nome do perfil dele
// enquanto o laco principal monta o do perfil novo (ver arqToken em traktauth.c).
typedef struct { char s[40]; } SmkNome;
static SmkNome arq(int p) {
  SmkNome n;
  snprintf(n.s, sizeof n.s, SMK_ARQ_FMT, p);
  return n;
}

static void gravarEm(int p, const char *tk, const char *rf, long prazo) {
  Jsw c;
  jsw_iniciar(&c);
  jsw_obj_ini(&c);
  jsw_cs(&c, "access_token", tk);
  jsw_cs(&c, "refresh_token", rf);
  jsw_ci(&c, "expires_at", prazo);
  jsw_obj_fim(&c);
  dados_gravar(arq(p).s, jsw_texto_final(&c));
  jsw_livre(&c);
}
static void gravar(void) { gravarEm(perfil, token, refresh, expiraEm); }

// simkl.txt antigo -> simkl-p1.txt. Idempotente; ver a nota no topo.
static void migrarLegado(void) {
  char *b = dados_ler(SMK_ARQ_LEGADO), *ja;
  if (!b) return;
  ja = dados_ler(arq(1).s);
  if (ja) { free(ja); dados_apagar(SMK_ARQ_LEGADO); }
  else if (dados_gravar(arq(1).s, b)) {
    dados_apagar(SMK_ARQ_LEGADO);
    printf("[simkl] simkl.txt migrado para simkl-p1.txt (so o perfil 1)\n");
    fflush(stdout);
  }
  free(b);
}

int simklauth_carregar(void) {
  char *b;
  migrarLegado();
  b = dados_ler(arq(perfil).s);
  if (!b) return 0;
  { char *fim = b + strlen(b);
    while (fim > b && (fim[-1] == '\n' || fim[-1] == '\r')) *--fim = 0; }
  if (b[0] == '{') {
    const char *fim = b + strlen(b);
    js_texto(b, fim, "access_token", token, sizeof token);
    js_texto(b, fim, "refresh_token", refresh, sizeof refresh);
    expiraEm = (long)js_num(b, fim, "expires_at", 0);
  } else if (b[0]) {
    // Formato anterior: token AUTH V1 sem renovacao.
    snprintf(token, sizeof token, "%s", b);
  }
  if (token[0]) estado = SMK_LIGADO;
  free(b);
  return token[0] != 0;
}

const char *simklauth_token(void) { return token; }

static void zerarEstado(void) {
  token[0] = refresh[0] = deviceCode[0] = userCode[0] = url[0] = erro[0] = 0;
  tokenNovo = 0;
  comecouMs = proximoPoll = proximoRefresh = 0;
  expiraEm = 0;
  estado = SMK_PARADO;
}

int simklauth_carregar_perfil(int p) {
  pthread_mutex_lock(&trava);
  perfil = p > 0 ? p : 1;
  geracao++;
  zerarEstado();
  pthread_mutex_unlock(&trava);
  return simklauth_carregar();
}

int simklauth_trocar_perfil(int p) {
  int antes;
  if (p <= 0) p = 1;
  if (p == perfil) return 0;
  antes = token[0] != 0;
  simklauth_carregar_perfil(p);
  printf("[simkl] perfil %d: %s\n", perfil,
         token[0] ? "vinculo deste perfil carregado" : "sem vinculo neste perfil");
  fflush(stdout);
  return antes || token[0];
}

void simklauth_esquecer(void) {
  int p;
  pthread_mutex_lock(&trava);
  geracao++;
  zerarEstado();
  // LOGOUT: todos os perfis e o arquivo antigo.
  for (p = 0; p <= SMK_PERFIS; p++) dados_apagar(arq(p).s);
  dados_apagar(SMK_ARQ_LEGADO);
  perfil = 1;
  pthread_mutex_unlock(&trava);
}

// ---------------------------------------------------------------- fluxo

static void *fioPedir(void *u) {
  char *r, corpo[320];
  int st = 0;
  char uc[48] = "", dc[300] = "", vu[300] = "";
  unsigned novoLimite = 900000u, novoPoll = SMK_POLL_MS;
  (void)u;

  if (!nuvem_simkl_cliente()[0]) {
    pthread_mutex_lock(&trava);
    if (gerFio == geracao) {
      snprintf(erro, sizeof erro, "pacote sem a chave do Simkl");
      estado = SMK_ERRO;
    }
    pthread_mutex_unlock(&trava);
    fioPronto = 1;
    return NULL;
  }

  corpoDevice(corpo, sizeof corpo);
  r = postarOauth("/oauth2/device", corpo, &st);
  if (r && st >= 200 && st < 300) {
    const char *fim = r + strlen(r);
    double expira;
    js_texto(r, fim, "user_code", uc, sizeof uc);
    js_texto(r, fim, "device_code", dc, sizeof dc);
    if (!js_texto(r, fim, "verification_uri_complete", vu, sizeof vu))
      js_texto(r, fim, "verification_uri", vu, sizeof vu);
    expira = js_num(r, fim, "expires_in", 0);
    if (expira > 30.0 && expira < 3600.0) novoLimite = (unsigned)(expira * 1000.0);
    expira = js_num(r, fim, "interval", 5);
    if (expira >= 1.0 && expira < 60.0) novoPoll = (unsigned)(expira * 1000.0);
  }
  pthread_mutex_lock(&trava);
  // PIN pedido por um perfil que ja saiu da tela: ninguem vai digita-lo.
  if (gerFio != geracao) {
    pthread_mutex_unlock(&trava);
    free(r);
    fioPronto = 1;
    return NULL;
  }
  erro[0] = 0;
  snprintf(userCode, sizeof userCode, "%s", uc);
  snprintf(deviceCode, sizeof deviceCode, "%s", dc);
  snprintf(url, sizeof url, "%s", vu);
  limiteMs = novoLimite;
  pollMs = novoPoll;
  if (!userCode[0] || !deviceCode[0]) {
    snprintf(erro, sizeof erro, i18n("nao consegui pedir o codigo ao Simkl (HTTP %d)"), st);
    estado = SMK_ERRO;
  } else {
    if (!url[0]) snprintf(url, sizeof url, "https://simkl.com/pin");
    estado = SMK_AGUARDANDO;
  }
  pthread_mutex_unlock(&trava);
  free(r);
  fioPronto = 1;
  return NULL;
}

static int lerTokens(const char *r, int st, char *tk, char *rf, long *prazo) {
  double expira;
  const char *fim;
  if (!r || st < 200 || st >= 300) return 0;
  fim = r + strlen(r);
  if (!js_texto(r, fim, "access_token", tk, 300) || !tk[0] ||
      !js_texto(r, fim, "refresh_token", rf, 300) || !rf[0]) return 0;
  expira = js_num(r, fim, "expires_in", 0);
  *prazo = time(NULL) + (long)(expira > 0 ? expira : 604800);
  return 1;
}

static void *fioPoll(void *u) {
  char corpo[800], *r, tk[300] = "", rf[300] = "", resposta[60] = "";
  long prazo = 0;
  int st = 0;
  (void)u;
  corpoToken(corpo, sizeof corpo, "device_code", deviceCodeFio);
  r = postarOauth("/oauth2/token", corpo, &st);
  lerTokens(r, st, tk, rf, &prazo);
  if (r) js_texto(r, r + strlen(r), "error", resposta, sizeof resposta);
  pthread_mutex_lock(&trava);
  if (gerFio != geracao) {
    // Autorizado depois da troca de perfil: e do perfil que pediu o PIN.
    if (tk[0] && perfilFio != perfil) {
      gravarEm(perfilFio, tk, rf, prazo);
      printf("[simkl] autorizacao do perfil %d chegou depois da troca; guardada no arquivo dele\n",
             perfilFio);
    }
    pthread_mutex_unlock(&trava);
    free(r);
    fioPronto = 1;
    return NULL;
  }
  if (tk[0]) {
    snprintf(token, sizeof token, "%s", tk);
    snprintf(refresh, sizeof refresh, "%s", rf);
    expiraEm = prazo;
    tokenNovo = 1;
    estado = SMK_LIGADO;
  } else if (!strcmp(resposta, "authorization_pending")) {
    /* ainda nao autorizado */
  } else if (!strcmp(resposta, "slow_down")) {
    pollMs += 5000u;
    proximoPoll += 5000u;
  } else if (!strcmp(resposta, "expired_token")) {
    snprintf(erro, sizeof erro, "o código expirou");
    estado = SMK_ERRO;
  } else if (st) {
    snprintf(erro, sizeof erro, i18n("falha ao consultar o Simkl (HTTP %d)"), st);
    estado = SMK_ERRO;
  }
  pthread_mutex_unlock(&trava);
  free(r);
  fioPronto = 1;
  return NULL;
}

static void *fioRefresh(void *u) {
  char corpo[800], *r, tk[300] = "", rf[300] = "";
  long prazo = 0;
  int st = 0;
  (void)u;
  corpoToken(corpo, sizeof corpo, "refresh_token", refreshFio);
  r = postarOauth("/oauth2/token", corpo, &st);
  lerTokens(r, st, tk, rf, &prazo);
  pthread_mutex_lock(&trava);
  if (gerFio != geracao) {
    if (tk[0] && perfilFio != perfil) gravarEm(perfilFio, tk, rf, prazo);
  } else if (tk[0]) {
    snprintf(token, sizeof token, "%s", tk);
    snprintf(refresh, sizeof refresh, "%s", rf);
    expiraEm = prazo;
    tokenNovo = 1;
  } else if (st == 400 || st == 401) {
    token[0] = refresh[0] = 0;
    expiraEm = 0;
    estado = SMK_PARADO;
    dados_apagar(arq(perfil).s);
    printf("[simkl] renovacao rejeitada (HTTP %d); precisa vincular de novo\n", st);
  }
  pthread_mutex_unlock(&trava);
  free(r);
  fioPronto = 1;
  return NULL;
}

static void soltar(void *(*rotina)(void *)) {
  if (fioVivo) return;
  fioPronto = 0;
  gerFio = geracao;
  perfilFio = perfil;
  snprintf(deviceCodeFio, sizeof deviceCodeFio, "%s", deviceCode);
  snprintf(refreshFio, sizeof refreshFio, "%s", refresh);
  if (pthread_create(&fio, NULL, rotina, NULL) == 0) { pthread_detach(fio); fioVivo = 1; }
  else { snprintf(erro, sizeof erro, "sem fio para falar com o Simkl"); estado = SMK_ERRO; }
}

void simklauth_comecar(void) {
  if (estado == SMK_PEDINDO || estado == SMK_AGUARDANDO) return;
  erro[0] = 0;
  comecouMs = 0;
  estado = SMK_PEDINDO;
  soltar(fioPedir);
}

void simklauth_passo(unsigned agoraMs) {
  if (fioVivo && fioPronto) { fioVivo = 0; fioPronto = 0; }
  if (fioVivo) return;
  // Pedido feito com um fio do perfil anterior ainda no ar: sai agora.
  if (estado == SMK_PEDINDO) { soltar(fioPedir); return; }

  if (tokenNovo) {
    Jsw c;
    tokenNovo = 0;
    gravar();
    jsw_iniciar(&c);
    jsw_obj_ini(&c);
    jsw_cs(&c, "access_token", token);
    jsw_cs(&c, "refresh_token", refresh);
    jsw_ci(&c, "expires_at", expiraEm);
    jsw_obj_fim(&c);
    sync_empurrar_credencial("simkl", jsw_texto_final(&c));
    jsw_livre(&c);
    printf("[simkl] vinculado nesta TV\n");
    fflush(stdout);
  }

  // Tokens V2 duram sete dias. Renovar antes da expiracao e guardar o novo
  // par; uma falha temporaria tenta novamente mais tarde, sem pedir login.
  if (estado == SMK_LIGADO && refresh[0] && expiraEm > 0 &&
      time(NULL) >= expiraEm - 86400 && agoraMs >= proximoRefresh) {
    proximoRefresh = agoraMs + 60000u;
    soltar(fioRefresh);
    return;
  }

  if (estado != SMK_AGUARDANDO) return;
  if (!comecouMs) {
    comecouMs = agoraMs;
    proximoPoll = agoraMs + pollMs;
  }
  if (agoraMs - comecouMs > limiteMs) {
    snprintf(erro, sizeof erro, "o código expirou");
    estado = SMK_ERRO;
    return;
  }
  if (agoraMs >= proximoPoll) {
    proximoPoll = agoraMs + pollMs;
    soltar(fioPoll);
  }
}

void simklauth_cancelar(void) {
  if (estado == SMK_PEDINDO || estado == SMK_AGUARDANDO || estado == SMK_ERRO) {
    pthread_mutex_lock(&trava);
    geracao++;  // uma resposta que chegar depois do fechamento nao reabre o PIN
    estado = token[0] ? SMK_LIGADO : SMK_PARADO;
    pthread_mutex_unlock(&trava);
  }
}

SmkEstado   simklauth_estado(void) { return estado; }
const char *simklauth_codigo(void) { return userCode; }
const char *simklauth_url(void)    { return url; }
const char *simklauth_erro(void)   { return erro; }
