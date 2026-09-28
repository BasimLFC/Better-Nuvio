#!/bin/bash
set -eu
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
export NUVIO_PROPERTIES="$tmp/local.properties"
export NUVIO_SEEKR_PROPERTIES="$tmp/lab.properties"
fake="sk_live_$(printf '%064d' 0)"
cat > "$NUVIO_PROPERTIES" <<EOF
NUVIO_SUPABASE_URL=https://example.invalid
NUVIO_SUPABASE_ANON_KEY=test
TV_LOGIN_WEB_BASE_URL=https://example.invalid
SEEKR_API_KEY=$fake
EOF
printf 'SEEKR_API_KEY=%s\n' "$fake" > "$NUVIO_SEEKR_PROPERTIES"
SEEKR_API_KEY="$fake" tools/env.sh --env-file "$tmp/env"
if grep -qE 'NV_SEEKR_API_KEY|sk_live_' "$tmp/env"; then
  echo 'chave Seekr entrou no ambiente de compilacao' >&2
  exit 1
fi
printf '%s' "$fake" > "$tmp/unsafe"
if python3 tools/check-no-private-keys.py "$tmp/unsafe" >/dev/null 2>&1; then
  echo 'checagem de chave Seekr nao detectou a credencial' >&2
  exit 1
fi
echo 'seekr build key: ok'
