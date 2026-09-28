#!/bin/bash
# Compila e roda o Native Lab no Mac, com a mesma pasta de arte do pacote da TV.
#
# A sessão do Lab fica em ~/.nuvio-native-enhanced-lab por padrão, separada
# do fork original e do Enhanced web. NUVIO_DADOS permite trocar essa pasta.
#
# Para testar como um usuario NOVO (a primeira execucao de quem instala),
# aponte a variavel para uma pasta vazia:
#     NUVIO_DADOS=/tmp/nuvio-novo bash tools/mac.sh
#
# No Mac, FFmpeg decodifica o video no mesmo player para testar controles,
# progresso e fontes. --build apenas compila, sem abrir outra janela.
set -e
cd "$(dirname "$0")/.."
# tools/env.sh encontra a configuracao existente; NUVIO_PROPERTIES pode
# selecionar outro arquivo explicitamente.
tools/env.sh --require-core >/dev/null
ENV_D=$(tools/env.sh)
if ! pkg-config --exists libavformat libavcodec libavutil libswscale libswresample; then
  echo "FFmpeg de desenvolvimento ausente (pkg-config libavformat/libavcodec/libswscale/libswresample)" >&2
  exit 1
fi
FF_CFLAGS=$(pkg-config --cflags libavformat libavcodec libavutil libswscale libswresample)
FF_LIBS=$(pkg-config --libs libavformat libavcodec libavutil libswscale libswresample)
export NUVIO_DADOS="${NUVIO_DADOS:-$HOME/.nuvio-native-enhanced-lab}"
BIN=/tmp/nuvio-native-enhanced-lab-mac
eval cc src/*.c -o "$BIN" -O1 -g "$ENV_D" "$FF_CFLAGS" \
  -DNV_MAC_VIDEO \
  -I/opt/homebrew/include -I/opt/homebrew/include/SDL2 \
  -L/opt/homebrew/lib -lSDL2 -lSDL2_image -lSDL2_ttf -lz "$FF_LIBS" \
  -framework OpenGL -Wno-deprecated-declarations -Wno-macro-redefined
if [ "${1:-}" = "--build" ]; then
  echo "Binário Mac atualizado: $BIN"
  exit 0
fi
echo "Abrindo Better Nuvio (dados: $NUVIO_DADOS)"
# No webOS o serviço de plugins é acordado pelo Luna; no Mac não existe Luna.
# Subir o mesmo executor local antes do app permite testar plugins na build PC.
PLUGIN_PID=""
if command -v node >/dev/null 2>&1 &&
   ! curl --silent --fail --max-time 1 http://127.0.0.1:2732/health >/dev/null 2>&1; then
  mkdir -p "$NUVIO_DADOS"
  (umask 077; NUVIO_PLUGIN_STANDALONE=1 node plugin-service/src/index.js \
    >"$NUVIO_DADOS/plugin-service.log" 2>&1) &
  PLUGIN_PID=$!
  for tentativa in 1 2 3 4 5 6 7 8 9 10; do
    if curl --silent --fail --max-time 1 http://127.0.0.1:2732/health >/dev/null 2>&1; then
      break
    fi
    sleep 0.1
  done
fi
encerrar_plugin() { if [ -n "$PLUGIN_PID" ]; then kill "$PLUGIN_PID" 2>/dev/null || true; fi; }
trap encerrar_plugin EXIT
"$BIN" "$(pwd)/deploy/app/art" "$@"
