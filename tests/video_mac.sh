#!/bin/bash
set -eu
cd "$(dirname "$0")/.."
if [ "$(uname -s)" != Darwin ] ||
   ! command -v ffmpeg >/dev/null ||
   ! pkg-config --exists libavformat libavcodec libavutil libswscale libswresample; then
  echo "SKIP: teste de video requer Mac e FFmpeg instalado"
  exit 0
fi
dir=$(mktemp -d /tmp/nuvio-video-mac.XXXXXX)
amostra="$dir/video.mp4"
sub="$dir/legenda.srt"
amostra_mkv="$dir/video-srt.mkv"
amostra_ass="$dir/video-ass.mkv"
trap 'rm -rf "$dir"' EXIT
cat > "$sub" <<'SRT'
1
00:00:02,100 --> 00:00:04,700
Teste embutido

SRT
ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i 'testsrc2=size=320x180:rate=24' \
  -f lavfi -i 'sine=frequency=440:sample_rate=48000' \
  -i "$sub" -t 5 -c:v mpeg4 -q:v 5 -c:a aac -c:s mov_text "$amostra"
cc tests/video_mac.c src/video_mac.c -o /tmp/nuvio-video-mac-test \
  -DNV_MAC_VIDEO -Isrc -I/opt/homebrew/include -I/opt/homebrew/include/SDL2 \
  $(pkg-config --cflags --libs libavformat libavcodec libavutil libswscale libswresample) \
  -L/opt/homebrew/lib -lSDL2 -framework OpenGL -lm \
  -Wno-macro-redefined -Wno-deprecated-declarations
SDL_AUDIODRIVER=dummy /tmp/nuvio-video-mac-test "$amostra"
ffmpeg -hide_banner -loglevel error -y -i "$amostra" -c:v copy -c:a copy -c:s srt "$amostra_mkv"
SDL_AUDIODRIVER=dummy /tmp/nuvio-video-mac-test "$amostra_mkv"
ffmpeg -hide_banner -loglevel error -y -i "$amostra" -c:v copy -c:a copy -c:s ass "$amostra_ass"
SDL_AUDIODRIVER=dummy /tmp/nuvio-video-mac-test "$amostra_ass"
