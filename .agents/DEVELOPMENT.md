# Vibe Agent — Development Guide

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **PostgreSQL** running locally
- **Redis** running locally (for queues/cache)
- **API keys:** at minimum `GEMINI_API_KEY` for the conversation pipeline

---

## Environment Setup

Copy and configure backend env:

```bash
cd backend
cp .env.example .env
```

Key variables (`backend/.env.example`):

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `5000` | API server |
| `DATABASE_URL` | `postgresql://...` | Prisma connection |
| `REDIS_URL` | `redis://localhost:6379` | Redis |
| `JWT_SECRET` | (change me) | Auth tokens |
| `GEMINI_API_KEY` | — | **Required for Studio pipeline** |
| `CORS_ORIGIN` | `http://localhost:5173` | Frontend origin |

---

## Running Locally

**Terminal 1 — Backend:**
```bash
cd backend
npm install
npm run db:generate
npm run db:migrate
npm run dev          # tsx watch src/server.ts → :5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev          # Vite → :5173
```

**Optional — Database GUI:**
```bash
cd backend
npm run db:studio
```

**Optional — Seed data:**
```bash
cd backend
npm run db:seed
```

---

## Verify It Works

1. Open `http://localhost:5173`
2. Register / login
3. Go to Dashboard → enter a prompt → lands on Studio
4. Send a message — backend pipeline should respond (requires `GEMINI_API_KEY`)

Health check: `GET http://localhost:5000/health`

---

## Project Scripts

### Backend (`backend/package.json`)

| Script | Command |
|--------|---------|
| `dev` | Hot reload with tsx |
| `build` | `tsc` → `dist/` |
| `start` | Run compiled server |
| `db:generate` | Prisma client generate |
| `db:migrate` | Run migrations |
| `db:seed` | Seed database |
| `test` | Jest |

### Frontend (`frontend/package.json`)

| Script | Command |
|--------|---------|
| `dev` | Vite dev server |
| `build` | Typecheck + production build |
| `lint` | ESLint |
| `preview` | Preview production build |

---

## Code Organization Conventions

### Backend — adding a feature module

1. Create folder under `backend/src/modules/<name>/`
2. Add routes, controller, service, repository, validation, types
3. Export from `index.ts`
4. Mount in `backend/src/routes/index.ts`

### Backend — adding a pipeline step

1. Create service in `backend/src/services/<name>/`
2. Add prompt in `backend/src/prompts/` if LLM-driven
3. Wire into `conversation.service.ts` processUserMessage()

### Frontend — adding a page

1. Create feature folder under `frontend/src/features/<name>/`
2. Add page component in `pages/`
3. Register lazy route in `frontend/src/routes/routeConfig.ts`
4. Add route constant in `frontend/src/lib/constants.ts`

---

## Git Workflow

- Use **conventional commits:** `feat:`, `fix:`, `refactor:`, `docs:`
- Feature branches off main
- Keep PRs focused — one concern per PR
- Do not commit `.env` files or API keys

---

## Testing

Backend has Jest configured (`npm test`). When adding pipeline logic:

- Unit test individual services (intent, clarification, readiness)
- Mock `gemini.service` for deterministic tests
- Integration tests can use Testcontainers (PostgreSQL + Redis) — pattern documented in `.agents/core/testing-strategy.md`

---

## Common Issues

| Problem | Fix |
|---------|-----|
| Pipeline returns error | Check `GEMINI_API_KEY` in backend `.env` |
| CORS errors | Verify `CORS_ORIGIN=http://localhost:5173` |
| DB connection fail | Ensure PostgreSQL running, `DATABASE_URL` correct |
| 401 on conversation routes | Login first; check JWT cookie/header |
| Prisma client stale | Run `npm run db:generate` after schema changes |

See also: `.agents/reference/troubleshooting.md`

---

## Updating the Knowledge Base

When you change architecture or add major features, update:

1. `.agents/AGENTS.md` — if core behavior changes
2. Relevant topic file in `.agents/<category>/`
3. `.agents/core/folder-structure.md` — if repo layout changes

Use the `documentation` agent playbook: `.agents/agents/documentation/AGENT.md`
