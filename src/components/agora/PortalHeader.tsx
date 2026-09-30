"use client";

import {
  Header as AgoraHeader,
  Brand,
  Logo,
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
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(2,28,81,0.08)]">
      <div className="border-b border-[#e6e9ef] bg-[#f1f3f7] text-[#18263a]">
        <div className="container mx-auto flex min-h-[52px] items-center justify-between gap-24 px-16 lg:px-0">
          <a className="text-s-regular font-medium no-underline hover:underline" href="https://dados.gov.pt/pt">
            Portal nacional de dados abertos
          </a>
          <div className="flex items-center gap-12 text-s-regular">
            <span className="hidden items-center gap-6 sm:inline-flex" aria-label="Ecossistema ARTE">
              Ecossistema <strong className="text-m-bold lowercase tracking-tight">arte</strong>
            </span>
            <a className="inline-flex min-h-[44px] items-center font-medium no-underline hover:underline" href="https://dados.gov.pt/pt/login" aria-label="Autenticar">
              Autenticar
            </a>
          </div>
        </div>
      </div>
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
