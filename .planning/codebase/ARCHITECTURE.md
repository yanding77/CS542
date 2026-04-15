# ARCHITECTURE.md — System Architecture

## Pattern
**Multi-app Monorepo** with a clear 3-tier architecture:
- **Presentation Layer**: `apps/client` (customer) + `apps/admin` (restaurant manager)
- **Application Layer**: `apps/server` (NestJS REST API)
- **Data Layer**: PostgreSQL (via TypeORM)

## High-Level System Diagram
```
┌─────────────────────────────────────────────────────────────┐
│  Customer (QR Scan)     │  Restaurant Owner/Staff (Admin)   │
│  apps/client (Vite)     │  apps/admin (Vite)                │
│  Port: 5170             │  Port: 5175                       │
└──────────┬──────────────┴────────────────┬──────────────────┘
           │   /api/* (proxy in dev)        │  Direct fetch
           │   Bearer JWT auth             │  Bearer JWT auth
           ▼                               ▼
┌─────────────────────────────────────────────────────────────┐
│              apps/server (NestJS)  Port: 3000               │
│  Global prefix: /api                                        │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Auth    │  │  Owners  │  │Locations │  │  Cart    │   │
│  │ Module   │  │ Module   │  │ Module   │  │ Module   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           DatabaseModule (Global, TypeORM)           │   │
│  └──────────────────────────┬───────────────────────────┘   │
└─────────────────────────────┼───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│         PostgreSQL 16 (Docker)  Port: 5432                  │
│         Database: restaurantDB                              │
└─────────────────────────────────────────────────────────────┘
```

## Backend Architecture (NestJS)

### Module Structure
NestJS standard module pattern — each domain is self-contained:

```
AppModule
├── DatabaseModule (@Global) — TypeORM connection + all entity repos exported
├── AuthModule        — JWT login flow
│   └── depends on OwnersModule + LocationsModule
├── OwnersModule      — Owner CRUD + dashboard
├── LocationsModule   — Location CRUD + dashboard
└── CartModule        — In-memory cart management per table
```

### Request Flow
```
HTTP Request → NestJS Router → Controller → Service → Repository (TypeORM) → PostgreSQL
```

Authentication flow:
```
POST /api/auth/login → AuthService.validateUser() → bcrypt.compare() → JwtService.sign() → { access_token }
Protected route → @UseGuards(AuthGuard('jwt')) → JwtStrategy.validate() → req.user injected
```

### Data Access Pattern
- Standard NestJS Repository pattern via TypeORM
- `DatabaseModule` is `@Global()` — exports all TypeORM repositories
- Individual modules (`OwnersModule`, `LocationsModule`) inject repos via `@InjectRepository()`
- Cart service uses a private in-memory `Map<string, TableCart>` (no database)

## Frontend Architecture — Customer App (`apps/client`)

### Component Hierarchy
```
main.tsx (BrowserRouter + QueryClientProvider)
└─ App.tsx (Routes)
   └─ /:tableId (SessionProvider wraps all)
      ├─ Header           — Restaurant banner image
      ├─ MenuDisplay      — Container for menu layout
      │  ├─ MenuCategories — Sticky left sidebar with category buttons
      │  └─ MenuItems     — Scrollable right panel with item list
      ├─ Cart             — Floating draggable cart bubble + modal
      └─ Footer
```

### State Management
- **Server state**: TanStack React Query (`useQuery`, `useMutation`)
  - Cart synced every 1 second via `refetchInterval: 1000`
  - Mutations invalidate cart query on success
- **Local state**: `useState` for UI state (cart open/closed, selected category)
- **Session context**: `GuestIDContext` provides `{ guestId, tableId }` via React Context
  - `guestId` generated with `crypto.randomUUID()` and persisted to `localStorage`
  - `tableId` read from URL param (`/:tableId`)

### Routing
- Single meaningful route: `/:tableId` — accessed by scanning a QR code
- Wildcard `*` → "Please scan a QR code" message

## Frontend Architecture — Admin Panel (`apps/admin`)

### Component Hierarchy
```
main.jsx (BrowserRouter)
└─ App.jsx (Routes)
   ├─ / → LoginPage   (chooses owner or location login type)
   ├─ /login/owner → OwnerLogin
   ├─ /login/location → LocationLogin
   ├─ /register → RegisterOwner
   ├─ /owner/dashboard → ProtectedRoute → OwnerDashboard (role: owner)
   └─ /location/dashboard → ProtectedRoute → LocationDashboard (role: location)
```

### Auth Pattern (Admin)
- JWT stored in `localStorage` after login
- `ProtectedRoute` component decodes JWT to check role; redirects to `/` if unauthorized
- Dashboard pages manually fetch with `Authorization: Bearer <token>` header

## Database Schema Overview (TypeORM Entities)

### Core Tables
| Entity | Table | Key Relations |
|---|---|---|
| `Owner` | `owners` | Has many `Location` |
| `Location` | `locations` | Belongs to `Owner`; has many `Menu`, `Item`, `Table` |
| `Menu` | `menus` | Belongs to `Location`; has many `MenuItem`, `MenuCombo` |
| `Item` | `items` | Belongs to `Location`; linked via `MenuItem`, `ComboItem`, etc. |
| `Table` | `tables` | Belongs to `Location`; has many `TableOrder` |
| `Order` | `orders` | Belongs to `Location`; has many `TableOrder`, `OrderItem` |

### Junction/Bridge Tables
- `menu_items` (`MenuItem`) — Many-to-many between `Menu` and `Item`
- `combo_items` (`ComboItem`) — Items within a `Combo`
- `menu_combos` (`MenuCombo`) — Many-to-many between `Menu` and `Combo`
- `deal_items` (`DealItem`) — Items within a `Deal`
- `deal_combos` (`DealCombo`) — Combos within a `Deal`
- `item_allergens` (`ItemAllergen`) — Many-to-many between `Item` and `Allergen`
- `table_orders` (`TableOrder`) — Links `Table` and `Order`
- `order_items` (`OrderItem`) — Links `Order` and `Item`

All primary keys are UUIDs (`@PrimaryGeneratedColumn('uuid')`).
Cascading deletes configured via `{ onDelete: 'CASCADE' }`.

## Key Architectural Observations
1. **Menu data is duplicated**: Static arrays exist in both `apps/client/src/data/items.ts` and `apps/server/src/data/menu.ts`. The database schema supports dynamic menus (via `Menu`/`MenuItem` entities) but is not wired up yet.
2. **Cart is ephemeral**: In-memory Map means cart is lost on server restart and not queryable from DB.
3. **Admin dashboards are stubs**: Both `OwnerDashboard` and `LocationDashboard` only display raw JSON from a placeholder `GET` endpoint — no real functionality yet.
4. **No QR code generation logic**: The `Table.qrCodeData` field exists but there's no service to create or scan QR codes.
