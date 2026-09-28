// Paineis de AUDIO e LEGENDA abertos pelos respectivos icones do player.
// Legendas agrupa as faixas por idioma e oferece estilo em pagina separada.
//
// No seletor, as faixas embutidas ficam juntas em "Embutidas"; legendas de
// addons sao agrupadas por idioma, com as preferencias antes das demais.
#ifndef NV_FAIXAS_H
#define NV_FAIXAS_H
#include <SDL2/SDL.h>

// Zera o que e da SESSAO e nao do aparelho — hoje, qual legenda externa esta
// valendo. Chamada pelo player quando uma reproducao nova comeca.
void faixas_reiniciar(void);

void faixas_abrir(void);
// 0 = audio, 1 = legenda.
void faixas_abrir_em(int col);
int  faixas_aberta(void);
void faixas_evento(const SDL_Event *e);
void faixas_atualizar(float dt, Uint32 agora);
void faixas_desenhar(Uint32 agora);
// Enquanto a extracao embutida aquece, o pipeline nativo continua visivel.
int faixas_legenda_embutida_na_tv(void);

#endif
