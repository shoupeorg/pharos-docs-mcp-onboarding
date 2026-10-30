# Pharos Developer Docs MCP onboarding feedback

Updated: 2026-10-30 (Asia/Tehran)

## Scope and source policy

Only Developer Docs MCP answers are acceptable sources for onboarding knowledge. AI.PHAROS UI observations and local transport/registry observations are recorded separately and are not documentation answers. No web, community, Chain MCP, or external documentation filled a gap.

## Chronological evidence log

| # | Objective | Exact query or operation | Actual answer or error | Sources | Attempted step and outcome |
|---|---|---|---|---|---|
| 1 | Discover the required documentation capability | `Inspect the current tool and resource registry for Developer Docs MCP.` | No Developer Docs MCP tool, resource server, or resource template was registered. Chain-only `mcp__pharos__` tools were excluded. | None | Direct execution could not start: `ENVIRONMENT_LIMITATION`, not a Docs answer. |
| 2 | Obtain a newcomer onboarding path | `Using only Developer Docs MCP sources, provide a new-user onboarding path for ai.pharos.xyz: how to open the site, authenticate, select the Developer Docs agent, confirm the intended Pharos network, and prepare for a first read-only contract query. Cite every supporting document section or URL. If a step is not documented, label it DOCS_NOT_COVERED and do not guess. Include the exact Docs MCP tool calls and returned source references.` | Four progress statements about loading/searching docs, then `This session has been reset.` and `Something went wrong. Please try again.` No final answer or tool result was visible. | None visible | User-performed authenticated UI attempt: `AI_PHAROS_UI_ERROR`, cause `UNKNOWN`. This does not prove Docs MCP server failure. |
| 3 | Test the client-observed Docs-agent route without browser credentials | `How do I start a Developer Docs MCP session on ai.pharos.xyz? Return only documentation-backed steps and source references.` | HTTP 405, `text/html; charset=utf-8`, HTML error page. | None | Credential-free POST to the client-observed `PHAROS_DOCS` chat route was rejected: `ENVIRONMENT_LIMITATION`, not a Docs MCP response. |
| 4 | Check whether the current runtime can run missing targeted queries | `Inspect the current registered tool inventory for Developer Docs MCP or Pharos Docs MCP.` | No matching tool was registered on 2026-10-30. | None | No content query was sent because no authorized Docs MCP transport exists in this runtime. |

## Observed onboarding and investigation breakdowns

These are separate observations, not three confirmed documentation-content gaps. The DNS failure is more specific than the earlier session-reset symptom, but the evidence does not establish independent root causes.

### 1. Developer Docs MCP is not discoverable in the current runtime

- Evidence operation: `Inspect the current tool and resource registry for Developer Docs MCP.`
- Actual result: zero Docs MCP tools, resources, or templates.
- Impact: the documentation-backed path cannot begin from this runtime.
- Proposed fix: document one canonical server identifier, transport, authentication sequence, tool names, and capability-check response; expose the server under that identifier.

### 2. The authenticated onboarding attempt ended without a final answer or provenance

- Evidence query: the complete onboarding query in chronological step 2.
- Actual result: incomplete progress narration, session reset, generic error, no citations or tool-call details.
- Impact: the user cannot tell whether retrieval ran, which layer failed, or which steps are supported.
- Proposed fix: retain the partial run and show a terminal record with failed layer (`UI`, routing, or Docs MCP), request ID, recovery guidance, completed calls, and returned citations before resetting.

### 3. The client-observed route provides no usable unauthenticated diagnostic

- Evidence query: `How do I start a Developer Docs MCP session on ai.pharos.xyz? Return only documentation-backed steps and source references.`
- Actual result: HTTP 405 HTML.
- Impact: the response does not identify the supported method, authentication contract, MCP endpoint, or recovery action.
- Proposed fix: publish the supported Docs MCP endpoint separately from the UI chat route. Unsupported requests should return structured JSON with allowed method, authentication requirement, protocol version, and documentation reference.

### 4. Agent delegation DNS failure

- Exact query: `Using only Developer Docs MCP sources, provide a new-user onboarding path for ai.pharos.xyz: how to open the site, authenticate, select the Developer Docs agent, confirm the intended Pharos network, and prepare for a first read-only contract query. Cite every supporting document section or URL. If a step is not documented, label it DOCS_NOT_COVERED and do not guess. Include the exact Docs MCP tool calls and returned source references.`
- Actual response: `Delegation to Pharos Docs MCP failed with NET_001, “Network connection failed”, detail: getaddrinfo ENOTFOUND flow.anvita.xyz.`
- Blocked step: AI.PHAROS could not delegate the onboarding question to Pharos Docs MCP.
- Proposed fix: restore hostname resolution for `flow.anvita.xyz` and provide a documented direct Docs MCP fallback.
- Classification: `AGENT_DELEGATION_DNS_FAILURE`, not a Docs MCP endpoint failure and not a documentation-content gap.
- Reassessment: this is distinct evidence from the generic session reset, but it may be the underlying cause of that reset. Without correlated request IDs or traces, it does not establish another independent root cause and does not complete the three-breakdown requirement.
## Documentation-gap status

- Supported documentation-content gaps: **0 of 3**.
- No complete Developer Docs MCP answer, refusal, contradiction, or cited source was returned.
- The observations above are onboarding/runtime breakdowns. Repeated UI retries were not counted separately.

## Exact minimal manual query set

Submit these in one working Developer Docs MCP session and preserve full answers, tool calls, citations, and timestamps:

1. `Using only Developer Docs MCP sources, give a complete newcomer path for ai.pharos.xyz: prerequisites, authentication, selecting Developer Docs MCP and Pharos Chain MCP, confirming the network, one read-only exercise, expected output, and recovery steps. Cite each material step with the returned source reference. Mark undocumented steps DOCS_NOT_COVERED.`
2. `What exact authentication or wallet prerequisite is required before a newcomer can send a Developer Docs MCP question on ai.pharos.xyz? Cite the exact source section and distinguish UI behavior from documentation.`
3. `Focused follow-up: Does the official documentation explicitly state whether connecting a wallet, signing a login message, or holding funds is required for Docs-only read access? Quote the exact supporting text or return DOCS_NOT_COVERED.`
4. `Where, exactly, does a newcomer enable or select Developer Docs MCP and Pharos Chain MCP in ai.pharos.xyz, and how can the user verify which agent handled the request? Cite the exact UI instructions and source.`
5. `Focused follow-up: If the documentation has no control names or verification indicator for the selected agent, return DOCS_NOT_COVERED and identify the missing UI detail without guessing.`
6. `Give one officially documented, read-only first exercise for ai.pharos.xyz, including exact request text, intended network, expected output fields, and a no-transaction safety statement. Cite every material operation.`
7. `Focused follow-up: What official recovery steps should a newcomer follow when the session resets or shows "Something went wrong. Please try again"? Cite the exact troubleshooting source or return DOCS_NOT_COVERED.`

## What was genuinely built or run

- Built: an English feedback report, ordered evidence log, sanitized evidence manifest, and downloadable Markdown artifacts.
- Run: local MCP registry audit, user-performed authenticated AI.PHAROS attempts (including one explicit delegation DNS failure), and one bounded credential-free transport probe.
- Recorded verification: 5/5 tests passed and the production evidence build passed.
- Still blocked: a successful Docs MCP answer, three source-supported documentation gaps, cited onboarding guidance, and a documented read-only exercise.
- No wallet, secret, payment, transaction, database, or blockchain operation was used.

## Requirement coverage

| Requirement | Status |
|---|---|
| Chronological query/answer/error log | Met |
| Separate UI/delegation failures from Docs MCP responses | Met |
| Distinct breakdown evidence with proposed fixes | Partial: UI reset and delegation DNS error are recorded, but independent root causes are not established |
| Three Docs-MCP-supported documentation gaps | Blocked: 0/3 |
| Completed documented onboarding exercise | Blocked |
| Sanitized evidence | Met locally; publication remains to be verified |