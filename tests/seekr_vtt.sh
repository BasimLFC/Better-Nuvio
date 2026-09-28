#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
cc -D__APPLE__ -Isrc -I/opt/homebrew/include -I/opt/homebrew/include/SDL2 \
  tests/seekr_vtt.c src/seekr_vtt.c -lm -o /tmp/nuvio-seekr-vtt-test
/tmp/nuvio-seekr-vtt-test
