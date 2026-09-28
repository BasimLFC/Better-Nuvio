// PAINEL DE PAUSA — o overlay que o app web sobe quando o filme fica parado.
//
// ONDE ELE MORA NO WEB: dentro de playerScreen.js, e nao no arquivo que tem o
// nome dele. Existe um js/ui/screens/player/pauseOverlay.js de 16 linhas que
// cria uma <div> escrita "Paused" e que NINGUEM importa — casca morta de uma
// versao anterior. O recurso de verdade sao os metodos schedulePauseOverlay,
// canShowPauseOverlay, buildPauseOverlayMeta e renderPauseOverlay, e foi deles
// que este modulo saiu.
//
// AS REGRAS, uma a uma, com a linha de origem:
//
//   playerScreen.js:567   PAUSE_OVERLAY_DELAY_MS = 5000. O painel NAO sobe no
//                         instante da pausa: sobe cinco segundos depois. Pausa
//                         curta (levantar, pegar agua) nao merece uma ficha na
//                         cara; pausa longa e alguem que parou para ler.
//   playerScreen.js:568   MAX_PAUSE_OVERLAY_CAST = 8 nomes de elenco.
//   playerScreen.js:7299  canShowPauseOverlay: so com o ajuste ligado, so
//                         pausado, e com NENHUMA outra folha aberta. O painel e
//                         o ultimo da fila — qualquer coisa que o usuario tenha
//                         aberto de proposito vence.
//   playerScreen.js:7381  o relogio de 5s recomeca do zero a cada mudanca de
//                         estado; se ao estourar a condicao ja nao vale, nao
//                         sobe.
//   playerScreen.js:7397  com o painel de pe, qualquer condicao que caia o
//                         derruba na hora.
//   playerScreen.js:7459  buildPauseOverlayMeta() SEM dados: o painel monta com
//                         o que ja se sabe do titulo e sobe assim mesmo. Nunca
//                         existe "carregando" aqui — metade da ficha e melhor
//                         que uma ficha vazia esperando rede.
//   playerScreen.js:22212 OK/Play com o painel de pe: derruba o painel E
//                         retoma. Qualquer outra tecla: derruba o painel,
//                         traz os controles e REARMA os 5s (:22218).
//
// O QUE FICOU DE FORA, e por que:
//
//   - HIDRATACAO POR REDE (hydratePauseOverlayMeta, :7264). O web pede o meta a
//     todos os addons quando o painel vai subir. Aqui o titulo ja veio inteiro
//     no CatItem quando a pagina de detalhe abriu — titulo, genero, meta,
//     sinopse e ate oito nomes de elenco — e extras.c ja falou com o Trakt.
//     Fazer uma consulta nova para reescrever o que esta na memoria seria rede
//     em cima de um app pausado, que e exatamente quando ela nao e precisa.
//   - O logo do titulo e compartilhado com o player e aparece quando ja esta
//     carregado. Ate la, o nome em texto ocupa o mesmo lugar.
//   - "Are you still watching?" (:7154). E outro recurso que divide a mesma
//     <div> no web (stillWatchingPromptVisible), com contagem regressiva e dois
//     botoes. Nao e o painel de pausa e nao esta portado aqui.
#ifndef NV_PAUSAO_H
#define NV_PAUSAO_H
#include <SDL2/SDL.h>

// O que `pausao_evento` devolve. O modulo nao mexe na reproducao: quem pausa e
// retoma continua sendo o player, senao passariam a existir dois donos do
// estado `tocando`.
enum { PAUSAO_LIVRE = 0,     // nao consumiu: trate a tecla normalmente
       PAUSAO_CONSUMIU = 1,  // o painel caiu e a tecla morre aqui
       PAUSAO_RETOMAR = 2 }; // o painel caiu e o player deve voltar a tocar

// Uma vez por quadro, ANTES do desenho. `podeSubir` e a traducao de
// canShowPauseOverlay (:7299) e quem a monta e o player, que e o unico que sabe
// quais folhas estao abertas. `idx` e o item do catalogo em reproducao e
// `linhaEp` a linha "T1 · E4 · Nome" que o player ja monta (vazia num filme).
void pausao_atualizar(float dt, Uint32 agora, int podeSubir, int idx,
                      const char *linhaEp);

// 1 do quadro em que o painel aparece ate o quadro em que some por completo.
int  pausao_visivel(void);

// So chame com o painel de pe. Ver o enum acima.
int  pausao_evento(const SDL_Event *e);

// O painel usa a tela inteira como no Enhanced webOS. `baseY` permanece na
// assinatura para os chamadores antigos, mas nao participa da geometria.
void pausao_desenhar(Uint32 agora, float baseY);

// Fim da reproducao: zera o relogio e o painel. Sem isto o proximo filme
// abriria com o cronometro do anterior ja meio andado.
void pausao_fechar(void);

#endif
