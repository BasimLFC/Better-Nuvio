#!/bin/bash
# Le as configuracoes do app web e as chaves opcionais do local.properties
# deste Lab. Nada de segredo entra em arquivo de codigo: o valor viaja da
# propriedade direto para a linha de comando do compilador.
#
# A anon key do Supabase e publica por projeto — e o que o RLS espera receber, e
# o app web ja a publica no bundle. Quem NAO pode entrar no pacote e o que hoje
# esta em art/trakt.txt e art/addons.txt: aquilo e credencial de PESSOA.
#
#   eval "cc src/*.c $(tools/env.sh) ..."
set -e

REQUIRE_CORE=0
ALLOW_UNCONFIGURED=0
case "${1:-}" in
  "") ;;
  --require-core) REQUIRE_CORE=1 ;;
  --allow-unconfigured) ALLOW_UNCONFIGURED=1 ;;
  --env-file) ;;
  *)
    echo "env.sh: opcao desconhecida: $1" >&2
    exit 2
    ;;
esac

RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
LAB_PROP="${NUVIO_LAB_PROPERTIES:-${NUVIO_SEEKR_PROPERTIES:-$RAIZ/local.properties}}"
if [ -n "${NUVIO_PROPERTIES:-}" ]; then
  PROP="$NUVIO_PROPERTIES"
else
  # O repositorio pode estar ao lado de "Nuvio Enhanced" ou dentro de
  # "Better Nuvio". Procure a configuracao principal sem fixar uma pasta.
  PROP="$RAIZ/local.properties"
  for candidato in \
    "$RAIZ/../Nuvio Enhanced/local.properties" \
    "$RAIZ/../../Nuvio Enhanced/local.properties" \
    "$RAIZ/../NuvioWeb-0.3.38-beta/local.properties" \
    "$RAIZ/../../NuvioWeb-0.3.38-beta/local.properties"; do
    if [ -f "$candidato" ]; then
      PROP="$candidato"
      break
    fi
  done
fi

valor_em() {
  [ -f "$1" ] || return 0
  sed -n "s/^$2=//p" "$1" | head -1 | tr -d '\r'
}
valor() { valor_em "$PROP" "$1"; }
valor_lab_ou_web() {
  if [ -f "$LAB_PROP" ] && grep -q "^$1=" "$LAB_PROP"; then
    valor_em "$LAB_PROP" "$1"
  else
    valor "$1"
  fi
}

URL=$(valor NUVIO_SUPABASE_URL)
KEY=$(valor NUVIO_SUPABASE_ANON_KEY)
TVB=$(valor TV_LOGIN_WEB_BASE_URL)
TRK="_LVEA8lNibo-jFH7Z3z0t1OYOS0Qz-EHSWrVulFVt0M"
SMK="${SIMKL_CLIENT_ID:-$(valor_lab_ou_web SIMKL_CLIENT_ID)}"
SMA="${SIMKL_APP_NAME:-$(valor_lab_ou_web SIMKL_APP_NAME)}"
TMD=$(valor TMDB_API_KEY)
# Credenciais privadas nunca entram no compilador nem no IPK. O Trakt troca
# codigos no servidor; cada usuario informa sua propria chave do Seekr na TV.
# Servico de recomendacoes entre amigos (servidor/recomendacoes). VAZIO E UM
# ESTADO VALIDO E E O PADRAO: sem ele o app nao mostra a aba Social, nao mostra
# o item "Recomendar a um amigo" e nao abre conexao nenhuma. O dono publica
# builds com isto desligado, entao "esqueci de configurar" tem de ser invisivel
# e nao um botao que da erro.
REC=$(valor NUVIO_REC_URL)
# A versao do app sai do appinfo.json — FONTE UNICA. Ela ja vivia em tres
# lugares (appinfo.json, tizen-config.xml e um #define em ajustes.c) e o
# terceiro ficou parado em 1.0.44 por nove releases: a tela de Ajustes mentia
# a versao. O binario recebe -DNV_VERSAO e a conferencia do arm.sh exige
# encontrar o valor dentro dele, como com as demais chaves.
VER=$(sed -n 's/^[[:space:]]*"version":[[:space:]]*"\([^"]*\)".*/\1/p' "$RAIZ/deploy/app/appinfo.json" | head -1)
VERT=$(grep -v "<?xml" "$RAIZ/tools/tizen-config.xml" | sed -n 's/.*[[:space:]]version="\([0-9.]*\)".*/\1/p' | head -1)
if [ -z "$VER" ]; then
  echo "env.sh: nao achei \"version\" em deploy/app/appinfo.json" >&2; exit 2
fi
if [ "$VER" != "$VERT" ]; then
  echo "env.sh: appinfo.json diz $VER e tizen-config.xml diz $VERT -- alinhe antes de compilar" >&2; exit 2
fi

MISSING_CORE=()
[ -n "$URL" ] || MISSING_CORE+=(NUVIO_SUPABASE_URL)
[ -n "$KEY" ] || MISSING_CORE+=(NUVIO_SUPABASE_ANON_KEY)
[ -n "$TVB" ] || MISSING_CORE+=(TV_LOGIN_WEB_BASE_URL)
if [ "${#MISSING_CORE[@]}" -gt 0 ]; then
  if [ "$REQUIRE_CORE" -eq 1 ]; then
    # A build produtiva nao pode instalar e so descobrir na tela de login que
    # recebeu macros vazias. Liste apenas nomes, nunca valores ou caminhos.
    echo "env.sh: configuracao obrigatoria ausente: ${MISSING_CORE[*]}" >&2
    exit 3
  elif [ "$ALLOW_UNCONFIGURED" -eq 0 ]; then
    # O modo permissivo permanece para harnesses diagnosticos explicitos.
    echo "env.sh: configuracao de servidor incompleta; use --require-core na release" >&2
  fi
fi

# --env-file: escreve as variaveis num arquivo para o `docker run --env-file`.
# Existe porque a compilacao ARM roda DENTRO de um container: passar os -D na
# linha de comando exigiria aspas dentro de aspas dentro de `sh -c`, e o erro
# ali e mudo — o compilador recebe a macro vazia e o app sai SEM LOGIN, que foi
# exatamente o que aconteceu no primeiro deploy para a TV.
if [ "$1" = "--env-file" ]; then
  [ -n "$2" ] || { echo "env.sh --env-file precisa do caminho" >&2; exit 2; }
  {
    printf 'NV_SUPABASE_URL=%s\n' "$URL"
    printf 'NV_SUPABASE_ANON_KEY=%s\n' "$KEY"
    printf 'NV_TV_LOGIN_BASE=%s\n' "$TVB"
    printf 'NV_TRAKT_CLIENT_ID=%s\n' "$TRK"
    printf 'NV_SIMKL_CLIENT_ID=%s\n' "$SMK"
    printf 'NV_SIMKL_APP=%s\n' "$SMA"
    printf 'NV_TMDB_API_KEY=%s\n' "$TMD"
    printf 'NV_REC_URL=%s\n' "$REC"
    printf 'NV_VERSAO=%s\n' "$VER"
  } > "$2"
  chmod 600 "$2"
  exit 0
fi

printf -- '-DNV_SUPABASE_URL=\\"%s\\" -DNV_SUPABASE_ANON_KEY=\\"%s\\" -DNV_TV_LOGIN_BASE=\\"%s\\" -DNV_TRAKT_CLIENT_ID=\\"%s\\" -DNV_SIMKL_CLIENT_ID=\\"%s\\" -DNV_SIMKL_APP=\\"%s\\" -DNV_TMDB_API_KEY=\\"%s\\" -DNV_REC_URL=\\"%s\\" -DNV_VERSAO=\\"%s\\"' \
  "$URL" "$KEY" "$TVB" "$TRK" "$SMK" "$SMA" "$TMD" "$REC" "$VER"
