# STRUCTURE.md — Directory Layout & Organization

## Root Monorepo
```
/
├── apps/
│   ├── client/          # Customer-facing menu/ordering app (React + Vite + TS)
│   ├── server/          # NestJS REST API backend
│   └── admin/           # Restaurant admin panel (React + Vite + JS)
├── .agent/              # GSD/Antigravity agent configuration and skills
├── .planning/           # GSD planning artifacts (created by this mapping)
├── .postman/            # Postman collection files for API testing
├── postman/             # Additional Postman exports
├── .env                 # Environment variables (should not be committed)
├── docker-compose.yml   # PostgreSQL database container definition
├── package.json         # Root workspace config + shared scripts
└── package-lock.json    # Lock file
```

## Backend — `apps/server/`
```
apps/server/
├── src/
│   ├── main.ts                    # Entry point: bootstrap(), CORS, global prefix
│   ├── app.module.ts              # Root module importing all domain modules
│   ├── app.controller.ts          # Root GET / → "Hello World!"
│   ├── app.controller.spec.ts     # Unit test for root controller
│   ├── app.service.ts             # Root service (minimal)
│   │
│   ├── auth/                      # Authentication domain
│   │   ├── auth.controller.ts     # POST /auth/login
│   │   ├── auth.service.ts        # validateUser(), login(), JWT signing
│   │   ├── auth.module.ts         # Imports JwtModule, OwnersModule, LocationsModule
│   │   └── jwt.strategy.ts        # PassportStrategy: validates Bearer tokens
│   │
│   ├── owners/                    # Owner (restaurant chain) domain
│   │   ├── owners.controller.ts   # POST /owners/register, GET /owners/dashboard
│   │   ├── owners.service.ts      # createOwner(), findOwnerByEmail()
│   │   └── owners.module.ts
│   │
│   ├── locations/                 # Location (restaurant branch) domain
│   │   ├── locations.controller.ts # POST /locations/register, GET /locations/dashboard
│   │   ├── locations.service.ts   # createLocation(), findLocationByUsername()
│   │   └── locations.module.ts
│   │
│   ├── cart/                      # In-memory cart domain
│   │   ├── cart.controller.ts     # GET /cart/:tableId, PATCH /cart/:tableId/add, DELETE /cart/:tableId/remove
│   │   ├── cart.service.ts        # In-memory Map-based cart logic
│   │   └── cart.module.ts
│   │
│   ├── database/                  # Database infrastructure
│   │   ├── database.module.ts     # @Global TypeORM connection + all entity registration
│   │   └── entities/              # TypeORM entity classes (one file per table)
│   │       ├── owner.entity.ts
│   │       ├── location.entity.ts
│   │       ├── menu.entity.ts
│   │       ├── item.entity.ts
│   │       ├── side.entity.ts
│   │       ├── entree.entity.ts
│   │       ├── appetizer.entity.ts
│   │       ├── drink.entity.ts
│   │       ├── dessert.entity.ts
│   │       ├── alcohol.entity.ts
│   │       ├── allergen.entity.ts
│   │       ├── deal.entity.ts
│   │       ├── combo.entity.ts
│   │       ├── table.entity.ts
│   │       ├── order.entity.ts
│   │       ├── menu_item.entity.ts      # Junction: Menu ↔ Item
│   │       ├── menu_combo.entity.ts     # Junction: Menu ↔ Combo
│   │       ├── combo_item.entity.ts     # Junction: Combo ↔ Item
│   │       ├── deal_item.entity.ts      # Junction: Deal ↔ Item
│   │       ├── deal_combo.entity.ts     # Junction: Deal ↔ Combo
│   │       ├── item_allergen.entity.ts  # Junction: Item ↔ Allergen
│   │       ├── table_order.entity.ts    # Junction: Table ↔ Order
│   │       └── order_item.entity.ts     # Junction: Order ↔ Item
│   │
│   ├── data/
│   │   └── menu.ts                # Static menu item array used by CartService
│   │
│   └── types/
│       └── types.ts               # Shared DTOs: ItemDTO, BaseMenuItem, TableCart, CartItem
│
├── test/
│   ├── app.e2e-spec.ts            # E2E tests: owner register, login, location register
│   └── jest-e2e.json              # Jest config for E2E
│
├── nest-cli.json                  # NestJS CLI config
├── tsconfig.json                  # TypeScript config (strict decorators, ES2023 target)
├── tsconfig.build.json            # Build-specific TS config
├── eslint.config.mjs              # ESLint 9 flat config with Prettier integration
└── .prettierrc                    # Prettier formatting rules
```

## Customer Frontend — `apps/client/`
```
apps/client/
├── src/
│   ├── main.tsx                   # App entry: BrowserRouter + QueryClientProvider
│   ├── App.tsx                    # Route definitions: /:tableId + wildcard
│   ├── index.css                  # Global CSS (minimal, ~1 line)
│   │
│   ├── components/
│   │   ├── Header.tsx             # Restaurant banner image (La Balsa)
│   │   ├── MenuDisplay.tsx        # Layout container: Categories + Items side-by-side
│   │   ├── MenuCategories.tsx     # Sticky left-column category selector buttons
│   │   ├── MenuItems.tsx          # Right-column scrollable item list with add/remove
│   │   ├── Cart.tsx               # Floating draggable cart bubble + modal overlay
│   │   └── Footer.tsx             # Page footer
│   │
│   ├── hooks/
│   │   ├── CartHook.tsx           # useCart() — React Query integration for cart API
│   │   └── GuestIDContext.tsx     # SessionProvider + useSession() — guestId + tableId
│   │
│   ├── types/
│   │   └── menuTypes.ts           # Shared TS interfaces: MenuItem, CartItem, TableCart, etc.
│   │
│   └── data/
│       └── items.ts               # Static menu data array + categories array
│
├── test/
│   ├── dom.test.jsx               # Component tests: category scroll, active styles
│   └── example.test.js            # Unit tests: item prices, category membership
│
├── public/
│   └── pics/                      # Food item images (JPEG/PNG), title banner
│
├── index.html                     # Vite entry HTML
├── vite.config.ts                 # Vite: proxy /api → :3000, port 5170, Tailwind, vitest
├── tsconfig.app.json
├── tsconfig.node.json
└── tsconfig.json
```

## Admin Panel — `apps/admin/`
```
apps/admin/
├── src/
│   ├── main.jsx                   # App entry: BrowserRouter
│   ├── App.jsx                    # Route definitions for all admin pages
│   ├── App.css                    # App-level styles
│   ├── index.css                  # Global CSS
│   │
│   └── components/
│       ├── LoginPage.jsx          # Landing page: choose Owner or Location login
│       ├── OwnerLogin.jsx         # Owner login form
│       ├── LocationLogin.jsx      # Location login form
│       ├── RegisterOwner.jsx      # Owner registration form
│       ├── OwnerDashboard.jsx     # Owner post-login page (stub: shows raw JSON)
│       ├── LocationDashboard.jsx  # Location post-login page (stub: shows raw JSON)
│       └── ProtectedRoute.jsx     # Role-based route guard using localStorage JWT
│
├── public/
├── index.html
└── vite.config.js                 # Vite: port 5175
```

## Naming Conventions
| Scope | Convention | Example |
|---|---|---|
| Server files | `{domain}.{type}.ts` | `cart.service.ts`, `auth.controller.ts` |
| Entity files | `{table_name}.entity.ts` | `menu_item.entity.ts`, `order.entity.ts` |
| Client components | PascalCase `.tsx` | `MenuDisplay.tsx`, `Cart.tsx` |
| Client hooks | PascalCase with `Hook` or `Context` suffix | `CartHook.tsx`, `GuestIDContext.tsx` |
| Admin components | PascalCase `.jsx` | `OwnerDashboard.jsx`, `ProtectedRoute.jsx` |
| Type files | camelCase | `menuTypes.ts`, `types.ts` |
| Static data | camelCase | `items.ts`, `menu.ts` |

## Key File Locations
| Purpose | Path |
|---|---|
| NestJS entry | `apps/server/src/main.ts` |
| Root module | `apps/server/src/app.module.ts` |
| DB connection | `apps/server/src/database/database.module.ts` |
| JWT strategy | `apps/server/src/auth/jwt.strategy.ts` |
| Cart logic | `apps/server/src/cart/cart.service.ts` |
| Shared server types | `apps/server/src/types/types.ts` |
| Static menu (server) | `apps/server/src/data/menu.ts` |
| React entry | `apps/client/src/main.tsx` |
| Cart hook | `apps/client/src/hooks/CartHook.tsx` |
| Session context | `apps/client/src/hooks/GuestIDContext.tsx` |
| Shared client types | `apps/client/src/types/menuTypes.ts` |
| Static menu (client) | `apps/client/src/data/items.ts` |
| Food images | `apps/client/public/pics/` |
| Admin routes | `apps/admin/src/App.jsx` |
| Route guard | `apps/admin/src/components/ProtectedRoute.jsx` |
