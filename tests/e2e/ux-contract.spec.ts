import { expect, test } from "@playwright/test";

const prefix = "/Guias_dados.gov.pt";
const routes = [
  ["entrada", "/Guias-do-utilizador/"],
  ["tema", "/Guias-do-utilizador/Encontrar-consultar-e-explorar-dados/"],
  ["guia", "/Guias-do-utilizador/Encontrar-consultar-e-explorar-dados/Encontrar-e-consultar-dados/"],
  ["tarefa", "/Guias-do-utilizador/Encontrar-consultar-e-explorar-dados/Encontrar-e-consultar-dados/Aceder-aos-dados/"],
] as const;

const viewports = [
  { name: "mobile", width: 360, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
] as const;

for (const [routeName, route] of routes) {
  for (const viewport of viewports) {
    test(`contrato UX: ${routeName} em ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(`${prefix}${route}`);
      expect(response?.ok()).toBeTruthy();
      await page.waitForLoadState("networkidle");

      await expect(page.locator("main#conteudo")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator('footer[aria-label="Rodapé do portal"]')).toBeVisible();

      const geometry = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth);
    });
  }
}

test("entrada mantém pesquisa funcional", async ({ page }) => {
  await page.goto(`${prefix}/Guias-do-utilizador/`);
  const search = page.getByRole("searchbox", { name: "Pesquisar nos guias" });
  await expect(search).toBeVisible();
  await search.fill("publicar dados");
  await expect(page.getByRole("status")).toContainText(/resultado/);
});

test("tema, guia e tarefa mantêm contexto hierárquico", async ({ page }) => {
  for (const [, route] of routes.slice(1)) {
    await page.goto(`${prefix}${route}`);
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
  }
});
