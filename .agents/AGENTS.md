# Vibe Agent — AI Operating Manual

> **Read this file first.** It is the master knowledge book for any AI assistant working in this repository.

---

## What This Application Is

**Vibe Agent** (product name in `frontend/src/lib/constants.ts`) is a full-stack **AI Agent Builder Platform**.

Users describe what they want in natural language. The platform runs a multi-step AI pipeline that detects intent, extracts requirements, asks clarifying questions, plans the agent architecture, and produces a deployable **Agent Specification** (JSON). The UI guides them through **Build → Review → Test → Deploy** in the Studio.

This is **not** a generic template repo. The live product code lives in:

| Layer | Path | Stack |
|-------|------|-------|
| Frontend | `frontend/` | React 19, Vite, TypeScript, Tailwind 4, TanStack Query, Zustand, React Router 7 |
| Backend | `backend/` | Express 5, TypeScript, Prisma 7, PostgreSQL, Socket.IO, Bull, Redis |
| AI Knowledge | `.agents/` | Engineering docs for AI coding assistants (this folder) |

---

## Core User Journey

```
Landing (/) → Auth (/login) → Dashboard (/dashboard)
    → User enters prompt → Studio (/studio)
        → Build: conversational AI pipeline (StudioCanvas)
        → Review: ReviewCanvas
        → Test: TestCanvas
        → Deploy: DeployCanvas
```

**Post-auth default route:** `/dashboard` (not `/studio`).

---

## The Heart of the Backend: Conversation Pipeline

File: `backend/src/services/conversation/conversation.service.ts`

When a user sends a message in Studio, the backend runs this pipeline:

| Step | Service | Stage |
|------|---------|-------|
| 1–2 | `intent.service` | Intent & business domain detection |
| 3–4 | `requirement.service` | Requirement extraction |
| 5 | `clarification.service` | Missing-info questions → `CLARIFICATION` stage |
| 6 | `conflict.service` | Risk/conflict warnings |
| 7 | `improvement.service` | Proactive improvement suggestions |
| 8 | `planner.service` + `specification.service` | Plan + spec → `SPECIFICATION_GENERATED` |
| 9 | `readiness.service` | Readiness score breakdown |
| 10 | State persist | Messages + `ConversationState` update |

**Primary LLM:** Google Gemini (`backend/src/services/llm/gemini.service.ts`) for pipeline steps. OpenAI and Anthropic are also wired via `ProviderFactory` for general AI routes.

**Key API routes** (`backend/src/routes/conversation.routes.ts`):

- `POST /api/v1/conversations` — create session
- `POST /api/v1/chat/message` — send user message through pipeline
- `GET /api/v1/conversations/:id` — conversation + state
- `GET /api/v1/conversations/:id/specification` — generated agent spec

---

## Database Models (Prisma)

File: `backend/prisma/schema.prisma`

| Model | Purpose |
|-------|---------|
| `User` | Auth, role, organization |
| `Workspace` | User workspaces |
| `Conversation` | AI build session |
| `Message` | Chat history (USER / ASSISTANT / SYSTEM) |
| `ConversationState` | Pipeline stage, intent JSON, requirements JSON |
| `AgentSpecification` | Final generated agent spec (JSON) |

Pipeline stages stored in `ConversationState.currentStage`:
`INTENT_DETECTION` → `REQUIREMENT_GATHERING` → `CLARIFICATION` → `PLANNING` → `SPECIFICATION_GENERATED`

---

## Frontend Architecture

**Entry:** `frontend/src/main.tsx` → `App.tsx` → `AppProvider` + `AppRouter`

**Routing:** `frontend/src/routes/routeConfig.ts` — lazy-loaded feature pages.

**Studio state:** `frontend/src/features/studio/hooks/useStudioEngine.ts` — single source of truth for conversation UI. Calls `frontend/src/services/api/conversation.api.ts`.

**Feature folders** under `frontend/src/features/`:
`landing`, `auth`, `studio`, `dashboard`, `agents`, `workflows`, `blueprint`, `templates`, `marketplace`, `integrations`, `knowledge`, `analytics`, `billing`, `settings`, `profile`, `documentation`, `notifications`

---

## Backend Module Map

Routes mounted in `backend/src/routes/index.ts`:

| Prefix | Module |
|--------|--------|
| `/` | Conversation engine (core) |
| `/auth` | JWT authentication |
| `/users`, `/organizations` | User & org management |
| `/agents` | Agent CRUD |
| `/ai` | General AI chat endpoints |
| `/workflows`, `/blueprints`, `/deployments` | Workflow lifecycle |
| `/templates`, `/marketplace` | Templates & marketplace |
| `/integrations` | Slack, GitHub, Google, Notion, Stripe, MCP, etc. |
| `/knowledge` | RAG / vector stores |
| `/analytics`, `/notifications`, `/billing`, `/storage` | Platform services |

Backend follows **controller → service → repository** pattern inside `backend/src/modules/`.

Pipeline services live separately in `backend/src/services/` (not under modules).

---

## Coding Rules for AI Assistants

1. **Match existing patterns** — read surrounding code before adding new files.
2. **TypeScript strict** — avoid `any`; use Zod for validation on backend.
3. **Minimal diffs** — only change what the task requires.
4. **Real stack facts:**
   - Backend is **Express 5**, not NestJS (despite some aspirational docs elsewhere).
   - Queue library is **Bull** (package.json), not BullMQ.
   - Frontend uses **Zustand + TanStack Query**, not a global Redux store.
5. **Studio is the most complete flow** — many other pages (marketplace, billing, workflows canvas) may be scaffolded; verify before assuming full implementation.
6. **Do not commit secrets** — use `backend/.env.example` as reference.

---

## How to Navigate This Knowledge Base

| Read order | File | Why |
|------------|------|-----|
| 1 | `.agents/AGENTS.md` | This file — app identity & rules |
| 2 | `.agents/PLATFORM.md` | Product vision & domain concepts |
| 3 | `.agents/ARCHITECTURE.md` | System diagrams & data flow |
| 4 | `.agents/DEVELOPMENT.md` | Local setup, git, testing |
| 5 | `.agents/core/folder-structure.md` | Exact repo layout |
| 6 | Topic-specific doc | e.g. `ai/ai-overview.md`, `agents/architect/AGENT.md` |

Each sub-document covers **one topic only**. They are intentionally different — not copies of this file.

---

## Agent Roles in `.agents/agents/`

These are **AI assistant personas** for engineering tasks, not runtime microservices:

| Agent | When to use |
|-------|-------------|
| `architect` | System design, module boundaries, Prisma/API contracts |
| `planner` | Agent planning logic, pipeline stage design |
| `generator` | Code & spec generation |
| `validator` | Zod schemas, spec validation |
| `debugger` | Pipeline failures, error tracing |
| `reviewer` | Code review standards |
| `researcher` | Intent/requirements research patterns |
| `optimizer` | Performance, cost, readiness tuning |
| `deployment` | Deploy flow, deployments module |
| `documentation` | Writing & maintaining `.agents` docs |
| `ui-designer` | Studio UI, React components, Tailwind |

See each agent's folder for role-specific `AGENT.md`, `responsibilities.md`, `workflow.md`, `tools.md`, and `evaluation.md`.
