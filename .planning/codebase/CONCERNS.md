# CONCERNS.md — Technical Debt, Risks & Known Issues

## 🔴 Critical / Security

### 1. Hardcoded JWT Secret
**File**: `apps/server/src/auth/jwt.strategy.ts:13`
```typescript
secretOrKey: 'secret', // TODO: move to env later
```
**Risk**: Any JWT can be forged if the secret is known. Must be moved to environment variable (`JWT_SECRET`) before any deployment or public sharing.

### 2. Database Credentials in Codebase
**File**: `apps/server/src/database/database.module.ts`
```typescript
username: process.env.DB_USER || 'user',
password: process.env.DB_PASSWORD || 'password123',
```
The docker-compose.yml also hardcodes `POSTGRES_PASSWORD: password123`. The project has a `.env` but credentials fall back to hardcoded defaults. High chance these are committed to git.

### 3. TypeORM `synchronize: true` in Production Risk
**File**: `apps/server/src/database/database.module.ts`
```typescript
synchronize: true, // auto-create tables in dev (disable in production)
```
This auto-drops/recreates columns on entity changes. Dangerous in production — can cause data loss. Comment acknowledges this but there's no guard/env check to disable it.

### 4. No Input Validation (DTOs)
- No `class-validator` or `class-transformer` usage anywhere in the server
- `@Body() body: any` is the pattern in all controllers (auth, owners, locations)
- Any arbitrary payload is accepted — no length limits, format checks, or sanitization
- **Risk**: SQL injection is mitigated by TypeORM parameterization, but business logic attacks are possible

### 5. No Password Policy / Rate Limiting
- No brute-force protection on `POST /api/auth/login`
- No account lockout, rate limiting, or CAPTCHA
- Password minimum requirements not enforced server-side

---

## 🟡 Technical Debt / Architecture Issues

### 6. Duplicated Menu Data (Client + Server)
- `apps/client/src/data/items.ts` — 80+ static items for the UI
- `apps/server/src/data/menu.ts` — parallel file used by `CartService`
- If one is updated and the other isn't, cart will contain items that don't appear in the menu (or vice versa)
- The PostgreSQL schema supports dynamic menus (`Menu`, `MenuItem`, `Item` entities) but is not yet connected

### 7. In-Memory Cart (No Persistence)
- `CartService` stores all cart state in `Map<string, TableCart>` in process memory
- **Cart is lost** on every server restart
- Multiple tables sharing a cart by tableId — no authentication/authorization on cart access
- Any client knowing a `tableId` can view or modify another table's cart
- 50-item max is enforced but not persisted to DB

### 8. Stub Dashboard Implementations
**Files**: `apps/admin/src/components/OwnerDashboard.jsx`, `LocationDashboard.jsx`
```javascript
return (
    <div>
        <h2>Owner Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
);
```
Server endpoints (`GET /owners/dashboard`, `GET /locations/dashboard`) only return `"Welcome {role} {id}!"` — no real data. Admin UI has zero actual functionality.

### 9. Cart IDs Don't Match Database IDs
- Cart items use hardcoded IDs from `items.ts` (e.g., `"ent-1"`, `"cev-2"`)
- Database items use PostgreSQL UUID primary keys
- There is no bridge between static IDs and database IDs — these can't be reconciled in current form

### 10. Type Duplication Across Workspaces
- `apps/client/src/types/menuTypes.ts` and `apps/server/src/types/types.ts` define the same interfaces (`ItemDTO`, `BaseMenuItem`, `TableCart`, `CartItem`)
- No shared package (`packages/shared`) to unify types
- Drift risk increases as project evolves

### 11. Admin App Language Inconsistency
- `apps/admin` is plain JSX (no TypeScript)
- `apps/client` is TypeScript
- Inconsistent developer experience; admin is harder to refactor safely

---

## 🟠 Fragile Areas

### 12. E2E Tests Pollute the Database
- Tests create owners and locations but **never clean them up**
- Running tests twice may fail due to unique email constraint on `owners.email`
- No test database setup (no separate test DB, no transaction rollback per test)

### 13. Cart Polling at 1-Second Interval
**File**: `apps/client/src/hooks/CartHook.tsx`
```typescript
refetchInterval: 1000,
refetchIntervalInBackground: true,
```
- Every tab/seat is hitting the server every second
- With many tables open simultaneously, this scales poorly
- Background polling even when the user is not interacting (could drain battery on mobile)
- No WebSocket/SSE implementation to replace polling

### 14. Cart Error Handling Is Silent
```typescript
// useMutation with no onError handler
const addToCart = useMutation({
    mutationFn: async (dto: ItemDTO) => { ... },
    onSuccess: () => { queryClient.invalidateQueries(...) },
    // No onError — failures are silently swallowed
})
```
Users get no feedback if adding/removing cart items fails.

### 15. Admin Hardcoded API URL
**Files**: `apps/admin/src/components/OwnerDashboard.jsx`, `LocationDashboard.jsx`
```javascript
const res = await fetch('http://localhost:3000/api/owners/dashboard', { ... });
```
Hardcoded localhost — won't work in production or on different machines. Should use an environment variable or relative path with a proxy like the client app does.

### 16. `owner.register` Returns `{ message: 'Owner created' }` but E2E Tests Check for `body.id`
```typescript
// app.e2e-spec.ts line ~55
ownerId: ownerRes.body.id, // depends on your API
```
The `POST /owners/register` endpoint returns `{ message: 'Owner created' }` — no `id`. This test will always produce `undefined` for `ownerId` in the location register test.

### 17. Logout Uses `window.location.href` (Hard Redirect)
```javascript
window.location.href = '/'; // Hard redirect on logout
```
Bypasses React Router — causes full page reload instead of client-side navigation. Minor UX issue.

---

## 🟢 Minor / Low-Priority

### 18. `TODO` Comments in Code
- `apps/server/src/database/database.module.ts`: "TODO: all of these need to be moved to .env"
- `apps/server/src/auth/jwt.strategy.ts`: "TODO: move to env later"
- `apps/server/src/locations/locations.controller.ts`: "TODO: remove after testing" (dashboard stub)
- `apps/server/src/owners/owners.controller.ts`: "TODO: delete when done testing" (dashboard stub)

### 19. Footer Component Is Empty
`apps/client/src/components/Footer.tsx` — referenced in App.tsx but its content is unknown (not reviewed but file is tiny).

### 20. `@angular-devkit/schematics` in Server Dependencies
An Angular package in a NestJS project — likely a transitive dependency from an accidental install of NestJS schematics. Should be audited and removed if not needed.

### 21. Two Postman Directories
Both `.postman/` and `postman/` exist at root — unclear which is authoritative.
