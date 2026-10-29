const root = "https://ai.pharos.xyz";
const startedAt = new Date().toISOString();
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 30000);
try {
  const page = await fetch(`${root}/`, { signal: controller.signal });
  if (!page.ok) throw new Error(`root HTTP ${page.status}`);
  const html = await page.text();
  const src = html.match(/<script[^>]+src="([^"]+\.js)"/)?.[1];
  if (!src) throw new Error("client asset not found");
  const assetUrl = new URL(src, root).href;
  const asset = await fetch(assetUrl, { signal: controller.signal });
  if (!asset.ok) throw new Error(`asset HTTP ${asset.status}`);
  const js = await asset.text();
  const routeContext = js.match(/Vce=\{.{0,700}?\},Gce=/s)?.[0] ?? null;
  const requestContext = js.match(/uPe="\/api\/v1\/pharos\/chat\/completions".{0,1000}?stream:!0\}/s)?.[0] ?? null;
  const authContext = js.match(/w=!!Xt\(.{0,200}?AUTHENTICATED.{0,300}?Connect your wallet to send a message/s)?.[0] ?? null;
  const output = {
    evidenceType: "CLIENT_TRANSPORT_INSPECTION",
    startedAt,
    completedAt: new Date().toISOString(),
    rootStatus: page.status,
    assetUrl,
    assetStatus: asset.status,
    observed: {
      routeContext,
      requestContext,
      authContext,
    },
    interpretation: "Client implementation evidence only. It does not substitute for Developer Docs MCP documentation evidence."
  };
  console.log(JSON.stringify(output, null, 2));
} finally {
  clearTimeout(timer);
}
