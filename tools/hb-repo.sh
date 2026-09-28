#!/bin/bash
# Gera os metadados do Better Nuvio para o catálogo Homebrew hospedado no Vercel.
# Uso: bash tools/hb-repo.sh <pacote.ipk> <pasta-de-saida>
# Copie o IPK para a pasta de saída antes de publicar o catálogo.
set -euo pipefail
cd "$(dirname "$0")/.."

IPK="${1:?uso: hb-repo.sh <pacote.ipk> <saida>}"
SAIDA="${2:?uso: hb-repo.sh <pacote.ipk> <saida>}"
mkdir -p "$SAIDA"

python3 - "$IPK" "$SAIDA" <<'PY'
import hashlib
import json
import os
import sys

ipk, saida = sys.argv[1:3]
with open('deploy/app/appinfo.json', encoding='utf-8') as f:
    app = json.load(f)
versao = app['version']
nome = os.path.basename(ipk)
esperado = f"{app['id']}_{versao}_arm.ipk"
if nome != esperado:
    sys.exit(f'hb-repo.sh: esperava {esperado}, recebi {nome}')

hash_ipk = hashlib.sha256()
with open(ipk, 'rb') as f:
    for chunk in iter(lambda: f.read(1024 * 1024), b''):
        hash_ipk.update(chunk)

base = 'https://nuvio-enhanced-lab-catalog.vercel.app'
icone = f'{base}/icon.png'
manifesto = {
    'id': app['id'],
    'version': versao,
    'type': 'native',
    'title': 'Better Nuvio',
    'appDescription': 'Better Nuvio para LG webOS',
    'iconUri': icone,
    'sourceUrl': 'https://github.com/alenkpedro/better-nuvio',
    'rootRequired': False,
    'ipkUrl': f'{base}/{nome}',
    'ipkHash': {'sha256': hash_ipk.hexdigest()},
    'ipkSize': os.path.getsize(ipk),
}
indice = {
    'paging': {'page': 1, 'count': 1, 'maxPage': 1, 'itemsTotal': 1,
               'prevUrl': None, 'nextUrl': None},
    'packages': [{
        'id': app['id'],
        'title': manifesto['title'],
        'iconUri': icone,
        'manifestUrl': f'{base}/webosbrew.manifest.json',
        'manifest': manifesto,
        'pool': 'main',
        'shortDescription': manifesto['appDescription'],
    }],
}
for name, data in [('webosbrew.manifest.json', manifesto),
                   ('repo.json', indice), ('apps.json', indice)]:
    with open(os.path.join(saida, name), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')
print(f'hb-repo.sh: {versao} sha256={hash_ipk.hexdigest()[:12]}... -> {saida}')
PY
