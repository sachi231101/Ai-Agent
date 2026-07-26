# Vibe Agent — System Architecture

## High-Level Topology

```mermaid
flowchart TB
    subgraph Client
        SPA[React 19 SPA - Vite]
        Studio[Studio - useStudioEngine]
    end

    subgraph API["Backend - Express 5 :5000"]
        Routes["/api/v1/*"]
        Conv[Conversation Pipeline]
        Mods[Feature Modules]
    end

    subgraph Data
        PG[(PostgreSQL)]
        Redis[(Redis)]
    end

    subgraph AI
        Gemini[Gemini - pipeline]
        Providers[OpenAI / Anthropic - general AI]
    end

    SPA -->|REST + cookies| Routes
    Studio -->|conversationApi| Conv
    Routes --> Conv
    Routes --> Mods
    Conv --> Gemini
    Mods --> Providers
    Conv --> PG
    Mods --> PG
    Mods --> Redis
```

---

## Repository Layout

```
Ai Agent/
├── frontend/          React SPA
├── backend/           Express API + Prisma
├── .agents/           AI knowledge base (this folder)
└── .runtime/          Runtime agent specs (separate concern)
```

---

## Backend Architecture

**Entry:** `backend/src/server.ts` → HTTP server + Socket.IO + Prisma connect

**App setup:** `backend/src/app.ts`
- Helmet, CORS, rate limit, compression
- JSON body parser (10mb)
- Routes at `/api/v1`
- Global error handler

**Route mounting:** `backend/src/routes/index.ts`

### Two Backend Patterns

| Pattern | Location | Used for |
|---------|----------|----------|
| **Pipeline services** | `backend/src/services/` | Conversation AI engine (intent, planner, spec…) |
| **Feature modules** | `backend/src/modules/` | CRUD features (agents, workflows, billing…) |

Module internal structure:
```
modules/<name>/
  ├── <name>.routes.ts
  ├── <name>.controller.ts
  ├── <name>.service.ts
  ├── <name>.repository.ts
  ├── <name>.validation.ts   (Zod)
  ├── <name>.types.ts
  └── index.ts
```

---

## Conversation Pipeline Architecture

```mermaid
sequenceDiagram
    participant UI as StudioCanvas
    participant API as conversation.controller
    participant SVC as conversation.service
    participant LLM as gemini.service
    participant DB as PostgreSQL

    UI->>API: POST /chat/message
    API->>SVC: processUserMessage(id, content)
    SVC->>DB: save user message
    SVC->>LLM: intent detection
    SVC->>LLM: requirement extraction
    SVC->>LLM: clarification check
    alt needs clarification
        SVC->>DB: update state CLARIFICATION
    else ready to plan
        SVC->>LLM: generate plan + spec
        SVC->>DB: save AgentSpecification
        SVC->>DB: update state SPECIFICATION_GENERATED
    end
    SVC->>DB: save assistant message
    SVC-->>API: ProcessMessageResponse
    API-->>UI: stage, messages, spec, readiness
```

**Controller:** `backend/src/controllers/conversation.controller.ts`  
**Service:** `backend/src/services/conversation/conversation.service.ts`  
**Prompts:** `backend/src/prompts/` (intent, clarification, conflict, specification…)

---

## Frontend Architecture

```mermaid
flowchart LR
    main[main.tsx] --> App[App.tsx]
    App --> Provider[AppProvider]
    App --> Router[AppRouter]
    Router --> Public[PublicRoutes]
    Router --> Private[PrivateRoutes + AppLayout]
    Private --> Features[feature pages]
    Features --> Studio[studio/useStudioEngine]
    Studio --> API[conversation.api.ts]
```

**State management:**
- **TanStack Query** — server data fetching
- **Zustand** — client UI state (notifications, etc.)
- **useStudioEngine** — Studio conversation state (local hook, not global store)

**UI components:** `frontend/src/components/ui/` (shadcn-style)

---

## Database Schema

See `backend/prisma/schema.prisma`.

Entity relationships:
```
User 1──* Workspace
User 1──* Conversation
Conversation 1──* Message
Conversation 1──1 ConversationState
Conversation 1──* AgentSpecification
```

---

## Authentication Flow

- JWT access + refresh tokens (`backend/src/modules/auth/`)
- Cookie parser enabled on Express
- Conversation routes use `authenticateJwt` middleware
- Dev fallback user ID when no auth context

Frontend: `frontend/src/features/auth/` + axios interceptors in `frontend/src/lib/axios.ts`

---

## Real-Time (Socket.IO)

Initialized in `backend/src/server.ts` via `initSocket()`.

Primary Studio flow is **REST-based** today. Socket.IO is available for future streaming/live updates.

---

## External Services

| Service | Purpose | Config |
|---------|---------|--------|
| PostgreSQL | Primary DB | `DATABASE_URL` |
| Redis | Queues, cache | `REDIS_URL` |
| Gemini | Pipeline LLM | `GEMINI_API_KEY` |
| OpenAI | General AI | `OPENAI_API_KEY` |
| Anthropic | General AI | `ANTHROPIC_API_KEY` |
| Stripe | Billing | `STRIPE_SECRET_KEY` |
| SMTP | Email | `SMTP_*` |

See `backend/.env.example`.

---

## API Response Envelope

Most endpoints return:
```json
{
  "success": true,
  "data": { ... }
}
```

Conversation message response includes:
- `currentStage`, `needsClarification`, `question`, `options`
- `warnings`, `improvements`, `readiness`
- `specification` (when complete)

---

## Known Gaps (Docs vs Implementation)

| Documented aspiration | Current reality |
|----------------------|-----------------|
| NestJS backend | Express 5 |
| BullMQ | Bull in package.json |
| React Flow canvas everywhere | Studio is chat-first; canvas modules may be partial |
| OpenTelemetry everywhere | Winston logger in use |
| Full multi-tenant row isolation | User/workspace models exist; verify tenant middleware before assuming |

Always verify in code before implementing against aspirational docs.
