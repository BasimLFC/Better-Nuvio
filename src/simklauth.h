// Vincular o Simkl na TV pelo Device Flow OAuth 2.0 (AUTH V2).
// POST /oauth2/device devolve codigo curto e URL completa para QR; a TV
// consulta POST /oauth2/token ate a aprovacao. O par access/refresh fica no
// arquivo privado do perfil e o access token e renovado antes de expirar.
//
// O QUE CONSOME ISTO HOJE: a aba "Listas" da Biblioteca (src/listas.c), que le
// os CINCO ESTADOS de acompanhamento do Simkl (/sync/all-items/<tipo>/<estado>)
// com o token daqui. O Simkl nao tem listas nomeadas na API — nao existe
// equivalente a /users/me/lists do Trakt —, entao "listas do Simkl" quer dizer
// esses cinco estados, e a tela diz isso em vez de fingir outra coisa.
// Desde o issue #110 o token tambem alimenta src/simkl.c: a fileira
// "Continuar assistindo" (fonte "Simkl", ou "Ambas" com vinculo) e o "+" com
// "Onde o + salva" em "Plan to Watch do Simkl".
// Vincular aqui continua servindo tambem para a CREDENCIAL CHEGAR NA CONTA, e
// dali para o app web e o celular.
// O pedido pendente ainda vive apenas na memoria: reiniciar durante a
// autorizacao exige pedir um novo codigo.
#ifndef NV_SIMKLAUTH_H
#define NV_SIMKLAUTH_H

typedef enum {
  SMK_PARADO = 0,
  SMK_PEDINDO,
  SMK_AGUARDANDO,
  SMK_LIGADO,
  SMK_ERRO
} SmkEstado;

void simklauth_comecar(void);
void simklauth_passo(unsigned agoraMs);

SmkEstado   simklauth_estado(void);
const char *simklauth_codigo(void);
const char *simklauth_url(void);
const char *simklauth_erro(void);

void simklauth_cancelar(void);
int  simklauth_carregar(void);    // le o token guardado; 1 quando havia
// Token de acesso, ou "" quando nao ha vinculo. Existe desde que a Biblioteca
// passou a ler as listas do Simkl (src/listas.c) — ate entao nada neste app
// consumia Simkl e o token so servia para chegar a conta.
const char *simklauth_token(void);
// Esquece o vinculo de TODOS os perfis (logout).
void simklauth_esquecer(void);
// POR PERFIL, como o Trakt (simkl-p<N>.txt; simkl.txt antigo vira o do perfil
// 1). carregar_perfil escolhe o perfil e le; trocar_perfil faz o mesmo so
// quando o perfil mudou e devolve 1 quando o Simkl estava ou ficou ligado —
// quem chama esquece as caches de simkl.c e remonta a home.
int  simklauth_carregar_perfil(int perfil);
int  simklauth_trocar_perfil(int perfil);

#endif
