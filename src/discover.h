#ifndef NV_DISCOVER_H
#define NV_DISCOVER_H
#include <SDL2/SDL.h>
void discover_iniciar(void);
void discover_iniciar_tela(void);
void discover_ocultar(void);
void discover_evento(const SDL_Event *e);
void discover_atualizar(float dt, Uint32 agora);
void discover_desenhar(Uint32 agora, int ativo);
void discover_atalho(int indice);
int discover_quer_sair(void);
int discover_pediu_abrir(int *indice);
#endif
