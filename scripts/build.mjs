import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = resolve(root, "evidence", "manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
if (manifest.evidenceVersion !== "docs-mcp-onboarding/1.0.0") {
  throw new Error("Unexpected evidence version");
}
await mkdir(resolve(root, "public", "evidence"), { recursive: true });
await cp(resolve(root, "evidence"), resolve(root, "public", "evidence"), {
  recursive: true,
  force: true,
});
for (const file of ["README.md", "onboarding-log.md", "gaps.md"]) {
  await cp(resolve(root, file), resolve(root, "public", file), { force: true });
}
await writeFile(resolve(root, "public", "build-meta.json"), JSON.stringify({
  builtAt: new Date().toISOString(),
  evidenceVersion: manifest.evidenceVersion,
  itemCount: manifest.items.length,
}, null, 2));
console.log(`Built ${manifest.items.length} versioned evidence items.`);
