#!/usr/bin/env bash
set -euo pipefail
rm -rf .build/pdf
mkdir -p .build public/assets/pdf
python scripts/generate_pdf_guides.py > .build/pdf-generator-output.json
rm -f public/assets/pdf/*.pdf
for f in .build/pdf/*/dados-gov-pt-guia-*-v2.pdf; do
  name="$(basename "$f")"
  target="$(printf '%s' "$name" | sed -e 's/^dados-gov-pt-guia-//' -e 's/-v2\.pdf$/.pdf/')"
  cp "$f" "public/assets/pdf/$target"
done
python - <<'PY'
import json
from pathlib import Path
from pypdf import PdfReader
site=json.loads(Path('content/site.json').read_text(encoding='utf-8'))
author=site['author']['name']; version=site['prototype']['version']
qa=json.loads(Path('.build/pdf/qa-summary.json').read_text(encoding='utf-8'))
assert len(qa)==15
assert not [x for x in qa if x['missing_items'] != 0]
pdfs=sorted(Path('public/assets/pdf').glob('*.pdf'))
assert len(pdfs)==15, len(pdfs)
for pdf in pdfs:
    reader=PdfReader(str(pdf)); assert len(reader.pages)>=1
    text='\n'.join((p.extract_text() or '') for p in reader.pages)
    assert author in text, pdf.name
    assert version in text, pdf.name
print('PDF v1: 15/15 derivados da fonte única, com autoria.')
PY
