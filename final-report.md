# Pharos Developer Docs MCP onboarding feedback

Updated: 2026-10-31 (Asia/Tehran)

## Outcome

This was an honest, partially completed onboarding attempt. One real Docs-agent answer was obtained and preserved, but it did not provide cited, client-specific Docs MCP onboarding guidance. Separate attempts also ended in an AI.PHAROS session reset and an agent-delegation DNS error. No successful read-only exercise was completed.

Only Developer Docs MCP answers are used for onboarding knowledge. Local missing tools and the credential-free HTTP 405 probe are excluded from the required breakdown count.

## Chronological log

### 1. Authenticated onboarding attempt reset

**Exact query**

> Using only Developer Docs MCP sources, provide a new-user onboarding path for ai.pharos.xyz: how to open the site, authenticate, select the Developer Docs agent, confirm the intended Pharos network, and prepare for a first read-only contract query. Cite every supporting document section or URL. If a step is not documented, label it DOCS_NOT_COVERED and do not guess. Include the exact Docs MCP tool calls and returned source references.

**Actual response/error**

The UI displayed four progress statements about loading and searching documentation. It then displayed `This session has been reset.` and `Something went wrong. Please try again.` No final answer, citation, or tool-call result was visible.

**Observed outcome:** the AI.PHAROS session did not deliver the requested onboarding path. This is an `AI_PHAROS_UI_ERROR` with unknown cause, not proof of a Docs MCP endpoint failure.

### 2. Docs-agent answer returned uncited, non-client-specific guidance

**Exact query**

> Where, exactly, does a newcomer enable or select Developer Docs MCP and Pharos Chain MCP in ai.pharos.xyz, and how can the user verify which agent handled the request? Cite the exact UI instructions and source.

**Actual answer — preserved verbatim**
## Developer Docs MCP Connection Information

### ⚠️ Critical Scope Clarification

The **Developer Docs MCP** (`https://docs.pharos.xyz/~gitbook/mcp`) is **not documented** on `docs.pharos.xyz` itself. I know this endpoint exists because it is part of my internal skill configuration, not because there is a documentation page describing it.

**What the docs DO cover:**

- The **Pharos Chain MCP** (`https://mcp.pharos.xyz/mcp`) — fully documented at [Pharos MCP](https://docs.pharos.xyz/tooling-and-infrastructure/mcp)

**What the docs DO NOT cover:**

- The Developer Docs MCP endpoint, connection steps, or configuration

---

### What I Know (Out-of-Band, Not from Docs)

From my skill configuration (not from a docs page):

| Field              | Value                                                           | Source                 |
| :----------------- | :-------------------------------------------------------------- | :--------------------- |
| **Endpoint**       | `https://docs.pharos.xyz/~gitbook/mcp`                          | Skill config           |
| **Transport**      | Streamable HTTP                                                 | Skill config           |
| **Authentication** | None                                                            | Skill config           |
| **Host**           | GitBook (`~gitbook/mcp` route)                                  | Skill config           |
| **Tools**          | `searchDocumentation`, `getPage`, `askQuestion`, `sendFeedback` | Live `tools/list` call |

**Connection configuration** (from skill config, not docs):
```json
{
  "mcpServers": {
    "pharos-docs": {
      "type": "http",
      "url": "https://docs.pharos.xyz/~gitbook/mcp"
    }
  }
}

```

For clients that only support stdio, bridge with `mcp-remote`:
```json
{
  "mcpServers": {
    "pharos-docs": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://docs.pharos.xyz/~gitbook/mcp"]
    }
  }
}

```

---

### Documentation Sources

**For the Pharos Chain MCP (fully documented):**

- [Pharos MCP](https://docs.pharos.xyz/tooling-and-infrastructure/mcp) — endpoint, transport, auth, tools, troubleshooting

**For the Developer Docs MCP:**

- **No documentation page exists** on `docs.pharos.xyz`
- The information above comes from my skill configuration and a live `tools/list` call I made earlier in this session

---

### Recommendation

If you need authoritative documentation for the Developer Docs MCP, it does not exist in the Pharos docs. You have two options:

1. **Use the Pharos Chain MCP** instead — it is fully documented and provides on-chain data access
2. **Contact the Pharos team** for documentation on the Developer Docs MCP endpoint

I cannot provide connection steps or troubleshooting for the Developer Docs MCP from documented sources because none exist.
**Observed outcome:** the answer explicitly relied on internal skill configuration and a prior `tools/list` call, provided no Developer Docs MCP documentation citation, did not explain the requested AI.PHAROS client controls or verification indicator, and recommended Chain MCP even though Chain MCP cannot replace Docs MCP for a documentation-only task.

The answer's statement that no documentation exists is preserved as the agent's response. It is not independently treated as proof that documentation is globally absent.

### 3. Agent delegation failed during DNS resolution

**Exact query:** the full onboarding query from step 1.

**Actual response**

> Delegation to Pharos Docs MCP failed with NET_001, “Network connection failed”, detail: getaddrinfo ENOTFOUND flow.anvita.xyz.

**Observed outcome:** AI.PHAROS could not delegate the request to Pharos Docs MCP. This is an `AGENT_DELEGATION_DNS_FAILURE`, not a Docs MCP endpoint failure or documentation-content gap.

## Three observed issues and proposed fixes

### Issue 1 — Missing or confusing Docs MCP setup answer

The Docs-agent response supplied out-of-band connection configuration, omitted documentation citations and AI.PHAROS-specific control instructions, and recommended Chain MCP instead of Docs MCP.

**Suggested fix:** publish a cited, client-specific Developer Docs MCP setup guide covering the exact selector/control names, connection fields, authentication, visible agent-verification indicator, and the boundary between Docs MCP and Chain MCP. The agent should cite that guide and should not present Chain MCP as a replacement for documentation retrieval.

**Classification:** observed answer-quality/documentation-coverage breakdown. It does not independently prove that documentation does not exist.

### Issue 2 — AI.PHAROS session reset

The authenticated UI discarded the incomplete run before returning a final answer, citations, or tool-call evidence.

**Suggested fix:** preserve the partial run and show a structured terminal record containing the failed layer, request ID, completed tool calls, returned citations, and a safe recovery action before resetting.

**Classification:** AI.PHAROS UI failure with unknown cause.

### Issue 3 — Docs-agent delegation DNS failure

The delegation path could not resolve `flow.anvita.xyz` and returned `NET_001`.

**Suggested fix:** restore hostname resolution and document a direct Developer Docs MCP fallback that does not depend on the AI.PHAROS delegation route.

**Classification:** agent-delegation DNS failure.

## Relationship between issues 2 and 3

The session reset is a generic UI symptom; the DNS failure is a specific delegation-layer error. They may describe the same underlying incident. The task does not require proof of independent root causes, but this possible overlap is disclosed and neither event is misrepresented as a Docs MCP endpoint failure.

## Excluded observations

- Developer Docs MCP being absent from the local Codex inventory is a local runtime limitation and is not counted as an onboarding breakdown.
- The credential-free HTTP 405 probe targeted a client-observed chat route. It is not an actual Docs MCP answer and is not counted.

## Requirement coverage

| Requirement | Status |
|---|---|
| Chronological log with exact queries and returned answer/errors | Met for the preserved attempts |
| Three concrete observed issues tied to queries/attempts | Met, with possible reset/DNS overlap disclosed |
| Specific proposed fix for each issue | Met |
| Verbatim Docs-agent answer | Met |
| Cited, client-specific Docs MCP onboarding instructions | Missing |
| Successful documented read-only exercise | Missing |
| Fully completed onboarding | Not met |

## What actually worked

- The Docs agent returned one substantive answer.
- That answer disclosed an endpoint, transport, authentication claim, tool names, and two configuration examples from internal skill configuration and a prior `tools/list` call.
- The exact answer, session-reset evidence, DNS-delegation evidence, query log, and proposed fixes were preserved in sanitized local artifacts.
- The static feedback report and evidence viewer were previously built; recorded checks were 5/5 tests and a passing evidence build.

## What remained blocked

- No cited, AI.PHAROS-client-specific Developer Docs MCP setup guide was returned.
- No authoritative client control names or agent-verification indicator were supplied.
- The session reset and DNS failure prevented reliable completion of other attempts and may be related.
- No documentation-backed read-only onboarding exercise was obtained or run.
- Publication is separate from this report update and must use the existing GitHub authentication; no deployment, database, payment, or blockchain transaction was performed.