#!/bin/bash
set -eu
cd "$(dirname "$0")/.."
cc -O1 -g -Wall -Wextra -Isrc -I/opt/homebrew/include -I/opt/homebrew/include/SDL2 -L/opt/homebrew/lib -lSDL2 -Wno-deprecated-declarations \
  src/webp.c tests/webp.c -o /tmp/nuvio-webp-tests
/tmp/nuvio-webp-tests
