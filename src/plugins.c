#include "plugins.h"
#include "catalogo.h"
#include "descoberta.h"
#include "dados.h"
#include "jsw.h"
#include "rede.h"
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
#include <time.h>

#ifndef NV_TMDB_API_KEY
#define NV_TMDB_API_KEY ""
#endif

static PluginRepo repos[PLUGIN_REPO_MAX], remotos[PLUGIN_REPO_MAX], locais[PLUGIN_REPO_MAX];
static int nRemotos,nLocais;
static char arquivoLocal[150];
static char arquivoOpcoes[150];
static int globalAtivo=1, agruparRepos;
static int quantidade;
static unsigned versao;
static pthread_mutex_t trava = PTHREAD_MUTEX_INITIALIZER;

static int repositorio_binario(const char *url, const char *tipo) {
  const char *p=url;
  if(tipo && (!strcasecmp(tipo,"EXTERNAL_DEX") || !strcasecmp(tipo,"DEX") ||
              !strcasecmp(tipo,"CLOUDSTREAM"))) return 1;
  while(p && (p=strchr(p,'.'))!=NULL) {
    if(!strncasecmp(p,".cs3",4) && (!p[4] || p[4]=='?' || p[4]=='#')) return 1;
    p++;
  }
  return 0;
}

static void recombinar(void) {
  PluginRepo novo[PLUGIN_REPO_MAX];
  int n=0,i,j;
  // Os adicionados nesta TV têm prioridade inclusive quando a conta já tem
  // 32 linhas; uma linha desconhecida/desativada não os expulsa da lista.
  for(i=0;i<nLocais && n<PLUGIN_REPO_MAX;i++) novo[n++]=locais[i];
  for(i=0;i<nRemotos;i++) {
    for(j=0;j<n;j++) if(!strcmp(novo[j].url,remotos[i].url)) break;
    if(j<n) {
      if(remotos[i].nome[0]) snprintf(novo[j].nome,sizeof novo[j].nome,
                                      "%s",remotos[i].nome);
    } else if(n<PLUGIN_REPO_MAX) novo[n++]=remotos[i];
  }
  if(n!=quantidade || memcmp(repos,novo,(size_t)n*sizeof *repos)) {
    memcpy(repos,novo,(size_t)n*sizeof *repos);
    quantidade=n;
    ++versao;
  }
}

void plugins_definir_lista(const PluginRepo *lista, int n) {
  int k = 0, i;
  if (n < 0) n = 0;
  pthread_mutex_lock(&trava);
  for (i = 0; lista && i < n && k < PLUGIN_REPO_MAX; ++i) {
    if (strncmp(lista[i].url, "https://", 8)) continue;
    remotos[k++] = lista[i];
  }
  nRemotos=k;
  recombinar();
  pthread_mutex_unlock(&trava);
}

void plugins_local_perfil(const char *dono, int perfil) {
  char novoArquivo[sizeof arquivoLocal], *conteudo, *linha, *fim;
  char novoOpcoes[sizeof arquivoOpcoes];
  int i=0;
  if (!dono || !*dono || perfil<1) return;
  // O identificador da conta é UUID; qualquer caractere inesperado vira
  // sublinhado para não escapar da pasta gravável.
  snprintf(novoArquivo,sizeof novoArquivo,"plugins-local-%.72s-p%d.txt",dono,perfil);
  for (i=0;novoArquivo[i];i++)
    if (!(novoArquivo[i]>='a'&&novoArquivo[i]<='z') &&
        !(novoArquivo[i]>='A'&&novoArquivo[i]<='Z') &&
        !(novoArquivo[i]>='0'&&novoArquivo[i]<='9') &&
        novoArquivo[i]!='-' && novoArquivo[i]!='.') novoArquivo[i]='_';
  snprintf(novoOpcoes,sizeof novoOpcoes,"plugins-opcoes-%.72s-p%d.txt",dono,perfil);
  for (i=0;novoOpcoes[i];i++)
    if (!(novoOpcoes[i]>='a'&&novoOpcoes[i]<='z') &&
        !(novoOpcoes[i]>='A'&&novoOpcoes[i]<='Z') &&
        !(novoOpcoes[i]>='0'&&novoOpcoes[i]<='9') &&
        novoOpcoes[i]!='-' && novoOpcoes[i]!='.') novoOpcoes[i]='_';
  pthread_mutex_lock(&trava);
  if(!strcmp(arquivoLocal,novoArquivo)) {pthread_mutex_unlock(&trava);return;}
  snprintf(arquivoLocal,sizeof arquivoLocal,"%s",novoArquivo);
  snprintf(arquivoOpcoes,sizeof arquivoOpcoes,"%s",novoOpcoes);
  nLocais=0;
  globalAtivo=1; agruparRepos=0;
  recombinar();
  pthread_mutex_unlock(&trava);
  conteudo=dados_ler(novoOpcoes);
  if(conteudo) {
    pthread_mutex_lock(&trava);
    if(!strcmp(arquivoOpcoes,novoOpcoes)) {
      globalAtivo=conteudo[0]!='0';
      agruparRepos=conteudo[1]=='1';
      ++versao;
    }
    pthread_mutex_unlock(&trava);
    free(conteudo);
  }
  conteudo=dados_ler(novoArquivo);
  if(!conteudo) return;
  for(linha=conteudo;*linha;linha=fim+1) {
    PluginRepo item={0};
    fim=strchr(linha,'\n');
    if(!fim) fim=linha+strlen(linha);
    if((size_t)(fim-linha)<sizeof item.url) {
      memcpy(item.url,linha,(size_t)(fim-linha));
      item.url[fim-linha]=0;
      if(!strncmp(item.url,"https://",8) && !repositorio_binario(item.url,NULL)) {
        snprintf(item.nome,sizeof item.nome,"Repositório local");
        snprintf(item.tipo,sizeof item.tipo,"NUVIO_JS");
        item.ativo=1;
        pthread_mutex_lock(&trava);
        if(!strcmp(arquivoLocal,novoArquivo) && nLocais<PLUGIN_REPO_MAX)
          locais[nLocais++]=item;
        pthread_mutex_unlock(&trava);
      }
    }
    if(!*fim) break;
  }
  free(conteudo);
  pthread_mutex_lock(&trava);
  recombinar();
  pthread_mutex_unlock(&trava);
}

int plugins_adicionar_local(const char *url) {
  char texto[PLUGIN_REPO_MAX*768],arquivo[sizeof arquivoLocal];
  PluginRepo item={0};
  int i,n;
  size_t tamanho;
  if(!url || strncmp(url,"https://",8) || (tamanho=strlen(url))>=sizeof item.url ||
     strchr(url,'\n') || strchr(url,'\r') || strchr(url,'\t') ||
     repositorio_binario(url,NULL)) return 0;
  pthread_mutex_lock(&trava);
  for(i=0;i<nRemotos;i++)
    if(!strcmp(remotos[i].url,url) && repositorio_binario(url,remotos[i].tipo)) {
      pthread_mutex_unlock(&trava); return 0;
    }
  if(!arquivoLocal[0]) {pthread_mutex_unlock(&trava);return 0;}
  for(i=0;i<nLocais;i++) if(!strcmp(locais[i].url,url)) {pthread_mutex_unlock(&trava);return 1;}
  if(nLocais>=PLUGIN_REPO_MAX) {pthread_mutex_unlock(&trava);return 0;}
  snprintf(item.url,sizeof item.url,"%s",url);
  snprintf(item.nome,sizeof item.nome,"Repositório local");
  snprintf(item.tipo,sizeof item.tipo,"NUVIO_JS"); item.ativo=1;
  snprintf(arquivo,sizeof arquivo,"%s",arquivoLocal);
  n=0;
  for(i=0;i<nLocais;i++) {
    int k=snprintf(texto+n,sizeof texto-(size_t)n,"%s\n",locais[i].url);
    if(k<0 || (size_t)k>=sizeof texto-(size_t)n) {
      pthread_mutex_unlock(&trava);return 0;
    }
    n+=k;
  }
  if((size_t)n+tamanho+2>=sizeof texto) {pthread_mutex_unlock(&trava);return 0;}
  memcpy(texto+n,url,tamanho); n+=(int)tamanho;
  texto[n++]='\n'; texto[n]=0;
  pthread_mutex_unlock(&trava);
  if(!dados_gravar(arquivo,texto)) return 0;
  pthread_mutex_lock(&trava);
  if(strcmp(arquivoLocal,arquivo)) {pthread_mutex_unlock(&trava);return 0;}
  locais[nLocais++]=item;
  recombinar();
  pthread_mutex_unlock(&trava);
  return 1;
}

int plugins_eh_local(const char *url) {
  int i,achou=0;
  if(!url) return 0;
  pthread_mutex_lock(&trava);
  for(i=0;i<nLocais;i++) if(!strcmp(locais[i].url,url)) {achou=1;break;}
  pthread_mutex_unlock(&trava);
  return achou;
}

int plugins_remover_local(const char *url) {
  char texto[PLUGIN_REPO_MAX*768],arquivo[sizeof arquivoLocal];
  int i,n=0,achou=0;
  if(!url) return 0;
  pthread_mutex_lock(&trava);
  if(!arquivoLocal[0]) {pthread_mutex_unlock(&trava);return 0;}
  snprintf(arquivo,sizeof arquivo,"%s",arquivoLocal);
  for(i=0;i<nLocais;i++) {
    int k;
    if(!strcmp(locais[i].url,url)) {achou=1;continue;}
    k=snprintf(texto+n,sizeof texto-(size_t)n,"%s\n",locais[i].url);
    if(k<0 || (size_t)k>=sizeof texto-(size_t)n) {
      pthread_mutex_unlock(&trava);return 0;
    }
    n+=k;
  }
  texto[n]=0;
  pthread_mutex_unlock(&trava);
  if(!achou || !dados_gravar(arquivo,texto)) return 0;
  pthread_mutex_lock(&trava);
  if(strcmp(arquivoLocal,arquivo)) {pthread_mutex_unlock(&trava);return 0;}
  for(i=0;i<nLocais;i++) if(!strcmp(locais[i].url,url)) {
    memmove(&locais[i],&locais[i+1],(size_t)(nLocais-i-1)*sizeof locais[0]);
    --nLocais; break;
  }
  recombinar();
  pthread_mutex_unlock(&trava);
  return 1;
}

void plugins_esquecer(void) {
  pthread_mutex_lock(&trava);
  nRemotos=nLocais=0; arquivoLocal[0]=arquivoOpcoes[0]=0;
  globalAtivo=1; agruparRepos=0; recombinar();
  pthread_mutex_unlock(&trava);
#ifndef __EMSCRIPTEN__
  { char *r=rede_postar("http://127.0.0.1:2732/clear",1,NULL,"{}"); free(r); }
#endif
}
int plugins_n(void) { int n; pthread_mutex_lock(&trava); n=quantidade; pthread_mutex_unlock(&trava); return n; }
int plugins_ativos(void) {
  int i,n=0;
  pthread_mutex_lock(&trava);
  if(globalAtivo)
    for(i=0;i<quantidade;i++) if(repos[i].ativo && !strcmp(repos[i].tipo,"NUVIO_JS")) n++;
  pthread_mutex_unlock(&trava);
  return n;
}
int plugins_global_ativo(void) {
  int v; pthread_mutex_lock(&trava); v=globalAtivo; pthread_mutex_unlock(&trava); return v;
}
int plugins_agrupados(void) {
  int v; pthread_mutex_lock(&trava); v=agruparRepos; pthread_mutex_unlock(&trava); return v;
}
static void definir_opcoes(int global, int agrupar) {
  char arquivo[sizeof arquivoOpcoes], texto[4];
  pthread_mutex_lock(&trava);
  if(!arquivoOpcoes[0] || (globalAtivo==global && agruparRepos==agrupar)) {
    pthread_mutex_unlock(&trava); return;
  }
  snprintf(arquivo,sizeof arquivo,"%s",arquivoOpcoes);
  snprintf(texto,sizeof texto,"%d%d\n",global,agrupar);
  pthread_mutex_unlock(&trava);
  if(!dados_gravar(arquivo,texto)) return;
  pthread_mutex_lock(&trava);
  if(!strcmp(arquivoOpcoes,arquivo)) {
    globalAtivo=global; agruparRepos=agrupar; ++versao;
  }
  pthread_mutex_unlock(&trava);
}
void plugins_definir_global(int ativo) { definir_opcoes(!!ativo,plugins_agrupados()); }
void plugins_definir_agrupamento(int agrupados) { definir_opcoes(plugins_global_ativo(),!!agrupados); }
unsigned plugins_versao(void) { unsigned v; pthread_mutex_lock(&trava); v=versao; pthread_mutex_unlock(&trava); return v; }
int plugins_copiar_lista(PluginRepo *destino, int capacidade) {
  int n;
  if (!destino || capacidade <= 0) return 0;
  pthread_mutex_lock(&trava);
  n=quantidade < capacidade ? quantidade : capacidade;
  memcpy(destino,repos,(size_t)n*sizeof *destino);
  pthread_mutex_unlock(&trava);
  return n;
}

int plugins_consultar(const char *imdb, const char *tipo, Stream **saida) {
#ifdef __EMSCRIPTEN__
  (void)imdb; (void)tipo; *saida=NULL; return 0;
#else
  PluginRepo copia[PLUGIN_REPO_MAX];
  int n,i,temporada=0,episodio=0,idx,serie,agrupar;
  long tmdb=0;
  char *resposta;
  Stream *achados=NULL;
  Jsw w;
  static int iniciou;
  static time_t ultimoFracasso;
  *saida=NULL;
  if (!imdb || strncmp(imdb,"tt",2)) return 0;
  pthread_mutex_lock(&trava);
  n=quantidade;
  agrupar=agruparRepos;
  if(!globalAtivo) n=0;
  memcpy(copia,repos,(size_t)n*sizeof *copia);
  pthread_mutex_unlock(&trava);
  if (!n) return 0;
  if (!iniciou && ultimoFracasso && time(NULL) - ultimoFracasso < 60) return 0;
  serie=tipo && !strcmp(tipo,"series");
  if (!serie && (!tipo || strcmp(tipo,"movie"))) return 0;
  if (strchr(imdb,':')) sscanf(strchr(imdb,':')+1,"%d:%d",&temporada,&episodio);
  idx=cat_indice_por_imdb(imdb);
  if (idx>=0) { const CatItem *item=cat_item(idx); if(item) tmdb=item->tmdb; }
  // A busca de origem ja roda num fio; o ping apenas acorda o servico local.
  if (!iniciou) {
    char *health=rede_baixar("http://127.0.0.1:2732/health",1);
    iniciou=health && !strcmp(health,"ok"); free(health);
    if (!iniciou) {
      // O app empacotado roda sem root. Na TV, /usr/bin/luna-send e executavel
      // apenas por root; o barramento publico usa luna-send-pub. O comando
      // privado falhava em silencio e o executor nunca iniciava.
      int tentativa, ping=system("/usr/bin/luna-send-pub -n 1 -f luna://com.betternuvio.app.plugin/ping '{}' >/dev/null 2>&1");
      for(tentativa=0;tentativa<3 && !iniciou;tentativa++) {
        health=rede_baixar("http://127.0.0.1:2732/health",2);
        iniciou=health && !strcmp(health,"ok"); free(health);
      }
      if (!iniciou) {
        printf("[plugins] executor indisponivel (ping=%d)\n",ping);
        fflush(stdout);
        ultimoFracasso = time(NULL);
        return 0;
      }
    }
  }
  jsw_iniciar(&w);
  jsw_obj_ini(&w);
  jsw_cs(&w,"imdb",imdb);
  jsw_ci(&w,"tmdbId",tmdb);
  // A chave pode vir da conta depois do login; o pacote publicado nao precisa
  // embuti-la. Sem ela, titulos cujo catalogo so tem IMDb davam zero plugins.
  // O mapeamento IMDb -> TMDB e necessario para o plugin mesmo quando a
  // integracao de enriquecimento TMDB estiver desligada nos ajustes.
  jsw_cs(&w,"tmdbKey",desc_chave_tmdb_reserva());
  jsw_cs(&w,"mediaType",serie?"tv":"movie");
  jsw_cb(&w,"groupByRepository",agrupar);
  jsw_ci(&w,"season",temporada?temporada:1);
  jsw_ci(&w,"episode",episodio?episodio:1);
  jsw_chave(&w,"repositories"); jsw_arr_ini(&w);
  for(i=0;i<n;i++) {
    jsw_obj_ini(&w);
    jsw_cs(&w,"url",copia[i].url);
    jsw_cs(&w,"name",copia[i].nome);
    jsw_cs(&w,"repo_type",copia[i].tipo);
    jsw_cb(&w,"enabled",copia[i].ativo);
    jsw_obj_fim(&w);
  }
  jsw_arr_fim(&w); jsw_obj_fim(&w);
  resposta=jsw_texto_final(&w) ?
    rede_postar("http://127.0.0.1:2732/streams",70,
      (const char *const[]){"Content-Type: application/json",NULL},jsw_texto_final(&w)) : NULL;
  jsw_livre(&w);
  if (!resposta) { printf("[plugins] consulta sem resposta do executor\n"); fflush(stdout); iniciou=0; ultimoFracasso=time(NULL); return 0; }
  n=stream_extrair(resposta,"Plugin",&achados);
  free(resposta);
  if(n<0) {printf("[plugins] resposta invalida do executor\n"); fflush(stdout);free(achados);return 0;}
  printf("[plugins] %d fonte(s) de %d repositorio(s)\n",n,plugins_ativos());
  fflush(stdout);
  *saida=achados;
  return n;
#endif
}
