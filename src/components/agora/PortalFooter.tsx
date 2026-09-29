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
    <footer className="bg-primary-900 text-white" aria-label="Rodapé do portal">
      <FooterADS variant="primary-900">
        <FinancingSectionContainer aria-label="Portal">
          <FooterDisclaimer>Portal aberto de dados públicos portugueses.</FooterDisclaimer>
        </FinancingSectionContainer>
        <LinksSectionContainer aria-label="Relacionado com o portal">
          <LinksSectionRelatedLinks linksSectionRelatedAriaLabel="Links externos">
            <FooterLink appearance="link" variant="neutral" href="https://dados.gov.pt/ajuda-e-contactos">
              Ajuda e contactos
            </FooterLink>
            <FooterLink appearance="link" variant="neutral" href="https://dados.gov.pt/termos-de-utilizacao">
              Termos de utilização
            </FooterLink>
            <LinksSectionRelatedLinksCopyright>© dados.gov.pt</LinksSectionRelatedLinksCopyright>
          </LinksSectionRelatedLinks>
        </LinksSectionContainer>
      </FooterADS>

      <section
        className="container mx-auto flex items-center gap-16 border-t border-white/10 py-24"
        aria-label="Crédito de autoria"
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
            © dados.gov.pt · Protótipo {prototype.name} {prototype.version} {prototype.status}
          </p>
        </div>
      </section>
    </footer>
  );
}
