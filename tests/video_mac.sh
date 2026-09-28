#!/bin/bash
set -eu
cd "$(dirname "$0")/.."
if [ "$(uname -s)" != Darwin ] ||
   ! command -v ffmpeg >/dev/null ||
   ! pkg-config --exists libavformat libavcodec libavutil libswscale libswresample; then
  echo "SKIP: teste de video requer Mac e FFmpeg instalado"
  exit 0
fi
amostra=$(mktemp /tmp/nuvio-video-mac.XXXXXX.mp4)
trap 'rm -f "$amostra"' EXIT
ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i 'testsrc2=size=320x180:rate=24' \
  -f lavfi -i 'sine=frequency=440:sample_rate=48000' \
  -t 5 -c:v mpeg4 -q:v 5 -c:a aac "$amostra"
cc tests/video_mac.c src/video_mac.c -o /tmp/nuvio-video-mac-test \
  -DNV_MAC_VIDEO -Isrc -I/opt/homebrew/include -I/opt/homebrew/include/SDL2 \
  $(pkg-config --cflags --libs libavformat libavcodec libavutil libswscale libswresample) \
  -L/opt/homebrew/lib -lSDL2 -framework OpenGL -lm \
  -Wno-macro-redefined -Wno-deprecated-declarations
SDL_AUDIODRIVER=dummy /tmp/nuvio-video-mac-test "$amostra"
amostra_mkv=$(mktemp /tmp/nuvio-video-mac.XXXXXX.mkv)
trap 'rm -f "$amostra" "$amostra_mkv"' EXIT
ffmpeg -hide_banner -loglevel error -y -i "$amostra" -c copy "$amostra_mkv"
SDL_AUDIODRIVER=dummy /tmp/nuvio-video-mac-test "$amostra_mkv"
