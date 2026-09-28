#!/bin/bash
set -eu
cd "$(dirname "$0")/.."
cc -Isrc tests/cinematic_selection.c src/colecoes.c src/js.c -o /tmp/nuvio-cinematic-selection-tests
/tmp/nuvio-cinematic-selection-tests
node tests/cinematic-images.mjs "$@"
