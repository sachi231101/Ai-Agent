# Vibe Agent — Platform Specification

## Vision

Vibe Agent is an **AI-first agent builder**. Users describe intent in natural language; the platform converts that into a structured, deployable AI agent specification through a guided conversational pipeline.

Unlike traditional automation tools (Zapier, n8n) where users wire nodes manually first, Vibe Agent leads with **conversation** and surfaces structure (requirements, integrations, capabilities) as the AI understands the problem.

---

## Product Name & Branding

- **App name:** `Vibe Agent` (`APP_NAME` in `frontend/src/lib/constants.ts`)
- **Knowledge base refers to:** Vibe Agent / Vibe Agents (engineering docs use both; product UI uses "Vibe Agent")

---

## Target Users

| Persona | Goal |
|---------|------|
| **Builder** | Describe an agent idea, refine via chat, deploy |
| **Operator** | Monitor agents, workflows, analytics |
| **Integrator** | Connect Slack, GitHub, Google, Stripe, MCP tools |
| **Template consumer** | Start from marketplace/templates |

---

## Core Product Surfaces

| Route | Feature | Status in codebase |
|-------|---------|-------------------|
| `/` | Landing & marketing | Implemented |
| `/login`, `/register` | Auth (JWT) | Implemented |
| `/dashboard` | Prompt entry, project overview | Implemented |
| `/studio` | **Primary builder** — Build/Review/Test/Deploy | **Most complete AI flow** |
| `/agents` | Agent directory & details | UI + backend module |
| `/workflows` | Multi-step workflow builder | Module exists |
| `/blueprint` | Architectural specs | Module exists |
| `/knowledge` | RAG / vector indices | Module + UI |
| `/integrations` | OAuth & connector setup | Multiple provider stubs |
| `/marketplace`, `/templates` | Pre-built agents | Modules exist |
| `/analytics`, `/billing`, `/settings` | Platform ops | UI pages exist |

---

## Domain Vocabulary

| Term | Meaning |
|------|---------|
| **Conversation** | A Studio build session (DB: `Conversation` model) |
| **Pipeline stage** | Step in AI processing: intent → requirements → clarification → planning → spec |
| **Agent Specification** | JSON artifact describing agent name, capabilities, integrations, deployment config |
| **Readiness score** | Multi-dimensional score (business understanding, security, deployment readiness, etc.) |
| **Clarification** | AI asks a focused question when requirements are incomplete |
| **Workspace** | Container for user's agents and conversations |
| **Blueprint** | Higher-level architectural view of agent design |
| **Workflow** | DAG of nodes for automated multi-step execution |

---

## The Studio Experience (Primary UX)

Four-step wizard in `frontend/src/features/studio/pages/StudioPage.tsx`:

1. **Build** — Chat with AI pipeline (`StudioCanvas` + `useStudioEngine`)
2. **Review** — Review generated specification (`ReviewCanvas`)
3. **Test** — Test agent behavior (`TestCanvas`)
4. **Deploy** — Deploy configuration (`DeployCanvas`)

Users can arrive at Studio with an `initialPrompt` from Dashboard via router state.

---

## AI Pipeline Philosophy

The backend treats agent building as **progressive refinement**:

```
User message
  → Understand intent (what problem, what domain)
  → Extract requirements (tasks, integrations, constraints)
  → Clarify gaps (one question at a time with options)
  → Detect conflicts/risks (warnings)
  → Suggest improvements (proactive ideas)
  → Generate plan + specification (when ready)
  → Score readiness (how complete the design is)
```

If information is missing, the pipeline **stops at CLARIFICATION** instead of hallucinating a full spec.

---

## Integration Strategy

Platform supports connecting agents to external systems:

- **Communication:** Slack, Discord, WhatsApp
- **Dev tools:** GitHub
- **Productivity:** Notion, Google
- **Payments:** Stripe
- **Generic:** REST API, GraphQL, MCP, Postgres
- **Webhooks:** Inbound/outbound event triggers

Integration modules live in `backend/src/modules/integrations/`.

---

## Multi-Agent Concept (Engineering)

The `.agents/agents/` folder defines **engineering personas** (Architect, Planner, Generator, etc.) that map to how we think about building the platform — they mirror the conceptual multi-agent DAG the product sells to users.

Runtime pipeline services today are **sequential services** in `backend/src/services/`, not separate deployed agents.

---

## Competitive Positioning

| Dimension | Vibe Agent | Traditional automation |
|-----------|------------|------------------------|
| Primary input | Natural language | Visual node wiring |
| Output | Agent specification + deploy | Workflow execution |
| Guidance | Clarifying questions + readiness | Manual configuration |
| AI role | Architect & planner | Optional AI add-on |
