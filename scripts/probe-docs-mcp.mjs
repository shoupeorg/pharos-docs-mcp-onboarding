const endpoint = process.argv[2] ?? "https://docs.pharosnetwork.xyz/mcp";
const method = process.argv[3] ?? "POST";
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 15000);
const startedAt = new Date().toISOString();
try {
  const response = await fetch(endpoint, {
    method,
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
    },
    body: method === "POST" ? JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "pharos-docs-mcp-onboarding", version: "0.1.0" },
      },
    }) : undefined,
    redirect: "manual",
    signal: controller.signal,
  });
  const text = await response.text();
  console.log(JSON.stringify({
    endpoint,
    method,
    startedAt,
    completedAt: new Date().toISOString(),
    status: response.status,
    contentType: response.headers.get("content-type"),
    location: response.headers.get("location"),
    mcpSessionId: response.headers.get("mcp-session-id") ?? null,
    body: text.slice(0, 12000),
  }, null, 2));
} catch (error) {
  console.error(JSON.stringify({ endpoint, startedAt, completedAt: new Date().toISOString(), error: String(error), cause: error.cause ? String(error.cause) : null }, null, 2));
  process.exitCode = 1;
} finally {
  clearTimeout(timer);
}
