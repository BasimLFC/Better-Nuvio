# Better Nuvio

Cliente de streaming para LG webOS, com prévias para macOS e trabalho experimental em outras plataformas. Distribuído sob [GPL-3.0](LICENSE); os avisos de atribuição estão em [NOTICE.md](NOTICE.md).

## Instalar no LG webOS

Adicione este catálogo ao Homebrew Channel:

```text
https://betternuvio.vercel.app/apps.json
```

O [site de atualizações](https://betternuvio.vercel.app/) mostra as notas e o pacote IPK atual. Os metadados do catálogo ficam em `lab-catalog/`.

## Código-fonte

Este repositório é um snapshot limpo do código atual do Better Nuvio. Ele não contém o histórico Git local, chaves, tokens, contas, configurações pessoais, pacotes IPK ou binários gerados. O IPK 1.5.20 é publicado pelo catálogo. O segredo OAuth do Trakt fica apenas no ambiente do servidor; o Seekr usa uma chave pessoal configurada no dispositivo.

Os componentes principais estão em `src/` (cliente nativo), `deploy/app/` (recursos), `plugin-service/` (executor local), `tools/` (build) e `tests/`. Para compilar no Mac, use `bash tools/mac.sh`; para LG, `bash tools/arm.sh --ipk`. Consulte [as notas de compilação](docs/ORIGINAL_BUILD_NOTES.md) para dependências e variáveis locais. Os arquivos de conta são criados localmente e não são distribuídos.

## Créditos

Os avisos de atribuição estão em [NOTICE.md](NOTICE.md). Better Nuvio é um projeto não oficial, sem afiliação com NuvioMedia. Consulte também as licenças de bibliotecas e fontes nos respectivos diretórios.
