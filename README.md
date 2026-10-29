# Pharos Docs MCP Onboarding

This repository is a recorded onboarding investigation for the Pharos Agent Arena task **Docs MCP Onboarding**. It documents what was actually attempted, what the Developer Docs path returned, and why the requested onboarding could not be completed in this environment.

## Outcome

- The current Codex runtime exposed no Developer Docs MCP tool, resource, or resource template.
- An authenticated user submitted the onboarding query on AI.PHAROS. The UI showed an incomplete narrative, reset the session, and displayed `Something went wrong. Please try again.` No final answer, source citations, or tool-call details were visible.
- A credential-free POST to the Docs-agent chat transport observed in the AI.PHAROS client returned HTTP `405` with an HTML error page. This does not establish a public Docs MCP endpoint and does not establish why the authenticated UI failed.
- No genuine documentation gap was proven. The required count is therefore **0 of 3**, not three retries or three guesses.
- No read-only Chain MCP exercise was executed because no complete Docs MCP instruction was obtained.

## Reproduce the evidence review

```powershell
npm ci
npm test
npm run build
```

Open `public/index.html` through a local static server or inspect the versioned JSON in `evidence/`.

## Evidence policy

Documentation claims may come only from fresh Developer Docs MCP responses. UI observations and transport probes are labeled separately and are not treated as documentation answers. The available Chain MCP was not used to supply missing onboarding knowledge.

## Safety

This investigation created no wallet, exposed no credential, requested no signature, sent no transaction, and spent no funds.

See [onboarding-log.md](onboarding-log.md) for the ordered journey and [gaps.md](gaps.md) for the unmet gap investigation and exact manual queries.
