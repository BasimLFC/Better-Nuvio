# Compilação do Better Nuvio

O código atual do cliente fica em `src/`; os recursos do pacote ficam em `deploy/app/`. Consulte `NOTICE.md` e `LICENSE` para atribuição e termos da GPL-3.0.

## Configuração local

Crie `local.properties` na raiz do projeto. Esse arquivo é ignorado pelo Git. Configure `NUVIO_SUPABASE_URL`, `NUVIO_SUPABASE_ANON_KEY` e `TV_LOGIN_WEB_BASE_URL` para o login. `SIMKL_CLIENT_ID`, `SIMKL_APP_NAME` e `TMDB_API_KEY` são opcionais conforme os recursos usados. Nunca coloque tokens de conta, chaves pessoais ou segredos OAuth em arquivos rastreados.

O ID público do novo aplicativo Trakt é incluído no cliente. A troca e a renovação de tokens passam por `/api/trakt-token` no domínio Better Nuvio; o segredo fica somente no ambiente de produção do servidor. Cada usuário configura sua própria chave Seekr no aplicativo. O pacote distribuído não contém uma chave Seekr compartilhada.

## macOS

Instale SDL2, SDL2_image, SDL2_ttf e as bibliotecas de desenvolvimento do FFmpeg. Execute `bash tools/mac.sh --build` para compilar ou `bash tools/mac.sh` para abrir o aplicativo.

## LG webOS

Construa a imagem de compilação com `docker build --platform linux/arm64 -t nuvio-webos-sdk tools/`. Gere o pacote com `bash tools/arm.sh --ipk --build`. O script confere a configuração, exclui arquivos pessoais do pacote e executa `tools/check-no-private-keys.py` no binário ARM. Revise o IPK antes da publicação.

O catálogo e o download atual ficam em `https://betternuvio.vercel.app/`. Para instalação pelo Homebrew Channel, use `https://betternuvio.vercel.app/apps.json`.

## Configuração do proxy Trakt na Vercel

Defina as variáveis de produção `TRAKT_CLIENT_ID`, `TRAKT_CLIENT_SECRET`, `NUVIO_SUPABASE_URL` e `NUVIO_SUPABASE_ANON_KEY` diretamente na Vercel. Marque o segredo do Trakt como secreto. O endpoint exige o token da conta autenticada e aceita apenas troca de código de dispositivo ou renovação de token.
