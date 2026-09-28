#ifndef NV_PLUGINS_H
#define NV_PLUGINS_H
#include "streams.h"

#define PLUGIN_REPO_MAX 32
typedef struct { char nome[96], url[768], tipo[40]; int ativo; } PluginRepo;

void plugins_definir_lista(const PluginRepo *lista, int n);
void plugins_esquecer(void);
int plugins_n(void);
int plugins_ativos(void);
unsigned plugins_versao(void);
int plugins_copiar_lista(PluginRepo *destino, int capacidade);
int plugins_global_ativo(void);
int plugins_agrupados(void);
void plugins_definir_global(int ativo);
void plugins_definir_agrupamento(int agrupados);
// Repositórios adicionados nesta TV são guardados por conta e perfil; uma
// linha remota desativada pode ser reativada localmente após escolha explícita.
void plugins_local_perfil(const char *dono, int perfil);
int plugins_adicionar_local(const char *url);
int plugins_remover_local(const char *url);
int plugins_eh_local(const char *url);
// Consulta os provedores JS da conta no executor local webOS. A chamada
// bloqueia e pertence apenas ao fio de busca de fontes.
int plugins_consultar(const char *imdb, const char *tipo, Stream **saida);

#endif
