// Addons via QR no celular e ordem local de catalogos/colecoes na Home.
#ifndef NV_ADDONSUI_H
#define NV_ADDONSUI_H
#include <SDL2/SDL.h>

void addonsui_abrir(void);
void addonsui_abrir_plugins(void);
void addonsui_evento(const SDL_Event *e);
void addonsui_atualizar(float dt, Uint32 agora);
void addonsui_desenhar(Uint32 agora);
int  addonsui_quer_sair(void);
int  addonsui_modal_aberta(void);
int  addonsui_reord_total(void); // linhas escolhidas, para diagnostico/teste
int  addonsui_reord_contem(const char *chave);
void addonsui_modal_desenhar(Uint32 agora);

#endif
