# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DesignCode is a web platform for practicing system design interviews (canvas-based simulator) and coding problems (Monaco editor + code execution). The project is currently at the **planning stage** — no Next.js app has been scaffolded yet. The full development plan is in `designcode-dev-plan-final.md`.

## Stack

- **Framework**: Next.js 14, App Router, TypeScript strict (`noUncheckedIndexedAccess: true`)
- **Styling**: Tailwind CSS + shadcn/ui
- **Canvas**: React Flow (system design simulator)
- **Editor**: Monaco Editor
- **Charts**: Recharts
- **State**: Zustand
- **Database**: Supabase (Postgres + Auth + RLS)
- **Auth**: NextAuth.js (Google + GitHub OAuth)
- **Code Execution**: Piston API
- **Payments**: Stripe
- **Testing**: Vitest

## Scaffold Command

```bash
npx create-next-app@latest designcode \
  --typescript --tailwind --eslint --app \
  --src-dir --import-alias "@/*"
```

## Build / Dev / Test Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npx vitest           # Run all tests
npx vitest run <file>  # Run a single test file
```

## Architecture

The app uses Next.js App Router with `src/` directory and `@/*` import alias.

- **`src/app/`** — Pages and API routes (App Router conventions)
- **`src/components/`** — Organized by domain: `canvas/` (React Flow nodes/edges), `simulation/` (metrics, chaos, validation), `editor/` (Monaco wrapper, test results), `problems/` (browser, cards, hints), `ui/` (shared widgets)
- **`src/lib/`** — Core logic: `simulation/` (SimulationEngine, latency/cost models, validators), `execution/` (Piston client, per-language test harnesses), `supabase/` (client/server helpers, data access), `stripe/` (client, webhooks), `access.ts` (tier gating)
- **`src/store/`** — Zustand stores: `simulation.store.ts`, `editor.store.ts`, `session.store.ts`
- **`src/types/`** — Shared TypeScript types by domain
- **`src/data/`** — Problem definitions: `coding-problems/` and `system-problems/` with index files
- **`src/middleware.ts`** — Auth/access middleware

### Key patterns

- **Two problem tracks**: Coding problems use Monaco + Piston API execution; System design problems use a React Flow canvas with a SimulationEngine that models latency, cost, and validates architectures.
- **SimulationEngine** (`src/lib/simulation/SimulationEngine.ts`) is the core domain logic — it runs tick-based simulations over user-designed architectures, computing throughput, latency percentiles, and cost.
- **Code execution** goes through per-language test harnesses (`src/lib/execution/harnesses/`) that wrap user code with test scaffolding before sending to the Piston API.
- **Access tiers** (free/pro/enterprise) are enforced via `src/lib/access.ts` and Stripe webhooks.

## Dev Plan Reference

The full plan is in `designcode-dev-plan-final.md` (very large file — read with offset/limit, ~200 lines per chunk). It contains complete type definitions, component implementations, database schemas, and API route code.
