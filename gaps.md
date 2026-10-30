# Documentation-gap investigation

## Supported gap count: 0

The saved evidence does not support a `DOCS_CONTENT_GAP`, `DOCS_AMBIGUITY`, or `DOCS_CONTRADICTION` claim. The UI error has unknown cause, and the direct transport probe did not produce a documentation answer. Counting either as three documentation gaps would be misleading.

## Confirmed non-documentation blockers

1. **ENVIRONMENT_LIMITATION** — no Developer Docs MCP tool or resource is registered in the current runtime.
2. **AI_PHAROS_UI_ERROR (UNKNOWN cause)** — the user-performed authenticated UI attempt reset and ended with a generic error.
3. **ENVIRONMENT_LIMITATION** — the discovered Docs-agent chat transport returned HTTP 405 HTML to a credential-free POST. It is not established as a public Docs MCP endpoint.

## Minimum manual query set

Submit these in a working **Developer Docs MCP** session. Preserve each complete answer, tool call, source reference, and timestamp. Do not count a gap unless its primary query and focused follow-up both support it.

### Journey query

1. `Using only Developer Docs MCP sources, give a complete newcomer path for ai.pharos.xyz: prerequisites, authentication, selecting Developer Docs MCP and Pharos Chain MCP, confirming the network, one read-only exercise, expected output, and recovery steps. Cite each material step with the returned source reference. Mark undocumented steps DOCS_NOT_COVERED.`

### Gap candidate A — authentication prerequisite

2. `What exact authentication or wallet prerequisite is required before a newcomer can send a Developer Docs MCP question on ai.pharos.xyz? Cite the exact source section and distinguish UI behavior from documentation.`
3. `Focused follow-up: Does the official documentation explicitly state whether connecting a wallet, signing a login message, or holding funds is required for Docs-only read access? Quote the exact supporting text or return DOCS_NOT_COVERED.`

### Gap candidate B — selecting and verifying tools

4. `Where, exactly, does a newcomer enable or select Developer Docs MCP and Pharos Chain MCP in ai.pharos.xyz, and how can the user verify which agent handled the request? Cite the exact UI instructions and source.`
5. `Focused follow-up: If the documentation has no control names or verification indicator for the selected agent, return DOCS_NOT_COVERED and identify the missing UI detail without guessing.`

### Gap candidate C — recovery and first read-only exercise

6. `Give one officially documented, read-only first exercise for ai.pharos.xyz, including exact request text, intended network, expected output fields, and a no-transaction safety statement. Cite every material operation.`
7. `Focused follow-up: What official recovery steps should a newcomer follow when the session resets or shows "Something went wrong. Please try again"? Cite the exact troubleshooting source or return DOCS_NOT_COVERED.`

## Proposed fixes (not official answers)

These are templates to use only if the corresponding manual query establishes a real gap.

### PROPOSED — authentication prerequisite

> Before sending a Docs question, connect an existing supported wallet and complete the login challenge. Docs-only onboarding does not require funding or a transaction. The send control becomes available after authentication. [Replace with verified control names and source-backed requirements.]

### PROPOSED — tool selection and verification

> Open the documented agent selector, choose **Pharos Docs MCP** for documentation questions, and verify the active agent label beside the session. Choose **Pharos MCP** only for the read-only chain execution step. [Replace with verified UI labels and visible confirmation.]

### PROPOSED — recovery and read-only exercise

> If the session resets, preserve the error, start one new Docs session, and submit the same request once. For the first exercise, request chain ID and latest block only; expect named fields and no transaction prompt. [Replace with source-backed recovery steps and tool names.]

## Added user-performed delegation evidence

- Exact response: `Delegation to Pharos Docs MCP failed with NET_001, “Network connection failed”, detail: getaddrinfo ENOTFOUND flow.anvita.xyz.`
- Classification: `AGENT_DELEGATION_DNS_FAILURE`.
- This is not a Docs MCP endpoint failure and not a documentation-content gap.
- It is observationally distinct from the earlier generic session reset, but an independent root cause is not established; the DNS error could be the hidden cause of that reset.
- Proposed fix: restore hostname resolution and document a direct Developer Docs MCP fallback.
- The three-gap/breakdown requirement therefore remains unmet.