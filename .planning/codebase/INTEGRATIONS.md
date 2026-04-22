# INTEGRATIONS.md — External Services & APIs

## Database — PostgreSQL (Docker)
- **Type**: Self-hosted PostgreSQL 16-alpine via Docker Compose
- **Config file**: `docker-compose.yml`
- **Connection**: TypeORM `forRoot()` in `apps/server/src/database/database.module.ts`
- **Connection params** (currently hardcoded, env vars available):
  - Host: `process.env.DB_HOST || 'localhost'`
  - Port: `process.env.DB_PORT || 5432`
  - Username: `process.env.DB_USER || 'user'`
  - Password: `process.env.DB_PASSWORD || 'password123'`
  - Database: `process.env.DB_NAME || 'restaurantDB'`
- **Schema Management**: `synchronize: true` (auto-creates/updates tables in dev — must be disabled in production)

## Authentication — JWT (Self-hosted)
- **No external auth provider** (e.g., Auth0, Firebase) — auth is fully in-house
- **Token generation**: `@nestjs/jwt` with `JwtService.sign()`
- **Token validation**: `passport-jwt` (`PassportStrategy`) via `JwtStrategy`
- **Secret**: Hardcoded string `'secret'` in `apps/server/src/auth/jwt.strategy.ts` (**must move to env**)
- **Flow**:
  1. `POST /api/auth/login` → validates credentials → returns `access_token`
  2. Client stores token in `localStorage`
  3. Subsequent requests include `Authorization: Bearer <token>` header
  4. `@UseGuards(AuthGuard('jwt'))` decorators protect routes

## In-Memory Cart Service
- **Not a database** — cart state lives in `Map<string, TableCart>` in-process memory (`apps/server/src/cart/cart.service.ts`)
- **Consequence**: Cart resets on every server restart. No persistence between sessions.
- Menu items loaded from static data file `apps/server/src/data/menu.ts` at startup

## Static Menu Data
- Client: `apps/client/src/data/items.ts` — hardcoded array of ~80+ menu items with categories, prices, and image paths
- Server: `apps/server/src/data/menu.ts` — parallel static file referenced in `CartService` constructor
- **No live DB menu queries** — menu data is not served from PostgreSQL yet

## Image Assets
- All food images served as static files from `apps/client/public/pics/` (e.g., `/pics/14.jpeg`)
- Referenced directly in `apps/client/src/data/items.ts` as strings
- Header/title image: `/pics/title.jpeg`

## CORS Configuration
- Server explicitly allows:
  - `http://localhost:5175` (admin frontend)
  - `http://localhost:5170` (customer frontend)
- Credentials enabled: `credentials: true`

## Dev Proxy (Client → Server)
- Vite dev server proxies `/api/*` → `http://localhost:3000`
- Configured in `apps/client/vite.config.ts`
- Allows client to use relative `/api/...` URLs without CORS issues in development

## No External Integrations Currently
The following are **not yet integrated** but have database schema groundwork:
- Payment processing (no entity or service)
- Email/SMS notifications (no entity or service)
- QR code generation (Table entity has `qrCodeData` field, no generator service yet)
- Allergen/dietary data display (entities exist: `Allergen`, `ItemAllergen` — not exposed via API)
