"use client";

import { siteConfig, withBasePath } from "@/lib/site";

export function PortalFooter() {
  const author = siteConfig.author;
  const prototype = siteConfig.prototype;

  return (
    <footer className="bg-primary-900 text-white" aria-label="Rodapé do portal">
      <section className="container mx-auto px-16 py-48 lg:px-0" aria-labelledby="footer-descobrir">
        <h2 id="footer-descobrir" className="mb-28 text-xl-bold">Mais para descobrir no portal</h2>
        <nav className="grid gap-36 md:grid-cols-3" aria-label="Navegação do rodapé">
          <section aria-labelledby="footer-dados-abertos">
            <h3 id="footer-dados-abertos" className="mb-14 text-l-semibold">Dados abertos</h3>
            <ul className="space-y-10">
              <li><a className="underline underline-offset-4" href="https://dados.gov.pt/areas-tematicas">Áreas Temáticas</a></li>
              <li><a className="underline underline-offset-4" href="https://dados.gov.pt/roadmap">Roadmap</a></li>
              <li><a className="underline underline-offset-4" href="https://dados.gov.pt/datasets/catalogo-de-dados-dos-dados-gov-pt">Catálogo de dados</a></li>
              <li><a className="underline underline-offset-4" href="https://data.europa.eu/">Portal de dados europeu</a></li>
            </ul>
          </section>
          <section aria-labelledby="footer-portal">
            <h3 id="footer-portal" className="mb-14 text-l-semibold">Portal</h3>
            <ul className="space-y-10">
              <li><a className="underline underline-offset-4" href="https://dados.gov.pt/pt/noticias">Notícias</a></li>
              <li><a className="underline underline-offset-4" href="https://dados.gov.pt/recursos/como-usar-o-portal/o-que-e-dados-gov-pt">O que é dados.gov.pt</a></li>
              <li><a className="underline underline-offset-4" href="https://dados.gov.pt/ajuda-e-contactos">Ajuda e contactos</a></li>
              <li><a className="underline underline-offset-4" href="https://dados.gov.pt/termos-de-utilizacao">Termos de utilização</a></li>
            </ul>
          </section>
          <section aria-labelledby="footer-desenvolvimento">
            <h3 id="footer-desenvolvimento" className="mb-14 text-l-semibold">Desenvolvimento</h3>
            <ul className="space-y-10">
              <li><a className="underline underline-offset-4" href="https://dados.gov.pt/recursos/desenvolvimento/referencia-api">Referência API</a></li>
              <li><a className="underline underline-offset-4" href="https://github.com/amagovpt/udata-pt">Mecanismo de código aberto: udata</a></li>
              <li><a className="underline underline-offset-4" href="https://github.com/amagovpt/dadosgov-fe">Extensão do tema udata: udata-front</a></li>
            </ul>
          </section>
        </nav>
      </section>

      <section className="container mx-auto flex flex-col items-start gap-28 px-16 py-28 sm:flex-row sm:flex-wrap sm:items-center lg:px-0" aria-label="Entidades e financiamento">
        <img src="https://dados.gov.pt/Logos/pt-republic-color.svg" alt="República Portuguesa" className="h-52 w-auto" />
        <img src="https://dados.gov.pt/Logos/NextGenerationEU.svg" alt="NextGenerationEU" className="h-56 w-auto" />
        <img src="https://dados.gov.pt/Logos/Logotipo_ARTE__Horizontal_branco_pt.svg" alt="Agência para a Reforma Tecnológica do Estado" className="h-48 w-auto" />
      </section>

      <section className="container mx-auto border-t border-white/15 px-16 py-24 lg:px-0">
        <div className="flex flex-col gap-20 lg:flex-row lg:items-start lg:justify-between">
          <p className="text-s-regular text-white/90">Portal aberto de dados públicos portugueses.</p>
          <nav className="flex flex-wrap gap-x-20 gap-y-10 text-s-regular" aria-label="Links institucionais relacionados">
            <a className="underline underline-offset-4" href="https://portugal.gov.pt/">República Portuguesa</a>
            <a className="underline underline-offset-4" href="https://www.compete2020.gov.pt/">Compete 2020</a>
            <a className="underline underline-offset-4" href="https://portugal2020.pt/">Portugal 2020</a>
            <a className="underline underline-offset-4" href="https://eur-lex.europa.eu/legal-content/PT/LSU/?uri=CELEX:32019L1024">Comissão Europeia</a>
          </nav>
        </div>
        <p className="mt-20 text-s-regular text-white/70">© dados.gov.pt · Protótipo {prototype.name} {prototype.version} {prototype.status}</p>
      </section>
      <section
        className="container mx-auto flex items-center gap-16 border-t border-white/10 px-16 py-20 lg:px-0"
        aria-label="Crédito de autoria"
      >
        <img src={withBasePath(author.logo_web)} alt={author.logo_alt} className="h-48 w-auto" />
        <p className="text-s-regular text-white/85">
          {author.role}:{" "}
          <a
            className="font-bold text-white underline underline-offset-4"
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {author.name}
          </a>
        </p>
      </section>
    </footer>
  );
}
