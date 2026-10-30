# Pharos Developer Docs MCP onboarding feedback

Updated: 2026-10-30 (Asia/Tehran)

## Scope and evidence policy

Only Developer Docs MCP answers may supply onboarding knowledge. AI.PHAROS UI and delegation failures are recorded separately. Local tool availability and the credential-free HTTP 405 probe are not counted as onboarding breakdowns. No web, external documentation, Chain MCP, or community material was used to fill a gap.

## Chronological log

### 1. Authenticated onboarding attempt ended with a session reset

- **Objective:** obtain a complete, cited newcomer path.
- **Exact query:**

> Using only Developer Docs MCP sources, provide a new-user onboarding path for ai.pharos.xyz: how to open the site, authenticate, select the Developer Docs agent, confirm the intended Pharos network, and prepare for a first read-only contract query. Cite every supporting document section or URL. If a step is not documented, label it DOCS_NOT_COVERED and do not guess. Include the exact Docs MCP tool calls and returned source references.

- **Actual response/error:** the UI showed four progress statements about loading and searching documentation. No final answer, citation, or tool-call result appeared. It then displayed `This session has been reset.` followed by `Something went wrong. Please try again.`
- **Sources returned:** none visible.
- **Attempted step and outcome:** the authenticated AI.PHAROS session did not deliver the requested onboarding path. Classification: `AI_PHAROS_UI_ERROR`, cause `UNKNOWN`; this does not prove a Docs MCP server failure.

### 2. Docs-agent answer supplied uncited, wrong-client setup guidance

- **Objective:** learn how to select and verify Docs MCP versus Chain MCP in the client.
- **Exact query:**

> Where, exactly, does a newcomer enable or select Developer Docs MCP and Pharos Chain MCP in ai.pharos.xyz, and how can the user verify which agent handled the request? Cite the exact UI instructions and source.

- **Actual answer record supplied by the user:**

> It supplied internal connection configuration without documentation citations and recommended Chain MCP instead of Docs MCP.

- **Evidence precision:** the complete verbatim answer body was not preserved in the saved evidence. The sentence above is the exact user-supplied record; no internal configuration values are reconstructed or invented.
- **Sources returned:** none.
- **Attempted step and outcome:** the answer did not provide a cited, client-specific Docs MCP setup path and redirected the user toward Chain MCP, which cannot satisfy the documentation-only onboarding task.
- **Classification:** `ANSWER_QUALITY_BREAKDOWN`. This is not proof that the underlying documentation does not exist.

### 3. Delegation to the Docs agent failed during DNS resolution

- **Objective:** delegate the same full onboarding query from step 1 to Pharos Docs MCP.
- **Exact query:** the complete onboarding query quoted in step 1.
- **Actual response:**

> Delegation to Pharos Docs MCP failed with NET_001, “Network connection failed”, detail: getaddrinfo ENOTFOUND flow.anvita.xyz.

- **Sources returned:** none.
- **Attempted step and outcome:** AI.PHAROS could not delegate the request to the Docs agent, so no documentation retrieval completed.
- **Classification:** `AGENT_DELEGATION_DNS_FAILURE`; not a Docs MCP endpoint failure and not a documentation-content gap.

## Supported findings and proposed fixes

### Finding 1 — Answer-quality breakdown

The Docs-agent answer supplied internal connection configuration without citations and recommended Chain MCP instead of Docs MCP. This is a missing/confusing answer-quality problem, but it does not prove the relevant documentation is absent.

**Suggested fix:** publish a cited, client-specific Docs MCP setup guide covering the exact selector/control names, connection fields, authentication requirements, visible agent-verification indicator, and the boundary between Docs MCP and Chain MCP. The answer should cite that guide and keep Chain MCP as an optional execution step, not a substitute for documentation retrieval.

### Finding 2 — AI.PHAROS session-reset failure

The authenticated UI produced only progress narration and then reset before returning a final answer, citations, or tool evidence.

**Suggested fix:** retain the partial run and show a structured terminal record containing the failed layer (`UI`, delegation, or Docs MCP), request ID, completed tool calls, returned citations, and a safe recovery action before resetting the session.

### Finding 3 — Agent-delegation DNS failure

AI.PHAROS reported `NET_001` with `getaddrinfo ENOTFOUND flow.anvita.xyz` before the Docs-agent query completed.

**Suggested fix:** restore hostname resolution for `flow.anvita.xyz` and provide a documented direct Developer Docs MCP fallback that does not depend on the AI.PHAROS delegation route.

## Relationship between findings 2 and 3

The session reset is a generic UI symptom with unknown cause. The DNS result is a specific delegation-layer error. They are distinct observations, but they may describe the same underlying incident. Without a shared request ID, timestamp, or trace, independent root causes are not established. They are therefore not automatically counted as two independent breakdowns.

## Excluded from the required breakdown count

- Absence of Developer Docs MCP from the local Codex tool inventory is a local runtime limitation, not evidence about AI.PHAROS onboarding or documentation quality.
- The HTTP 405 response came from a credential-free probe of a client-observed chat route. It is not an actual Docs MCP answer or proof of a Docs MCP endpoint defect.

## Requirement assessment

| Requirement | Status |
|---|---|
| Exact chronological queries and observed answers/errors | Met for the preserved evidence |
| Answer-quality breakdown tied to an actual query | Met |
| Separate UI/delegation failures from Docs MCP content | Met |
| Three independent gaps or breakdowns | Not yet established; reset and DNS evidence may overlap |
| Three confirmed documentation-content gaps | Not established |
| Cited, successful Docs MCP onboarding answer | Missing |
| Completed documented read-only exercise | Missing |

## What was genuinely built or run

- Built: an English onboarding feedback report, ordered log, sanitized evidence records, and public-ready Markdown artifacts.
- Run or observed: authenticated AI.PHAROS onboarding attempts, one actual Docs-agent answer-quality failure, one session reset, one explicit delegation DNS failure, a local registry audit, and a bounded credential-free transport probe.
- Previously recorded verification: 5/5 report tests and the static evidence build passed.
- Not completed: a cited Docs MCP onboarding path, three demonstrably independent gaps/breakdowns, or the documented first read-only exercise.
- No wallet, secret, payment, transaction, deployment, or blockchain operation was performed for this update.