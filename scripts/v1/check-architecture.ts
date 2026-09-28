import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcRoot = path.join(root, "src");
const agoraBoundary = path.join(srcRoot, "components", "agora") + path.sep;
const rootLayout = path.join(srcRoot, "app", "layout.tsx");
const globalsCss = path.join(srcRoot, "app", "globals.css");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const errors: string[] = [];

function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(ts|tsx)$/.test(entry.name) ? [full] : [];
  });
}

for (const file of walk(srcRoot)) {
  const source = fs.readFileSync(file, "utf8");
  if (!source.includes("@ama-pt/agora-design-system") || file.startsWith(agoraBoundary)) continue;
  errors.push(`${path.relative(root, file)} importa componentes Ágora fora da fronteira src/components/agora`);
}

const layoutSource = fs.readFileSync(rootLayout, "utf8");
if (!layoutSource.includes('import "./globals.css";')) {
  errors.push("src/app/layout.tsx não carrega src/app/globals.css");
}
const cssSource = fs.readFileSync(globalsCss, "utf8");
const cssImports = [
  '@import "@ama-pt/agora-design-system/theme.css";',
  '@import "tailwindcss/preflight";',
  '@import "@ama-pt/agora-design-system/index.css";',
  '@import "tailwindcss/utilities";',
];
let previous = -1;
for (const cssImport of cssImports) {
  const position = cssSource.indexOf(cssImport);
  if (position < 0) errors.push(`src/app/globals.css não contém ${cssImport}`);
  if (position >= 0 && position < previous) errors.push("src/app/globals.css não respeita a ordem theme → preflight → Agora → utilities");
  previous = Math.max(previous, position);
}

if (fs.existsSync(path.join(root, "tailwind.config.ts"))) {
  errors.push("tailwind.config.ts legacy ainda existe após migração Tailwind 4 CSS-first");
}

const postcssSource = fs.readFileSync(path.join(root, "postcss.config.mjs"), "utf8");
if (!postcssSource.includes('"@tailwindcss/postcss"')) {
  errors.push("postcss.config.mjs não usa @tailwindcss/postcss");
}
if (postcssSource.includes("autoprefixer") || /tailwindcss\s*:/.test(postcssSource)) {
  errors.push("postcss.config.mjs ainda contém configuração Tailwind 3/autoprefixer");
}

if (packageJson.dependencies?.["@ama-pt/agora-design-system"] !== "4.0.1") {
  errors.push("@ama-pt/agora-design-system deve estar fixado em 4.0.1");
}
if (packageJson.devDependencies?.tailwindcss !== "4.3.3") errors.push("tailwindcss deve estar fixado em 4.3.3");
if (packageJson.devDependencies?.["@tailwindcss/postcss"] !== "4.3.3") {
  errors.push("@tailwindcss/postcss deve estar fixado em 4.3.3");
}
const requiredSingleSourceConsumers = [
  "src/lib/content/repository.ts",
  "src/lib/content/search.ts",
  "scripts/v1/build-derived.ts",
  "scripts/v1/build-pdfs.sh",
];
for (const relative of requiredSingleSourceConsumers) {
  if (!fs.existsSync(path.join(root, relative))) errors.push(`${relative} em falta`);
}

const configuredUiConsumers = [
  "src/app/Guias-do-utilizador/page.tsx",
  "src/app/Guias-do-utilizador/[...segments]/page.tsx",
];
for (const relative of configuredUiConsumers) {
  const source = fs.readFileSync(path.join(root, relative), "utf8");
  if (!source.includes("loadConfiguredContent")) {
    errors.push(`${relative} não usa a fronteira configurada loadConfiguredContent()`);
  }
  if (source.includes("loadContent")) errors.push(`${relative} regressou ao acesso directo loadContent()`);
}

if (errors.length) {
  console.error(`Arquitectura v1 inválida: ${errors.length} problema(s).`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  "Arquitectura v1 válida: Ágora 4 + Tailwind 4 CSS-first, componentes confinados aos wrappers e consumidores single-source preservados.",
);
