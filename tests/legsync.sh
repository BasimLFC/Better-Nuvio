#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
cc -Isrc -O2 src/legsync.c tests/legsync.c -lm -o /tmp/nuvio-legsync-tests
/tmp/nuvio-legsync-tests
