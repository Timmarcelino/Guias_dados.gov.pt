"use client";

import { siteConfig, withBasePath } from "@/lib/site";

const shell = "mx-auto w-[calc(100%-64px)] max-w-[1216px] max-[700px]:w-[calc(100%-40px)]";
const footerItem = "text-white/90";

export function PortalFooter() {
  const author = siteConfig.author;
  const prototype = siteConfig.prototype;

  return (
    <footer className="overflow-x-hidden bg-[#021c51] text-white" aria-label="Rodapé do portal">
      <section className={`${shell} pb-[48px] pt-[56px]`} aria-labelledby="footer-descobrir">
        <h2 id="footer-descobrir" className="mb-[30px] text-[1.35rem] font-bold leading-[1.3] text-white">
          Mais para descobrir no portal
        </h2>
        <div className="grid grid-cols-3 gap-[32px] max-[900px]:grid-cols-2 max-[700px]:grid-cols-1">
          <section aria-labelledby="footer-dados-abertos">
            <h3 id="footer-dados-abertos" className="mb-[16px] text-[1rem] font-bold text-white">Dados abertos</h3>
            <ul className="m-0 list-none space-y-[12px] p-0 text-[14px]">
              <li className={footerItem}>Áreas Temáticas</li>
              <li className={footerItem}>Roadmap</li>
              <li className={footerItem}>Catálogo de dados</li>
              <li className={footerItem}>Portal de dados europeu</li>
            </ul>
          </section>
          <section aria-labelledby="footer-portal">
            <h3 id="footer-portal" className="mb-[16px] text-[1rem] font-bold text-white">Portal</h3>
            <ul className="m-0 list-none space-y-[12px] p-0 text-[14px]">
              <li className={footerItem}>Notícias</li>
              <li className={footerItem}>O que é dados.gov.pt</li>
              <li className={footerItem}>Ajuda e contactos</li>
              <li className={footerItem}>Termos de utilização</li>
            </ul>
          </section>
          <section aria-labelledby="footer-desenvolvimento">
            <h3 id="footer-desenvolvimento" className="mb-[16px] text-[1rem] font-bold text-white">Desenvolvimento</h3>
            <ul className="m-0 list-none space-y-[12px] p-0 text-[14px]">
              <li className={footerItem}>Referência API</li>
              <li className={footerItem}>Mecanismo de código aberto: udata (15.0.0)</li>
              <li className={footerItem}>Extensão do tema udata: udata-front</li>
            </ul>
          </section>
        </div>
      </section>

      <section className={`${shell} flex flex-wrap items-center gap-[40px] py-[42px]`} aria-label="Entidades e financiamento">
        <img src="https://dados.gov.pt/Logos/pt-republic-color.svg" alt="República Portuguesa" className="h-[44px] w-auto object-contain" />
        <img src="https://dados.gov.pt/Logos/NextGenerationEU.svg" alt="NextGenerationEU" className="h-[44px] w-auto object-contain" />
        <img src="https://dados.gov.pt/Logos/Logotipo_ARTE__Horizontal_branco_pt.svg" alt="Agência para a Reforma Tecnológica do Estado" className="h-[44px] max-w-[220px] object-contain" />
      </section>
      <section className={`${shell} grid grid-cols-[minmax(0,1fr)_auto] items-start gap-[32px] border-t border-white/15 pb-[38px] pt-[28px] max-[900px]:grid-cols-1`}>
        <p className="m-0 max-w-[680px] text-[14px] text-white/80">Portal aberto de dados públicos portugueses.</p>
        <div className="flex flex-wrap justify-end gap-x-[22px] gap-y-[12px] text-[14px] text-white/85 max-[900px]:justify-start" aria-label="Referências institucionais relacionadas">
          <span>República Portuguesa</span>
          <span>Compete 2020</span>
          <span>Portugal 2020</span>
          <span>Comissão Europeia</span>
        </div>
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
