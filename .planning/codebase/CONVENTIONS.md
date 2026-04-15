# CONVENTIONS.md — Code Style & Patterns

## TypeScript Configuration

### Server (`apps/server`)
- Target: **ES2023**
- Strict null checks: `strictNullChecks: true`
- `noImplicitAny: false` — loose, allows implicit `any` (e.g., `@Body() body: any`, `@Request() req`)
- NestJS decorators require: `experimentalDecorators: true`, `emitDecoratorMetadata: true`
- Module resolution: `nodenext`

### Client (`apps/client`)
- Strict TypeScript with explicit interface definitions in `apps/client/src/types/menuTypes.ts`
- Props typed with dedicated interfaces (e.g., `MenuItemsProps`, `menuCategoriesProps`)
- React components use `export default function` pattern (not arrow functions)

## Code Style

### General
- **Indentation**: 4 spaces (server + client), 2 spaces (varies in admin)
- **Quotes**: Single quotes (server ESLint), double quotes (Prettier in server `.prettierrc`)
- **Semicolons**: Yes (TypeScript files)
- **Trailing commas**: Yes (where applicable)

### NestJS Patterns
- **Module structure**: Each domain has a `{domain}.module.ts`, `{domain}.controller.ts`, `{domain}.service.ts`
- **Decorators used**: `@Controller`, `@Get`, `@Post`, `@Patch`, `@Delete`, `@Param`, `@Body`, `@Request`, `@UseGuards`, `@Injectable`
- **Comments**: Route purpose documented above each controller method:
  ```typescript
  // route is /auth/login
  @Post('login')
  login(@Body() body: any) { ... }
  ```
- **Body typing**: Currently loose — `body: any` is common (not validated with class-validator DTOs)
- **Guard pattern**:
  ```typescript
  @UseGuards(AuthGuard('jwt'))
  @Get('dashboard')
  getDashboard(@Request() req) {
      if (req.user.role !== 'owner') throw new ForbiddenException('Access denied');
      return { ... };
  }
  ```

### Entity Patterns (TypeORM)
- All entities use `@PrimaryGeneratedColumn('uuid')` for IDs
- Timestamps via `@CreateDateColumn()` (auto-managed)
- Relations use explicit `onDelete: 'CASCADE'` for cleanup:
  ```typescript
  @ManyToOne(() => Location, (location) => location.items, { onDelete: 'CASCADE' })
  location: Location;
  ```
- Junction tables use composite `@PrimaryColumn('uuid')` for both FK columns
- Bidirectional relations defined on both sides

### React Patterns (Client)
- **Function components** with `export default function ComponentName()` syntax
- **Custom hooks** named `use{Name}` — return objects with named fields
- **Context pattern**: `createContext` + Provider component + `useContext` hook exported together
  ```typescript
  // GuestIDContext.tsx exports:
  export function SessionProvider({ children }: { children: ReactNode }) { ... }
  export function useSession(): SessionContextType { ... }
  ```
- **TanStack Query**: `useQuery` for reads (cart polling), `useMutation` for writes (add/remove)
  - `onSuccess` callbacks call `queryClient.invalidateQueries` to refresh
- **Framer Motion**: Used for cart animations — `AnimatePresence`, `motion.div`, `motion.button`
  - Drag constraints via `constraintsRef` ref on parent div
- **Tailwind**: Utility class strings inline; no `@apply` patterns observed
- **Image path pattern**: Static imports for critical images (`/pics/title.jpeg`), string paths in data array (`/pics/14.jpeg`)

### React Patterns (Admin)
- **JSX (not TSX)** — no TypeScript in admin
- **useState + useEffect** for all state and data fetching (no React Query)
- **localStorage** for JWT persistence:
  ```javascript
  const token = localStorage.getItem('jwt');
  // ...
  localStorage.removeItem('jwt');
  window.location.href = '/'; // Hard redirect on logout
  ```
- **Fetch API** directly (no axios or query library)

## Error Handling

### Server
- NestJS built-in exceptions: `UnauthorizedException`, `ForbiddenException`, `NotFoundException`, `BadRequestException`
- Service-layer throws; controller does not try/catch:
  ```typescript
  // cart.service.ts
  if (!menuItem) throw new NotFoundException('Product not found in menu');
  if (cart.itemCount >= 50) throw new BadRequestException('Cart is full');
  ```
- No global exception filter currently configured
- Auth service returns `null` for invalid credentials (controller converts to `UnauthorizedException`)

### Client
- `useQuery` errors: `throw new Error(...)` in `queryFn` (not caught/displayed in UI)
- `useMutation` errors: `throw new Error(...)` in `mutationFn` (no `onError` callbacks; silent failure in UI)
- No global error boundary

## Naming Conventions

### Backend
| Type | Pattern | Example |
|---|---|---|
| Classes | PascalCase | `CartService`, `AuthController`, `JwtStrategy` |
| Methods | camelCase | `validateUser()`, `addItem()`, `getCart()` |
| DB field names | snake_case | `password_hash`, `restaurant_name`, `created_at` |
| TS properties | camelCase | `tableId`, `startTime`, `qrCodeData` |
| Entity files | snake_case | `menu_item.entity.ts`, `order_item.entity.ts` |

### Frontend (Client)
| Type | Pattern | Example |
|---|---|---|
| Components | PascalCase | `MenuDisplay`, `Cart`, `MenuItems` |
| Hooks | camelCase with `use` prefix | `useCart`, `useSession` |
| Context types | PascalCase + `Type` suffix | `SessionContextType` |
| Interfaces | PascalCase | `MenuItem`, `CartItem`, `TableCart` |
| Props interfaces | PascalCase + `Props` | `MenuItemsProps`, `menuCategoriesProps` |

## TypeScript Types Shared Between Client and Server
- `apps/client/src/types/menuTypes.ts` and `apps/server/src/types/types.ts` have **duplicated** type definitions for `ItemDTO`, `BaseMenuItem`, `TableCart`, `CartItem`
- Types are **not shared via a common package** — kept in sync manually

## Formatting (Server)
`.prettierrc`:
```json
{
  "singleQuote": false,
  "trailingComma": "all"
}
```
