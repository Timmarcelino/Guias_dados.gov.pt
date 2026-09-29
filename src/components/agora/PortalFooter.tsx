"use client";

import {
  Footer as FooterADS,
  FinancingSectionContainer,
  FooterDisclaimer,
  LinksSectionContainer,
  LinksSectionRelatedLinks,
  LinksSectionRelatedLinksCopyright,
  FooterLink,
} from "@ama-pt/agora-design-system";
import { siteConfig, withBasePath } from "@/lib/site";

export function PortalFooter() {
  const author = siteConfig.author;
  const prototype = siteConfig.prototype;

  return (
    <footer className="bg-primary-900 text-white" aria-label="RodapÃ© do portal">
      <section className="container mx-auto px-16 py-40 lg:px-0" aria-labelledby="footer-descobrir">
        <h2 id="footer-descobrir" className="text-xl-bold mb-24">Mais para descobrir no portal</h2>
        <div className="grid gap-32 md:grid-cols-3">
          <section aria-labelledby="footer-dados-abertos">
            <h3 id="footer-dados-abertos" className="text-l-semibold mb-12">Dados abertos</h3>
            <ul className="space-y-8">
              <li><a className="underline underline-offset-4" href="https://dados.gov.pt/areas-tematicas">Áreas Temáticas</a></li>
              <li><a className="underline underline-offset-4" href="https://data.europa.eu/">Portal de dados europeu</a></li>
            </ul>
          </section>
          <section aria-labelledby="footer-portal">
            <h3 id="footer-portal" className="text-l-semibold mb-12">Portal</h3>
            <ul className="space-y-8">
              <li><a className="underline underline-offset-4" href="https://dados.gov.pt/ajuda-e-contactos">Ajuda e contactos</a></li>
              <li><a className="underline underline-offset-4" href="https://dados.gov.pt/termos-de-utilizacao">Termos de utilização</a></li>
            </ul>
          </section>
          <section aria-labelledby="footer-desenvolvimento">
            <h3 id="footer-desenvolvimento" className="text-l-semibold mb-12">Desenvolvimento</h3>
            <ul className="space-y-8">
              <li><a className="underline underline-offset-4" href="https://github.com/amagovpt/udata-pt">Backend udata-pt</a></li>
              <li><a className="underline underline-offset-4" href="https://github.com/amagovpt/dadosgov-fe">Frontend dados.gov.pt</a></li>
            </ul>
          </section>
        </div>
      </section>
      <FooterADS variant="primary-900">
        <FinancingSectionContainer aria-label="Portal">
          <FooterDisclaimer>Portal aberto de dados pÃºblicos portugueses.</FooterDisclaimer>
        </FinancingSectionContainer>
        <LinksSectionContainer aria-label="Relacionado com o portal">
          <LinksSectionRelatedLinks linksSectionRelatedAriaLabel="Links externos">
            <FooterLink appearance="link" variant="neutral" href="https://dados.gov.pt/ajuda-e-contactos">
              Ajuda e contactos
            </FooterLink>
            <FooterLink appearance="link" variant="neutral" href="https://dados.gov.pt/termos-de-utilizacao">
              Termos de utilizaÃ§Ã£o
            </FooterLink>
            <LinksSectionRelatedLinksCopyright>Â© dados.gov.pt</LinksSectionRelatedLinksCopyright>
          </LinksSectionRelatedLinks>
        </LinksSectionContainer>
      </FooterADS>

      <section
        className="container mx-auto flex items-center gap-16 border-t border-white/10 py-24"
        aria-label="CrÃ©dito de autoria"
      >
        <img src={withBasePath(author.logo_web)} alt={author.logo_alt} className="h-56 w-auto" />
        <div>
          <p className="text-s-regular text-white/90">
            {author.role}:{" "}
            <a
              className="inline-flex min-h-[44px] items-center font-bold text-white underline underline-offset-4"
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {author.name}
            </a>
          </p>
          <p className="text-s-regular text-white/70">
            Â© dados.gov.pt Â· ProtÃ³tipo {prototype.name} {prototype.version} {prototype.status}
          </p>
        </div>
      </section>
    </footer>
  );
}
