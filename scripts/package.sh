#!/usr/bin/env bash
# Empacota a skill para upload: gera dist/slides-design-skill.zip com a pasta da skill na raiz do zip.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p dist
rm -f dist/slides-design-skill.zip
(cd skill && zip -qr ../dist/slides-design-skill.zip slides-design-skill)
echo "Gerado: dist/slides-design-skill.zip"
