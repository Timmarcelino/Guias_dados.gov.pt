import { spawn } from "node:child_process";
import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const root = process.cwd();
const basePath = "Guias_dados.gov.pt";
const siteRoot = path.join(root, ".build", "pages-smoke");
const deployedRoot = path.join(siteRoot, basePath);
const url = `http://127.0.0.1:4173/${basePath}/Guias-do-utilizador/`;

await rm(siteRoot, { recursive: true, force: true });
await mkdir(deployedRoot, { recursive: true });
await cp(path.join(root, "out"), deployedRoot, { recursive: true });

const server = spawn("python", ["-m", "http.server", "4173", "--directory", siteRoot], {
  stdio: "ignore",
});

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Servidor estático não ficou disponível para o smoke test.");
}
async function visibleCount(locator) {
  const count = await locator.count();
  let visible = 0;
  for (let index = 0; index < count; index += 1) {
    if (await locator.nth(index).isVisible()) visible += 1;
  }
  return visible;
}

await waitForServer();
const browser = await chromium.launch({ headless: true });

try {
  const cases = [
    { name: "mobile", width: 375, height: 900, expectedMenu: true, expectedDesktopNav: false },
    { name: "desktop", width: 1440, height: 1000, expectedMenu: false, expectedDesktopNav: true },
  ];

  for (const testCase of cases) {
    const page = await browser.newPage({ viewport: { width: testCase.width, height: testCase.height } });
    await page.goto(url, { waitUntil: "networkidle" });

    const logos = await visibleCount(page.locator('header img[alt="dados.gov.pt"]'));
    const menus = await visibleCount(page.getByText("Menu", { exact: true }));
    const datasets = await visibleCount(page.getByText("Conjuntos de dados", { exact: true }));

    if (logos !== 1) throw new Error(`${testCase.name}: esperado 1 logótipo visível; obtido ${logos}`);
    if (testCase.expectedMenu && menus < 1) throw new Error(`${testCase.name}: menu responsivo não está visível`);
    if (!testCase.expectedMenu && menus > 0) throw new Error(`${testCase.name}: menu responsivo continua visível no desktop`);
    if (testCase.expectedDesktopNav && datasets !== 1) throw new Error(`${testCase.name}: navegação desktop não está visível uma única vez`);
    if (!testCase.expectedDesktopNav && datasets > 0) throw new Error(`${testCase.name}: navegação desktop está visível no mobile`);

    console.log(`Ágora 4 ${testCase.name}: logo=${logos}; menu=${menus}; datasets=${datasets}`);
    await page.close();
  }
} finally {
  await browser.close();
  server.kill();
}

console.log("Smoke responsivo Ágora 4: PASS");
