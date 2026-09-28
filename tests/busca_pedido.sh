#!/bin/bash
set -eu
cd "$(dirname "$0")/.."
saida="$(mktemp "${TMPDIR:-/tmp}/nuvio-busca-pedido-XXXXXX")"
trap 'rm -f "$saida"' EXIT
sources=()
for source in src/*.c; do
  case "$source" in
    src/main.c|src/busca.c|src/novidades1312.c) continue ;;
  esac
  sources+=("$source")
done
cc "${sources[@]}" tests/busca_pedido.c -x c - -Isrc -o "$saida" \
  -DNV_TRAKT_CLIENT_ID='"chave-de-teste"' -O1 \
  -I/opt/homebrew/include -I/opt/homebrew/include/SDL2 -L/opt/homebrew/lib \
  -lSDL2 -lSDL2_image -lSDL2_ttf -lz -framework OpenGL \
  -Wno-deprecated-declarations -Wno-macro-redefined <<'EOF'
int novidades1312_aberto(void) { return 0; }
int novidades1312_primeira_vez(void) { return 0; }
void novidades1312_atualizar(float dt, unsigned int agora) { (void)dt; (void)agora; }
void novidades1312_desenhar(unsigned int agora) { (void)agora; }
void novidades1312_evento(const void *e) { (void)e; }
EOF
"$saida"
echo "busca_pedido: ok"
