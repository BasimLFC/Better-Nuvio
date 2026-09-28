#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
cc tests/fonte_app.c -o /tmp/better-nuvio-fonte-app -Isrc \
  -I/opt/homebrew/include -I/opt/homebrew/include/SDL2 \
  -L/opt/homebrew/lib -lSDL2 -lSDL2_ttf -framework OpenGL \
  -Wno-deprecated-declarations -Wno-macro-redefined
/tmp/better-nuvio-fonte-app
