const root = "https://ai.pharos.xyz";
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000);
const htmlResponse = await fetch(`${root}/`, { signal: controller.signal });
if (!htmlResponse.ok) throw new Error(`root HTTP ${htmlResponse.status}`);
const html = await htmlResponse.text();
const asset = html.match(/<script[^>]+src="([^"]+\.js)"/)?.[1];
if (!asset) throw new Error("JavaScript asset not found");
const jsResponse = await fetch(new URL(asset, root), { signal: controller.signal });
if (!jsResponse.ok) throw new Error(`asset HTTP ${jsResponse.status}`);
const source = await jsResponse.text();
const urls = [...new Set(source.match(/https?:[^"'`\\\s)]+/g) ?? [])];
const needles = process.argv.slice(2).length ? process.argv.slice(2) : ["Pharos Docs MCP", "mcp", "chat/completions", "api/"];
const contexts = [];
for (const needle of needles) {
  let from = 0;
  while (contexts.length < 80) {
    const index = source.toLowerCase().indexOf(needle.toLowerCase(), from);
    if (index < 0) break;
    contexts.push({ needle, index, context: source.slice(Math.max(0, index - 240), index + 500) });
    from = index + needle.length;
  }
}
console.log(JSON.stringify({ rootStatus: htmlResponse.status, asset: new URL(asset, root).href, assetStatus: jsResponse.status, length: source.length, urls, contexts }, null, 2));
clearTimeout(timeout);
