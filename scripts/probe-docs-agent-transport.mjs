import { randomUUID } from "node:crypto";

const endpoint = "https://flow.anvita.xyz/api/v1/pharos/chat/completions";
const query = process.argv.slice(2).join(" ") || "How do I start a Developer Docs MCP session on ai.pharos.xyz? Return only documentation-backed steps and source references.";
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 15000);
const startedAt = new Date().toISOString();

const serializeError = error => {
  if (!error) return null;
  const value = {
    name: error.name ?? null,
    message: error.message ?? String(error),
    code: error.code ?? null
  };
  if (Array.isArray(error.errors)) value.errors = error.errors.map(serializeError);
  if (error.cause) value.cause = serializeError(error.cause);
  return value;
};

try {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "text/event-stream"
    },
    body: JSON.stringify({
      spaceType: "pharos",
      operationType: "chat",
      agentType: "PHAROS_DOCS",
      sessionId: `probe-${randomUUID()}`,
      message: query,
      requestId: randomUUID(),
      stream: true
    }),
    redirect: "manual",
    signal: controller.signal
  });
  const body = await response.text();
  console.log(JSON.stringify({
    evidenceVersion: "docs-mcp-onboarding/1.0.0",
    evidenceType: "DOCS_AGENT_TRANSPORT_PROBE",
    endpoint,
    method: "POST",
    authenticated: false,
    startedAt,
    completedAt: new Date().toISOString(),
    query,
    requestSchema: {
      spaceType: "pharos",
      operationType: "chat",
      agentType: "PHAROS_DOCS",
      sessionId: "<fresh random probe id>",
      message: "<exact query>",
      requestId: "<fresh random UUID>",
      stream: true
    },
    status: response.status,
    contentType: response.headers.get("content-type"),
    location: response.headers.get("location"),
    bodyFirst300: body.slice(0, 300),
    interpretation: "This is the AI.PHAROS Docs-agent chat transport observed in the client. It is not evidence of a public Developer Docs MCP endpoint or a documentation answer. No browser credential was read or sent."
  }, null, 2));
} catch (error) {
  console.log(JSON.stringify({
    evidenceVersion: "docs-mcp-onboarding/1.0.0",
    evidenceType: "DOCS_AGENT_TRANSPORT_PROBE",
    endpoint,
    method: "POST",
    authenticated: false,
    startedAt,
    completedAt: new Date().toISOString(),
    query,
    error: serializeError(error)
  }, null, 2));
  process.exitCode = 1;
} finally {
  clearTimeout(timer);
}
