import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { mapProvisionalSquidexPayload } from "../../src/lib/content/squidex-mapper";

const fixturePath = path.join(
  process.cwd(),
  "tests",
  "fixtures",
  "squidex-pilot.json",
);

const payload = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const content = mapProvisionalSquidexPayload(payload);

assert.equal(content.schemaVersion, "1.0");
assert.equal(content.locale, "pt-PT");
assert.equal(content.themes.length, 1);
assert.deepEqual(content.themes[0].guideIds, ["D99"]);

assert.equal(content.guides.length, 1);
const guide = content.guides[0];
assert.equal(guide.id, "D99");
assert.equal(guide.themeId, "tema-piloto");
assert.deepEqual(
  guide.fichas.map((task) => task.id),
  ["D99-T01", "D99-T02"],
);
assert.deepEqual(guide.fichas[0].steps, [
  "Executar o primeiro passo técnico.",
  "Confirmar o resultado técnico.",
]);
assert.deepEqual(guide.fichas[0].nextRef, {
  type: "task",
  id: "D99-T02",
});
assert.deepEqual(guide.fichas[1].nextRef, {
  type: "overview",
  id: "D99",
});
assert.deepEqual(guide.fichas[1].table, [
  ["Campo", "Valor"],
  ["piloto", "ok"],
]);

console.log("Squidex mapper pilot: OK");
