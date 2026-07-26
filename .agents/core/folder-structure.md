# Repository Folder Structure

> Exact layout of the Vibe Agent monorepo. Use this when locating files or adding new modules.

---

## Root

```
Ai Agent/
├── frontend/              React SPA
├── backend/               Express API
├── .agents/               AI knowledge base (engineering docs)
├── .runtime/              Runtime agent specifications
└── (no root package.json — frontend & backend are independent)
```

---

## Frontend (`frontend/`)

```
frontend/
├── public/                    Static assets, robot mascot icons
├── src/
│   ├── app/
│   │   ├── AppProvider.tsx    Query client, theme, auth context
│   │   └── router.tsx         Browser router definition
│   ├── components/
│   │   ├── layouts/           AppLayout (sidebar + topbar)
│   │   └── ui/                shadcn-style primitives (button, card, dialog…)
│   ├── features/              ★ Feature modules (one folder per product area)
│   │   ├── landing/           Public marketing pages
│   │   ├── auth/              Login, register, password reset
│   │   ├── studio/            ★ AI builder (most important)
│   │   │   ├── pages/StudioPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── StudioCanvas.tsx      Build step (chat)
│   │   │   │   ├── ReviewCanvas.tsx
│   │   │   │   ├── TestCanvas.tsx
│   │   │   │   ├── DeployCanvas.tsx
│   │   │   │   ├── chat/                 AiMessage, ThinkingIndicator
│   │   │   │   └── workspace/            IntelligenceCenterPanel, etc.
│   │   │   └── hooks/
│   │   │       ├── useStudioEngine.ts    ★ Conversation state hook
│   │   │       └── useStudio.ts
│   │   ├── dashboard/
│   │   ├── agents/
│   │   ├── workflows/
│   │   ├── blueprint/
│   │   ├── templates/
│   │   ├── marketplace/
│   │   ├── integrations/
│   │   ├── knowledge/
│   │   ├── analytics/
│   │   ├── billing/
│   │   ├── settings/
│   │   ├── profile/
│   │   ├── documentation/
│   │   └── notifications/
│   ├── routes/
│   │   ├── routeConfig.ts     Lazy route definitions
│   │   ├── PublicRoutes.tsx
│   │   └── PrivateRoutes.tsx
│   ├── services/
│   │   └── api/
│   │       └── conversation.api.ts   ★ Studio API client
│   ├── store/                 Zustand stores
│   ├── lib/
│   │   ├── constants.ts       ROUTES, APP_NAME, QUERY_KEYS
│   │   ├── axios.ts           HTTP client + interceptors
│   │   └── permissions.ts
│   ├── styles/                globals.css, animations.css
│   ├── main.tsx
│   └── App.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Frontend feature folder convention

```
features/<name>/
├── pages/           Route-level components
├── components/      Feature-specific UI
├── hooks/           Feature hooks
├── api/             Feature API functions (optional)
└── index.ts         Public exports
```

---

## Backend (`backend/`)

```
backend/
├── prisma/
│   └── schema.prisma          ★ Database models
├── src/
│   ├── server.ts              Entry point (HTTP + Socket.IO)
│   ├── app.ts                 Express app setup
│   ├── routes/
│   │   ├── index.ts           Mounts all routes under /api/v1
│   │   └── conversation.routes.ts   ★ Pipeline routes
│   ├── controllers/
│   │   └── conversation.controller.ts
│   ├── services/              ★ AI pipeline (not under modules/)
│   │   ├── conversation/
│   │   ├── intent/
│   │   ├── requirements/
│   │   ├── clarification/
│   │   ├── conflict/
│   │   ├── improvement/
│   │   ├── planner/
│   │   ├── specification/
│   │   ├── readiness/
│   │   ├── message/
│   │   └── llm/
│   │       └── gemini.service.ts
│   ├── prompts/               LLM prompt builders
│   │   ├── intent.prompt.ts
│   │   ├── clarification.prompt.ts
│   │   ├── conflict.prompt.ts
│   │   └── specification.prompt.ts
│   ├── modules/               Feature modules (CRUD pattern)
│   │   ├── auth/
│   │   ├── users/
│   │   ├── organizations/
│   │   ├── agents/
│   │   ├── ai/
│   │   ├── workflows/
│   │   ├── blueprint/
│   │   ├── deployments/
│   │   ├── templates/
│   │   ├── marketplace/
│   │   ├── integrations/
│   │   │   ├── slack/, github/, google/, notion/
│   │   │   ├── stripe/, discord/, whatsapp/
│   │   │   ├── mcp/, rest/, postgres/
│   │   │   └── integration.routes.ts
│   │   ├── knowledge/
│   │   ├── analytics/
│   │   ├── notifications/
│   │   ├── billing/
│   │   └── storage/
│   ├── common/
│   │   ├── middleware/        auth, validate, error, not-found
│   │   └── utils/             logger
│   ├── config/
│   │   ├── app.config.ts
│   │   ├── ai.config.ts
│   │   ├── auth.config.ts
│   │   └── env.ts
│   ├── database/
│   │   └── prisma.ts
│   ├── errors/
│   │   └── api.error.ts
│   ├── middlewares/             (legacy path — also common/middleware)
│   ├── validators/
│   │   └── conversation.validator.ts
│   ├── socket/
│   │   └── index.ts
│   └── utils/
├── .env.example
└── package.json
```

### Backend module convention

```
modules/<name>/
├── <name>.routes.ts
├── <name>.controller.ts
├── <name>.service.ts
├── <name>.repository.ts
├── <name>.validation.ts
├── <name>.types.ts
├── <name>.constants.ts   (optional)
└── index.ts
```

---

## Knowledge Base (`.agents/`)

```
.agents/
├── AGENTS.md              ★ Master knowledge book — read first
├── README.md              Navigation index
├── PLATFORM.md            Product spec
├── ARCHITECTURE.md        System design
├── DEVELOPMENT.md         Dev setup
├── core/                  Engineering standards
├── ai/                    LLM & pipeline docs
├── workflow/              Workflow engine docs
├── canvas/                Visual editor docs
├── backend/               Backend tech docs
├── frontend/              Frontend tech docs
├── nodes/                 Workflow node types
├── integrations/          Connector docs
├── marketplace/           Marketplace rules
├── agents/                AI assistant role playbooks
├── prompts/                 Prompt templates
├── reference/               Pattern catalogs
├── docs/                    Developer guides
├── examples/                Sample agents
├── schemas/                 JSON schemas
└── templates/               Doc templates
```

---

## Path Aliases

**Backend** uses TypeScript path aliases (check `backend/tsconfig.json`):
- `@config/*`, `@database/*`, `@modules/*`, `@common/*`, `@/routes`

**Frontend** uses `@/` → `src/` (check `frontend/tsconfig.json` / `vite.config.ts`)

---

## Where to Add New Code

| Task | Location |
|------|----------|
| New product page | `frontend/src/features/<name>/pages/` + `routeConfig.ts` |
| New API module | `backend/src/modules/<name>/` + `routes/index.ts` |
| New pipeline step | `backend/src/services/<name>/` + wire in `conversation.service.ts` |
| New LLM prompt | `backend/src/prompts/<name>.prompt.ts` |
| New integration | `backend/src/modules/integrations/<provider>/` |
| New engineering doc | `.agents/<category>/<topic>.md` |
