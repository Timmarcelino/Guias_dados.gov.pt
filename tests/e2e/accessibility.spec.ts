import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const prefix = "/Guias_dados.gov.pt";
const routes = [
  ["entrada", "/Guias-do-utilizador/"],
  ["tema", "/Guias-do-utilizador/Encontrar-consultar-e-explorar-dados/"],
  ["guia", "/Guias-do-utilizador/Encontrar-consultar-e-explorar-dados/Encontrar-e-consultar-dados/"],
  ["tarefa com tabela", "/Guias-do-utilizador/Encontrar-consultar-e-explorar-dados/Encontrar-e-consultar-dados/Aceder-aos-dados/"],
] as const;
const viewports = [
  { name: "mobile", width: 360, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
] as const;

for (const [routeName, route] of routes) {
  for (const viewport of viewports) {
    test(`axe: ${routeName} em ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`${prefix}${route}`);
      await page.waitForLoadState("networkidle");

      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const blocking = result.violations.filter(
        (violation) => violation.impact === "critical" || violation.impact === "serious",
      );

      expect(
        blocking,
        JSON.stringify(
          blocking.map(({ id, impact, help, nodes }) => ({ id, impact, help, nodes: nodes.length })),
          null,
          2,
        ),
      ).toEqual([]);
    });
  }
}

test("skip link transfere o foco para o conteúdo", async ({ page }) => {
  await page.goto(`${prefix}/Guias-do-utilizador/`);
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Saltar para o conteúdo" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#conteudo")).toBeFocused();
});

test("cartões expõem ligações focáveis e com nome acessível", async ({ page }) => {
  await page.goto(`${prefix}/Guias-do-utilizador/`);
  const cardLink = page.getByRole("link", { name: /^Abrir:/ }).first();
  await expect(cardLink).toBeVisible();
  await cardLink.focus();
  await expect(cardLink).toBeFocused();
  await expect(cardLink).toHaveAttribute("href", /^\/Guias_dados\.gov\.pt\/Guias-do-utilizador\//);
});

test("pesquisa anuncia resultados e expõe ligações navegáveis", async ({ page }) => {
  await page.goto(`${prefix}/Guias-do-utilizador/`);
  const search = page.getByRole("searchbox", { name: "Pesquisar nos guias" });
  await search.fill("publicar dados");
  await expect(page.getByRole("status")).toContainText(/resultado/);
  const firstResult = page.locator('section[aria-labelledby="pesquisa-guias"] ul a').first();
  await expect(firstResult).toBeVisible();
  await firstResult.focus();
  await expect(firstResult).toBeFocused();
});
