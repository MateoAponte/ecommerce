# Code Citations

## License: unknown

https://github.com/ljxyaly/nest/blob/cee5eabfe1b565b8a6e32c1e0599493a73aa6b47/src/filter/_all-exception.filter.ts

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

## 🏃 Cómo Ejecutar la Aplicación

### Opción A: Con Docker (Recomendado) ✨

La forma más sencilla y con todas las dependencias preconfiguradas:

```bash
# Iniciar todos los servicios (DB, Backend, Frontend)
pnpm run docker:up

# Acceder a la aplicación
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api/docs
# PostgreSQL: localhost:5433
```

Para detener los servicios:

```bash
pnpm run docker:down
```

Ver logs en tiempo real:

```bash
pnpm run docker:logs
```

### Opción B: Sin Docker (Local)

#### 1. Configurar PostgreSQL

**Opción 1a: Instalar PostgreSQL localmente**

```bash
# En Windows (con instalador)
# O en MacOS
brew install postgresql

# Inicia el servicio
brew services start postgresql
```

**Opción 1b: Usar Docker solo para la BD**

```bash
docker run --name postgres-gapsi \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gapsi-ecommerce-db \
  -p 5433:5432 \
  -d postgres:16
```

#### 2. Instalar dependencias de cada app

```bash
# Backend
cd apps/back
pnpm install

# Frontend (en otra terminal)
cd apps/front
pnpm install
```

#### 3. Ejecutar el Backend

```bash
cd apps/back
pnpm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

#### 4. Ejecutar el Frontend

```bash
cd apps/front
pnpm run start:dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Backend Configuration (`apps/back/config/`)

El backend usa **@nestjs/config** con validación Joi:

```typescript
// Database
- host: localhost (o 'db' en Docker)
- port: 5433 (local) o 5432 (Docker)
- username: postgres
- password: postgres (cambiar en producción)
- database: gapsi-ecommerce-db

// JWT
- secret: definir en .env JWT_SECRET
- expiresIn: 7d (configurable)

// API
- prefix: /api/v1
- timeout: 10s
```

### Frontend Configuration (`apps/front/src/common/config/`)

Variables de entorno requeridas en `.env.local`:

```javascript
VITE_API_URL; // URL del backend
VITE_WALMART_API_URL; // URL de API externa (Walmart)
VITE_WALMART_API_KEY; // API Key para Walmart
VITE_APP_NAME; // Nombre de la aplicación
VITE_ENV; // Ambiente (dev/prod)
```

### TypeORM Configuration

El backend usa **TypeORM** con sincronización automática en desarrollo:

```typescript
// En producción, usa migrations en lugar de sincronización
synchronize: false; // production
synchronize: true; // development
```

---

## ✨ Características Principales

### 🛒 Carrito de Compras

- **Drag & Drop**: Arrastra productos al carrito
- **Persistencia**: Carrito guardado en sessionStorage
- **Visual Feedback**: Animaciones al arrastrar
- Contador de items en tiempo real

### 🔐 Autenticación JWT

- **Login / Register**: Con validación de datos
- **Access Token + Refresh Token**: Tokens de acceso y renovación
- **Auto-refresh**: Renovación automática de tokens expirados
- **Encriptación AES**: Contraseñas encriptadas en tránsito
- **Protected Routes**: Rutas que requieren autenticación

### 🔍 Búsqueda de Productos

- **Infinite Scroll**: Carga dinámica de productos
- **Búsqueda en tiempo real**: Con debounce
- **Filtros**: Búsqueda por palabra clave
- **Paginación**: Sistema de páginas

### 👤 Gestión de Usuarios

- **CRUD Completo**: Crear, leer, actualizar, eliminar usuarios
- **Validación**: Datos validados en backend y frontend
- **Error Handling**: Manejo de conflictos y excepciones

### 📊 Interfaz de Usuario

- **Responsive Design**: Mobile-first con Bootstrap
- **Material UI**: Componentes profesionales
- **Toasts**: Notificaciones con react-hot-toast
- **Layouts Separados**: Public vs Private

---

## 🛣️ Rutas y Endpoints

### Frontend Routes (`/`)

| Ruta                | Descripción                        | Requerida Auth |
| ------------------- | ---------------------------------- | -------------- |
| `/auth`             | Página de login/registro           | ❌             |
| `/ecommerce`        | Listado y búsqueda de productos    | ✅             |
| `/order-processing` | Pantalla de procesamiento de orden | ✅             |
| `/*`                | Página 404 Not Found               | ❌             |

### Backend Endpoints (`/api/v1/`)

#### 🔑 Auth Endpoints

| Método | Ruta            | Descripción        | Requiere Auth |
| ------ | --------------- | ------------------ | ------------- |
| POST   | `/auth/login`   | Inicia sesión      | ❌            |
| POST   | `/auth/refresh` | Renueva token      | ❌            |
| POST   | `/auth/encrypt` | Encripta token AES | ❌            |

#### 👥 User Endpoints

| Método | Ruta        | Descripción            | Requiere Auth |
| ------ | ----------- | ---------------------- | ------------- |
| POST   | `/user`     | Crear usuario          | ❌            |
| GET    | `/user`     | Listar usuarios        | ✅ JWT        |
| GET    | `/user/:id` | Obtener usuario por ID | ✅ JWT        |
| PUT    | `/user/:id` | Actualizar usuario     | ✅ JWT        |
| DELETE | `/user/:id` | Eliminar usuario       | ✅ JWT        |

#### 🏥 Health Check

| Método | Ruta      | Descripción                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Verificar estado de la API |

### Swagger Documentation

Accede a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

---

## 🏗️ Decisiones Arquitectónicas

### 1. **SOLID Principles** 📐

El proyecto aplica principios SOLID para mantenibilidad y escalabilidad:

#### S - Single Responsibility

- **Servicios únicos**: `UserService` solo maneja usuarios, `AuthService` solo autenticación
- **Separación de capas**: Controllers, Services, Repositories
- **Hooks específicos**: `useLogin`, `useRegister`, `useDraggable` con responsabilidades claras

```typescript
// ✅ Bien: UserService solo maneja lógica de usuario
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  async findAll(): Promise<UserResponseDto[]>;
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
}
```

#### O - Open/Closed Principle

- **Módulos extensibles**: Fácil agregar nuevos módulos sin modificar existentes
- **DTOs parametrizables**: Reutilización de estructuras de datos
- **Slices de Zustand**: Fácil agregar nuevos slices sin tocar el store principal

```typescript
// ✅ Bien: Store abierto para extensión con slices
export const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
  // Agregar nuevos slices sin modificar código existente
}));
```

#### L - Liskov Substitution

- **Herencia consistente**: Services implementan interfaces comunes
- **Providers intercambiables**: JwtProvider, AesProvider son intercambiables

#### I - Interface Segregation

- **Interfaces específicas**: `IAuthSlice`, `IProductSlice` para cada dominio
- **DTOs segregados**: `LoginDto`, `CreateUserDto`, `UserResponseDto`

```typescript
// ✅ Bien: Interfaces pequeñas y específicas
export interface IAuthSlice {
  user: IUser | null;
  setSession: (payload: ISessionPayload) => void;
  logout: () => void;
}

export interface IProductSlice {
  items: IProduct[];
  addItem: (item: IProduct) => void;
}
```

#### D - Dependency Injection

- **Inyección en constructores**: NestJS maneja automáticamente las dependencias
- **Inversión de control**: Reducción de acoplamiento

```typescript
// ✅ Bien: DI automático en NestJS
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly authService: AuthService,
  ) {}
}
```

### 2. **Arquitectura Modular**

#### Backend: Separación por Dominio

```
src/
├── auth/           # Módulo de autenticación
├── user/           # Módulo de usuarios
├── common/         # Utilidades compartidas
└── app.module.ts   # Módulo raíz
```

Cada módulo es independiente e importable en otros:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
})
export class UserModule {}
```

#### Frontend: Feature-Based Structure

```
src/
├── auth/           # Feature: Autenticación
├── features/
│   └── shopping/   # Feature: E-commerce
├── common/         # Componentes y servicios compartidos
├── router/         # Configuración de rutas
└── layout/         # Layouts principales
```

Cada feature es independiente y podría extraerse a un paquete.

### 3. **Repository Pattern** 📚

Separa la lógica de acceso a datos de la lógica de negocio:

```typescript
// Repository: Solo acceso a datos
@Injectable()
export class UserRepositoryService {
  async createUser(body: CreateUserDto): Promise<User>
  async findUserById(id: string): Promise<User | null>
  async updateUser(id: string, body: UpdateUserDto): Promise<UpdateResult>
}

// Service: Lógica de negocio y validaciones
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Validaciones de negocio aquí
    const existingUser = await this.userRepository.findUserByEmail(...)
    if (existingUser) throw new ConflictException(...)
    // Luego usar repository
    return this.userRepository.createUser(...)
  }
}
```

**Beneficios:**

- Fácil testing (mockear repository)
- Lógica de negocio desacoplada de la BD
- Cambiar BD sin afectar servicios

### 4. **Carrito en sessionStorage (No en BD)**

**¿Por qué?**

- 🚀 **Performance**: No requiere queries a BD
- 💾 **Privacidad**: No persiste sin querer en servidor
- 📱 **UX**: Carrito disponible al momento (sin latencia)
- 🔄 **Stateless**: Backend no necesita mantener estado de carrito
- 🧪 **Testing**: Más fácil de testear

**Implementación:**

```typescript
// sessionStorageService: Servicio centralizado
export const sessionStorageService = {
  get(): AuthTokens | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(data: AuthTokens): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  },
};

// Zustand slice la utiliza
export const createProductSlice = (set) => ({
  items: [],
  addItem: (item: IProduct) => {
    set((state) => ({ items: [...state.items, item] }));
    // Aquí podría persistirse a sessionStorage si se requiere
  },
});
```

### 5. **Feature-Driven Development (FDD) en Frontend**

**¿Por qué?**

- 📦 **Modularidad**: Cada feature es un mini-proyecto
- 🔄 **Reutilización**: Fácil extraer a micro-front-end o monorepo
- 🧹 **Limpieza**: Eliminar feature = eliminar carpeta
- 👥 **Equipos paralelos**: Varios equipos sin conflictos
- 📈 **Escalabilidad**: Estructura crece con el proyecto

**Estructura:**

```
features/shopping/
├── components/      # Componentes específicos del feature
├── hooks/          # Hooks personalizados (useProductSearch)
├── types/          # Types y interfaces
├── services/       # Servicios HTTP
├── store/          # Slices de estado
├── schemas/        # Validaciones (Zod)
└── views/          # Pantallas principales
```

### 6. **Docker para Consistencia** 🐳

**¿Por qué?**

- 🌍 **Mismo ambiente**: Todos corren lo mismo (dev, staging, prod)
- 🔧 **Sin "funciona en mi máquina"**: Reproducible
- ⚡ **Setup rápido**: `docker-compose up` y listo
- 🚀 **Fácil deploy**: Push a registry y deploy
- 📦 **Dependencias aisladas**: Sin conflictos de versiones

**Arquitectura Docker:**

```yaml
services:
  db: # PostgreSQL
  back: # NestJS API
  front: # Nginx con React
```

### 7. **Vistas Privadas vs Públicas** 🔒

Separación clara de rutas autenticadas y públicas:

```typescript
// router.tsx
<Route element={<PublicRoute />}>
  <Route element={<PublicLayout />}>
    {publicRoutes.map(route => ...)}  // /auth
  </Route>
</Route>

<Route element={<ProtectedRoute />}>
  <Route element={<PrivateLayout />}>
    {privateRoutes.map(route => ...)}  // /ecommerce, /order-processing
  </Route>
</Route>
```

**ProtectedRoute valida autenticación:**

```typescript
export const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to={ROUTES.auth} replace />
  return <Outlet />
}
```

**Beneficios:**

- ✅ Imposible acceder a rutas privadas sin login
- 📐 Layouts diferentes por tipo de usuario
- 🎯 Redirección automática

### 8. **Servicios para Endpoints (API Abstraction)**

Centralizar llamadas HTTP en servicios:

```typescript
// authService: Abstracción de API
export const authService = {
  async login(credentials: LoginDto): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data.data
  },
  async refresh(): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/refresh')
    return data.data
  }
}

// Usar en hooks
export const useLogin = () => {
  const login = async (values: LoginFormValues) => {
    const response = await authService.login(...)  // Aquí
    setSession(response)
  }
}
```

**Beneficios:**

- 🔄 **Reutilización**: Múltiples componentes llaman a `authService`
- 🧪 **Testing**: Mock del servicio, no de HTTP
- 🔧 **Mantenimiento**: Cambiar endpoint en un solo lugar
- 📊 **Analytics**: Centralizadas en servicios

---

## 🎨 Patrones de Diseño Implementados

### 1. **Repository Pattern**

**Dónde:** `apps/back/src/user/provider/user.repository.service.ts`

```typescript
// Abstrae acceso a datos
@Injectable()
export class UserRepositoryService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

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
```

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
```

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

## 🏃 Cómo Ejecutar la Aplicación

### Opción A: Con Docker (Recomendado) ✨

La forma más sencilla y con todas las dependencias preconfiguradas:

```bash
# Iniciar todos los servicios (DB, Backend, Frontend)
pnpm run docker:up

# Acceder a la aplicación
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api/docs
# PostgreSQL: localhost:5433
```

Para detener los servicios:

```bash
pnpm run docker:down
```

Ver logs en tiempo real:

```bash
pnpm run docker:logs
```

### Opción B: Sin Docker (Local)

#### 1. Configurar PostgreSQL

**Opción 1a: Instalar PostgreSQL localmente**

```bash
# En Windows (con instalador)
# O en MacOS
brew install postgresql

# Inicia el servicio
brew services start postgresql
```

**Opción 1b: Usar Docker solo para la BD**

```bash
docker run --name postgres-gapsi \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gapsi-ecommerce-db \
  -p 5433:5432 \
  -d postgres:16
```

#### 2. Instalar dependencias de cada app

```bash
# Backend
cd apps/back
pnpm install

# Frontend (en otra terminal)
cd apps/front
pnpm install
```

#### 3. Ejecutar el Backend

```bash
cd apps/back
pnpm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

#### 4. Ejecutar el Frontend

```bash
cd apps/front
pnpm run start:dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Backend Configuration (`apps/back/config/`)

El backend usa **@nestjs/config** con validación Joi:

```typescript
// Database
- host: localhost (o 'db' en Docker)
- port: 5433 (local) o 5432 (Docker)
- username: postgres
- password: postgres (cambiar en producción)
- database: gapsi-ecommerce-db

// JWT
- secret: definir en .env JWT_SECRET
- expiresIn: 7d (configurable)

// API
- prefix: /api/v1
- timeout: 10s
```

### Frontend Configuration (`apps/front/src/common/config/`)

Variables de entorno requeridas en `.env.local`:

```javascript
VITE_API_URL; // URL del backend
VITE_WALMART_API_URL; // URL de API externa (Walmart)
VITE_WALMART_API_KEY; // API Key para Walmart
VITE_APP_NAME; // Nombre de la aplicación
VITE_ENV; // Ambiente (dev/prod)
```

### TypeORM Configuration

El backend usa **TypeORM** con sincronización automática en desarrollo:

```typescript
// En producción, usa migrations en lugar de sincronización
synchronize: false; // production
synchronize: true; // development
```

---

## ✨ Características Principales

### 🛒 Carrito de Compras

- **Drag & Drop**: Arrastra productos al carrito
- **Persistencia**: Carrito guardado en sessionStorage
- **Visual Feedback**: Animaciones al arrastrar
- Contador de items en tiempo real

### 🔐 Autenticación JWT

- **Login / Register**: Con validación de datos
- **Access Token + Refresh Token**: Tokens de acceso y renovación
- **Auto-refresh**: Renovación automática de tokens expirados
- **Encriptación AES**: Contraseñas encriptadas en tránsito
- **Protected Routes**: Rutas que requieren autenticación

### 🔍 Búsqueda de Productos

- **Infinite Scroll**: Carga dinámica de productos
- **Búsqueda en tiempo real**: Con debounce
- **Filtros**: Búsqueda por palabra clave
- **Paginación**: Sistema de páginas

### 👤 Gestión de Usuarios

- **CRUD Completo**: Crear, leer, actualizar, eliminar usuarios
- **Validación**: Datos validados en backend y frontend
- **Error Handling**: Manejo de conflictos y excepciones

### 📊 Interfaz de Usuario

- **Responsive Design**: Mobile-first con Bootstrap
- **Material UI**: Componentes profesionales
- **Toasts**: Notificaciones con react-hot-toast
- **Layouts Separados**: Public vs Private

---

## 🛣️ Rutas y Endpoints

### Frontend Routes (`/`)

| Ruta                | Descripción                        | Requerida Auth |
| ------------------- | ---------------------------------- | -------------- |
| `/auth`             | Página de login/registro           | ❌             |
| `/ecommerce`        | Listado y búsqueda de productos    | ✅             |
| `/order-processing` | Pantalla de procesamiento de orden | ✅             |
| `/*`                | Página 404 Not Found               | ❌             |

### Backend Endpoints (`/api/v1/`)

#### 🔑 Auth Endpoints

| Método | Ruta            | Descripción        | Requiere Auth |
| ------ | --------------- | ------------------ | ------------- |
| POST   | `/auth/login`   | Inicia sesión      | ❌            |
| POST   | `/auth/refresh` | Renueva token      | ❌            |
| POST   | `/auth/encrypt` | Encripta token AES | ❌            |

#### 👥 User Endpoints

| Método | Ruta        | Descripción            | Requiere Auth |
| ------ | ----------- | ---------------------- | ------------- |
| POST   | `/user`     | Crear usuario          | ❌            |
| GET    | `/user`     | Listar usuarios        | ✅ JWT        |
| GET    | `/user/:id` | Obtener usuario por ID | ✅ JWT        |
| PUT    | `/user/:id` | Actualizar usuario     | ✅ JWT        |
| DELETE | `/user/:id` | Eliminar usuario       | ✅ JWT        |

#### 🏥 Health Check

| Método | Ruta      | Descripción                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Verificar estado de la API |

### Swagger Documentation

Accede a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

---

## 🏗️ Decisiones Arquitectónicas

### 1. **SOLID Principles** 📐

El proyecto aplica principios SOLID para mantenibilidad y escalabilidad:

#### S - Single Responsibility

- **Servicios únicos**: `UserService` solo maneja usuarios, `AuthService` solo autenticación
- **Separación de capas**: Controllers, Services, Repositories
- **Hooks específicos**: `useLogin`, `useRegister`, `useDraggable` con responsabilidades claras

```typescript
// ✅ Bien: UserService solo maneja lógica de usuario
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  async findAll(): Promise<UserResponseDto[]>;
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
}
```

#### O - Open/Closed Principle

- **Módulos extensibles**: Fácil agregar nuevos módulos sin modificar existentes
- **DTOs parametrizables**: Reutilización de estructuras de datos
- **Slices de Zustand**: Fácil agregar nuevos slices sin tocar el store principal

```typescript
// ✅ Bien: Store abierto para extensión con slices
export const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
  // Agregar nuevos slices sin modificar código existente
}));
```

#### L - Liskov Substitution

- **Herencia consistente**: Services implementan interfaces comunes
- **Providers intercambiables**: JwtProvider, AesProvider son intercambiables

#### I - Interface Segregation

- **Interfaces específicas**: `IAuthSlice`, `IProductSlice` para cada dominio
- **DTOs segregados**: `LoginDto`, `CreateUserDto`, `UserResponseDto`

```typescript
// ✅ Bien: Interfaces pequeñas y específicas
export interface IAuthSlice {
  user: IUser | null;
  setSession: (payload: ISessionPayload) => void;
  logout: () => void;
}

export interface IProductSlice {
  items: IProduct[];
  addItem: (item: IProduct) => void;
}
```

#### D - Dependency Injection

- **Inyección en constructores**: NestJS maneja automáticamente las dependencias
- **Inversión de control**: Reducción de acoplamiento

```typescript
// ✅ Bien: DI automático en NestJS
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly authService: AuthService,
  ) {}
}
```

### 2. **Arquitectura Modular**

#### Backend: Separación por Dominio

```
src/
├── auth/           # Módulo de autenticación
├── user/           # Módulo de usuarios
├── common/         # Utilidades compartidas
└── app.module.ts   # Módulo raíz
```

Cada módulo es independiente e importable en otros:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
})
export class UserModule {}
```

#### Frontend: Feature-Based Structure

```
src/
├── auth/           # Feature: Autenticación
├── features/
│   └── shopping/   # Feature: E-commerce
├── common/         # Componentes y servicios compartidos
├── router/         # Configuración de rutas
└── layout/         # Layouts principales
```

Cada feature es independiente y podría extraerse a un paquete.

### 3. **Repository Pattern** 📚

Separa la lógica de acceso a datos de la lógica de negocio:

```typescript
// Repository: Solo acceso a datos
@Injectable()
export class UserRepositoryService {
  async createUser(body: CreateUserDto): Promise<User>
  async findUserById(id: string): Promise<User | null>
  async updateUser(id: string, body: UpdateUserDto): Promise<UpdateResult>
}

// Service: Lógica de negocio y validaciones
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Validaciones de negocio aquí
    const existingUser = await this.userRepository.findUserByEmail(...)
    if (existingUser) throw new ConflictException(...)
    // Luego usar repository
    return this.userRepository.createUser(...)
  }
}
```

**Beneficios:**

- Fácil testing (mockear repository)
- Lógica de negocio desacoplada de la BD
- Cambiar BD sin afectar servicios

### 4. **Carrito en sessionStorage (No en BD)**

**¿Por qué?**

- 🚀 **Performance**: No requiere queries a BD
- 💾 **Privacidad**: No persiste sin querer en servidor
- 📱 **UX**: Carrito disponible al momento (sin latencia)
- 🔄 **Stateless**: Backend no necesita mantener estado de carrito
- 🧪 **Testing**: Más fácil de testear

**Implementación:**

```typescript
// sessionStorageService: Servicio centralizado
export const sessionStorageService = {
  get(): AuthTokens | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(data: AuthTokens): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  },
};

// Zustand slice la utiliza
export const createProductSlice = (set) => ({
  items: [],
  addItem: (item: IProduct) => {
    set((state) => ({ items: [...state.items, item] }));
    // Aquí podría persistirse a sessionStorage si se requiere
  },
});
```

### 5. **Feature-Driven Development (FDD) en Frontend**

**¿Por qué?**

- 📦 **Modularidad**: Cada feature es un mini-proyecto
- 🔄 **Reutilización**: Fácil extraer a micro-front-end o monorepo
- 🧹 **Limpieza**: Eliminar feature = eliminar carpeta
- 👥 **Equipos paralelos**: Varios equipos sin conflictos
- 📈 **Escalabilidad**: Estructura crece con el proyecto

**Estructura:**

```
features/shopping/
├── components/      # Componentes específicos del feature
├── hooks/          # Hooks personalizados (useProductSearch)
├── types/          # Types y interfaces
├── services/       # Servicios HTTP
├── store/          # Slices de estado
├── schemas/        # Validaciones (Zod)
└── views/          # Pantallas principales
```

### 6. **Docker para Consistencia** 🐳

**¿Por qué?**

- 🌍 **Mismo ambiente**: Todos corren lo mismo (dev, staging, prod)
- 🔧 **Sin "funciona en mi máquina"**: Reproducible
- ⚡ **Setup rápido**: `docker-compose up` y listo
- 🚀 **Fácil deploy**: Push a registry y deploy
- 📦 **Dependencias aisladas**: Sin conflictos de versiones

**Arquitectura Docker:**

```yaml
services:
  db: # PostgreSQL
  back: # NestJS API
  front: # Nginx con React
```

### 7. **Vistas Privadas vs Públicas** 🔒

Separación clara de rutas autenticadas y públicas:

```typescript
// router.tsx
<Route element={<PublicRoute />}>
  <Route element={<PublicLayout />}>
    {publicRoutes.map(route => ...)}  // /auth
  </Route>
</Route>

<Route element={<ProtectedRoute />}>
  <Route element={<PrivateLayout />}>
    {privateRoutes.map(route => ...)}  // /ecommerce, /order-processing
  </Route>
</Route>
```

**ProtectedRoute valida autenticación:**

```typescript
export const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to={ROUTES.auth} replace />
  return <Outlet />
}
```

**Beneficios:**

- ✅ Imposible acceder a rutas privadas sin login
- 📐 Layouts diferentes por tipo de usuario
- 🎯 Redirección automática

### 8. **Servicios para Endpoints (API Abstraction)**

Centralizar llamadas HTTP en servicios:

```typescript
// authService: Abstracción de API
export const authService = {
  async login(credentials: LoginDto): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data.data
  },
  async refresh(): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/refresh')
    return data.data
  }
}

// Usar en hooks
export const useLogin = () => {
  const login = async (values: LoginFormValues) => {
    const response = await authService.login(...)  // Aquí
    setSession(response)
  }
}
```

**Beneficios:**

- 🔄 **Reutilización**: Múltiples componentes llaman a `authService`
- 🧪 **Testing**: Mock del servicio, no de HTTP
- 🔧 **Mantenimiento**: Cambiar endpoint en un solo lugar
- 📊 **Analytics**: Centralizadas en servicios

---

## 🎨 Patrones de Diseño Implementados

### 1. **Repository Pattern**

**Dónde:** `apps/back/src/user/provider/user.repository.service.ts`

```typescript
// Abstrae acceso a datos
@Injectable()
export class UserRepositoryService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

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
```

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
```

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

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    })
  }
```

## License: unknown

https://github.com/ljxyaly/nest/blob/cee5eabfe1b565b8a6e32c1e0599493a73aa6b47/src/filter/_all-exception.filter.ts

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

## 🏃 Cómo Ejecutar la Aplicación

### Opción A: Con Docker (Recomendado) ✨

La forma más sencilla y con todas las dependencias preconfiguradas:

```bash
# Iniciar todos los servicios (DB, Backend, Frontend)
pnpm run docker:up

# Acceder a la aplicación
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api/docs
# PostgreSQL: localhost:5433
```

Para detener los servicios:

```bash
pnpm run docker:down
```

Ver logs en tiempo real:

```bash
pnpm run docker:logs
```

### Opción B: Sin Docker (Local)

#### 1. Configurar PostgreSQL

**Opción 1a: Instalar PostgreSQL localmente**

```bash
# En Windows (con instalador)
# O en MacOS
brew install postgresql

# Inicia el servicio
brew services start postgresql
```

**Opción 1b: Usar Docker solo para la BD**

```bash
docker run --name postgres-gapsi \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gapsi-ecommerce-db \
  -p 5433:5432 \
  -d postgres:16
```

#### 2. Instalar dependencias de cada app

```bash
# Backend
cd apps/back
pnpm install

# Frontend (en otra terminal)
cd apps/front
pnpm install
```

#### 3. Ejecutar el Backend

```bash
cd apps/back
pnpm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

#### 4. Ejecutar el Frontend

```bash
cd apps/front
pnpm run start:dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Backend Configuration (`apps/back/config/`)

El backend usa **@nestjs/config** con validación Joi:

```typescript
// Database
- host: localhost (o 'db' en Docker)
- port: 5433 (local) o 5432 (Docker)
- username: postgres
- password: postgres (cambiar en producción)
- database: gapsi-ecommerce-db

// JWT
- secret: definir en .env JWT_SECRET
- expiresIn: 7d (configurable)

// API
- prefix: /api/v1
- timeout: 10s
```

### Frontend Configuration (`apps/front/src/common/config/`)

Variables de entorno requeridas en `.env.local`:

```javascript
VITE_API_URL; // URL del backend
VITE_WALMART_API_URL; // URL de API externa (Walmart)
VITE_WALMART_API_KEY; // API Key para Walmart
VITE_APP_NAME; // Nombre de la aplicación
VITE_ENV; // Ambiente (dev/prod)
```

### TypeORM Configuration

El backend usa **TypeORM** con sincronización automática en desarrollo:

```typescript
// En producción, usa migrations en lugar de sincronización
synchronize: false; // production
synchronize: true; // development
```

---

## ✨ Características Principales

### 🛒 Carrito de Compras

- **Drag & Drop**: Arrastra productos al carrito
- **Persistencia**: Carrito guardado en sessionStorage
- **Visual Feedback**: Animaciones al arrastrar
- Contador de items en tiempo real

### 🔐 Autenticación JWT

- **Login / Register**: Con validación de datos
- **Access Token + Refresh Token**: Tokens de acceso y renovación
- **Auto-refresh**: Renovación automática de tokens expirados
- **Encriptación AES**: Contraseñas encriptadas en tránsito
- **Protected Routes**: Rutas que requieren autenticación

### 🔍 Búsqueda de Productos

- **Infinite Scroll**: Carga dinámica de productos
- **Búsqueda en tiempo real**: Con debounce
- **Filtros**: Búsqueda por palabra clave
- **Paginación**: Sistema de páginas

### 👤 Gestión de Usuarios

- **CRUD Completo**: Crear, leer, actualizar, eliminar usuarios
- **Validación**: Datos validados en backend y frontend
- **Error Handling**: Manejo de conflictos y excepciones

### 📊 Interfaz de Usuario

- **Responsive Design**: Mobile-first con Bootstrap
- **Material UI**: Componentes profesionales
- **Toasts**: Notificaciones con react-hot-toast
- **Layouts Separados**: Public vs Private

---

## 🛣️ Rutas y Endpoints

### Frontend Routes (`/`)

| Ruta                | Descripción                        | Requerida Auth |
| ------------------- | ---------------------------------- | -------------- |
| `/auth`             | Página de login/registro           | ❌             |
| `/ecommerce`        | Listado y búsqueda de productos    | ✅             |
| `/order-processing` | Pantalla de procesamiento de orden | ✅             |
| `/*`                | Página 404 Not Found               | ❌             |

### Backend Endpoints (`/api/v1/`)

#### 🔑 Auth Endpoints

| Método | Ruta            | Descripción        | Requiere Auth |
| ------ | --------------- | ------------------ | ------------- |
| POST   | `/auth/login`   | Inicia sesión      | ❌            |
| POST   | `/auth/refresh` | Renueva token      | ❌            |
| POST   | `/auth/encrypt` | Encripta token AES | ❌            |

#### 👥 User Endpoints

| Método | Ruta        | Descripción            | Requiere Auth |
| ------ | ----------- | ---------------------- | ------------- |
| POST   | `/user`     | Crear usuario          | ❌            |
| GET    | `/user`     | Listar usuarios        | ✅ JWT        |
| GET    | `/user/:id` | Obtener usuario por ID | ✅ JWT        |
| PUT    | `/user/:id` | Actualizar usuario     | ✅ JWT        |
| DELETE | `/user/:id` | Eliminar usuario       | ✅ JWT        |

#### 🏥 Health Check

| Método | Ruta      | Descripción                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Verificar estado de la API |

### Swagger Documentation

Accede a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

---

## 🏗️ Decisiones Arquitectónicas

### 1. **SOLID Principles** 📐

El proyecto aplica principios SOLID para mantenibilidad y escalabilidad:

#### S - Single Responsibility

- **Servicios únicos**: `UserService` solo maneja usuarios, `AuthService` solo autenticación
- **Separación de capas**: Controllers, Services, Repositories
- **Hooks específicos**: `useLogin`, `useRegister`, `useDraggable` con responsabilidades claras

```typescript
// ✅ Bien: UserService solo maneja lógica de usuario
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  async findAll(): Promise<UserResponseDto[]>;
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
}
```

#### O - Open/Closed Principle

- **Módulos extensibles**: Fácil agregar nuevos módulos sin modificar existentes
- **DTOs parametrizables**: Reutilización de estructuras de datos
- **Slices de Zustand**: Fácil agregar nuevos slices sin tocar el store principal

```typescript
// ✅ Bien: Store abierto para extensión con slices
export const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
  // Agregar nuevos slices sin modificar código existente
}));
```

#### L - Liskov Substitution

- **Herencia consistente**: Services implementan interfaces comunes
- **Providers intercambiables**: JwtProvider, AesProvider son intercambiables

#### I - Interface Segregation

- **Interfaces específicas**: `IAuthSlice`, `IProductSlice` para cada dominio
- **DTOs segregados**: `LoginDto`, `CreateUserDto`, `UserResponseDto`

```typescript
// ✅ Bien: Interfaces pequeñas y específicas
export interface IAuthSlice {
  user: IUser | null;
  setSession: (payload: ISessionPayload) => void;
  logout: () => void;
}

export interface IProductSlice {
  items: IProduct[];
  addItem: (item: IProduct) => void;
}
```

#### D - Dependency Injection

- **Inyección en constructores**: NestJS maneja automáticamente las dependencias
- **Inversión de control**: Reducción de acoplamiento

```typescript
// ✅ Bien: DI automático en NestJS
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly authService: AuthService,
  ) {}
}
```

### 2. **Arquitectura Modular**

#### Backend: Separación por Dominio

```
src/
├── auth/           # Módulo de autenticación
├── user/           # Módulo de usuarios
├── common/         # Utilidades compartidas
└── app.module.ts   # Módulo raíz
```

Cada módulo es independiente e importable en otros:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
})
export class UserModule {}
```

#### Frontend: Feature-Based Structure

```
src/
├── auth/           # Feature: Autenticación
├── features/
│   └── shopping/   # Feature: E-commerce
├── common/         # Componentes y servicios compartidos
├── router/         # Configuración de rutas
└── layout/         # Layouts principales
```

Cada feature es independiente y podría extraerse a un paquete.

### 3. **Repository Pattern** 📚

Separa la lógica de acceso a datos de la lógica de negocio:

```typescript
// Repository: Solo acceso a datos
@Injectable()
export class UserRepositoryService {
  async createUser(body: CreateUserDto): Promise<User>
  async findUserById(id: string): Promise<User | null>
  async updateUser(id: string, body: UpdateUserDto): Promise<UpdateResult>
}

// Service: Lógica de negocio y validaciones
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Validaciones de negocio aquí
    const existingUser = await this.userRepository.findUserByEmail(...)
    if (existingUser) throw new ConflictException(...)
    // Luego usar repository
    return this.userRepository.createUser(...)
  }
}
```

**Beneficios:**

- Fácil testing (mockear repository)
- Lógica de negocio desacoplada de la BD
- Cambiar BD sin afectar servicios

### 4. **Carrito en sessionStorage (No en BD)**

**¿Por qué?**

- 🚀 **Performance**: No requiere queries a BD
- 💾 **Privacidad**: No persiste sin querer en servidor
- 📱 **UX**: Carrito disponible al momento (sin latencia)
- 🔄 **Stateless**: Backend no necesita mantener estado de carrito
- 🧪 **Testing**: Más fácil de testear

**Implementación:**

```typescript
// sessionStorageService: Servicio centralizado
export const sessionStorageService = {
  get(): AuthTokens | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(data: AuthTokens): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  },
};

// Zustand slice la utiliza
export const createProductSlice = (set) => ({
  items: [],
  addItem: (item: IProduct) => {
    set((state) => ({ items: [...state.items, item] }));
    // Aquí podría persistirse a sessionStorage si se requiere
  },
});
```

### 5. **Feature-Driven Development (FDD) en Frontend**

**¿Por qué?**

- 📦 **Modularidad**: Cada feature es un mini-proyecto
- 🔄 **Reutilización**: Fácil extraer a micro-front-end o monorepo
- 🧹 **Limpieza**: Eliminar feature = eliminar carpeta
- 👥 **Equipos paralelos**: Varios equipos sin conflictos
- 📈 **Escalabilidad**: Estructura crece con el proyecto

**Estructura:**

```
features/shopping/
├── components/      # Componentes específicos del feature
├── hooks/          # Hooks personalizados (useProductSearch)
├── types/          # Types y interfaces
├── services/       # Servicios HTTP
├── store/          # Slices de estado
├── schemas/        # Validaciones (Zod)
└── views/          # Pantallas principales
```

### 6. **Docker para Consistencia** 🐳

**¿Por qué?**

- 🌍 **Mismo ambiente**: Todos corren lo mismo (dev, staging, prod)
- 🔧 **Sin "funciona en mi máquina"**: Reproducible
- ⚡ **Setup rápido**: `docker-compose up` y listo
- 🚀 **Fácil deploy**: Push a registry y deploy
- 📦 **Dependencias aisladas**: Sin conflictos de versiones

**Arquitectura Docker:**

```yaml
services:
  db: # PostgreSQL
  back: # NestJS API
  front: # Nginx con React
```

### 7. **Vistas Privadas vs Públicas** 🔒

Separación clara de rutas autenticadas y públicas:

```typescript
// router.tsx
<Route element={<PublicRoute />}>
  <Route element={<PublicLayout />}>
    {publicRoutes.map(route => ...)}  // /auth
  </Route>
</Route>

<Route element={<ProtectedRoute />}>
  <Route element={<PrivateLayout />}>
    {privateRoutes.map(route => ...)}  // /ecommerce, /order-processing
  </Route>
</Route>
```

**ProtectedRoute valida autenticación:**

```typescript
export const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to={ROUTES.auth} replace />
  return <Outlet />
}
```

**Beneficios:**

- ✅ Imposible acceder a rutas privadas sin login
- 📐 Layouts diferentes por tipo de usuario
- 🎯 Redirección automática

### 8. **Servicios para Endpoints (API Abstraction)**

Centralizar llamadas HTTP en servicios:

```typescript
// authService: Abstracción de API
export const authService = {
  async login(credentials: LoginDto): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data.data
  },
  async refresh(): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/refresh')
    return data.data
  }
}

// Usar en hooks
export const useLogin = () => {
  const login = async (values: LoginFormValues) => {
    const response = await authService.login(...)  // Aquí
    setSession(response)
  }
}
```

**Beneficios:**

- 🔄 **Reutilización**: Múltiples componentes llaman a `authService`
- 🧪 **Testing**: Mock del servicio, no de HTTP
- 🔧 **Mantenimiento**: Cambiar endpoint en un solo lugar
- 📊 **Analytics**: Centralizadas en servicios

---

## 🎨 Patrones de Diseño Implementados

### 1. **Repository Pattern**

**Dónde:** `apps/back/src/user/provider/user.repository.service.ts`

```typescript
// Abstrae acceso a datos
@Injectable()
export class UserRepositoryService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

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
```

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
```

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

## 🏃 Cómo Ejecutar la Aplicación

### Opción A: Con Docker (Recomendado) ✨

La forma más sencilla y con todas las dependencias preconfiguradas:

```bash
# Iniciar todos los servicios (DB, Backend, Frontend)
pnpm run docker:up

# Acceder a la aplicación
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api/docs
# PostgreSQL: localhost:5433
```

Para detener los servicios:

```bash
pnpm run docker:down
```

Ver logs en tiempo real:

```bash
pnpm run docker:logs
```

### Opción B: Sin Docker (Local)

#### 1. Configurar PostgreSQL

**Opción 1a: Instalar PostgreSQL localmente**

```bash
# En Windows (con instalador)
# O en MacOS
brew install postgresql

# Inicia el servicio
brew services start postgresql
```

**Opción 1b: Usar Docker solo para la BD**

```bash
docker run --name postgres-gapsi \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gapsi-ecommerce-db \
  -p 5433:5432 \
  -d postgres:16
```

#### 2. Instalar dependencias de cada app

```bash
# Backend
cd apps/back
pnpm install

# Frontend (en otra terminal)
cd apps/front
pnpm install
```

#### 3. Ejecutar el Backend

```bash
cd apps/back
pnpm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

#### 4. Ejecutar el Frontend

```bash
cd apps/front
pnpm run start:dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Backend Configuration (`apps/back/config/`)

El backend usa **@nestjs/config** con validación Joi:

```typescript
// Database
- host: localhost (o 'db' en Docker)
- port: 5433 (local) o 5432 (Docker)
- username: postgres
- password: postgres (cambiar en producción)
- database: gapsi-ecommerce-db

// JWT
- secret: definir en .env JWT_SECRET
- expiresIn: 7d (configurable)

// API
- prefix: /api/v1
- timeout: 10s
```

### Frontend Configuration (`apps/front/src/common/config/`)

Variables de entorno requeridas en `.env.local`:

```javascript
VITE_API_URL; // URL del backend
VITE_WALMART_API_URL; // URL de API externa (Walmart)
VITE_WALMART_API_KEY; // API Key para Walmart
VITE_APP_NAME; // Nombre de la aplicación
VITE_ENV; // Ambiente (dev/prod)
```

### TypeORM Configuration

El backend usa **TypeORM** con sincronización automática en desarrollo:

```typescript
// En producción, usa migrations en lugar de sincronización
synchronize: false; // production
synchronize: true; // development
```

---

## ✨ Características Principales

### 🛒 Carrito de Compras

- **Drag & Drop**: Arrastra productos al carrito
- **Persistencia**: Carrito guardado en sessionStorage
- **Visual Feedback**: Animaciones al arrastrar
- Contador de items en tiempo real

### 🔐 Autenticación JWT

- **Login / Register**: Con validación de datos
- **Access Token + Refresh Token**: Tokens de acceso y renovación
- **Auto-refresh**: Renovación automática de tokens expirados
- **Encriptación AES**: Contraseñas encriptadas en tránsito
- **Protected Routes**: Rutas que requieren autenticación

### 🔍 Búsqueda de Productos

- **Infinite Scroll**: Carga dinámica de productos
- **Búsqueda en tiempo real**: Con debounce
- **Filtros**: Búsqueda por palabra clave
- **Paginación**: Sistema de páginas

### 👤 Gestión de Usuarios

- **CRUD Completo**: Crear, leer, actualizar, eliminar usuarios
- **Validación**: Datos validados en backend y frontend
- **Error Handling**: Manejo de conflictos y excepciones

### 📊 Interfaz de Usuario

- **Responsive Design**: Mobile-first con Bootstrap
- **Material UI**: Componentes profesionales
- **Toasts**: Notificaciones con react-hot-toast
- **Layouts Separados**: Public vs Private

---

## 🛣️ Rutas y Endpoints

### Frontend Routes (`/`)

| Ruta                | Descripción                        | Requerida Auth |
| ------------------- | ---------------------------------- | -------------- |
| `/auth`             | Página de login/registro           | ❌             |
| `/ecommerce`        | Listado y búsqueda de productos    | ✅             |
| `/order-processing` | Pantalla de procesamiento de orden | ✅             |
| `/*`                | Página 404 Not Found               | ❌             |

### Backend Endpoints (`/api/v1/`)

#### 🔑 Auth Endpoints

| Método | Ruta            | Descripción        | Requiere Auth |
| ------ | --------------- | ------------------ | ------------- |
| POST   | `/auth/login`   | Inicia sesión      | ❌            |
| POST   | `/auth/refresh` | Renueva token      | ❌            |
| POST   | `/auth/encrypt` | Encripta token AES | ❌            |

#### 👥 User Endpoints

| Método | Ruta        | Descripción            | Requiere Auth |
| ------ | ----------- | ---------------------- | ------------- |
| POST   | `/user`     | Crear usuario          | ❌            |
| GET    | `/user`     | Listar usuarios        | ✅ JWT        |
| GET    | `/user/:id` | Obtener usuario por ID | ✅ JWT        |
| PUT    | `/user/:id` | Actualizar usuario     | ✅ JWT        |
| DELETE | `/user/:id` | Eliminar usuario       | ✅ JWT        |

#### 🏥 Health Check

| Método | Ruta      | Descripción                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Verificar estado de la API |

### Swagger Documentation

Accede a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

---

## 🏗️ Decisiones Arquitectónicas

### 1. **SOLID Principles** 📐

El proyecto aplica principios SOLID para mantenibilidad y escalabilidad:

#### S - Single Responsibility

- **Servicios únicos**: `UserService` solo maneja usuarios, `AuthService` solo autenticación
- **Separación de capas**: Controllers, Services, Repositories
- **Hooks específicos**: `useLogin`, `useRegister`, `useDraggable` con responsabilidades claras

```typescript
// ✅ Bien: UserService solo maneja lógica de usuario
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  async findAll(): Promise<UserResponseDto[]>;
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
}
```

#### O - Open/Closed Principle

- **Módulos extensibles**: Fácil agregar nuevos módulos sin modificar existentes
- **DTOs parametrizables**: Reutilización de estructuras de datos
- **Slices de Zustand**: Fácil agregar nuevos slices sin tocar el store principal

```typescript
// ✅ Bien: Store abierto para extensión con slices
export const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
  // Agregar nuevos slices sin modificar código existente
}));
```

#### L - Liskov Substitution

- **Herencia consistente**: Services implementan interfaces comunes
- **Providers intercambiables**: JwtProvider, AesProvider son intercambiables

#### I - Interface Segregation

- **Interfaces específicas**: `IAuthSlice`, `IProductSlice` para cada dominio
- **DTOs segregados**: `LoginDto`, `CreateUserDto`, `UserResponseDto`

```typescript
// ✅ Bien: Interfaces pequeñas y específicas
export interface IAuthSlice {
  user: IUser | null;
  setSession: (payload: ISessionPayload) => void;
  logout: () => void;
}

export interface IProductSlice {
  items: IProduct[];
  addItem: (item: IProduct) => void;
}
```

#### D - Dependency Injection

- **Inyección en constructores**: NestJS maneja automáticamente las dependencias
- **Inversión de control**: Reducción de acoplamiento

```typescript
// ✅ Bien: DI automático en NestJS
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly authService: AuthService,
  ) {}
}
```

### 2. **Arquitectura Modular**

#### Backend: Separación por Dominio

```
src/
├── auth/           # Módulo de autenticación
├── user/           # Módulo de usuarios
├── common/         # Utilidades compartidas
└── app.module.ts   # Módulo raíz
```

Cada módulo es independiente e importable en otros:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
})
export class UserModule {}
```

#### Frontend: Feature-Based Structure

```
src/
├── auth/           # Feature: Autenticación
├── features/
│   └── shopping/   # Feature: E-commerce
├── common/         # Componentes y servicios compartidos
├── router/         # Configuración de rutas
└── layout/         # Layouts principales
```

Cada feature es independiente y podría extraerse a un paquete.

### 3. **Repository Pattern** 📚

Separa la lógica de acceso a datos de la lógica de negocio:

```typescript
// Repository: Solo acceso a datos
@Injectable()
export class UserRepositoryService {
  async createUser(body: CreateUserDto): Promise<User>
  async findUserById(id: string): Promise<User | null>
  async updateUser(id: string, body: UpdateUserDto): Promise<UpdateResult>
}

// Service: Lógica de negocio y validaciones
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Validaciones de negocio aquí
    const existingUser = await this.userRepository.findUserByEmail(...)
    if (existingUser) throw new ConflictException(...)
    // Luego usar repository
    return this.userRepository.createUser(...)
  }
}
```

**Beneficios:**

- Fácil testing (mockear repository)
- Lógica de negocio desacoplada de la BD
- Cambiar BD sin afectar servicios

### 4. **Carrito en sessionStorage (No en BD)**

**¿Por qué?**

- 🚀 **Performance**: No requiere queries a BD
- 💾 **Privacidad**: No persiste sin querer en servidor
- 📱 **UX**: Carrito disponible al momento (sin latencia)
- 🔄 **Stateless**: Backend no necesita mantener estado de carrito
- 🧪 **Testing**: Más fácil de testear

**Implementación:**

```typescript
// sessionStorageService: Servicio centralizado
export const sessionStorageService = {
  get(): AuthTokens | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(data: AuthTokens): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  },
};

// Zustand slice la utiliza
export const createProductSlice = (set) => ({
  items: [],
  addItem: (item: IProduct) => {
    set((state) => ({ items: [...state.items, item] }));
    // Aquí podría persistirse a sessionStorage si se requiere
  },
});
```

### 5. **Feature-Driven Development (FDD) en Frontend**

**¿Por qué?**

- 📦 **Modularidad**: Cada feature es un mini-proyecto
- 🔄 **Reutilización**: Fácil extraer a micro-front-end o monorepo
- 🧹 **Limpieza**: Eliminar feature = eliminar carpeta
- 👥 **Equipos paralelos**: Varios equipos sin conflictos
- 📈 **Escalabilidad**: Estructura crece con el proyecto

**Estructura:**

```
features/shopping/
├── components/      # Componentes específicos del feature
├── hooks/          # Hooks personalizados (useProductSearch)
├── types/          # Types y interfaces
├── services/       # Servicios HTTP
├── store/          # Slices de estado
├── schemas/        # Validaciones (Zod)
└── views/          # Pantallas principales
```

### 6. **Docker para Consistencia** 🐳

**¿Por qué?**

- 🌍 **Mismo ambiente**: Todos corren lo mismo (dev, staging, prod)
- 🔧 **Sin "funciona en mi máquina"**: Reproducible
- ⚡ **Setup rápido**: `docker-compose up` y listo
- 🚀 **Fácil deploy**: Push a registry y deploy
- 📦 **Dependencias aisladas**: Sin conflictos de versiones

**Arquitectura Docker:**

```yaml
services:
  db: # PostgreSQL
  back: # NestJS API
  front: # Nginx con React
```

### 7. **Vistas Privadas vs Públicas** 🔒

Separación clara de rutas autenticadas y públicas:

```typescript
// router.tsx
<Route element={<PublicRoute />}>
  <Route element={<PublicLayout />}>
    {publicRoutes.map(route => ...)}  // /auth
  </Route>
</Route>

<Route element={<ProtectedRoute />}>
  <Route element={<PrivateLayout />}>
    {privateRoutes.map(route => ...)}  // /ecommerce, /order-processing
  </Route>
</Route>
```

**ProtectedRoute valida autenticación:**

```typescript
export const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to={ROUTES.auth} replace />
  return <Outlet />
}
```

**Beneficios:**

- ✅ Imposible acceder a rutas privadas sin login
- 📐 Layouts diferentes por tipo de usuario
- 🎯 Redirección automática

### 8. **Servicios para Endpoints (API Abstraction)**

Centralizar llamadas HTTP en servicios:

```typescript
// authService: Abstracción de API
export const authService = {
  async login(credentials: LoginDto): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data.data
  },
  async refresh(): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/refresh')
    return data.data
  }
}

// Usar en hooks
export const useLogin = () => {
  const login = async (values: LoginFormValues) => {
    const response = await authService.login(...)  // Aquí
    setSession(response)
  }
}
```

**Beneficios:**

- 🔄 **Reutilización**: Múltiples componentes llaman a `authService`
- 🧪 **Testing**: Mock del servicio, no de HTTP
- 🔧 **Mantenimiento**: Cambiar endpoint en un solo lugar
- 📊 **Analytics**: Centralizadas en servicios

---

## 🎨 Patrones de Diseño Implementados

### 1. **Repository Pattern**

**Dónde:** `apps/back/src/user/provider/user.repository.service.ts`

```typescript
// Abstrae acceso a datos
@Injectable()
export class UserRepositoryService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

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
```

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
```

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

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    })
  }
```

## License: unknown

https://github.com/ljxyaly/nest/blob/cee5eabfe1b565b8a6e32c1e0599493a73aa6b47/src/filter/_all-exception.filter.ts

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

## 🏃 Cómo Ejecutar la Aplicación

### Opción A: Con Docker (Recomendado) ✨

La forma más sencilla y con todas las dependencias preconfiguradas:

```bash
# Iniciar todos los servicios (DB, Backend, Frontend)
pnpm run docker:up

# Acceder a la aplicación
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api/docs
# PostgreSQL: localhost:5433
```

Para detener los servicios:

```bash
pnpm run docker:down
```

Ver logs en tiempo real:

```bash
pnpm run docker:logs
```

### Opción B: Sin Docker (Local)

#### 1. Configurar PostgreSQL

**Opción 1a: Instalar PostgreSQL localmente**

```bash
# En Windows (con instalador)
# O en MacOS
brew install postgresql

# Inicia el servicio
brew services start postgresql
```

**Opción 1b: Usar Docker solo para la BD**

```bash
docker run --name postgres-gapsi \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gapsi-ecommerce-db \
  -p 5433:5432 \
  -d postgres:16
```

#### 2. Instalar dependencias de cada app

```bash
# Backend
cd apps/back
pnpm install

# Frontend (en otra terminal)
cd apps/front
pnpm install
```

#### 3. Ejecutar el Backend

```bash
cd apps/back
pnpm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

#### 4. Ejecutar el Frontend

```bash
cd apps/front
pnpm run start:dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Backend Configuration (`apps/back/config/`)

El backend usa **@nestjs/config** con validación Joi:

```typescript
// Database
- host: localhost (o 'db' en Docker)
- port: 5433 (local) o 5432 (Docker)
- username: postgres
- password: postgres (cambiar en producción)
- database: gapsi-ecommerce-db

// JWT
- secret: definir en .env JWT_SECRET
- expiresIn: 7d (configurable)

// API
- prefix: /api/v1
- timeout: 10s
```

### Frontend Configuration (`apps/front/src/common/config/`)

Variables de entorno requeridas en `.env.local`:

```javascript
VITE_API_URL; // URL del backend
VITE_WALMART_API_URL; // URL de API externa (Walmart)
VITE_WALMART_API_KEY; // API Key para Walmart
VITE_APP_NAME; // Nombre de la aplicación
VITE_ENV; // Ambiente (dev/prod)
```

### TypeORM Configuration

El backend usa **TypeORM** con sincronización automática en desarrollo:

```typescript
// En producción, usa migrations en lugar de sincronización
synchronize: false; // production
synchronize: true; // development
```

---

## ✨ Características Principales

### 🛒 Carrito de Compras

- **Drag & Drop**: Arrastra productos al carrito
- **Persistencia**: Carrito guardado en sessionStorage
- **Visual Feedback**: Animaciones al arrastrar
- Contador de items en tiempo real

### 🔐 Autenticación JWT

- **Login / Register**: Con validación de datos
- **Access Token + Refresh Token**: Tokens de acceso y renovación
- **Auto-refresh**: Renovación automática de tokens expirados
- **Encriptación AES**: Contraseñas encriptadas en tránsito
- **Protected Routes**: Rutas que requieren autenticación

### 🔍 Búsqueda de Productos

- **Infinite Scroll**: Carga dinámica de productos
- **Búsqueda en tiempo real**: Con debounce
- **Filtros**: Búsqueda por palabra clave
- **Paginación**: Sistema de páginas

### 👤 Gestión de Usuarios

- **CRUD Completo**: Crear, leer, actualizar, eliminar usuarios
- **Validación**: Datos validados en backend y frontend
- **Error Handling**: Manejo de conflictos y excepciones

### 📊 Interfaz de Usuario

- **Responsive Design**: Mobile-first con Bootstrap
- **Material UI**: Componentes profesionales
- **Toasts**: Notificaciones con react-hot-toast
- **Layouts Separados**: Public vs Private

---

## 🛣️ Rutas y Endpoints

### Frontend Routes (`/`)

| Ruta                | Descripción                        | Requerida Auth |
| ------------------- | ---------------------------------- | -------------- |
| `/auth`             | Página de login/registro           | ❌             |
| `/ecommerce`        | Listado y búsqueda de productos    | ✅             |
| `/order-processing` | Pantalla de procesamiento de orden | ✅             |
| `/*`                | Página 404 Not Found               | ❌             |

### Backend Endpoints (`/api/v1/`)

#### 🔑 Auth Endpoints

| Método | Ruta            | Descripción        | Requiere Auth |
| ------ | --------------- | ------------------ | ------------- |
| POST   | `/auth/login`   | Inicia sesión      | ❌            |
| POST   | `/auth/refresh` | Renueva token      | ❌            |
| POST   | `/auth/encrypt` | Encripta token AES | ❌            |

#### 👥 User Endpoints

| Método | Ruta        | Descripción            | Requiere Auth |
| ------ | ----------- | ---------------------- | ------------- |
| POST   | `/user`     | Crear usuario          | ❌            |
| GET    | `/user`     | Listar usuarios        | ✅ JWT        |
| GET    | `/user/:id` | Obtener usuario por ID | ✅ JWT        |
| PUT    | `/user/:id` | Actualizar usuario     | ✅ JWT        |
| DELETE | `/user/:id` | Eliminar usuario       | ✅ JWT        |

#### 🏥 Health Check

| Método | Ruta      | Descripción                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Verificar estado de la API |

### Swagger Documentation

Accede a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

---

## 🏗️ Decisiones Arquitectónicas

### 1. **SOLID Principles** 📐

El proyecto aplica principios SOLID para mantenibilidad y escalabilidad:

#### S - Single Responsibility

- **Servicios únicos**: `UserService` solo maneja usuarios, `AuthService` solo autenticación
- **Separación de capas**: Controllers, Services, Repositories
- **Hooks específicos**: `useLogin`, `useRegister`, `useDraggable` con responsabilidades claras

```typescript
// ✅ Bien: UserService solo maneja lógica de usuario
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  async findAll(): Promise<UserResponseDto[]>;
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
}
```

#### O - Open/Closed Principle

- **Módulos extensibles**: Fácil agregar nuevos módulos sin modificar existentes
- **DTOs parametrizables**: Reutilización de estructuras de datos
- **Slices de Zustand**: Fácil agregar nuevos slices sin tocar el store principal

```typescript
// ✅ Bien: Store abierto para extensión con slices
export const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
  // Agregar nuevos slices sin modificar código existente
}));
```

#### L - Liskov Substitution

- **Herencia consistente**: Services implementan interfaces comunes
- **Providers intercambiables**: JwtProvider, AesProvider son intercambiables

#### I - Interface Segregation

- **Interfaces específicas**: `IAuthSlice`, `IProductSlice` para cada dominio
- **DTOs segregados**: `LoginDto`, `CreateUserDto`, `UserResponseDto`

```typescript
// ✅ Bien: Interfaces pequeñas y específicas
export interface IAuthSlice {
  user: IUser | null;
  setSession: (payload: ISessionPayload) => void;
  logout: () => void;
}

export interface IProductSlice {
  items: IProduct[];
  addItem: (item: IProduct) => void;
}
```

#### D - Dependency Injection

- **Inyección en constructores**: NestJS maneja automáticamente las dependencias
- **Inversión de control**: Reducción de acoplamiento

```typescript
// ✅ Bien: DI automático en NestJS
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly authService: AuthService,
  ) {}
}
```

### 2. **Arquitectura Modular**

#### Backend: Separación por Dominio

```
src/
├── auth/           # Módulo de autenticación
├── user/           # Módulo de usuarios
├── common/         # Utilidades compartidas
└── app.module.ts   # Módulo raíz
```

Cada módulo es independiente e importable en otros:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
})
export class UserModule {}
```

#### Frontend: Feature-Based Structure

```
src/
├── auth/           # Feature: Autenticación
├── features/
│   └── shopping/   # Feature: E-commerce
├── common/         # Componentes y servicios compartidos
├── router/         # Configuración de rutas
└── layout/         # Layouts principales
```

Cada feature es independiente y podría extraerse a un paquete.

### 3. **Repository Pattern** 📚

Separa la lógica de acceso a datos de la lógica de negocio:

```typescript
// Repository: Solo acceso a datos
@Injectable()
export class UserRepositoryService {
  async createUser(body: CreateUserDto): Promise<User>
  async findUserById(id: string): Promise<User | null>
  async updateUser(id: string, body: UpdateUserDto): Promise<UpdateResult>
}

// Service: Lógica de negocio y validaciones
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Validaciones de negocio aquí
    const existingUser = await this.userRepository.findUserByEmail(...)
    if (existingUser) throw new ConflictException(...)
    // Luego usar repository
    return this.userRepository.createUser(...)
  }
}
```

**Beneficios:**

- Fácil testing (mockear repository)
- Lógica de negocio desacoplada de la BD
- Cambiar BD sin afectar servicios

### 4. **Carrito en sessionStorage (No en BD)**

**¿Por qué?**

- 🚀 **Performance**: No requiere queries a BD
- 💾 **Privacidad**: No persiste sin querer en servidor
- 📱 **UX**: Carrito disponible al momento (sin latencia)
- 🔄 **Stateless**: Backend no necesita mantener estado de carrito
- 🧪 **Testing**: Más fácil de testear

**Implementación:**

```typescript
// sessionStorageService: Servicio centralizado
export const sessionStorageService = {
  get(): AuthTokens | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(data: AuthTokens): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  },
};

// Zustand slice la utiliza
export const createProductSlice = (set) => ({
  items: [],
  addItem: (item: IProduct) => {
    set((state) => ({ items: [...state.items, item] }));
    // Aquí podría persistirse a sessionStorage si se requiere
  },
});
```

### 5. **Feature-Driven Development (FDD) en Frontend**

**¿Por qué?**

- 📦 **Modularidad**: Cada feature es un mini-proyecto
- 🔄 **Reutilización**: Fácil extraer a micro-front-end o monorepo
- 🧹 **Limpieza**: Eliminar feature = eliminar carpeta
- 👥 **Equipos paralelos**: Varios equipos sin conflictos
- 📈 **Escalabilidad**: Estructura crece con el proyecto

**Estructura:**

```
features/shopping/
├── components/      # Componentes específicos del feature
├── hooks/          # Hooks personalizados (useProductSearch)
├── types/          # Types y interfaces
├── services/       # Servicios HTTP
├── store/          # Slices de estado
├── schemas/        # Validaciones (Zod)
└── views/          # Pantallas principales
```

### 6. **Docker para Consistencia** 🐳

**¿Por qué?**

- 🌍 **Mismo ambiente**: Todos corren lo mismo (dev, staging, prod)
- 🔧 **Sin "funciona en mi máquina"**: Reproducible
- ⚡ **Setup rápido**: `docker-compose up` y listo
- 🚀 **Fácil deploy**: Push a registry y deploy
- 📦 **Dependencias aisladas**: Sin conflictos de versiones

**Arquitectura Docker:**

```yaml
services:
  db: # PostgreSQL
  back: # NestJS API
  front: # Nginx con React
```

### 7. **Vistas Privadas vs Públicas** 🔒

Separación clara de rutas autenticadas y públicas:

```typescript
// router.tsx
<Route element={<PublicRoute />}>
  <Route element={<PublicLayout />}>
    {publicRoutes.map(route => ...)}  // /auth
  </Route>
</Route>

<Route element={<ProtectedRoute />}>
  <Route element={<PrivateLayout />}>
    {privateRoutes.map(route => ...)}  // /ecommerce, /order-processing
  </Route>
</Route>
```

**ProtectedRoute valida autenticación:**

```typescript
export const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to={ROUTES.auth} replace />
  return <Outlet />
}
```

**Beneficios:**

- ✅ Imposible acceder a rutas privadas sin login
- 📐 Layouts diferentes por tipo de usuario
- 🎯 Redirección automática

### 8. **Servicios para Endpoints (API Abstraction)**

Centralizar llamadas HTTP en servicios:

```typescript
// authService: Abstracción de API
export const authService = {
  async login(credentials: LoginDto): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data.data
  },
  async refresh(): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/refresh')
    return data.data
  }
}

// Usar en hooks
export const useLogin = () => {
  const login = async (values: LoginFormValues) => {
    const response = await authService.login(...)  // Aquí
    setSession(response)
  }
}
```

**Beneficios:**

- 🔄 **Reutilización**: Múltiples componentes llaman a `authService`
- 🧪 **Testing**: Mock del servicio, no de HTTP
- 🔧 **Mantenimiento**: Cambiar endpoint en un solo lugar
- 📊 **Analytics**: Centralizadas en servicios

---

## 🎨 Patrones de Diseño Implementados

### 1. **Repository Pattern**

**Dónde:** `apps/back/src/user/provider/user.repository.service.ts`

```typescript
// Abstrae acceso a datos
@Injectable()
export class UserRepositoryService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

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
```

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
```

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

## 🏃 Cómo Ejecutar la Aplicación

### Opción A: Con Docker (Recomendado) ✨

La forma más sencilla y con todas las dependencias preconfiguradas:

```bash
# Iniciar todos los servicios (DB, Backend, Frontend)
pnpm run docker:up

# Acceder a la aplicación
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api/docs
# PostgreSQL: localhost:5433
```

Para detener los servicios:

```bash
pnpm run docker:down
```

Ver logs en tiempo real:

```bash
pnpm run docker:logs
```

### Opción B: Sin Docker (Local)

#### 1. Configurar PostgreSQL

**Opción 1a: Instalar PostgreSQL localmente**

```bash
# En Windows (con instalador)
# O en MacOS
brew install postgresql

# Inicia el servicio
brew services start postgresql
```

**Opción 1b: Usar Docker solo para la BD**

```bash
docker run --name postgres-gapsi \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gapsi-ecommerce-db \
  -p 5433:5432 \
  -d postgres:16
```

#### 2. Instalar dependencias de cada app

```bash
# Backend
cd apps/back
pnpm install

# Frontend (en otra terminal)
cd apps/front
pnpm install
```

#### 3. Ejecutar el Backend

```bash
cd apps/back
pnpm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

#### 4. Ejecutar el Frontend

```bash
cd apps/front
pnpm run start:dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Backend Configuration (`apps/back/config/`)

El backend usa **@nestjs/config** con validación Joi:

```typescript
// Database
- host: localhost (o 'db' en Docker)
- port: 5433 (local) o 5432 (Docker)
- username: postgres
- password: postgres (cambiar en producción)
- database: gapsi-ecommerce-db

// JWT
- secret: definir en .env JWT_SECRET
- expiresIn: 7d (configurable)

// API
- prefix: /api/v1
- timeout: 10s
```

### Frontend Configuration (`apps/front/src/common/config/`)

Variables de entorno requeridas en `.env.local`:

```javascript
VITE_API_URL; // URL del backend
VITE_WALMART_API_URL; // URL de API externa (Walmart)
VITE_WALMART_API_KEY; // API Key para Walmart
VITE_APP_NAME; // Nombre de la aplicación
VITE_ENV; // Ambiente (dev/prod)
```

### TypeORM Configuration

El backend usa **TypeORM** con sincronización automática en desarrollo:

```typescript
// En producción, usa migrations en lugar de sincronización
synchronize: false; // production
synchronize: true; // development
```

---

## ✨ Características Principales

### 🛒 Carrito de Compras

- **Drag & Drop**: Arrastra productos al carrito
- **Persistencia**: Carrito guardado en sessionStorage
- **Visual Feedback**: Animaciones al arrastrar
- Contador de items en tiempo real

### 🔐 Autenticación JWT

- **Login / Register**: Con validación de datos
- **Access Token + Refresh Token**: Tokens de acceso y renovación
- **Auto-refresh**: Renovación automática de tokens expirados
- **Encriptación AES**: Contraseñas encriptadas en tránsito
- **Protected Routes**: Rutas que requieren autenticación

### 🔍 Búsqueda de Productos

- **Infinite Scroll**: Carga dinámica de productos
- **Búsqueda en tiempo real**: Con debounce
- **Filtros**: Búsqueda por palabra clave
- **Paginación**: Sistema de páginas

### 👤 Gestión de Usuarios

- **CRUD Completo**: Crear, leer, actualizar, eliminar usuarios
- **Validación**: Datos validados en backend y frontend
- **Error Handling**: Manejo de conflictos y excepciones

### 📊 Interfaz de Usuario

- **Responsive Design**: Mobile-first con Bootstrap
- **Material UI**: Componentes profesionales
- **Toasts**: Notificaciones con react-hot-toast
- **Layouts Separados**: Public vs Private

---

## 🛣️ Rutas y Endpoints

### Frontend Routes (`/`)

| Ruta                | Descripción                        | Requerida Auth |
| ------------------- | ---------------------------------- | -------------- |
| `/auth`             | Página de login/registro           | ❌             |
| `/ecommerce`        | Listado y búsqueda de productos    | ✅             |
| `/order-processing` | Pantalla de procesamiento de orden | ✅             |
| `/*`                | Página 404 Not Found               | ❌             |

### Backend Endpoints (`/api/v1/`)

#### 🔑 Auth Endpoints

| Método | Ruta            | Descripción        | Requiere Auth |
| ------ | --------------- | ------------------ | ------------- |
| POST   | `/auth/login`   | Inicia sesión      | ❌            |
| POST   | `/auth/refresh` | Renueva token      | ❌            |
| POST   | `/auth/encrypt` | Encripta token AES | ❌            |

#### 👥 User Endpoints

| Método | Ruta        | Descripción            | Requiere Auth |
| ------ | ----------- | ---------------------- | ------------- |
| POST   | `/user`     | Crear usuario          | ❌            |
| GET    | `/user`     | Listar usuarios        | ✅ JWT        |
| GET    | `/user/:id` | Obtener usuario por ID | ✅ JWT        |
| PUT    | `/user/:id` | Actualizar usuario     | ✅ JWT        |
| DELETE | `/user/:id` | Eliminar usuario       | ✅ JWT        |

#### 🏥 Health Check

| Método | Ruta      | Descripción                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Verificar estado de la API |

### Swagger Documentation

Accede a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

---

## 🏗️ Decisiones Arquitectónicas

### 1. **SOLID Principles** 📐

El proyecto aplica principios SOLID para mantenibilidad y escalabilidad:

#### S - Single Responsibility

- **Servicios únicos**: `UserService` solo maneja usuarios, `AuthService` solo autenticación
- **Separación de capas**: Controllers, Services, Repositories
- **Hooks específicos**: `useLogin`, `useRegister`, `useDraggable` con responsabilidades claras

```typescript
// ✅ Bien: UserService solo maneja lógica de usuario
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  async findAll(): Promise<UserResponseDto[]>;
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
}
```

#### O - Open/Closed Principle

- **Módulos extensibles**: Fácil agregar nuevos módulos sin modificar existentes
- **DTOs parametrizables**: Reutilización de estructuras de datos
- **Slices de Zustand**: Fácil agregar nuevos slices sin tocar el store principal

```typescript
// ✅ Bien: Store abierto para extensión con slices
export const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
  // Agregar nuevos slices sin modificar código existente
}));
```

#### L - Liskov Substitution

- **Herencia consistente**: Services implementan interfaces comunes
- **Providers intercambiables**: JwtProvider, AesProvider son intercambiables

#### I - Interface Segregation

- **Interfaces específicas**: `IAuthSlice`, `IProductSlice` para cada dominio
- **DTOs segregados**: `LoginDto`, `CreateUserDto`, `UserResponseDto`

```typescript
// ✅ Bien: Interfaces pequeñas y específicas
export interface IAuthSlice {
  user: IUser | null;
  setSession: (payload: ISessionPayload) => void;
  logout: () => void;
}

export interface IProductSlice {
  items: IProduct[];
  addItem: (item: IProduct) => void;
}
```

#### D - Dependency Injection

- **Inyección en constructores**: NestJS maneja automáticamente las dependencias
- **Inversión de control**: Reducción de acoplamiento

```typescript
// ✅ Bien: DI automático en NestJS
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly authService: AuthService,
  ) {}
}
```

### 2. **Arquitectura Modular**

#### Backend: Separación por Dominio

```
src/
├── auth/           # Módulo de autenticación
├── user/           # Módulo de usuarios
├── common/         # Utilidades compartidas
└── app.module.ts   # Módulo raíz
```

Cada módulo es independiente e importable en otros:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
})
export class UserModule {}
```

#### Frontend: Feature-Based Structure

```
src/
├── auth/           # Feature: Autenticación
├── features/
│   └── shopping/   # Feature: E-commerce
├── common/         # Componentes y servicios compartidos
├── router/         # Configuración de rutas
└── layout/         # Layouts principales
```

Cada feature es independiente y podría extraerse a un paquete.

### 3. **Repository Pattern** 📚

Separa la lógica de acceso a datos de la lógica de negocio:

```typescript
// Repository: Solo acceso a datos
@Injectable()
export class UserRepositoryService {
  async createUser(body: CreateUserDto): Promise<User>
  async findUserById(id: string): Promise<User | null>
  async updateUser(id: string, body: UpdateUserDto): Promise<UpdateResult>
}

// Service: Lógica de negocio y validaciones
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Validaciones de negocio aquí
    const existingUser = await this.userRepository.findUserByEmail(...)
    if (existingUser) throw new ConflictException(...)
    // Luego usar repository
    return this.userRepository.createUser(...)
  }
}
```

**Beneficios:**

- Fácil testing (mockear repository)
- Lógica de negocio desacoplada de la BD
- Cambiar BD sin afectar servicios

### 4. **Carrito en sessionStorage (No en BD)**

**¿Por qué?**

- 🚀 **Performance**: No requiere queries a BD
- 💾 **Privacidad**: No persiste sin querer en servidor
- 📱 **UX**: Carrito disponible al momento (sin latencia)
- 🔄 **Stateless**: Backend no necesita mantener estado de carrito
- 🧪 **Testing**: Más fácil de testear

**Implementación:**

```typescript
// sessionStorageService: Servicio centralizado
export const sessionStorageService = {
  get(): AuthTokens | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(data: AuthTokens): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  },
};

// Zustand slice la utiliza
export const createProductSlice = (set) => ({
  items: [],
  addItem: (item: IProduct) => {
    set((state) => ({ items: [...state.items, item] }));
    // Aquí podría persistirse a sessionStorage si se requiere
  },
});
```

### 5. **Feature-Driven Development (FDD) en Frontend**

**¿Por qué?**

- 📦 **Modularidad**: Cada feature es un mini-proyecto
- 🔄 **Reutilización**: Fácil extraer a micro-front-end o monorepo
- 🧹 **Limpieza**: Eliminar feature = eliminar carpeta
- 👥 **Equipos paralelos**: Varios equipos sin conflictos
- 📈 **Escalabilidad**: Estructura crece con el proyecto

**Estructura:**

```
features/shopping/
├── components/      # Componentes específicos del feature
├── hooks/          # Hooks personalizados (useProductSearch)
├── types/          # Types y interfaces
├── services/       # Servicios HTTP
├── store/          # Slices de estado
├── schemas/        # Validaciones (Zod)
└── views/          # Pantallas principales
```

### 6. **Docker para Consistencia** 🐳

**¿Por qué?**

- 🌍 **Mismo ambiente**: Todos corren lo mismo (dev, staging, prod)
- 🔧 **Sin "funciona en mi máquina"**: Reproducible
- ⚡ **Setup rápido**: `docker-compose up` y listo
- 🚀 **Fácil deploy**: Push a registry y deploy
- 📦 **Dependencias aisladas**: Sin conflictos de versiones

**Arquitectura Docker:**

```yaml
services:
  db: # PostgreSQL
  back: # NestJS API
  front: # Nginx con React
```

### 7. **Vistas Privadas vs Públicas** 🔒

Separación clara de rutas autenticadas y públicas:

```typescript
// router.tsx
<Route element={<PublicRoute />}>
  <Route element={<PublicLayout />}>
    {publicRoutes.map(route => ...)}  // /auth
  </Route>
</Route>

<Route element={<ProtectedRoute />}>
  <Route element={<PrivateLayout />}>
    {privateRoutes.map(route => ...)}  // /ecommerce, /order-processing
  </Route>
</Route>
```

**ProtectedRoute valida autenticación:**

```typescript
export const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to={ROUTES.auth} replace />
  return <Outlet />
}
```

**Beneficios:**

- ✅ Imposible acceder a rutas privadas sin login
- 📐 Layouts diferentes por tipo de usuario
- 🎯 Redirección automática

### 8. **Servicios para Endpoints (API Abstraction)**

Centralizar llamadas HTTP en servicios:

```typescript
// authService: Abstracción de API
export const authService = {
  async login(credentials: LoginDto): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data.data
  },
  async refresh(): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/refresh')
    return data.data
  }
}

// Usar en hooks
export const useLogin = () => {
  const login = async (values: LoginFormValues) => {
    const response = await authService.login(...)  // Aquí
    setSession(response)
  }
}
```

**Beneficios:**

- 🔄 **Reutilización**: Múltiples componentes llaman a `authService`
- 🧪 **Testing**: Mock del servicio, no de HTTP
- 🔧 **Mantenimiento**: Cambiar endpoint en un solo lugar
- 📊 **Analytics**: Centralizadas en servicios

---

## 🎨 Patrones de Diseño Implementados

### 1. **Repository Pattern**

**Dónde:** `apps/back/src/user/provider/user.repository.service.ts`

```typescript
// Abstrae acceso a datos
@Injectable()
export class UserRepositoryService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

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
```

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
```

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

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    })
  }
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

## 🏃 Cómo Ejecutar la Aplicación

### Opción A: Con Docker (Recomendado) ✨

La forma más sencilla y con todas las dependencias preconfiguradas:

```bash
# Iniciar todos los servicios (DB, Backend, Frontend)
pnpm run docker:up

# Acceder a la aplicación
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api/docs
# PostgreSQL: localhost:5433
```

Para detener los servicios:

```bash
pnpm run docker:down
```

Ver logs en tiempo real:

```bash
pnpm run docker:logs
```

### Opción B: Sin Docker (Local)

#### 1. Configurar PostgreSQL

**Opción 1a: Instalar PostgreSQL localmente**

```bash
# En Windows (con instalador)
# O en MacOS
brew install postgresql

# Inicia el servicio
brew services start postgresql
```

**Opción 1b: Usar Docker solo para la BD**

```bash
docker run --name postgres-gapsi \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gapsi-ecommerce-db \
  -p 5433:5432 \
  -d postgres:16
```

#### 2. Instalar dependencias de cada app

```bash
# Backend
cd apps/back
pnpm install

# Frontend (en otra terminal)
cd apps/front
pnpm install
```

#### 3. Ejecutar el Backend

```bash
cd apps/back
pnpm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

#### 4. Ejecutar el Frontend

```bash
cd apps/front
pnpm run start:dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Backend Configuration (`apps/back/config/`)

El backend usa **@nestjs/config** con validación Joi:

```typescript
// Database
- host: localhost (o 'db' en Docker)
- port: 5433 (local) o 5432 (Docker)
- username: postgres
- password: postgres (cambiar en producción)
- database: gapsi-ecommerce-db

// JWT
- secret: definir en .env JWT_SECRET
- expiresIn: 7d (configurable)

// API
- prefix: /api/v1
- timeout: 10s
```

### Frontend Configuration (`apps/front/src/common/config/`)

Variables de entorno requeridas en `.env.local`:

```javascript
VITE_API_URL; // URL del backend
VITE_WALMART_API_URL; // URL de API externa (Walmart)
VITE_WALMART_API_KEY; // API Key para Walmart
VITE_APP_NAME; // Nombre de la aplicación
VITE_ENV; // Ambiente (dev/prod)
```

### TypeORM Configuration

El backend usa **TypeORM** con sincronización automática en desarrollo:

```typescript
// En producción, usa migrations en lugar de sincronización
synchronize: false; // production
synchronize: true; // development
```

---

## ✨ Características Principales

### 🛒 Carrito de Compras

- **Drag & Drop**: Arrastra productos al carrito
- **Persistencia**: Carrito guardado en sessionStorage
- **Visual Feedback**: Animaciones al arrastrar
- Contador de items en tiempo real

### 🔐 Autenticación JWT

- **Login / Register**: Con validación de datos
- **Access Token + Refresh Token**: Tokens de acceso y renovación
- **Auto-refresh**: Renovación automática de tokens expirados
- **Encriptación AES**: Contraseñas encriptadas en tránsito
- **Protected Routes**: Rutas que requieren autenticación

### 🔍 Búsqueda de Productos

- **Infinite Scroll**: Carga dinámica de productos
- **Búsqueda en tiempo real**: Con debounce
- **Filtros**: Búsqueda por palabra clave
- **Paginación**: Sistema de páginas

### 👤 Gestión de Usuarios

- **CRUD Completo**: Crear, leer, actualizar, eliminar usuarios
- **Validación**: Datos validados en backend y frontend
- **Error Handling**: Manejo de conflictos y excepciones

### 📊 Interfaz de Usuario

- **Responsive Design**: Mobile-first con Bootstrap
- **Material UI**: Componentes profesionales
- **Toasts**: Notificaciones con react-hot-toast
- **Layouts Separados**: Public vs Private

---

## 🛣️ Rutas y Endpoints

### Frontend Routes (`/`)

| Ruta                | Descripción                        | Requerida Auth |
| ------------------- | ---------------------------------- | -------------- |
| `/auth`             | Página de login/registro           | ❌             |
| `/ecommerce`        | Listado y búsqueda de productos    | ✅             |
| `/order-processing` | Pantalla de procesamiento de orden | ✅             |
| `/*`                | Página 404 Not Found               | ❌             |

### Backend Endpoints (`/api/v1/`)

#### 🔑 Auth Endpoints

| Método | Ruta            | Descripción        | Requiere Auth |
| ------ | --------------- | ------------------ | ------------- |
| POST   | `/auth/login`   | Inicia sesión      | ❌            |
| POST   | `/auth/refresh` | Renueva token      | ❌            |
| POST   | `/auth/encrypt` | Encripta token AES | ❌            |

#### 👥 User Endpoints

| Método | Ruta        | Descripción            | Requiere Auth |
| ------ | ----------- | ---------------------- | ------------- |
| POST   | `/user`     | Crear usuario          | ❌            |
| GET    | `/user`     | Listar usuarios        | ✅ JWT        |
| GET    | `/user/:id` | Obtener usuario por ID | ✅ JWT        |
| PUT    | `/user/:id` | Actualizar usuario     | ✅ JWT        |
| DELETE | `/user/:id` | Eliminar usuario       | ✅ JWT        |

#### 🏥 Health Check

| Método | Ruta      | Descripción                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Verificar estado de la API |

### Swagger Documentation

Accede a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

---

## 🏗️ Decisiones Arquitectónicas

### 1. **SOLID Principles** 📐

El proyecto aplica principios SOLID para mantenibilidad y escalabilidad:

#### S - Single Responsibility

- **Servicios únicos**: `UserService` solo maneja usuarios, `AuthService` solo autenticación
- **Separación de capas**: Controllers, Services, Repositories
- **Hooks específicos**: `useLogin`, `useRegister`, `useDraggable` con responsabilidades claras

```typescript
// ✅ Bien: UserService solo maneja lógica de usuario
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  async findAll(): Promise<UserResponseDto[]>;
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
}
```

#### O - Open/Closed Principle

- **Módulos extensibles**: Fácil agregar nuevos módulos sin modificar existentes
- **DTOs parametrizables**: Reutilización de estructuras de datos
- **Slices de Zustand**: Fácil agregar nuevos slices sin tocar el store principal

```typescript
// ✅ Bien: Store abierto para extensión con slices
export const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
  // Agregar nuevos slices sin modificar código existente
}));
```

#### L - Liskov Substitution

- **Herencia consistente**: Services implementan interfaces comunes
- **Providers intercambiables**: JwtProvider, AesProvider son intercambiables

#### I - Interface Segregation

- **Interfaces específicas**: `IAuthSlice`, `IProductSlice` para cada dominio
- **DTOs segregados**: `LoginDto`, `CreateUserDto`, `UserResponseDto`

```typescript
// ✅ Bien: Interfaces pequeñas y específicas
export interface IAuthSlice {
  user: IUser | null;
  setSession: (payload: ISessionPayload) => void;
  logout: () => void;
}

export interface IProductSlice {
  items: IProduct[];
  addItem: (item: IProduct) => void;
}
```

#### D - Dependency Injection

- **Inyección en constructores**: NestJS maneja automáticamente las dependencias
- **Inversión de control**: Reducción de acoplamiento

```typescript
// ✅ Bien: DI automático en NestJS
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly authService: AuthService,
  ) {}
}
```

### 2. **Arquitectura Modular**

#### Backend: Separación por Dominio

```
src/
├── auth/           # Módulo de autenticación
├── user/           # Módulo de usuarios
├── common/         # Utilidades compartidas
└── app.module.ts   # Módulo raíz
```

Cada módulo es independiente e importable en otros:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
})
export class UserModule {}
```

#### Frontend: Feature-Based Structure

```
src/
├── auth/           # Feature: Autenticación
├── features/
│   └── shopping/   # Feature: E-commerce
├── common/         # Componentes y servicios compartidos
├── router/         # Configuración de rutas
└── layout/         # Layouts principales
```

Cada feature es independiente y podría extraerse a un paquete.

### 3. **Repository Pattern** 📚

Separa la lógica de acceso a datos de la lógica de negocio:

```typescript
// Repository: Solo acceso a datos
@Injectable()
export class UserRepositoryService {
  async createUser(body: CreateUserDto): Promise<User>
  async findUserById(id: string): Promise<User | null>
  async updateUser(id: string, body: UpdateUserDto): Promise<UpdateResult>
}

// Service: Lógica de negocio y validaciones
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Validaciones de negocio aquí
    const existingUser = await this.userRepository.findUserByEmail(...)
    if (existingUser) throw new ConflictException(...)
    // Luego usar repository
    return this.userRepository.createUser(...)
  }
}
```

**Beneficios:**

- Fácil testing (mockear repository)
- Lógica de negocio desacoplada de la BD
- Cambiar BD sin afectar servicios

### 4. **Carrito en sessionStorage (No en BD)**

**¿Por qué?**

- 🚀 **Performance**: No requiere queries a BD
- 💾 **Privacidad**: No persiste sin querer en servidor
- 📱 **UX**: Carrito disponible al momento (sin latencia)
- 🔄 **Stateless**: Backend no necesita mantener estado de carrito
- 🧪 **Testing**: Más fácil de testear

**Implementación:**

```typescript
// sessionStorageService: Servicio centralizado
export const sessionStorageService = {
  get(): AuthTokens | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(data: AuthTokens): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  },
};

// Zustand slice la utiliza
export const createProductSlice = (set) => ({
  items: [],
  addItem: (item: IProduct) => {
    set((state) => ({ items: [...state.items, item] }));
    // Aquí podría persistirse a sessionStorage si se requiere
  },
});
```

### 5. **Feature-Driven Development (FDD) en Frontend**

**¿Por qué?**

- 📦 **Modularidad**: Cada feature es un mini-proyecto
- 🔄 **Reutilización**: Fácil extraer a micro-front-end o monorepo
- 🧹 **Limpieza**: Eliminar feature = eliminar carpeta
- 👥 **Equipos paralelos**: Varios equipos sin conflictos
- 📈 **Escalabilidad**: Estructura crece con el proyecto

**Estructura:**

```
features/shopping/
├── components/      # Componentes específicos del feature
├── hooks/          # Hooks personalizados (useProductSearch)
├── types/          # Types y interfaces
├── services/       # Servicios HTTP
├── store/          # Slices de estado
├── schemas/        # Validaciones (Zod)
└── views/          # Pantallas principales
```

### 6. **Docker para Consistencia** 🐳

**¿Por qué?**

- 🌍 **Mismo ambiente**: Todos corren lo mismo (dev, staging, prod)
- 🔧 **Sin "funciona en mi máquina"**: Reproducible
- ⚡ **Setup rápido**: `docker-compose up` y listo
- 🚀 **Fácil deploy**: Push a registry y deploy
- 📦 **Dependencias aisladas**: Sin conflictos de versiones

**Arquitectura Docker:**

```yaml
services:
  db: # PostgreSQL
  back: # NestJS API
  front: # Nginx con React
```

### 7. **Vistas Privadas vs Públicas** 🔒

Separación clara de rutas autenticadas y públicas:

```typescript
// router.tsx
<Route element={<PublicRoute />}>
  <Route element={<PublicLayout />}>
    {publicRoutes.map(route => ...)}  // /auth
  </Route>
</Route>

<Route element={<ProtectedRoute />}>
  <Route element={<PrivateLayout />}>
    {privateRoutes.map(route => ...)}  // /ecommerce, /order-processing
  </Route>
</Route>
```

**ProtectedRoute valida autenticación:**

```typescript
export const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to={ROUTES.auth} replace />
  return <Outlet />
}
```

**Beneficios:**

- ✅ Imposible acceder a rutas privadas sin login
- 📐 Layouts diferentes por tipo de usuario
- 🎯 Redirección automática

### 8. **Servicios para Endpoints (API Abstraction)**

Centralizar llamadas HTTP en servicios:

```typescript
// authService: Abstracción de API
export const authService = {
  async login(credentials: LoginDto): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data.data
  },
  async refresh(): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/refresh')
    return data.data
  }
}

// Usar en hooks
export const useLogin = () => {
  const login = async (values: LoginFormValues) => {
    const response = await authService.login(...)  // Aquí
    setSession(response)
  }
}
```

**Beneficios:**

- 🔄 **Reutilización**: Múltiples componentes llaman a `authService`
- 🧪 **Testing**: Mock del servicio, no de HTTP
- 🔧 **Mantenimiento**: Cambiar endpoint en un solo lugar
- 📊 **Analytics**: Centralizadas en servicios

---

## 🎨 Patrones de Diseño Implementados

### 1. **Repository Pattern**

**Dónde:** `apps/back/src/user/provider/user.repository.service.ts`

```typescript
// Abstrae acceso a datos
@Injectable()
export class UserRepositoryService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

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
```

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
```

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

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    })
  }
```

## License: unknown

https://github.com/ljxyaly/nest/blob/cee5eabfe1b565b8a6e32c1e0599493a73aa6b47/src/filter/_all-exception.filter.ts

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

## 🏃 Cómo Ejecutar la Aplicación

### Opción A: Con Docker (Recomendado) ✨

La forma más sencilla y con todas las dependencias preconfiguradas:

```bash
# Iniciar todos los servicios (DB, Backend, Frontend)
pnpm run docker:up

# Acceder a la aplicación
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api/docs
# PostgreSQL: localhost:5433
```

Para detener los servicios:

```bash
pnpm run docker:down
```

Ver logs en tiempo real:

```bash
pnpm run docker:logs
```

### Opción B: Sin Docker (Local)

#### 1. Configurar PostgreSQL

**Opción 1a: Instalar PostgreSQL localmente**

```bash
# En Windows (con instalador)
# O en MacOS
brew install postgresql

# Inicia el servicio
brew services start postgresql
```

**Opción 1b: Usar Docker solo para la BD**

```bash
docker run --name postgres-gapsi \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gapsi-ecommerce-db \
  -p 5433:5432 \
  -d postgres:16
```

#### 2. Instalar dependencias de cada app

```bash
# Backend
cd apps/back
pnpm install

# Frontend (en otra terminal)
cd apps/front
pnpm install
```

#### 3. Ejecutar el Backend

```bash
cd apps/back
pnpm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

#### 4. Ejecutar el Frontend

```bash
cd apps/front
pnpm run start:dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Backend Configuration (`apps/back/config/`)

El backend usa **@nestjs/config** con validación Joi:

```typescript
// Database
- host: localhost (o 'db' en Docker)
- port: 5433 (local) o 5432 (Docker)
- username: postgres
- password: postgres (cambiar en producción)
- database: gapsi-ecommerce-db

// JWT
- secret: definir en .env JWT_SECRET
- expiresIn: 7d (configurable)

// API
- prefix: /api/v1
- timeout: 10s
```

### Frontend Configuration (`apps/front/src/common/config/`)

Variables de entorno requeridas en `.env.local`:

```javascript
VITE_API_URL; // URL del backend
VITE_WALMART_API_URL; // URL de API externa (Walmart)
VITE_WALMART_API_KEY; // API Key para Walmart
VITE_APP_NAME; // Nombre de la aplicación
VITE_ENV; // Ambiente (dev/prod)
```

### TypeORM Configuration

El backend usa **TypeORM** con sincronización automática en desarrollo:

```typescript
// En producción, usa migrations en lugar de sincronización
synchronize: false; // production
synchronize: true; // development
```

---

## ✨ Características Principales

### 🛒 Carrito de Compras

- **Drag & Drop**: Arrastra productos al carrito
- **Persistencia**: Carrito guardado en sessionStorage
- **Visual Feedback**: Animaciones al arrastrar
- Contador de items en tiempo real

### 🔐 Autenticación JWT

- **Login / Register**: Con validación de datos
- **Access Token + Refresh Token**: Tokens de acceso y renovación
- **Auto-refresh**: Renovación automática de tokens expirados
- **Encriptación AES**: Contraseñas encriptadas en tránsito
- **Protected Routes**: Rutas que requieren autenticación

### 🔍 Búsqueda de Productos

- **Infinite Scroll**: Carga dinámica de productos
- **Búsqueda en tiempo real**: Con debounce
- **Filtros**: Búsqueda por palabra clave
- **Paginación**: Sistema de páginas

### 👤 Gestión de Usuarios

- **CRUD Completo**: Crear, leer, actualizar, eliminar usuarios
- **Validación**: Datos validados en backend y frontend
- **Error Handling**: Manejo de conflictos y excepciones

### 📊 Interfaz de Usuario

- **Responsive Design**: Mobile-first con Bootstrap
- **Material UI**: Componentes profesionales
- **Toasts**: Notificaciones con react-hot-toast
- **Layouts Separados**: Public vs Private

---

## 🛣️ Rutas y Endpoints

### Frontend Routes (`/`)

| Ruta                | Descripción                        | Requerida Auth |
| ------------------- | ---------------------------------- | -------------- |
| `/auth`             | Página de login/registro           | ❌             |
| `/ecommerce`        | Listado y búsqueda de productos    | ✅             |
| `/order-processing` | Pantalla de procesamiento de orden | ✅             |
| `/*`                | Página 404 Not Found               | ❌             |

### Backend Endpoints (`/api/v1/`)

#### 🔑 Auth Endpoints

| Método | Ruta            | Descripción        | Requiere Auth |
| ------ | --------------- | ------------------ | ------------- |
| POST   | `/auth/login`   | Inicia sesión      | ❌            |
| POST   | `/auth/refresh` | Renueva token      | ❌            |
| POST   | `/auth/encrypt` | Encripta token AES | ❌            |

#### 👥 User Endpoints

| Método | Ruta        | Descripción            | Requiere Auth |
| ------ | ----------- | ---------------------- | ------------- |
| POST   | `/user`     | Crear usuario          | ❌            |
| GET    | `/user`     | Listar usuarios        | ✅ JWT        |
| GET    | `/user/:id` | Obtener usuario por ID | ✅ JWT        |
| PUT    | `/user/:id` | Actualizar usuario     | ✅ JWT        |
| DELETE | `/user/:id` | Eliminar usuario       | ✅ JWT        |

#### 🏥 Health Check

| Método | Ruta      | Descripción                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Verificar estado de la API |

### Swagger Documentation

Accede a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

---

## 🏗️ Decisiones Arquitectónicas

### 1. **SOLID Principles** 📐

El proyecto aplica principios SOLID para mantenibilidad y escalabilidad:

#### S - Single Responsibility

- **Servicios únicos**: `UserService` solo maneja usuarios, `AuthService` solo autenticación
- **Separación de capas**: Controllers, Services, Repositories
- **Hooks específicos**: `useLogin`, `useRegister`, `useDraggable` con responsabilidades claras

```typescript
// ✅ Bien: UserService solo maneja lógica de usuario
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  async findAll(): Promise<UserResponseDto[]>;
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
}
```

#### O - Open/Closed Principle

- **Módulos extensibles**: Fácil agregar nuevos módulos sin modificar existentes
- **DTOs parametrizables**: Reutilización de estructuras de datos
- **Slices de Zustand**: Fácil agregar nuevos slices sin tocar el store principal

```typescript
// ✅ Bien: Store abierto para extensión con slices
export const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
  // Agregar nuevos slices sin modificar código existente
}));
```

#### L - Liskov Substitution

- **Herencia consistente**: Services implementan interfaces comunes
- **Providers intercambiables**: JwtProvider, AesProvider son intercambiables

#### I - Interface Segregation

- **Interfaces específicas**: `IAuthSlice`, `IProductSlice` para cada dominio
- **DTOs segregados**: `LoginDto`, `CreateUserDto`, `UserResponseDto`

```typescript
// ✅ Bien: Interfaces pequeñas y específicas
export interface IAuthSlice {
  user: IUser | null;
  setSession: (payload: ISessionPayload) => void;
  logout: () => void;
}

export interface IProductSlice {
  items: IProduct[];
  addItem: (item: IProduct) => void;
}
```

#### D - Dependency Injection

- **Inyección en constructores**: NestJS maneja automáticamente las dependencias
- **Inversión de control**: Reducción de acoplamiento

```typescript
// ✅ Bien: DI automático en NestJS
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly authService: AuthService,
  ) {}
}
```

### 2. **Arquitectura Modular**

#### Backend: Separación por Dominio

```
src/
├── auth/           # Módulo de autenticación
├── user/           # Módulo de usuarios
├── common/         # Utilidades compartidas
└── app.module.ts   # Módulo raíz
```

Cada módulo es independiente e importable en otros:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
})
export class UserModule {}
```

#### Frontend: Feature-Based Structure

```
src/
├── auth/           # Feature: Autenticación
├── features/
│   └── shopping/   # Feature: E-commerce
├── common/         # Componentes y servicios compartidos
├── router/         # Configuración de rutas
└── layout/         # Layouts principales
```

Cada feature es independiente y podría extraerse a un paquete.

### 3. **Repository Pattern** 📚

Separa la lógica de acceso a datos de la lógica de negocio:

```typescript
// Repository: Solo acceso a datos
@Injectable()
export class UserRepositoryService {
  async createUser(body: CreateUserDto): Promise<User>
  async findUserById(id: string): Promise<User | null>
  async updateUser(id: string, body: UpdateUserDto): Promise<UpdateResult>
}

// Service: Lógica de negocio y validaciones
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Validaciones de negocio aquí
    const existingUser = await this.userRepository.findUserByEmail(...)
    if (existingUser) throw new ConflictException(...)
    // Luego usar repository
    return this.userRepository.createUser(...)
  }
}
```

**Beneficios:**

- Fácil testing (mockear repository)
- Lógica de negocio desacoplada de la BD
- Cambiar BD sin afectar servicios

### 4. **Carrito en sessionStorage (No en BD)**

**¿Por qué?**

- 🚀 **Performance**: No requiere queries a BD
- 💾 **Privacidad**: No persiste sin querer en servidor
- 📱 **UX**: Carrito disponible al momento (sin latencia)
- 🔄 **Stateless**: Backend no necesita mantener estado de carrito
- 🧪 **Testing**: Más fácil de testear

**Implementación:**

```typescript
// sessionStorageService: Servicio centralizado
export const sessionStorageService = {
  get(): AuthTokens | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(data: AuthTokens): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  },
};

// Zustand slice la utiliza
export const createProductSlice = (set) => ({
  items: [],
  addItem: (item: IProduct) => {
    set((state) => ({ items: [...state.items, item] }));
    // Aquí podría persistirse a sessionStorage si se requiere
  },
});
```

### 5. **Feature-Driven Development (FDD) en Frontend**

**¿Por qué?**

- 📦 **Modularidad**: Cada feature es un mini-proyecto
- 🔄 **Reutilización**: Fácil extraer a micro-front-end o monorepo
- 🧹 **Limpieza**: Eliminar feature = eliminar carpeta
- 👥 **Equipos paralelos**: Varios equipos sin conflictos
- 📈 **Escalabilidad**: Estructura crece con el proyecto

**Estructura:**

```
features/shopping/
├── components/      # Componentes específicos del feature
├── hooks/          # Hooks personalizados (useProductSearch)
├── types/          # Types y interfaces
├── services/       # Servicios HTTP
├── store/          # Slices de estado
├── schemas/        # Validaciones (Zod)
└── views/          # Pantallas principales
```

### 6. **Docker para Consistencia** 🐳

**¿Por qué?**

- 🌍 **Mismo ambiente**: Todos corren lo mismo (dev, staging, prod)
- 🔧 **Sin "funciona en mi máquina"**: Reproducible
- ⚡ **Setup rápido**: `docker-compose up` y listo
- 🚀 **Fácil deploy**: Push a registry y deploy
- 📦 **Dependencias aisladas**: Sin conflictos de versiones

**Arquitectura Docker:**

```yaml
services:
  db: # PostgreSQL
  back: # NestJS API
  front: # Nginx con React
```

### 7. **Vistas Privadas vs Públicas** 🔒

Separación clara de rutas autenticadas y públicas:

```typescript
// router.tsx
<Route element={<PublicRoute />}>
  <Route element={<PublicLayout />}>
    {publicRoutes.map(route => ...)}  // /auth
  </Route>
</Route>

<Route element={<ProtectedRoute />}>
  <Route element={<PrivateLayout />}>
    {privateRoutes.map(route => ...)}  // /ecommerce, /order-processing
  </Route>
</Route>
```

**ProtectedRoute valida autenticación:**

```typescript
export const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to={ROUTES.auth} replace />
  return <Outlet />
}
```

**Beneficios:**

- ✅ Imposible acceder a rutas privadas sin login
- 📐 Layouts diferentes por tipo de usuario
- 🎯 Redirección automática

### 8. **Servicios para Endpoints (API Abstraction)**

Centralizar llamadas HTTP en servicios:

```typescript
// authService: Abstracción de API
export const authService = {
  async login(credentials: LoginDto): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data.data
  },
  async refresh(): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/refresh')
    return data.data
  }
}

// Usar en hooks
export const useLogin = () => {
  const login = async (values: LoginFormValues) => {
    const response = await authService.login(...)  // Aquí
    setSession(response)
  }
}
```

**Beneficios:**

- 🔄 **Reutilización**: Múltiples componentes llaman a `authService`
- 🧪 **Testing**: Mock del servicio, no de HTTP
- 🔧 **Mantenimiento**: Cambiar endpoint en un solo lugar
- 📊 **Analytics**: Centralizadas en servicios

---

## 🎨 Patrones de Diseño Implementados

### 1. **Repository Pattern**

**Dónde:** `apps/back/src/user/provider/user.repository.service.ts`

```typescript
// Abstrae acceso a datos
@Injectable()
export class UserRepositoryService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

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
```

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
```

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

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    })
  }
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

## 🏃 Cómo Ejecutar la Aplicación

### Opción A: Con Docker (Recomendado) ✨

La forma más sencilla y con todas las dependencias preconfiguradas:

```bash
# Iniciar todos los servicios (DB, Backend, Frontend)
pnpm run docker:up

# Acceder a la aplicación
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api/docs
# PostgreSQL: localhost:5433
```

Para detener los servicios:

```bash
pnpm run docker:down
```

Ver logs en tiempo real:

```bash
pnpm run docker:logs
```

### Opción B: Sin Docker (Local)

#### 1. Configurar PostgreSQL

**Opción 1a: Instalar PostgreSQL localmente**

```bash
# En Windows (con instalador)
# O en MacOS
brew install postgresql

# Inicia el servicio
brew services start postgresql
```

**Opción 1b: Usar Docker solo para la BD**

```bash
docker run --name postgres-gapsi \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gapsi-ecommerce-db \
  -p 5433:5432 \
  -d postgres:16
```

#### 2. Instalar dependencias de cada app

```bash
# Backend
cd apps/back
pnpm install

# Frontend (en otra terminal)
cd apps/front
pnpm install
```

#### 3. Ejecutar el Backend

```bash
cd apps/back
pnpm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

#### 4. Ejecutar el Frontend

```bash
cd apps/front
pnpm run start:dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Backend Configuration (`apps/back/config/`)

El backend usa **@nestjs/config** con validación Joi:

```typescript
// Database
- host: localhost (o 'db' en Docker)
- port: 5433 (local) o 5432 (Docker)
- username: postgres
- password: postgres (cambiar en producción)
- database: gapsi-ecommerce-db

// JWT
- secret: definir en .env JWT_SECRET
- expiresIn: 7d (configurable)

// API
- prefix: /api/v1
- timeout: 10s
```

### Frontend Configuration (`apps/front/src/common/config/`)

Variables de entorno requeridas en `.env.local`:

```javascript
VITE_API_URL; // URL del backend
VITE_WALMART_API_URL; // URL de API externa (Walmart)
VITE_WALMART_API_KEY; // API Key para Walmart
VITE_APP_NAME; // Nombre de la aplicación
VITE_ENV; // Ambiente (dev/prod)
```

### TypeORM Configuration

El backend usa **TypeORM** con sincronización automática en desarrollo:

```typescript
// En producción, usa migrations en lugar de sincronización
synchronize: false; // production
synchronize: true; // development
```

---

## ✨ Características Principales

### 🛒 Carrito de Compras

- **Drag & Drop**: Arrastra productos al carrito
- **Persistencia**: Carrito guardado en sessionStorage
- **Visual Feedback**: Animaciones al arrastrar
- Contador de items en tiempo real

### 🔐 Autenticación JWT

- **Login / Register**: Con validación de datos
- **Access Token + Refresh Token**: Tokens de acceso y renovación
- **Auto-refresh**: Renovación automática de tokens expirados
- **Encriptación AES**: Contraseñas encriptadas en tránsito
- **Protected Routes**: Rutas que requieren autenticación

### 🔍 Búsqueda de Productos

- **Infinite Scroll**: Carga dinámica de productos
- **Búsqueda en tiempo real**: Con debounce
- **Filtros**: Búsqueda por palabra clave
- **Paginación**: Sistema de páginas

### 👤 Gestión de Usuarios

- **CRUD Completo**: Crear, leer, actualizar, eliminar usuarios
- **Validación**: Datos validados en backend y frontend
- **Error Handling**: Manejo de conflictos y excepciones

### 📊 Interfaz de Usuario

- **Responsive Design**: Mobile-first con Bootstrap
- **Material UI**: Componentes profesionales
- **Toasts**: Notificaciones con react-hot-toast
- **Layouts Separados**: Public vs Private

---

## 🛣️ Rutas y Endpoints

### Frontend Routes (`/`)

| Ruta                | Descripción                        | Requerida Auth |
| ------------------- | ---------------------------------- | -------------- |
| `/auth`             | Página de login/registro           | ❌             |
| `/ecommerce`        | Listado y búsqueda de productos    | ✅             |
| `/order-processing` | Pantalla de procesamiento de orden | ✅             |
| `/*`                | Página 404 Not Found               | ❌             |

### Backend Endpoints (`/api/v1/`)

#### 🔑 Auth Endpoints

| Método | Ruta            | Descripción        | Requiere Auth |
| ------ | --------------- | ------------------ | ------------- |
| POST   | `/auth/login`   | Inicia sesión      | ❌            |
| POST   | `/auth/refresh` | Renueva token      | ❌            |
| POST   | `/auth/encrypt` | Encripta token AES | ❌            |

#### 👥 User Endpoints

| Método | Ruta        | Descripción            | Requiere Auth |
| ------ | ----------- | ---------------------- | ------------- |
| POST   | `/user`     | Crear usuario          | ❌            |
| GET    | `/user`     | Listar usuarios        | ✅ JWT        |
| GET    | `/user/:id` | Obtener usuario por ID | ✅ JWT        |
| PUT    | `/user/:id` | Actualizar usuario     | ✅ JWT        |
| DELETE | `/user/:id` | Eliminar usuario       | ✅ JWT        |

#### 🏥 Health Check

| Método | Ruta      | Descripción                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Verificar estado de la API |

### Swagger Documentation

Accede a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

---

## 🏗️ Decisiones Arquitectónicas

### 1. **SOLID Principles** 📐

El proyecto aplica principios SOLID para mantenibilidad y escalabilidad:

#### S - Single Responsibility

- **Servicios únicos**: `UserService` solo maneja usuarios, `AuthService` solo autenticación
- **Separación de capas**: Controllers, Services, Repositories
- **Hooks específicos**: `useLogin`, `useRegister`, `useDraggable` con responsabilidades claras

```typescript
// ✅ Bien: UserService solo maneja lógica de usuario
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  async findAll(): Promise<UserResponseDto[]>;
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
}
```

#### O - Open/Closed Principle

- **Módulos extensibles**: Fácil agregar nuevos módulos sin modificar existentes
- **DTOs parametrizables**: Reutilización de estructuras de datos
- **Slices de Zustand**: Fácil agregar nuevos slices sin tocar el store principal

```typescript
// ✅ Bien: Store abierto para extensión con slices
export const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
  // Agregar nuevos slices sin modificar código existente
}));
```

#### L - Liskov Substitution

- **Herencia consistente**: Services implementan interfaces comunes
- **Providers intercambiables**: JwtProvider, AesProvider son intercambiables

#### I - Interface Segregation

- **Interfaces específicas**: `IAuthSlice`, `IProductSlice` para cada dominio
- **DTOs segregados**: `LoginDto`, `CreateUserDto`, `UserResponseDto`

```typescript
// ✅ Bien: Interfaces pequeñas y específicas
export interface IAuthSlice {
  user: IUser | null;
  setSession: (payload: ISessionPayload) => void;
  logout: () => void;
}

export interface IProductSlice {
  items: IProduct[];
  addItem: (item: IProduct) => void;
}
```

#### D - Dependency Injection

- **Inyección en constructores**: NestJS maneja automáticamente las dependencias
- **Inversión de control**: Reducción de acoplamiento

```typescript
// ✅ Bien: DI automático en NestJS
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly authService: AuthService,
  ) {}
}
```

### 2. **Arquitectura Modular**

#### Backend: Separación por Dominio

```
src/
├── auth/           # Módulo de autenticación
├── user/           # Módulo de usuarios
├── common/         # Utilidades compartidas
└── app.module.ts   # Módulo raíz
```

Cada módulo es independiente e importable en otros:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
})
export class UserModule {}
```

#### Frontend: Feature-Based Structure

```
src/
├── auth/           # Feature: Autenticación
├── features/
│   └── shopping/   # Feature: E-commerce
├── common/         # Componentes y servicios compartidos
├── router/         # Configuración de rutas
└── layout/         # Layouts principales
```

Cada feature es independiente y podría extraerse a un paquete.

### 3. **Repository Pattern** 📚

Separa la lógica de acceso a datos de la lógica de negocio:

```typescript
// Repository: Solo acceso a datos
@Injectable()
export class UserRepositoryService {
  async createUser(body: CreateUserDto): Promise<User>
  async findUserById(id: string): Promise<User | null>
  async updateUser(id: string, body: UpdateUserDto): Promise<UpdateResult>
}

// Service: Lógica de negocio y validaciones
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Validaciones de negocio aquí
    const existingUser = await this.userRepository.findUserByEmail(...)
    if (existingUser) throw new ConflictException(...)
    // Luego usar repository
    return this.userRepository.createUser(...)
  }
}
```

**Beneficios:**

- Fácil testing (mockear repository)
- Lógica de negocio desacoplada de la BD
- Cambiar BD sin afectar servicios

### 4. **Carrito en sessionStorage (No en BD)**

**¿Por qué?**

- 🚀 **Performance**: No requiere queries a BD
- 💾 **Privacidad**: No persiste sin querer en servidor
- 📱 **UX**: Carrito disponible al momento (sin latencia)
- 🔄 **Stateless**: Backend no necesita mantener estado de carrito
- 🧪 **Testing**: Más fácil de testear

**Implementación:**

```typescript
// sessionStorageService: Servicio centralizado
export const sessionStorageService = {
  get(): AuthTokens | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(data: AuthTokens): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  },
};

// Zustand slice la utiliza
export const createProductSlice = (set) => ({
  items: [],
  addItem: (item: IProduct) => {
    set((state) => ({ items: [...state.items, item] }));
    // Aquí podría persistirse a sessionStorage si se requiere
  },
});
```

### 5. **Feature-Driven Development (FDD) en Frontend**

**¿Por qué?**

- 📦 **Modularidad**: Cada feature es un mini-proyecto
- 🔄 **Reutilización**: Fácil extraer a micro-front-end o monorepo
- 🧹 **Limpieza**: Eliminar feature = eliminar carpeta
- 👥 **Equipos paralelos**: Varios equipos sin conflictos
- 📈 **Escalabilidad**: Estructura crece con el proyecto

**Estructura:**

```
features/shopping/
├── components/      # Componentes específicos del feature
├── hooks/          # Hooks personalizados (useProductSearch)
├── types/          # Types y interfaces
├── services/       # Servicios HTTP
├── store/          # Slices de estado
├── schemas/        # Validaciones (Zod)
└── views/          # Pantallas principales
```

### 6. **Docker para Consistencia** 🐳

**¿Por qué?**

- 🌍 **Mismo ambiente**: Todos corren lo mismo (dev, staging, prod)
- 🔧 **Sin "funciona en mi máquina"**: Reproducible
- ⚡ **Setup rápido**: `docker-compose up` y listo
- 🚀 **Fácil deploy**: Push a registry y deploy
- 📦 **Dependencias aisladas**: Sin conflictos de versiones

**Arquitectura Docker:**

```yaml
services:
  db: # PostgreSQL
  back: # NestJS API
  front: # Nginx con React
```

### 7. **Vistas Privadas vs Públicas** 🔒

Separación clara de rutas autenticadas y públicas:

```typescript
// router.tsx
<Route element={<PublicRoute />}>
  <Route element={<PublicLayout />}>
    {publicRoutes.map(route => ...)}  // /auth
  </Route>
</Route>

<Route element={<ProtectedRoute />}>
  <Route element={<PrivateLayout />}>
    {privateRoutes.map(route => ...)}  // /ecommerce, /order-processing
  </Route>
</Route>
```

**ProtectedRoute valida autenticación:**

```typescript
export const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to={ROUTES.auth} replace />
  return <Outlet />
}
```

**Beneficios:**

- ✅ Imposible acceder a rutas privadas sin login
- 📐 Layouts diferentes por tipo de usuario
- 🎯 Redirección automática

### 8. **Servicios para Endpoints (API Abstraction)**

Centralizar llamadas HTTP en servicios:

```typescript
// authService: Abstracción de API
export const authService = {
  async login(credentials: LoginDto): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data.data
  },
  async refresh(): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/refresh')
    return data.data
  }
}

// Usar en hooks
export const useLogin = () => {
  const login = async (values: LoginFormValues) => {
    const response = await authService.login(...)  // Aquí
    setSession(response)
  }
}
```

**Beneficios:**

- 🔄 **Reutilización**: Múltiples componentes llaman a `authService`
- 🧪 **Testing**: Mock del servicio, no de HTTP
- 🔧 **Mantenimiento**: Cambiar endpoint en un solo lugar
- 📊 **Analytics**: Centralizadas en servicios

---

## 🎨 Patrones de Diseño Implementados

### 1. **Repository Pattern**

**Dónde:** `apps/back/src/user/provider/user.repository.service.ts`

```typescript
// Abstrae acceso a datos
@Injectable()
export class UserRepositoryService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

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
```

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
```

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

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    })
  }
```

## License: unknown

https://github.com/ljxyaly/nest/blob/cee5eabfe1b565b8a6e32c1e0599493a73aa6b47/src/filter/_all-exception.filter.ts

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

## 🏃 Cómo Ejecutar la Aplicación

### Opción A: Con Docker (Recomendado) ✨

La forma más sencilla y con todas las dependencias preconfiguradas:

```bash
# Iniciar todos los servicios (DB, Backend, Frontend)
pnpm run docker:up

# Acceder a la aplicación
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api/docs
# PostgreSQL: localhost:5433
```

Para detener los servicios:

```bash
pnpm run docker:down
```

Ver logs en tiempo real:

```bash
pnpm run docker:logs
```

### Opción B: Sin Docker (Local)

#### 1. Configurar PostgreSQL

**Opción 1a: Instalar PostgreSQL localmente**

```bash
# En Windows (con instalador)
# O en MacOS
brew install postgresql

# Inicia el servicio
brew services start postgresql
```

**Opción 1b: Usar Docker solo para la BD**

```bash
docker run --name postgres-gapsi \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gapsi-ecommerce-db \
  -p 5433:5432 \
  -d postgres:16
```

#### 2. Instalar dependencias de cada app

```bash
# Backend
cd apps/back
pnpm install

# Frontend (en otra terminal)
cd apps/front
pnpm install
```

#### 3. Ejecutar el Backend

```bash
cd apps/back
pnpm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

#### 4. Ejecutar el Frontend

```bash
cd apps/front
pnpm run start:dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Backend Configuration (`apps/back/config/`)

El backend usa **@nestjs/config** con validación Joi:

```typescript
// Database
- host: localhost (o 'db' en Docker)
- port: 5433 (local) o 5432 (Docker)
- username: postgres
- password: postgres (cambiar en producción)
- database: gapsi-ecommerce-db

// JWT
- secret: definir en .env JWT_SECRET
- expiresIn: 7d (configurable)

// API
- prefix: /api/v1
- timeout: 10s
```

### Frontend Configuration (`apps/front/src/common/config/`)

Variables de entorno requeridas en `.env.local`:

```javascript
VITE_API_URL; // URL del backend
VITE_WALMART_API_URL; // URL de API externa (Walmart)
VITE_WALMART_API_KEY; // API Key para Walmart
VITE_APP_NAME; // Nombre de la aplicación
VITE_ENV; // Ambiente (dev/prod)
```

### TypeORM Configuration

El backend usa **TypeORM** con sincronización automática en desarrollo:

```typescript
// En producción, usa migrations en lugar de sincronización
synchronize: false; // production
synchronize: true; // development
```

---

## ✨ Características Principales

### 🛒 Carrito de Compras

- **Drag & Drop**: Arrastra productos al carrito
- **Persistencia**: Carrito guardado en sessionStorage
- **Visual Feedback**: Animaciones al arrastrar
- Contador de items en tiempo real

### 🔐 Autenticación JWT

- **Login / Register**: Con validación de datos
- **Access Token + Refresh Token**: Tokens de acceso y renovación
- **Auto-refresh**: Renovación automática de tokens expirados
- **Encriptación AES**: Contraseñas encriptadas en tránsito
- **Protected Routes**: Rutas que requieren autenticación

### 🔍 Búsqueda de Productos

- **Infinite Scroll**: Carga dinámica de productos
- **Búsqueda en tiempo real**: Con debounce
- **Filtros**: Búsqueda por palabra clave
- **Paginación**: Sistema de páginas

### 👤 Gestión de Usuarios

- **CRUD Completo**: Crear, leer, actualizar, eliminar usuarios
- **Validación**: Datos validados en backend y frontend
- **Error Handling**: Manejo de conflictos y excepciones

### 📊 Interfaz de Usuario

- **Responsive Design**: Mobile-first con Bootstrap
- **Material UI**: Componentes profesionales
- **Toasts**: Notificaciones con react-hot-toast
- **Layouts Separados**: Public vs Private

---

## 🛣️ Rutas y Endpoints

### Frontend Routes (`/`)

| Ruta                | Descripción                        | Requerida Auth |
| ------------------- | ---------------------------------- | -------------- |
| `/auth`             | Página de login/registro           | ❌             |
| `/ecommerce`        | Listado y búsqueda de productos    | ✅             |
| `/order-processing` | Pantalla de procesamiento de orden | ✅             |
| `/*`                | Página 404 Not Found               | ❌             |

### Backend Endpoints (`/api/v1/`)

#### 🔑 Auth Endpoints

| Método | Ruta            | Descripción        | Requiere Auth |
| ------ | --------------- | ------------------ | ------------- |
| POST   | `/auth/login`   | Inicia sesión      | ❌            |
| POST   | `/auth/refresh` | Renueva token      | ❌            |
| POST   | `/auth/encrypt` | Encripta token AES | ❌            |

#### 👥 User Endpoints

| Método | Ruta        | Descripción            | Requiere Auth |
| ------ | ----------- | ---------------------- | ------------- |
| POST   | `/user`     | Crear usuario          | ❌            |
| GET    | `/user`     | Listar usuarios        | ✅ JWT        |
| GET    | `/user/:id` | Obtener usuario por ID | ✅ JWT        |
| PUT    | `/user/:id` | Actualizar usuario     | ✅ JWT        |
| DELETE | `/user/:id` | Eliminar usuario       | ✅ JWT        |

#### 🏥 Health Check

| Método | Ruta      | Descripción                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Verificar estado de la API |

### Swagger Documentation

Accede a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

---

## 🏗️ Decisiones Arquitectónicas

### 1. **SOLID Principles** 📐

El proyecto aplica principios SOLID para mantenibilidad y escalabilidad:

#### S - Single Responsibility

- **Servicios únicos**: `UserService` solo maneja usuarios, `AuthService` solo autenticación
- **Separación de capas**: Controllers, Services, Repositories
- **Hooks específicos**: `useLogin`, `useRegister`, `useDraggable` con responsabilidades claras

```typescript
// ✅ Bien: UserService solo maneja lógica de usuario
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  async findAll(): Promise<UserResponseDto[]>;
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
}
```

#### O - Open/Closed Principle

- **Módulos extensibles**: Fácil agregar nuevos módulos sin modificar existentes
- **DTOs parametrizables**: Reutilización de estructuras de datos
- **Slices de Zustand**: Fácil agregar nuevos slices sin tocar el store principal

```typescript
// ✅ Bien: Store abierto para extensión con slices
export const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
  // Agregar nuevos slices sin modificar código existente
}));
```

#### L - Liskov Substitution

- **Herencia consistente**: Services implementan interfaces comunes
- **Providers intercambiables**: JwtProvider, AesProvider son intercambiables

#### I - Interface Segregation

- **Interfaces específicas**: `IAuthSlice`, `IProductSlice` para cada dominio
- **DTOs segregados**: `LoginDto`, `CreateUserDto`, `UserResponseDto`

```typescript
// ✅ Bien: Interfaces pequeñas y específicas
export interface IAuthSlice {
  user: IUser | null;
  setSession: (payload: ISessionPayload) => void;
  logout: () => void;
}

export interface IProductSlice {
  items: IProduct[];
  addItem: (item: IProduct) => void;
}
```

#### D - Dependency Injection

- **Inyección en constructores**: NestJS maneja automáticamente las dependencias
- **Inversión de control**: Reducción de acoplamiento

```typescript
// ✅ Bien: DI automático en NestJS
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly authService: AuthService,
  ) {}
}
```

### 2. **Arquitectura Modular**

#### Backend: Separación por Dominio

```
src/
├── auth/           # Módulo de autenticación
├── user/           # Módulo de usuarios
├── common/         # Utilidades compartidas
└── app.module.ts   # Módulo raíz
```

Cada módulo es independiente e importable en otros:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
})
export class UserModule {}
```

#### Frontend: Feature-Based Structure

```
src/
├── auth/           # Feature: Autenticación
├── features/
│   └── shopping/   # Feature: E-commerce
├── common/         # Componentes y servicios compartidos
├── router/         # Configuración de rutas
└── layout/         # Layouts principales
```

Cada feature es independiente y podría extraerse a un paquete.

### 3. **Repository Pattern** 📚

Separa la lógica de acceso a datos de la lógica de negocio:

```typescript
// Repository: Solo acceso a datos
@Injectable()
export class UserRepositoryService {
  async createUser(body: CreateUserDto): Promise<User>
  async findUserById(id: string): Promise<User | null>
  async updateUser(id: string, body: UpdateUserDto): Promise<UpdateResult>
}

// Service: Lógica de negocio y validaciones
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Validaciones de negocio aquí
    const existingUser = await this.userRepository.findUserByEmail(...)
    if (existingUser) throw new ConflictException(...)
    // Luego usar repository
    return this.userRepository.createUser(...)
  }
}
```

**Beneficios:**

- Fácil testing (mockear repository)
- Lógica de negocio desacoplada de la BD
- Cambiar BD sin afectar servicios

### 4. **Carrito en sessionStorage (No en BD)**

**¿Por qué?**

- 🚀 **Performance**: No requiere queries a BD
- 💾 **Privacidad**: No persiste sin querer en servidor
- 📱 **UX**: Carrito disponible al momento (sin latencia)
- 🔄 **Stateless**: Backend no necesita mantener estado de carrito
- 🧪 **Testing**: Más fácil de testear

**Implementación:**

```typescript
// sessionStorageService: Servicio centralizado
export const sessionStorageService = {
  get(): AuthTokens | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(data: AuthTokens): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  },
};

// Zustand slice la utiliza
export const createProductSlice = (set) => ({
  items: [],
  addItem: (item: IProduct) => {
    set((state) => ({ items: [...state.items, item] }));
    // Aquí podría persistirse a sessionStorage si se requiere
  },
});
```

### 5. **Feature-Driven Development (FDD) en Frontend**

**¿Por qué?**

- 📦 **Modularidad**: Cada feature es un mini-proyecto
- 🔄 **Reutilización**: Fácil extraer a micro-front-end o monorepo
- 🧹 **Limpieza**: Eliminar feature = eliminar carpeta
- 👥 **Equipos paralelos**: Varios equipos sin conflictos
- 📈 **Escalabilidad**: Estructura crece con el proyecto

**Estructura:**

```
features/shopping/
├── components/      # Componentes específicos del feature
├── hooks/          # Hooks personalizados (useProductSearch)
├── types/          # Types y interfaces
├── services/       # Servicios HTTP
├── store/          # Slices de estado
├── schemas/        # Validaciones (Zod)
└── views/          # Pantallas principales
```

### 6. **Docker para Consistencia** 🐳

**¿Por qué?**

- 🌍 **Mismo ambiente**: Todos corren lo mismo (dev, staging, prod)
- 🔧 **Sin "funciona en mi máquina"**: Reproducible
- ⚡ **Setup rápido**: `docker-compose up` y listo
- 🚀 **Fácil deploy**: Push a registry y deploy
- 📦 **Dependencias aisladas**: Sin conflictos de versiones

**Arquitectura Docker:**

```yaml
services:
  db: # PostgreSQL
  back: # NestJS API
  front: # Nginx con React
```

### 7. **Vistas Privadas vs Públicas** 🔒

Separación clara de rutas autenticadas y públicas:

```typescript
// router.tsx
<Route element={<PublicRoute />}>
  <Route element={<PublicLayout />}>
    {publicRoutes.map(route => ...)}  // /auth
  </Route>
</Route>

<Route element={<ProtectedRoute />}>
  <Route element={<PrivateLayout />}>
    {privateRoutes.map(route => ...)}  // /ecommerce, /order-processing
  </Route>
</Route>
```

**ProtectedRoute valida autenticación:**

```typescript
export const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to={ROUTES.auth} replace />
  return <Outlet />
}
```

**Beneficios:**

- ✅ Imposible acceder a rutas privadas sin login
- 📐 Layouts diferentes por tipo de usuario
- 🎯 Redirección automática

### 8. **Servicios para Endpoints (API Abstraction)**

Centralizar llamadas HTTP en servicios:

```typescript
// authService: Abstracción de API
export const authService = {
  async login(credentials: LoginDto): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data.data
  },
  async refresh(): Promise<TokenUserDto> {
    const { data } = await apiClient.post('/auth/refresh')
    return data.data
  }
}

// Usar en hooks
export const useLogin = () => {
  const login = async (values: LoginFormValues) => {
    const response = await authService.login(...)  // Aquí
    setSession(response)
  }
}
```

**Beneficios:**

- 🔄 **Reutilización**: Múltiples componentes llaman a `authService`
- 🧪 **Testing**: Mock del servicio, no de HTTP
- 🔧 **Mantenimiento**: Cambiar endpoint en un solo lugar
- 📊 **Analytics**: Centralizadas en servicios

---

## 🎨 Patrones de Diseño Implementados

### 1. **Repository Pattern**

**Dónde:** `apps/back/src/user/provider/user.repository.service.ts`

```typescript
// Abstrae acceso a datos
@Injectable()
export class UserRepositoryService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

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
```

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
```

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

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    })
  }
```
