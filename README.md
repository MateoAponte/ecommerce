# 🏪 GAPSI E-Commerce Platform

A modern e-commerce application built with **NestJS**, **React**, **TypeScript**, **PostgreSQL**, and **Docker**. The app uses a modular backend structure, feature-driven frontend organization, JWT-based authentication, and drag-and-drop cart UX.

---

## 📋 Table of Contents

- [Setup](#setup)
- [Overview](#overview)
- [Config](#config)
- [Features](#features)
- [How to Run App](#how-to-run-app)
- [Prerequisites](#prerequisites)
- [Areas to Improve](#areas-to-improve)
- [Errors](#errors)
- [Techs](#techs)
- [SOLID](#solid)
- [Design Patterns](#design-patterns)
- [Decisions Made](#decisions-made)
- [Routes](#routes)

---

## 🚀 Setup

### Recommendation

- Use **pnpm** as the package manager
- Install **Node.js 22+**
- Have **Git** available
- Prefer **Docker + Docker Compose** for a consistent environment
- If running the app without Docker, use **pgAdmin 4** for PostgreSQL management

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create a `.env` file at the repository root:

```env
NODE_ENV=dev
PORT=3000
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=gapsi-ecommerce-db
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

VITE_API_URL=http://localhost:3000/api/v1
VITE_WALMART_API_URL=https://api.walmart.com
VITE_WALMART_API_KEY=your-walmart-api-key
VITE_APP_NAME=GAPSI E-Commerce
VITE_ENV=dev
```

If you plan to run the project with Docker Compose, create a `.env` file
in the project root with the following Docker-ready configuration:

```env
# Environment variables for Docker Compose
# Backend Configuration
NODE_ENV=dev
PORT=3000
VITE_WALMART_API_URL=https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword
VITE_WALMART_API_KEY=add-your-walmart-api-key-here

# Database Configuration
DB_HOST=db
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=gapsi-ecommerce-db


# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
```

---

## 📘 Overview

This project is a template for an e-commerce web application. It includes:

- Backend API in **NestJS**
  The frontend loads runtime values from Vite environment variables:

## 🔧 Design Patterns

En este repositorio se documentan y aplican patrones de diseño concretos. A continuación se listan los patrones principales, los archivos donde están implementados y el beneficio que aportan:

- **Adapter (Provider)**: `apps/back/src/auth/providers/aes-provider.ts`, `apps/back/src/auth/providers/jwt-provider.ts`, `apps/back/src/common/adapters/product.adapter.ts`
- Beneficio: Encapsula la lógica de encriptación y JWT, y normaliza payloads de producto externos, permitiendo cambiar la implementación sin afectar `AuthService` ni la lógica de productos.

- **Strategy**: `apps/back/src/auth/providers/jwt-atstrategy.ts`, `apps/back/src/auth/providers/jwt-rtstrategy.ts`
  - Beneficio: Separa la validación de accesos y refresh tokens en estrategias intercambiables.

- **Repository**: `apps/back/src/user/provider/user.repository.service.ts`
  - Beneficio: Abstracción del acceso a datos que facilita cambiar el ORM o la BD sin tocar la lógica de negocio.

- **Interceptor (Backend)**: `apps/back/src/common/interceptors/response.interceptor.ts`
  - Beneficio: Normaliza las respuestas de la API (envoltura uniforme) reduciendo código repetido en controladores.

- **Filter (Exception Handling)**: `apps/back/src/common/filters/httpException.filter.ts`
  - Beneficio: Centraliza el manejo de errores HTTP y genera respuestas consistentes.

- **Provider (Frontend / Context)**: `apps/front/src/common/providers/DndProvider.tsx`
  - Beneficio: Centraliza estado y efectos complejos (drag & drop) y los expone a componentes hijos.

- **Slice (State Management)**: `apps/front/src/auth/store/auth.slice.ts`, `apps/front/src/features/shopping/store/shopping.slice.ts`
  - Beneficio: Estado modular, testeable y fácil de componer.

- **Custom Hooks**: `apps/front/src/auth/hooks/useLogin.ts`, `apps/front/src/features/shopping/hooks/useProductSearch.ts`
  - Beneficio: Encapsulan efectos y lógica reutilizable, manteniendo componentes limpios.

- **HTTP Interceptor (Frontend)**: `apps/front/src/common/infra/http/interceptor.ts`
  - Beneficio: Centraliza la adición de tokens, manejo de reintentos y refresco automático de tokens.

- **Template Method**: `apps/front/src/features/shopping/components/BaseProductCard.tsx`
  - Beneficio: Define la estructura (skeleton) común de una tarjeta de producto, dejando a los hijos (render props) implementar pasos concretos; mejora la consistencia y reutilización UI.

He añadido comentarios en los archivos relevantes indicando el patrón aplicado y el beneficio directo.
async findUserById(id: string): Promise<User | null> {
return this.repo.findOne({ where: { id } });
}
}

// Service usa repository
@Injectable()
export class UserService {
constructor(private userRepository: UserRepositoryService) {}

async findOne(id: string): Promise<UserResponseDto> {
const user = await this.userRepository.findUserById(id);
if (!user) throw new NotFoundException();
return UserResponseDto.fromEntity(user);
}
}

````

**Beneficio:** Cambiar BD de PostgreSQL a MongoDB solo tocando `UserRepositoryService`

### 2. **Adapter Pattern (Strategy)**

**Dónde:** `apps/back/src/auth/providers/`

```typescript
// Adapter para encriptación
@Injectable()
export class AesProvider {
  encrypt(secret: string, key: string): string { ... }
  decrypt(secret: string, key: string): string { ... }
}

// Adapter para JWT
@Injectable()
export class JwtProvider {
  signTokens(user: User): TokenDto { ... }
  refreshTokens(refreshToken: string): any { ... }
}

// Service usa adapters intercambiables
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtProvider: JwtProvider,
    private readonly aesProvider: AesProvider,
  ) {}
}
````

**Beneficio:** Cambiar algoritmo de encriptación sin tocar `AuthService`

### 3. **Provider Pattern (Compound Component)**

**Dónde:** `apps/front/src/common/providers/DndProvider.tsx`

Envuelve lógica compleja y la expone a componentes hijos:

```typescript
// Provider centraliza DnD
export const DndProvider = ({ children }) => {
  const { handleDragStart, handleDragEnd, dragging } = useCartDraggable()

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {children}
      <DragOverlay>{dragging && <GhostCard />}</DragOverlay>
    </DndContext>
  )
}

// CartButton usa el contexto automáticamente
export const CartButton = () => {
  const { setNodeRef, isOver } = useDroppable({ id: 'cart-drop-zone' })
  // Funciona porque está dentro de DndProvider
}
```

**Beneficio:** Centralizar state y efectos complejos

### 4. **Slice Pattern (State Management)**

**Dónde:** `apps/front/src/*/store/*.slice.ts`

Dividir estado en slices pequeños y componibles:

```typescript
// Auth slice
export const createAuthSlice = (set) => ({
  user: null,
  accessToken: null,
  setSession: (payload) => set({ user: payload.user, accessToken: payload.at_secret }),
  logout: () => set({ user: null, accessToken: null }),
});

// Product slice
export const createProductSlice = (set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
});

// Composición en store principal
const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
}));
```

**Beneficio:** Estado organizado, fácil de testear cada slice

### 5. **Custom Hooks Pattern**

**Dónde:** `apps/front/src/**/hooks/*.ts`

Encapsular lógica reutilizable en hooks:

```typescript
// useLogin: Lógica de autenticación
export const useLogin = () => {
  const navigate = useNavigate()
  const setSession = useAppStore((state) => state.setSession)

  const login = async (values: LoginFormValues) => {
    const response = await authService.login(...)
    setSession(response)
    navigate(ROUTES.ecommerce)
  }

  return { login, isSubmitting, submitError }
}

// useCartDraggable: Lógica de drag & drop
export const useCartDraggable = () => {
  const [dragging, setDragging] = useState<IProduct>()
  const { items, addItem } = useAppStore((state) => state)

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    if (over?.id !== 'cart-drop-zone') return
    const product = active.data.current?.product as IProduct
    if (!product || items.some(i => i.id === product.id)) return
    addItem(product)
  }

  return { handleDragStart, handleDragEnd, dragging }
}

// useInfiniteScroll: Carga infinita
export const useInfiniteScroll = (callback: () => void) => {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) callback()
    })
    if (observerTarget.current) observer.observe(observerTarget.current)
    return () => observer.disconnect()
  }, [callback])

  return observerTarget
}
```

**Beneficio:** Lógica reutilizable, testeable y desacoplada de componentes

### 6. **Interceptor Pattern**

**Dónde:** `apps/front/src/common/infra/http/interceptor.ts` y `apps/back/src/common/interceptors/`

Interceptar y transformar requests/responses:

```typescript
// Frontend: Agregar token a requests
const onRequest = (config: InternalAxiosRequestConfig) => {
  const { accessToken } = useAppStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

// Frontend: Renovar token si expira
const onResponseError = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    const response = await authService.refresh();
    const { setSession } = useAppStore.getState();
    setSession(response);
    // Reintentar request original con nuevo token
    return apiClient(originalRequest);
  }
};

// Backend: Envolver respuestas
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data: T) => ({
        statusCode: 200,
        message: 'Success',
        data, // Envuelve respuesta
      })),
    );
  }
}
```

**Beneficio:** Lógica cross-cutting centralizada

### 7. **Filter Pattern (Exception Handling)**

**Dónde:** `apps/back/src/common/filters/httpException.filter.ts`

Manejo centralizado de excepciones:

```typescript
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR
```

## License: unknown

https://github.com/AlexandrVinogradov/safes/blob/10289cb37c5d080fb2e52f46dca93f188490eade/server/src/filters/CustomExceptionFilter.ts

````
Tengo suficiente contexto del proyecto. Ahora voy a crear un README comprensivo y detallado.

```markdown
# 🏪 GAPSI E-Commerce Platform

Una aplicación e-commerce moderna y escalable construida con **NestJS**, **React**, **TypeScript**, **PostgreSQL** y **Docker**. Arquitectura modular con separación clara de responsabilidades, manejo robusto de autenticación JWT y experiencia de usuario intuitiva con drag-and-drop.

---

## 📋 Tabla de Contenidos

- [Setup & Instalación](#setup--instalación)
- [Cómo Ejecutar la Aplicación](#cómo-ejecutar-la-aplicación)
- [Configuración](#configuración)
- [Características Principales](#características-principales)
- [Rutas y Endpoints](#rutas-y-endpoints)
- [Decisiones Arquitectónicas](#decisiones-arquitectónicas)
- [Patrones de Diseño Implementados](#patrones-de-diseño-implementados)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Áreas de Mejora](#áreas-de-mejora)
- [Errores Conocidos y Fixes](#errores-conocidos-y-fixes)
- [Pruebas con Docker](#pruebas-con-docker)

---

## 🚀 Setup & Instalación

### Requisitos Previos

- **Node.js**: v22 o superior
- **pnpm**: v10.0.0 (gestor de paquetes)
- **Git**: para control de versiones
- **Docker & Docker Compose**: (opcional, pero recomendado)
- **PostgreSQL** (si corres sin Docker)
- **pgAdmin 4** (herramienta visual para PostgreSQL - opcional)

### Paso 1: Instalar pnpm

```bash
npm install -g pnpm@10.0.0
````

Verifica la instalación:

```bash
pnpm --version
```

### Paso 2: Clonar el Repositorio

```bash
git clone <repo-url>
cd gapsi-ecommerce
```

### Paso 3: Instalar Dependencias

```bash
pnpm install
```

### Paso 4: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Backend Configuration
NODE_ENV=dev
PORT=3000
APP_NAME=gapsi-ecommerce-api

# Database
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=gapsi-ecommerce-db

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# Frontend
VITE_API_URL=http://localhost:3000/api/v1
VITE_WALMART_API_URL=https://api.walmart.com
VITE_WALMART_API_KEY=your-walmart-api-key
VITE_APP_NAME=GAPSI E-Commerce
VITE_ENV=dev
```

---
