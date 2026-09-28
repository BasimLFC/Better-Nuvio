#!/usr/bin/env python3
"""Recusa artefatos que ainda contenham credenciais privadas do desenvolvedor."""
import os
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
data = Path(sys.argv[1]).read_bytes()
private_names = ("TRAKT_CLIENT_SECRET", "SEEKR_API_KEY")
known = []
for path in (root / "local.properties", root.parent / "local.properties",
             root.parent.parent / "Nuvio Enhanced" / "local.properties"):
    if not path.is_file():
        continue
    for line in path.read_text(errors="replace").splitlines():
        name, sep, value = line.partition("=")
        if sep and name in private_names and value.strip():
            known.append((name, value.strip().encode()))
for name in private_names:
    if os.environ.get(name):
        known.append((name, os.environ[name].encode()))
bad = [name for name, value in known if value in data]
if re.search(rb"sk_live_[0-9a-fA-F]{64}", data):
    bad.append("SEEKR_API_KEY")
if bad:
    print("ABORTADO: credencial privada encontrada no artefato: " + ", ".join(sorted(set(bad))), file=sys.stderr)
    sys.exit(1)
print("Credenciais privadas ausentes do artefato")
