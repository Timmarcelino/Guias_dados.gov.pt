import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcRoot = path.join(root, "src");
const agoraBoundary = path.join(srcRoot, "components", "agora") + path.sep;
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
  if (source.includes('@ama-pt/agora-design-system') && !file.startsWith(agoraBoundary)) {
    errors.push(`${path.relative(root, file)} importa Ágora fora da fronteira src/components/agora`);
  }
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

if (errors.length) {
  console.error(`Arquitectura v1 inválida: ${errors.length} problema(s).`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Arquitectura v1 válida: imports Ágora confinados aos wrappers e consumidores single-source presentes.");
