"use client";

import {
  Header as AgoraHeader,
  Brand,
  Logo,
  GeneralBar,
  Unauthenticated,
  UnauthenticatedLink,
  NavigationBar,
  NavigationSection,
  NavigationLink,
} from "@ama-pt/agora-design-system";

const nav = [
  ["Data Stories", "https://dados.gov.pt/pt/datastories"],
  ["Conjuntos de dados", "https://dados.gov.pt/pt/datasets"],
  ["APIs", "https://dados.gov.pt/pt/dataservices"],
  ["Reutilizações", "https://dados.gov.pt/pt/reuses"],
  ["Organizações", "https://dados.gov.pt/pt/organizations"],
  ["Recursos", "https://dados.gov.pt/pt/recursos"],
] as const;

export function PortalHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <AgoraHeader maxNavigationItems={7}>
        <Brand>
          <Logo>
            <a href="https://dados.gov.pt/pt" aria-label="dados.gov.pt">
              <img
                src="https://dados.gov.pt/Logos/Dados.gov_logocores.png"
                alt="dados.gov.pt"
                width="190"
                height="33"
              />
            </a>
          </Logo>
        </Brand>
        <GeneralBar aria-label="Navegação geral">
          <Unauthenticated label="Autenticar">
            <UnauthenticatedLink>
              <a href="https://dados.gov.pt/pt/login" aria-label="Autenticar">Autenticar</a>
            </UnauthenticatedLink>
          </Unauthenticated>
        </GeneralBar>
        <NavigationBar
          responsiveMenuLabel="Menu"
          responsiveMenuAriaLabel="Abrir menu"
          responsiveMenuBackToRootLabel="Voltar"
          modalMenuLabel="Menu"
          modalAriaLabel="Navegação principal"
          modalCloseLabel="Fechar"
        >
          <NavigationSection>
            {nav.map(([label, href]) => (
              <NavigationLink key={href} href={href}>
                {label}
              </NavigationLink>
            ))}
          </NavigationSection>
        </NavigationBar>
      </AgoraHeader>
    </header>
  );
}
