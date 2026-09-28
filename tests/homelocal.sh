#!/bin/bash
set -eu
cd "$(dirname "$0")/.."
cc -O1 -g -Isrc -I/opt/homebrew/include -pthread \
  tests/homelocal.c src/homelocal.c src/js.c \
  -o /tmp/better-nuvio-homelocal-test
/tmp/better-nuvio-homelocal-test
