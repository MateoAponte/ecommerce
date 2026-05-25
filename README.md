# 🏪 GAPSI E-Commerce

A modern e-commerce SPA built with **React 19**, **TypeScript**, **NestJS**, **PostgreSQL**, and **Docker**. Features a drag-and-drop shopping cart, infinite scroll product search, JWT authentication, and a modular architecture with documented design patterns.

---

## Table of Contents

- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the App](#-running-the-app)
- [Features](#-features)
- [Routes](#-routes)
- [SOLID Principles](#-solid-principles)
- [Design Patterns](#-design-patterns)
- [Tech Stack](#-tech-stack)
- [Areas for Improvement](#-areas-for-improvement)
- [Known Issues](#-known-issues)
- [Known Limitations](#-known-limitations)

---

## 🏗 Prerequisites

| Tool                    | Version |
| ----------------------- | ------- |
| Node.js                 | v22+    |
| pnpm                    | v10+    |
| Docker & Docker Compose | Latest  |
| Git                     | Any     |

> **Note:** If running without Docker, you also need a local PostgreSQL instance (v16 recommended).

Install pnpm globally if you don't have it:

```bash
npm install -g pnpm
```

---

## 🏃‍♂️ Getting Started

```bash
# 1. Clone the repository
git clone <repo-url>
cd gapsi-ecommerce

# 2. Install dependencies
pnpm install

# 3. Set up environment variables (see section below)
cp .env.example .env
```

---

## 🏙 Environment Variables

Create a `.env` file at the **repository root** with the following values:

```env
# App
NODE_ENV=dev
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=gapsi-ecommerce-db

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Frontend
VITE_API_URL=http://localhost:3000/api/v1
VITE_WALMART_API_KEY=your-rapidapi-key
VITE_APP_NAME=GAPSI E-Commerce
VITE_ENV=dev
```

> **Important:** `VITE_WALMART_API_KEY` is required for product search. The app uses the [Axesso Walmart Data Service](https://rapidapi.com/axesso/api/axesso-walmart-data-service) via RapidAPI.

---

## 💽 Running the App

### Option 1 — Docker (Recommended)

Starts both frontend and backend with a single command. No local PostgreSQL needed.

```bash
pnpm run docker:up
```

| Service     | URL                   |
| ----------- | --------------------- |
| Frontend    | http://localhost:8080 |
| Backend API | http://localhost:3000 |

Stop all services:

```bash
pnpm run docker:down
```

---

### Option 2 — Manual (without Docker)

#### Step 1 — Start PostgreSQL

```bash
docker run --name postgres-gapsi \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gapsi-ecommerce-db \
  -p 5433:5432 \
  -d postgres:16
```

#### Step 2 — Start the backend

```bash
cd apps/back
pnpm run start:dev
```

Backend runs at `http://localhost:3000`.

#### Step 3 — Start the frontend

```bash
cd apps/front
pnpm run start:dev
```

Frontend runs at `http://localhost:5173`.

---

### Option 3 — Preview production build

```bash
cd apps/front
pnpm run build
pnpm run serve
```

Frontend runs at `http://localhost:3000` (static).

> **Note:** The production build requires the backend to be running for authentication to work.

---

## 🏪 Features

### 🛒 Shopping Cart

- **Drag & Drop:** Drag products directly into the cart using `@dnd-kit/core` with a custom ghost overlay
- **Persistence:** Cart state is saved to `localStorage` via Zustand's `persist` middleware and rehydrated on load
- **Visual Feedback:** Drop zone activates and animates when a drag is in progress; items disappear from the list once added
- **Real-time counter:** Badge on the cart icon updates instantly on every add/remove

### 🔐 JWT Authentication

- **Login / Register:** Form validation on both client and server
- **Access Token + Refresh Token:** Dual-token strategy; short-lived access token, long-lived refresh token
- **Auto-refresh:** Axios response interceptor transparently retries failed requests after refreshing the token on 401
- **AES encryption:** Passwords encrypted in transit via `AesProvider`
- **Protected Routes:** `ProtectedRoute` component redirects unauthenticated users to `/auth`

### 🔍 Product Search

- **Infinite Scroll:** `IntersectionObserver` sentinel triggers the next page slice when the user reaches the bottom
- **Client-side pagination:** Full result set is fetched once; subsequent "pages" are sliced locally for instant response
- **Debounced search:** Input changes are debounced before triggering API calls
- **Category shortcuts:** Tag strip on the empty state lets users start a search with one click

### 👤 User Management

- **Full CRUD:** Create, read, update, and delete users via the NestJS API
- **Validation:** `class-validator` on DTOs (backend) and form validation (frontend)
- **Error handling:** HTTP exceptions normalized by the global filter and surfaced as toast notifications

### 🖥️ UI / UX

- **Responsive layout:** Mobile-first grid with Bootstrap 5 utility classes
- **Material UI components:** Cards, Dialogs, Popovers, Badges, Tooltips
- **Product detail modal:** Opens on card click; shows brand, department, rating, availability, and price
- **Cart popover:** Inline preview of cart items with individual remove and a confirm checkout action
- **Skeleton loaders:** Shown during the initial product fetch
- **404 page:** Rendered for any unmatched route

---

## 🌠 Routes

| Path                | Access                              | Description                        |
| ------------------- | ----------------------------------- | ---------------------------------- |
| `/`                 | Public                              | E-commerce product search and cart |
| `/ecommerce`        | Public                              | E-commerce product search and cart |
| `/auth`             | Public (redirects if authenticated) | Login / Register                   |
| `/order-processing` | Protected                           | Order confirmation screen          |
| `*`                 | Public                              | 404 Not Found                      |

---

## ⌨ SOLID Principles

SOLID is applied throughout the codebase. Key examples per principle:

### S — Single Responsibility

Each class, service, and hook has one reason to change.

- `UserService` manages user data only; `AuthService` manages authentication only
- `useLogin`, `useProductSearch`, `useInfiniteScroll` each encapsulate a single concern
- Controllers delegate all logic to services; repositories handle only data access

```typescript
// apps/back/src/user/user.service.ts
export class UserService {
  async create(dto: CreateUserDto): Promise<UserResponseDto>;
  async findAll(): Promise<UserResponseDto[]>;
  async update(id: string, dto: UpdateUserDto): Promise<UpdateResult>;
  // No auth logic, no HTTP concerns — only user data
}
```

**Key files:** `apps/back/src/user/user.service.ts`, `apps/front/src/auth/hooks/useLogin.ts`, `apps/front/src/features/shopping/hooks/useProductSearch.ts`

---

### O — Open/Closed

Modules are open for extension but closed for modification.

- New Zustand slices can be added to the store without touching existing slices
- New NestJS modules plug into `AppModule` without changing existing modules
- New product card variants extend `BaseProductCard` without modifying the base

```typescript
// apps/front/src/common/store/store.ts
export const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
  // Add new slices here without modifying existing ones
}));
```

**Key files:** `apps/front/src/common/store/store.ts`, `apps/front/src/features/shopping/components/BaseProductCard.tsx`

---

### L — Liskov Substitution

Subtypes are substitutable for their base types without breaking behavior.

- `JwtProvider` and `AesProvider` implement consistent interfaces that `AuthService` depends on — either could be swapped for a different algorithm without changing `AuthService`
- Both JWT strategies (`AccessTokenStrategy`, `RefreshTokenStrategy`) satisfy the same Passport strategy contract

**Key files:** `apps/back/src/auth/providers/jwt-provider.ts`, `apps/back/src/auth/providers/aes-provider.ts`

---

### I — Interface Segregation

Interfaces are small and domain-specific. No component is forced to depend on methods it does not use.

- `IAuthSlice` and `IProductSlice` are separate; components subscribe only to the slice they need
- DTOs are granular: `LoginDto`, `CreateUserDto`, `UserResponseDto` each carry only the fields their consumer requires

```typescript
// Separate, focused interfaces
export interface IAuthSlice {
  user: IUser | null;
  accessToken: string | null;
  setSession: (payload: ISessionPayload) => void;
  logout: () => void;
}

export interface IProductSlice {
  items: IProduct[];
  addItem: (item: IProduct) => void;
  removeItem: (id: string) => void;
  reset: () => void;
}
```

**Key files:** `apps/front/src/auth/store/auth.slice.ts`, `apps/front/src/features/shopping/store/shopping.slice.ts`

---

### D — Dependency Inversion

High-level modules depend on abstractions, not concretions.

- NestJS DI container resolves all dependencies at runtime; services declare what they need in constructors
- Frontend hooks depend on store interfaces, not on concrete implementations

```typescript
// apps/back/src/user/user.service.ts
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryService, // abstraction
    private readonly aesProvider: AesProvider, // abstraction
  ) {}
}
```

**Key files:** `apps/back/src/user/user.service.ts`, `apps/back/src/auth/auth.service.ts`

---

## 🎨 Design Patterns

All patterns are documented with inline comments in the relevant source files.

### Frontend

| Pattern             | File(s)                                                  | Benefit                                                                                                                |
| ------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Template Method** | `components/BaseProductCard.tsx`                         | Defines a shared card skeleton; concrete variants override individual slots via render props without touching the base |
| **Observer**        | `providers/DndProvider.tsx`, `hooks/useCartDraggable.ts` | `ProductCard` emits drag events; `CartDropZone` reacts without direct coupling                                         |
| **Facade**          | `hooks/useProductSearch.ts`                              | Hides API calls, local pagination, and `IntersectionObserver` complexity behind a single clean hook interface          |

### Backend

| Pattern         | File(s)                                                                                                                       | Benefit                                                                              |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Repository**  | `user/provider/user.repository.service.ts`                                                                                    | Decouples data access from business logic; swapping ORMs only touches the repository |
| **Adapter**     | `auth/providers/aes-provider.ts`, `auth/providers/jwt-provider.ts`, `shopping/service/products/interfaces/IProductAdapter.ts` | Encapsulates encryption, JWT signing, and external API payload normalization         |
| **Strategy**    | `auth/providers/jwt-atstrategy.ts`, `auth/providers/jwt-rtstrategy.ts`                                                        | Access and refresh token validation are independent, swappable Passport strategies   |
| **Interceptor** | `common/interceptors/response.interceptor.ts`                                                                                 | Wraps all API responses in a uniform envelope (`{ statusCode, message, data }`)      |
| **Filter**      | `common/filters/httpException.filter.ts`                                                                                      | Centralizes error handling; all HTTP exceptions produce consistent error responses   |

---

## Tech Stack

### Frontend

- React 19 + TypeScript
- Vite
- Material UI (MUI)
- Bootstrap 5
- @dnd-kit/core
- Zustand (with persist middleware)
- React Router v6
- Axios

### Backend

- NestJS + TypeScript
- TypeORM
- PostgreSQL 16
- Passport.js (JWT strategy)
- AES encryption

### Infrastructure

- Docker + Docker Compose
- pnpm workspaces (monorepo)
- Husky + Commitlint + ESLint + Prettier + Turbo

---

## 🛠 Areas for Improvement

### 1. Unit and Integration Tests

No test coverage exists at this stage. The improvement would be to add **Jest + Supertest** for the NestJS layer (unit tests per service, integration tests per controller endpoint) and **React Testing Library** for the frontend (hook tests, component render tests, user interaction flows). High-priority targets: `AuthService`, `useProductSearch`, `useCartDraggable`, and the `CartContext` reducer.

### 2. Shared Token and Constants Layer

JWT expiry values, API path prefixes, and error message strings are currently defined in multiple places. The fix is a shared `constants/` module (one for backend, one for frontend) that acts as the single source of truth — any change propagates automatically and removes the risk of silent mismatches.

### 3. CSS Architecture (Sass 7-1)

Styles are currently scattered across MUI `sx` props and inline objects. Migrating to the **Sass 7-1 pattern** (base, components, layout, pages, themes, utilities, vendors) would centralize design tokens, improve consistency, and make theming significantly easier to maintain.

### 4. Response Caching

Every search and navigation event triggers a fresh API call. Adding **NestJS cache-manager** (Redis in production, in-memory in dev) on the product search endpoint, combined with **TanStack Query** on the frontend, would eliminate redundant requests and improve perceived performance considerably.

### 5. Consistent MUI Component Patterns

MUI `sx` props are written inline per component with duplicated values. The improvement is a centralized `theme.ts` that defines palette, typography, spacing, and component overrides once — all components inherit from it, and global style changes require editing a single file.

### 6. Centralized Frontend Error Handling

Error handling currently varies per component (some use `try/catch`, some ignore errors silently). The fix is a single Axios response interceptor that formats all API errors into a typed `AppError` object, and a global `useToast` hook that components call uniformly. This removes error-handling logic from component bodies entirely.

### 7. Accessibility (a11y)

Several interactive elements lack ARIA attributes, focus indicators, and keyboard navigation support. Improvement involves auditing with **axe-core** or Lighthouse, adding `aria-label` to icon buttons, ensuring all drag-and-drop interactions have keyboard alternatives (provided natively by `@dnd-kit`), and replacing `<div onClick>` patterns with semantic `<button>` elements.

---

## ⚠ Known Issues

### Responsive Layout Inconsistencies

Some mobile breakpoints produce overlapping or misaligned elements, particularly in the product grid and the cart popover. The root cause is mixing Bootstrap grid classes with MUI `sx` breakpoints without a unified strategy.
**Fix:** Standardize on one system — either MUI's `sx` breakpoints throughout, or Bootstrap grid exclusively — and remove the mixed usage.

### Inconsistent Visual States

Hover, focus, and active states on interactive elements (buttons, cards, drag handles) are not uniformly defined. Some use MUI `sx` pseudo-selectors, others rely on Bootstrap classes, and some have no state styling at all.
**Fix:** Define all interactive states in `theme.ts` under `components` overrides (e.g., `MuiButton.styleOverrides`) so every instance inherits them without per-component duplication.

### Logic Duplication Between Modules

Some data-transformation and validation logic (e.g., price formatting, availability checks) is repeated across multiple components rather than extracted into shared utilities.
**Fix:** Create a `utils/` layer with pure functions (`formatPrice`, `isInStock`, `mapProduct`) imported wherever needed. This also makes the logic trivially testable.

### Inconsistent Error Feedback

API errors surface differently depending on where they occur — some show a toast, some log to the console only, and some fail silently. Users have no consistent way to know when something went wrong.
**Fix:** Route all errors through a single Axios interceptor that produces a typed `AppError`, and a global `ErrorBoundary` + `useToast` hook that displays a standardized message. Components stop handling errors individually.

---

## 📋 Known Limitations

- Product search requires a valid RapidAPI key (`VITE_WALMART_API_KEY`). Without it, search returns no results.
- The production `dist` cannot be opened directly via `file://` — a local server is required (see Option 3 above).
- GraphQL is partially scaffolded but not fully integrated in this version. After evaluating the architecture, I decided not to add an additional GraphQL abstraction layer because the Walmart API already exposes REST endpoints with denormalized payloads. In this case, data transformation and normalization are handled cleanly through the Adapter pattern in the NestJS backend, making a full GraphQL integration unnecessary for the current scope.
- PWA support is limited to service worker registration and a `manifest.json`; offline mode covers static assets only.
