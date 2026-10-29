import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await readFile(resolve(root, "evidence/manifest.json"), "utf8"));

test("manifest is versioned and references existing evidence", async () => {
  assert.equal(manifest.evidenceVersion, "docs-mcp-onboarding/1.0.0");
  assert.ok(manifest.items.length >= 3);
  for (const item of manifest.items) await access(resolve(root, "evidence", item.file));
});

test("UI error is not mislabeled as MCP transport failure", async () => {
  const record = JSON.parse(await readFile(resolve(root, "evidence/v1-user-performed-onboarding-failure.json"), "utf8"));
  assert.equal(record.classification, "AI_PHAROS_UI_ERROR");
  assert.equal(record.cause, "UNKNOWN");
  assert.equal(record.countsAsDocumentationGap, false);
});

test("unsupported gap quota remains honest", () => {
  assert.equal(manifest.gaps.length, 0);
  assert.match(manifest.limitations.join(" "), /0 of 3/i);
});

test("public source contains no Persian prose", async () => {
  const files = ["index.html", "style.css", "app.js"];
  for (const file of files) {
    const text = await readFile(resolve(root, "public", file), "utf8");
    assert.doesNotMatch(text, /[\u0600-\u06FF]/u, file);
  }
});

test("raw evidence and Markdown downloads are linked", async () => {
  const html = await readFile(resolve(root, "public/index.html"), "utf8");
  assert.match(html, /evidence-rows/);
  assert.match(html, /Download report/);
  assert.match(html, /Download gaps/);
});
