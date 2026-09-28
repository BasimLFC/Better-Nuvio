#ifndef NV_HOMELOCAL_H
#define NV_HOMELOCAL_H

#include "catalogo.h"

// Consulta localizada apenas para o destaque visivel. Nao bloqueia o desenho;
// os ponteiros devolvidos valem ate a proxima chamada no fio principal.
int homelocal_obter(const CatItem *item, const char **titulo,
                    const char **sinopse);

#endif
