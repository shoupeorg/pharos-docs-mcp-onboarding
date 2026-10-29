# Ordered onboarding log

All timestamps are retained in the linked JSON. Documentation answers would be accepted only from Developer Docs MCP.

## Step 1 — Discover the Developer Docs MCP capability

- **Goal:** discover the official Docs MCP tools and schemas once.
- **Operation:** inspect the current tool registry, MCP resources, and resource templates.
- **Actual result:** no Developer Docs MCP tool, resource server, or template was registered. A separate `mcp__pharos__` chain toolset was present but was excluded as a documentation source.
- **Outcome:** `ENVIRONMENT_LIMITATION`.
- **Evidence:** `evidence/v1-runtime-registry-audit.json`.

## Step 2 — Submit the onboarding question in the authenticated AI.PHAROS UI

- **Performer:** user.
- **Exact query:**

> Using only Developer Docs MCP sources, provide a new-user onboarding path for ai.pharos.xyz: how to open the site, authenticate, select the Developer Docs agent, confirm the intended Pharos network, and prepare for a first read-only contract query. Cite every supporting document section or URL. If a step is not documented, label it DOCS_NOT_COVERED and do not guess. Include the exact Docs MCP tool calls and returned source references.

- **Visible response:** four narrative progress statements about loading/searching documentation. No final answer, source citation, or tool-call detail appeared.
- **Observed UI outcome:** `This session has been reset.` followed by `Something went wrong. Please try again.`
- **Outcome:** `AI_PHAROS_UI_ERROR`, cause `UNKNOWN`.
- **Important:** the screenshot does not prove an MCP transport failure and does not establish a documentation gap.
- **Evidence:** `evidence/v1-user-performed-onboarding-failure.json` and `evidence/user-performed-onboarding-failure.png`.

## Step 3 — Probe the discovered Docs-agent chat transport without browser credentials

- **Goal:** determine whether the client-observed Docs-agent transport is callable directly without reading or exposing the saved browser token.
- **Exact query:**

> How do I start a Developer Docs MCP session on ai.pharos.xyz? Return only documentation-backed steps and source references.

- **Request:** `POST https://flow.anvita.xyz/api/v1/pharos/chat/completions` using the client-observed body shape and `agentType: PHAROS_DOCS`; no authorization header.
- **Actual result:** HTTP `405`, `text/html; charset=utf-8`, with an HTML error page.
- **Outcome:** `ENVIRONMENT_LIMITATION`. This is not a Developer Docs MCP answer and is not evidence that the documentation lacks the requested information.
- **Evidence:** `evidence/v1-docs-agent-transport-probe.json`.

## Final outcome

The furthest verified step was submission of the intended onboarding question in an authenticated AI.PHAROS Docs-agent session. The response did not complete. The current non-browser runtime has no Developer Docs MCP capability, and the client-observed chat transport did not accept the unauthenticated POST. Therefore:

- successful onboarding: **not established**;
- documentation sources/citations: **none returned**;
- documented read-only exercise: **not obtained or run**;
- distinct supported documentation gaps: **0 of 3**.
