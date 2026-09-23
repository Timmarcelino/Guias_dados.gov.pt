"""Sincroniza o crédito de autoria pessoal na Web e no gerador PDF.

O script é idempotente e usa sitemap.xml como contrato das 118 páginas públicas.
A apresentação pode ser desligada globalmente alterando
--author-branding-display em assets/css/portal.css.
"""

from pathlib import Path
import re
import xml.etree.ElementTree as ET

REPO = Path(__file__).resolve().parents[1]
SITEMAP = REPO / "sitemap.xml"
PORTAL_CSS = REPO / "assets" / "css" / "portal.css"
PDF_GENERATOR = REPO / "scripts" / "generate_pdf_guides.py"

SITE_PREFIX = "https://timmarcelino.github.io/Guias_dados.gov.pt/"
LINKEDIN = "https://www.linkedin.com/in/valentimmarcelino/"
LOGO_WEB = "/Guias_dados.gov.pt/assets/brand/valentim-pinto-vp.jpg"

BRAND_HTML = f'''<section class="vp-author-credit" aria-label="Crédito de autoria">
      <img class="vp-author-credit__logo" src="{LOGO_WEB}" alt="VP, marca pessoal de Valentim Pinto">
      <p class="vp-author-credit__line vp-author-credit__line--primary">Concepção funcional e editorial: <a class="vp-author-credit__name" href="{LINKEDIN}" target="_blank" rel="noopener noreferrer">Valentim Pinto</a></p>
      <p class="vp-author-credit__line vp-author-credit__line--secondary">© dados.gov.pt · Protótipo Guias v0.5.0 em revisão</p>
    </section>'''

CSS_BLOCK = r'''
/* AUTHOR_BRANDING_START */
@layer portal {
  :root { --author-branding-display: grid; }

  .vp-author-credit {
    grid-column: 1 / -1;
    display: var(--author-branding-display);
    grid-template-columns: 86px minmax(0, 1fr);
    grid-template-rows: auto auto;
    column-gap: 14px;
    row-gap: 4px;
    align-items: center;
    margin-top: 6px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .vp-author-credit__logo {
    grid-column: 1;
    grid-row: 1 / 3;
    width: 78px;
    height: auto;
    display: block;
    border-radius: 3px;
    background: #f7f3ea;
  }

  .vp-author-credit__line {
    grid-column: 2;
    margin: 0;
    line-height: 1.45;
  }

  .vp-author-credit__line--primary {
    grid-row: 1;
    align-self: end;
    color: rgba(255, 255, 255, 0.82);
    font-size: 0.82rem;
  }

  .vp-author-credit__line--secondary {
    grid-row: 2;
    align-self: start;
    color: rgba(255, 255, 255, 0.66);
    font-size: 0.78rem;
  }

  .vp-author-credit__name {
    color: #fff;
    font-weight: 700;
    text-decoration: none;
    text-underline-offset: 3px;
  }

  .vp-author-credit__name:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }

  .vp-author-credit__name:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
    border-radius: 2px;
  }

  @media (max-width: 760px) {
    .vp-author-credit {
      grid-template-columns: 72px minmax(0, 1fr);
      column-gap: 12px;
    }
    .vp-author-credit__logo { width: 64px; }
    .vp-author-credit__line--primary { font-size: 0.8rem; }
    .vp-author-credit__line--secondary { font-size: 0.75rem; }
  }
}
/* AUTHOR_BRANDING_END */
'''.strip()


def sitemap_pages():
    root = ET.fromstring(SITEMAP.read_text(encoding="utf-8"))
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    paths = []
    for loc in root.findall("sm:url/sm:loc", ns):
        url = (loc.text or "").strip()
        if not url.startswith(SITE_PREFIX):
            raise RuntimeError(f"URL fora do prefixo esperado: {url}")
        relative = url[len(SITE_PREFIX):].strip("/")
        paths.append(REPO / relative / "index.html")
    if len(paths) != 118:
        raise RuntimeError(f"Esperadas 118 páginas no sitemap, obtidas {len(paths)}")
    return paths


def patch_page(path: Path):
    text = path.read_text(encoding="utf-8")
    if 'class="portal-footer"' not in text:
        raise RuntimeError(f"Footer institucional não encontrado: {path.relative_to(REPO)}")

    text = re.sub(
        r'\s*<section class="vp-author-credit".*?</section>',
        '',
        text,
        flags=re.S,
    )

    copyright_pattern = re.compile(
        r'<div class="portal-footer__copyright">.*?</div>',
        flags=re.S,
    )
    if not copyright_pattern.search(text):
        raise RuntimeError(f"Copyright do footer não encontrado: {path.relative_to(REPO)}")
    text = copyright_pattern.sub(BRAND_HTML, text, count=1)
    path.write_text(text, encoding="utf-8")


def patch_css():
    text = PORTAL_CSS.read_text(encoding="utf-8")
    text = re.sub(
        r'/\* AUTHOR_BRANDING_START \*/.*?/\* AUTHOR_BRANDING_END \*/',
        '',
        text,
        flags=re.S,
    ).rstrip()
    PORTAL_CSS.write_text(text + "\n\n" + CSS_BLOCK + "\n", encoding="utf-8")


def patch_pdf_generator():
    text = PDF_GENERATOR.read_text(encoding="utf-8")

    constants_marker = "BASE_WEB = 'https://timmarcelino.github.io/Guias_dados.gov.pt/Guias-do-utilizador/'\n"
    constants = (
        constants_marker
        + "AUTHOR_LINK = 'https://www.linkedin.com/in/valentimmarcelino/'\n"
        + "AUTHOR_LOGO_URI = (REPO / 'assets' / 'brand' / 'valentim-pinto-vp.jpg').resolve().as_uri()\n"
    )
    text = re.sub(
        re.escape(constants_marker) + r"(?:AUTHOR_LINK.*\nAUTHOR_LOGO_URI.*\n)?",
        constants,
        text,
        count=1,
    )

    # build_css() é uma f-string. As chavetas CSS ficam duplicadas no código
    # fonte para produzirem chavetas simples no HTML/CSS final. Flexbox é usado
    # no PDF por maior estabilidade no WeasyPrint 68.
    pdf_css = (
        "/* PDF_AUTHOR_BRANDING_START */"
        ".pdf-author-credit{{margin-top:6mm;padding-top:4mm;border-top:1px solid #dce5eb;"
        "display:flex;gap:4mm;align-items:center;break-inside:avoid}}"
        ".pdf-author-credit img{{width:22mm;height:auto;flex:0 0 22mm;border-radius:1mm}}"
        ".pdf-author-credit p{{margin:0;font-size:7.5pt;line-height:1.42;color:#526779}}"
        ".pdf-author-credit p span{{display:inline-block;margin-top:1mm;color:#708394}}"
        ".pdf-author-credit a{{font-weight:700;color:#103454;text-decoration:none}}"
        "/* PDF_AUTHOR_BRANDING_END */"
    )
    text = re.sub(
        r'/\* PDF_AUTHOR_BRANDING_START \*/.*?/\* PDF_AUTHOR_BRANDING_END \*/\n?',
        '',
        text,
        flags=re.S,
    )
    if "@media print" not in text:
        raise RuntimeError("Marcador @media print não encontrado no gerador PDF")
    text = text.replace("@media print", pdf_css + "\n@media print", 1)

    credit = (
        '<div class="pdf-author-credit">'
        '<img src="{AUTHOR_LOGO_URI}" alt="VP, marca pessoal de Valentim Pinto">'
        '<p>Concepção funcional e editorial: <a href="{AUTHOR_LINK}">Valentim Pinto</a><br>'
        '<span>© dados.gov.pt · Protótipo Guias v0.5.0 em revisão</span></p>'
        '</div>'
    )
    text = re.sub(r'<div class="pdf-author-credit">.*?</div>', '', text, flags=re.S)
    needle = '<div class="internal-note"><strong>Nota editorial:</strong> alguns elementos visuais deste guia são esquemas informativos baseados no conteúdo consolidado.</div>'
    if needle not in text:
        raise RuntimeError("Ponto de inserção do crédito PDF não encontrado")
    text = text.replace(needle, needle + credit, 1)

    PDF_GENERATOR.write_text(text, encoding="utf-8")


def main():
    targets = sitemap_pages()
    extras = [REPO / "index.html", REPO / "404.html"]
    patched = 0
    for path in targets + extras:
        if path.exists() and 'class="portal-footer"' in path.read_text(encoding="utf-8"):
            patch_page(path)
            patched += 1

    patch_css()
    patch_pdf_generator()

    branded = 0
    for path in targets:
        if 'class="vp-author-credit"' in path.read_text(encoding="utf-8"):
            branded += 1
    if branded != 118:
        raise RuntimeError(f"Branding aplicado em {branded}/118 páginas do sitemap")

    print(f"Branding sincronizado: {branded}/118 páginas públicas; {patched} HTML no total.")


if __name__ == "__main__":
    main()
