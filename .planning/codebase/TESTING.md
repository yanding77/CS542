# TESTING.md — Test Structure & Practices

## Testing Overview

The project has **two separate testing setups** — one per app — with minimal test coverage overall.

## Client Testing (`apps/client`)

### Framework
- **Runner**: Vitest v4
- **DOM Environment**: jsdom
- **Component Testing**: `@testing-library/react` v16
- **Assertions**: `@testing-library/jest-dom` matchers (extended via `expect.extend(matchers)`)
- **Mocking**: Vitest's `vi.fn()`

### Configuration
In `apps/client/vite.config.ts`:
```typescript
test: {
  environment: 'jsdom',
}
```
Run tests: `npm run test -w client` (from root) or `npm test` (from `apps/client`)

### Test Files
```
apps/client/test/
├── dom.test.jsx      # Component/DOM interaction tests
└── example.test.js   # Unit tests for data integrity
```

### Test Coverage — Client

**`apps/client/test/example.test.js`** — Data unit tests:
- ✅ All menu items have positive prices (`price > 0`)
- ✅ All menu items belong to a valid category (`categories.toContain(item.category)`)

**`apps/client/test/dom.test.jsx`** — Component behavior tests:
- ✅ Clicking a category button triggers `scrollIntoView` on the menu item list
- ✅ Selected category button has `bg-[#ffcc00]` class; non-selected does not

### Test Patterns
```javascript
// Setup
import { vi, afterEach, describe, it, expect } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

// Teardown
afterEach(() => { cleanup(); });

// Mocking browser APIs
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Finding elements
screen.getByRole('button', { name: "Ceviches" });

// Assertions
expect(btn).toHaveClass('bg-[#ffcc00]');
```

---

## Server Testing (`apps/server`)

### Framework
- **Runner**: Jest v30
- **Transform**: `ts-jest` v29 (TypeScript → JS)
- **E2E**: Supertest v7 (`request(app.getHttpServer())`)
- **NestJS Test Utilities**: `@nestjs/testing` (`Test.createTestingModule`)

### Configuration
In `apps/server/package.json`:
```json
"jest": {
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "src",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": { "^.+\\.(t|j)s$": "ts-jest" },
  "testEnvironment": "node"
}
```
E2E uses separate `apps/server/test/jest-e2e.json`.

### Test Files
```
apps/server/src/
└── app.controller.spec.ts    # Unit test for root controller

apps/server/test/
├── app.e2e-spec.ts           # E2E tests via HTTP with Supertest
└── jest-e2e.json             # E2E-specific Jest config
```

### Test Coverage — Server

**`apps/server/src/app.controller.spec.ts`** — Root controller unit test:
- ✅ `GET /` returns `"Hello World!"`

**`apps/server/test/app.e2e-spec.ts`** — E2E integration tests:
- ✅ `POST /owners/register` → 201 response
- ✅ `POST /auth/login` (owner) → returns `access_token`
- ✅ `POST /locations/register` → 201 response (requires prior owner creation)

### Test Patterns (Server)
```typescript
// Module setup
const moduleFixture = await Test.createTestingModule({
  imports: [AppModule],
}).compile();
app = moduleFixture.createNestApplication();
await app.init();

// E2E request
const res = await request(app.getHttpServer())
  .post('/owners/register')
  .send({ email: 'test@example.com', password: 'password123', restaurantName: 'Test' })
  .expect(201);
expect(res.body.message).toBe('Owner created');
```

**Note**: E2E tests depend on a live database connection. No database mocking or seeding strategy in place — tests will fail if PostgreSQL is not running.

---

## Gap Analysis / Missing Tests

| Area | Status | Notes |
|---|---|---|
| Cart add/remove | ❌ Not tested | Core user flow untested |
| Auth failures (bad credentials) | ❌ Not tested | No negative-path auth tests |
| JWT-protected routes | ❌ Not tested | Dashboard endpoints unverified |
| Location dashboard | ❌ Not tested | Route returns 403 for wrong role |
| Cart component (React) | ❌ Not tested | No UI tests for Cart.tsx |
| Admin components | ❌ Not tested | No tests in `apps/admin` at all |
| Input validation | ❌ Not applicable | No class-validator DTOs to test |
| Database teardown | ❌ Missing | E2E tests mutate DB without cleanup |

## Running Tests
```bash
# Client tests only
npm run test

# Server unit tests (from apps/server directory)
npm run test

# Server E2E (requires running PostgreSQL)
npm run test:e2e

# With coverage (server)
npm run test:cov
```
