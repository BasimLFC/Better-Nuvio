#!/bin/bash
set -eu
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
export NUVIO_PROPERTIES="$tmp/web.properties"
export NUVIO_LAB_PROPERTIES="$tmp/lab.properties"
cat > "$NUVIO_PROPERTIES" <<'EOF'
NUVIO_SUPABASE_URL=https://example.invalid
NUVIO_SUPABASE_ANON_KEY=test
TV_LOGIN_WEB_BASE_URL=https://example.invalid
TRAKT_CLIENT_ID=old-id
TRAKT_CLIENT_SECRET=old-secret
SIMKL_CLIENT_ID=web-simkl
EOF
printf 'TRAKT_CLIENT_SECRET=another-secret\n' > "$NUVIO_LAB_PROPERTIES"
TRAKT_CLIENT_SECRET=environment-secret tools/env.sh --env-file "$tmp/env"
grep -qFx 'NV_TRAKT_CLIENT_ID=_LVEA8lNibo-jFH7Z3z0t1OYOS0Qz-EHSWrVulFVt0M' "$tmp/env"
grep -qFx 'NV_SIMKL_CLIENT_ID=web-simkl' "$tmp/env"
if grep -Eq 'TRAKT_CLIENT_SECRET|old-secret|another-secret|environment-secret' "$tmp/env"; then
  echo 'segredo Trakt entrou no ambiente de compilacao' >&2
  exit 1
fi
echo 'tracking build keys: ok'
