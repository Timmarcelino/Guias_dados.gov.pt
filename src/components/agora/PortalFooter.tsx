"use client";

import { siteConfig, withBasePath } from "@/lib/site";

const shell = "mx-auto w-[calc(100%-64px)] max-w-[1216px] max-[700px]:w-[calc(100%-40px)]";
const footerLink = "text-white underline underline-offset-[3px] hover:decoration-2";

export function PortalFooter() {
  const author = siteConfig.author;
  const prototype = siteConfig.prototype;

  return (
    <footer className="overflow-x-hidden bg-[#021c51] text-white" aria-label="Rodapé do portal">
      <section className={`${shell} pb-[48px] pt-[56px]`} aria-labelledby="footer-descobrir">
        <h2 id="footer-descobrir" className="mb-[30px] text-[1.35rem] font-bold leading-[1.3] text-white">
          Mais para descobrir no portal
        </h2>
        <nav className="grid grid-cols-3 gap-[32px] max-[900px]:grid-cols-2 max-[700px]:grid-cols-1" aria-label="Navegação do rodapé">
          <section aria-labelledby="footer-dados-abertos">
            <h3 id="footer-dados-abertos" className="mb-[16px] text-[1rem] font-bold text-white">Dados abertos</h3>
            <ul className="m-0 list-none space-y-[12px] p-0 text-[14px]">
              <li><a className={footerLink} href="https://dados.gov.pt/areas-tematicas">Áreas Temáticas</a></li>
              <li><a className={footerLink} href="https://dados.gov.pt/roadmap">Roadmap</a></li>
              <li><a className={footerLink} href="https://dados.gov.pt/datasets/catalogo-de-dados-dos-dados-gov-pt">Catálogo de dados</a></li>
              <li><a className={footerLink} href="https://data.europa.eu/">Portal de dados europeu</a></li>
            </ul>
          </section>
          <section aria-labelledby="footer-portal">
            <h3 id="footer-portal" className="mb-[16px] text-[1rem] font-bold text-white">Portal</h3>
            <ul className="m-0 list-none space-y-[12px] p-0 text-[14px]">
              <li><a className={footerLink} href="https://dados.gov.pt/pt/noticias">Notícias</a></li>
              <li><a className={footerLink} href="https://dados.gov.pt/recursos/como-usar-o-portal/o-que-e-dados-gov-pt">O que é dados.gov.pt</a></li>
              <li><a className={footerLink} href="https://dados.gov.pt/ajuda-e-contactos">Ajuda e contactos</a></li>
              <li><a className={footerLink} href="https://dados.gov.pt/termos-de-utilizacao">Termos de utilização</a></li>
            </ul>
          </section>
          <section aria-labelledby="footer-desenvolvimento">
            <h3 id="footer-desenvolvimento" className="mb-[16px] text-[1rem] font-bold text-white">Desenvolvimento</h3>
            <ul className="m-0 list-none space-y-[12px] p-0 text-[14px]">
              <li><a className={footerLink} href="https://dados.gov.pt/recursos/desenvolvimento/referencia-api">Referência API</a></li>
              <li><a className={footerLink} href="https://github.com/amagovpt/udata-pt">Mecanismo de código aberto: udata</a></li>
              <li><a className={footerLink} href="https://github.com/amagovpt/dadosgov-fe">Extensão do tema udata: udata-front</a></li>
            </ul>
          </section>
        </nav>
      </section>

      <section className={`${shell} flex flex-wrap items-center gap-[40px] py-[42px]`} aria-label="Entidades e financiamento">
        <img src="https://dados.gov.pt/Logos/pt-republic-color.svg" alt="República Portuguesa" className="h-[44px] w-auto object-contain" />
        <img src="https://dados.gov.pt/Logos/NextGenerationEU.svg" alt="NextGenerationEU" className="h-[44px] w-auto object-contain" />
        <img src="https://dados.gov.pt/Logos/Logotipo_ARTE__Horizontal_branco_pt.svg" alt="Agência para a Reforma Tecnológica do Estado" className="h-[44px] max-w-[220px] object-contain" />
      </section>
      <section className={`${shell} grid grid-cols-[minmax(0,1fr)_auto] items-start gap-[32px] border-t border-white/15 pb-[38px] pt-[28px] max-[900px]:grid-cols-1`}>
        <p className="m-0 max-w-[680px] text-[14px] text-white/80">Portal aberto de dados públicos portugueses.</p>
        <nav className="flex flex-wrap justify-end gap-x-[22px] gap-y-[12px] text-[14px] max-[900px]:justify-start" aria-label="Links institucionais relacionados">
          <a className={footerLink} href="https://portugal.gov.pt/">República Portuguesa</a>
          <a className={footerLink} href="https://www.compete2020.gov.pt/">Compete 2020</a>
          <a className={footerLink} href="https://portugal2020.pt/">Portugal 2020</a>
          <a className={footerLink} href="https://eur-lex.europa.eu/legal-content/PT/LSU/?uri=CELEX:32019L1024">Comissão Europeia</a>
        </nav>
        <p className="col-span-full mt-[4px] text-[13px] text-white/70">
          © dados.gov.pt · Protótipo {prototype.name} {prototype.version} {prototype.status}
        </p>
      </section>

      <section className={`${shell} flex items-center gap-[16px] border-t border-white/10 py-[20px]`} aria-label="Crédito de autoria">
        <img src={withBasePath(author.logo_web)} alt={author.logo_alt} className="h-[48px] w-auto" />
        <p className="text-[13px] text-white/85">
          {author.role}:{" "}
          <a className="font-bold text-white underline underline-offset-[4px]" href={author.linkedin} target="_blank" rel="noopener noreferrer">
            {author.name}
          </a>
        </p>
      </section>
    </footer>
  );
}
