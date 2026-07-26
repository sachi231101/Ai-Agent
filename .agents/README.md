# Vibe Agent — Engineering Knowledge Base (`.agents`)

This directory is the **internal knowledge book** for AI coding assistants (Cursor, Claude Code, Codex, etc.) working on the Vibe Agent platform.

---

## Start Here

| # | File | What you learn |
|---|------|----------------|
| 1 | [AGENTS.md](./AGENTS.md) | **Master manual** — what the app is, core pipeline, routes, coding rules |
| 2 | [PLATFORM.md](./PLATFORM.md) | Product vision, user personas, domain vocabulary |
| 3 | [ARCHITECTURE.md](./ARCHITECTURE.md) | System topology, request flows, integration points |
| 4 | [DEVELOPMENT.md](./DEVELOPMENT.md) | Local dev setup, env vars, git workflow |

---

## Folder Guide

Each folder has a **different purpose**. Files inside are topic-specific — not duplicates.

```
.agents/
├── AGENTS.md          ← READ FIRST (master knowledge book)
├── PLATFORM.md        ← Product & domain
├── ARCHITECTURE.md    ← System design
├── DEVELOPMENT.md     ← Dev workflow
│
├── core/              ← Engineering standards (logging, security, folder layout)
├── ai/                ← LLM pipeline, prompts, model routing, guardrails
├── workflow/          ← Workflow DAG concepts & execution
├── canvas/            ← Studio visual editor behavior
├── backend/           ← Express, Prisma, Redis, auth, API design
├── frontend/          ← React, Vite, Zustand, routing, UI patterns
├── nodes/             ← Workflow node types (triggers, actions, logic)
├── integrations/      ← Third-party connectors (Slack, GitHub, MCP…)
├── marketplace/       ← Template marketplace rules
├── agents/            ← AI assistant role playbooks (architect, debugger…)
├── prompts/           ← System prompt templates per role
├── reference/         ← Pattern catalogs & troubleshooting
├── docs/              ← Developer guides, API notes, getting started
├── examples/          ← Sample agent definitions (CRM, support, sales…)
├── schemas/           ← JSON schemas (agent, workflow, node, tool…)
└── templates/         ← Reusable doc & config templates
```

---

## Quick Lookup by Task

| I need to… | Read |
|------------|------|
| Understand the app | `AGENTS.md` → `PLATFORM.md` |
| Fix Studio chat / pipeline | `ai/ai-overview.md`, `agents/planner/AGENT.md` |
| Add a backend endpoint | `backend/api-design.md`, `backend/nodejs.md` |
| Change Prisma models | `backend/prisma.md`, `core/folder-structure.md` |
| Build UI in Studio | `frontend/react.md`, `agents/ui-designer/AGENT.md` |
| Add an integration | `integrations/integration-system.md` |
| Debug pipeline errors | `agents/debugger/AGENT.md`, `reference/troubleshooting.md` |
| Write new docs | `agents/documentation/AGENT.md`, `templates/documentation-template.md` |

---

## Important: Docs vs Code Reality

Some docs describe **target architecture** (multi-tenant NestJS, BullMQ, React Flow canvas everywhere). The **current codebase** uses:

- **Express 5** backend
- **Bull** (not BullMQ) in package.json
- **Conversation pipeline** in `backend/src/services/` as the most complete AI flow
- **Studio** as chat-based builder (Review/Test/Deploy canvases exist; full React Flow DAG editor may be partial)

When docs and code disagree, **verify the code** and prefer updating docs to match reality.

---

## Schemas & Examples

- JSON schemas: `schemas/` (agent, workflow, node, edge, tool, credential, prompt)
- Example agents: `examples/` (email-agent, crm-agent, support-agent, etc.)
