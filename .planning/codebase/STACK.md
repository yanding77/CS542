# STACK.md — Technology Stack

## Runtime & Language
- **Node.js**: v22.12.0+ (specified in README)
- **Package Manager**: npm with workspaces (monorepo)
- **Languages**: TypeScript (client + server), JavaScript/JSX (admin app)

## Workspace Layout
```
databaseproj (root monorepo)
├── apps/client   — Customer-facing menu/ordering UI
├── apps/server   — REST API backend
└── apps/admin    — Restaurant admin panel
```

## Backend (`apps/server`)
- **Framework**: NestJS v11 (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`)
- **Runtime**: Node.js + Express (via NestJS)
- **Language**: TypeScript 5.7.x
- **ORM**: TypeORM v0.3.28 (`@nestjs/typeorm`)
- **Database Driver**: PostgreSQL (`pg` v8.20)
- **Auth**: JWT (`@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`)
- **Password Hashing**: `bcrypt` v6
- **Build Tool**: `@nestjs/cli` (Nest CLI)
- **Port**: 3000 (default), `process.env.PORT` configurable
- **API Prefix**: `/api` (global)

## Frontend — Customer App (`apps/client`)
- **Framework**: React 19 + Vite 8
- **Language**: TypeScript ~5.9.x
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Routing**: React Router DOM v6
- **Data Fetching / Server State**: TanStack React Query v5
  - Cart polled every 1s with `refetchInterval`
- **Animations**: Framer Motion v12
- **React Compiler**: Babel plugin (`babel-plugin-react-compiler`)
- **Build Tool**: Vite 8 with `@vitejs/plugin-react`
- **Port**: 5170 (strict)
- **Dev Proxy**: `/api` → `http://localhost:3000`
- **Testing**: Vitest + Testing Library + jsdom

## Frontend — Admin Panel (`apps/admin`)
- **Framework**: React 19 + Vite 7 (older Vite version)
- **Language**: JavaScript / JSX (no TypeScript)
- **Routing**: React Router DOM v6
- **Styling**: Plain CSS (no UI library)
- **Port**: 5175 (inferred from CORS allowlist in `apps/server/src/main.ts`)
- **State**: useState + useEffect (no React Query)
- **Auth Storage**: JWT in `localStorage`

## Database
- **Engine**: PostgreSQL 16-alpine (Docker)
- **Container Name**: `orders-database`
- **Database Name**: `restaurantDB`
- **Default Credentials**: `user` / `password123` (hardcoded; see CONCERNS.md)
- **Port**: 5432

## Dev Tooling
- **Monorepo Orchestration**: npm workspaces + `concurrently`
- **DB Management**: Docker Compose (`docker-compose.yml`)
- **Linting**: ESLint 9 (both apps)
- **Formatting**: Prettier (server only; via `.prettierrc`)
- **Root Scripts**:
  - `npm run dev` → starts Docker DB + NestJS + Vite concurrently
  - `npm run db:up / db:down` → Docker lifecycle
  - `npm run test` → runs client tests (Vitest)

## Key Dependencies Summary

| Package | Version | Purpose |
|---|---|---|
| `@nestjs/typeorm` | ^11 | ORM integration |
| `typeorm` | ^0.3.28 | DB entity/repository layer |
| `pg` | ^8.20 | PostgreSQL client |
| `@nestjs/jwt` | ^11 | JWT generation |
| `passport-jwt` | ^4 | JWT validation strategy |
| `bcrypt` | ^6 | Password hashing |
| `@tanstack/react-query` | ^5 | Server state + polling |
| `framer-motion` | ^12 | UI animations |
| `react-router-dom` | ^6 | Client-side routing |
| `tailwindcss` | ^4 | Utility CSS |
| `vitest` | ^4 | Unit/component testing |
| `@testing-library/react` | ^16 | DOM testing helpers |
