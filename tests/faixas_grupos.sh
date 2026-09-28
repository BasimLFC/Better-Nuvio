#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
cc -O1 -ffunction-sections -fdata-sections -Isrc -I/opt/homebrew/include \
  -I/opt/homebrew/include/SDL2 -Wno-macro-redefined \
  tests/faixas_grupos.c -Wl,-dead_strip \
  -o /tmp/better-nuvio-faixas-grupos
/tmp/better-nuvio-faixas-grupos
