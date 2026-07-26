# Platform Overview

> Detailed companion to [AGENTS.md](../AGENTS.md). Read AGENTS.md first for the master summary.

---

## Application Identity

| Property | Value |
|----------|-------|
| Product name | Vibe Agent |
| Type | AI Agent Builder Platform |
| Repo structure | Monorepo: `frontend/` + `backend/` |
| Primary UX | Conversational Studio (`/studio`) |
| API base | `http://localhost:5000/api/v1` |

---

## What Makes This Platform Different

1. **Conversation-first building** — users describe agents in natural language
2. **Progressive pipeline** — intent → requirements → clarification → plan → spec
3. **Readiness scoring** — quantifies how complete a design is before deploy
4. **Conflict & improvement engines** — proactive warnings and suggestions during build
5. **Full product surface** — not just a chat API; includes dashboard, agents, workflows, marketplace, integrations, knowledge base, billing

---

## Layer Breakdown

### Presentation Layer (`frontend/`)

- React 19 SPA with Vite
- Feature-based folders under `src/features/`
- Shared UI in `src/components/ui/`
- API clients in `src/services/api/` and feature-level `api/` folders
- Global providers in `src/app/AppProvider.tsx`

### Application Layer (`backend/src/modules/`)

Feature modules for platform capabilities:

| Module | Responsibility |
|--------|---------------|
| `auth` | Login, register, JWT, refresh tokens |
| `users`, `organizations` | Identity & tenancy |
| `agents` | Agent CRUD & management |
| `workflows` | Workflow definitions |
| `blueprint` | Architectural blueprints |
| `deployments` | Deployment records |
| `templates`, `marketplace` | Pre-built agents |
| `integrations` | External service connectors |
| `knowledge` | RAG / document stores |
| `analytics` | Usage metrics |
| `notifications` | User notifications |
| `billing` | Stripe billing |
| `storage` | File uploads |
| `ai` | General-purpose AI chat (non-pipeline) |

### AI Pipeline Layer (`backend/src/services/`)

Core conversation engine — **the most important backend code path**:

```
services/
├── conversation/     ← orchestrates full pipeline
├── intent/           ← step 1-2: detect intent
├── requirements/     ← step 3-4: extract requirements
├── clarification/    ← step 5: ask missing questions
├── conflict/         ← step 6: risk detection
├── improvement/      ← step 7: proactive suggestions
├── planner/          ← step 8: generate agent plan
├── specification/    ← step 8: generate JSON spec
├── readiness/        ← step 9: score completeness
├── message/          ← message persistence
└── llm/              ← Gemini wrapper (generateJSON)
```

### Data Layer

- **PostgreSQL** via Prisma ORM
- **Redis** for caching and job queues
- Schema: `backend/prisma/schema.prisma`

---

## User-Facing Modules (Frontend Routes)

| Route | Feature folder | Backend module |
|-------|---------------|----------------|
| `/dashboard` | `features/dashboard` | conversations, agents |
| `/studio` | `features/studio` | conversation pipeline |
| `/agents` | `features/agents` | `modules/agents` |
| `/workflows` | `features/workflows` | `modules/workflows` |
| `/blueprint` | `features/blueprint` | `modules/blueprint` |
| `/knowledge` | `features/knowledge` | `modules/knowledge` |
| `/integrations` | `features/integrations` | `modules/integrations` |
| `/marketplace` | `features/marketplace` | `modules/marketplace` |
| `/templates` | `features/templates` | `modules/templates` |
| `/analytics` | `features/analytics` | `modules/analytics` |
| `/billing` | `features/billing` | `modules/billing` |

---

## Pipeline Stages (Studio)

Stored in `ConversationState.currentStage`:

| Stage | User sees | Backend behavior |
|-------|-----------|-----------------|
| `INTENT_DETECTION` | "Understanding your idea" | Parses goal & domain |
| `REQUIREMENT_GATHERING` | "Identifying requirements" | Extracts tasks, integrations |
| `CLARIFICATION` | Question with option chips | Waits for user answer |
| `PLANNING` | "Designing your agent" | Generates plan (brief) |
| `SPECIFICATION_GENERATED` | "Agent ready!" | Saves `AgentSpecification` |

Frontend maps stages in `useStudioEngine.ts` (`PIPELINE_STAGE_LABELS`, `PIPELINE_STAGE_STEP`).

---

## Tech Stack Summary

| Concern | Technology |
|---------|-----------|
| Frontend framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Server state | TanStack Query 5 |
| Client state | Zustand 5 |
| Routing | React Router 7 |
| Forms | React Hook Form + Zod |
| Backend framework | Express 5 |
| ORM | Prisma 7 |
| Database | PostgreSQL |
| Cache/Queue | Redis + Bull |
| Real-time | Socket.IO 4 |
| Primary pipeline LLM | Google Gemini |
| Secondary LLMs | OpenAI, Anthropic |
| Auth | JWT + bcrypt |

---

## Related Docs

- [ARCHITECTURE.md](../ARCHITECTURE.md) — diagrams & request flows
- [core/folder-structure.md](./folder-structure.md) — exact file paths
- [ai/ai-overview.md](../ai/ai-overview.md) — LLM & prompt details
- [frontend/react.md](../frontend/react.md) — frontend patterns
- [backend/nodejs.md](../backend/nodejs.md) — backend patterns
