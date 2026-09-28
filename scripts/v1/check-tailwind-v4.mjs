import fs from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";
import tailwindPostcss from "@tailwindcss/postcss";

const root = process.cwd();
const inputPath = path.join(root, "src", "app", "globals.css");
const input = await fs.readFile(inputPath, "utf8");
const result = await postcss([tailwindPostcss()]).process(input, { from: inputPath });

const expectations = [
  ["grid", /\.grid\s*\{/],
  ["md:grid-cols-2", /\.md\\:grid-cols-2/],
  ["lg:px-0", /\.lg\\:px-0/],
  ["text-3xl-bold", /\.text-3xl-bold/],
  ["container", /\.container/],
];

const missing = expectations.filter(([, pattern]) => !pattern.test(result.css)).map(([name]) => name);
if (missing.length) {
  console.error(`Tailwind v4 incompleto; utilities ausentes: ${missing.join(", ")}`);
  process.exit(1);
}
console.log(`Tailwind v4 válido: ${expectations.length}/${expectations.length} utilities críticas presentes.`);
