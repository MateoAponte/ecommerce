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

---

## 📘 Overview

This project is a template for an e-commerce web application. It includes:

- Backend API in **NestJS**
- Frontend SPA in **React + Vite**
- JWT authentication with access and refresh tokens
- Drag-and-drop shopping cart
- Modular backend and feature-driven frontend architecture
- Docker support for development and deployment

---

## ⚙️ Config

### Backend

The backend is configured through environment variables and uses **@nestjs/config** for configuration management. It relies on:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET`, `JWT_EXPIRES_IN`
- `PORT`

### Frontend

The frontend loads runtime values from Vite environment variables:

- `VITE_API_URL`
- `VITE_WALMART_API_URL`
- `VITE_WALMART_API_KEY`
- `VITE_APP_NAME`
- `VITE_ENV`

---

## ✨ Features

- **Drag & Drop** cart interactions
- **JWT authentication** with login, register, and refresh flows
- **Protected routes** for authenticated pages
- **Search with debounce**
- **Infinite scroll** product listing
- **Responsive UI** with Material UI and utility styling
- **Toast notifications** for user feedback
- **Public/private layout separation**

---

## ▶️ How to Run App

### With Docker (recommended)

```bash
pnpm run docker:up
```

Access:

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3000`

Stop services:

```bash
pnpm run docker:down
```

### Without Docker

#### Start PostgreSQL

Use local PostgreSQL or launch the database with Docker separately:

```bash
docker run --name postgres-gapsi \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gapsi-ecommerce-db \
  -p 5433:5432 \
  -d postgres:16
```

#### Start backend

```bash
cd apps/back
pnpm run start:dev
```

#### Start frontend

```bash
cd apps/front
pnpm run start:dev
```

Frontend is available at `http://localhost:5173`.

---

## ✅ Prerequisites

- Node.js 22+
- pnpm
- Git
- Docker + Docker Compose
- PostgreSQL
- pgAdmin 4 (recommended if not using Docker)

---

## 📌 Areas to Improve

- **Add unit and integration tests**: improve reliability by covering backend services and frontend components. Use Jest and Supertest for backend tests, and React Testing Library for frontend UI tests.
- **Centralize token constants and shared classes**: reduce duplication and configuration drift by defining shared constants and interfaces in a common module.
- **Introduce a 7-1 Sass architecture**: increase CSS maintainability with a clear folder structure for variables, base styles, components, layout, pages, and themes.
- **Add endpoint caching**: improve performance for repeated requests by implementing NestJS caching or React Query stale data caching.
- **Create consistent Material UI component patterns**: standardize design tokens and reusable component wrappers to reduce style drift.
- **Centralize frontend error handling**: make error flows consistent by adding a shared error formatter and a global Axios response handler.
- **Improve accessibility support**: add ARIA labels, keyboard navigation, and semantic HTML to make the app more accessible.
- **Enhance authorization rules**: strengthen security by implementing role-based route guards and metadata-driven access control.

---

## ⚠️ Errors

- **Responsive layout issues**: some UI areas do not adapt consistently on mobile. Fix by auditing breakpoints and using responsive Material UI / Tailwind utilities.
- **Visual state behavior is not centralized**: hover, focus, and active states vary across components. Fix by defining shared style tokens and component variants.
- **Implementation inconsistencies**: similar logic is duplicated between modules. Fix by refactoring shared utilities and service abstractions.
- **Error handling is inconsistent**: UI feedback does not always follow the same format. Fix by normalizing backend error responses and mapping them in a central frontend error handler.

---

## 🧰 Techs

- PostgreSQL
- Docker
- React
- Vite
- TypeScript
- NestJS
- JWT
- Material UI
- Zustand
- Zod
- React Router
- Axios
- react-hot-toast
- @dnd-kit/core
- Sass
- Tailwind CSS

---

## 🧠 SOLID

- **Single Responsibility**: controllers, services, and providers each manage a separate concern.
- **Open/Closed**: modules and state slices are structured to be extended without modifying existing code.
- **Dependency Inversion**: NestJS injects providers and services through constructors.

---

## 🔧 Design Patterns

The project uses these Refactoring Guru fundamental design patterns:

### Adapter

- Used by authentication providers to adapt encryption and JWT behavior to a consistent token provider interface.

### Strategy

- Implemented by JWT auth strategies for access token and refresh token validation.

### Decorator

- Used by NestJS route decorators and custom decorators to attach metadata and documentation to auth endpoints.

### Observer

- Applied in drag-and-drop event handling, where event callbacks observe user interactions and update state.

---

## Decisions Made

### Why cart items are stored locally

- Cart interactions are faster and avoid extra backend requests.
- Local cart state reduces server-side state complexity.
- It improves responsiveness for drag-and-drop behavior.

### Why a feature-driven frontend structure

- The code is easier to scale and maintain.
- Each feature is self-contained and easier to navigate.
- It avoids mixing unrelated UI logic.

### Why Dockerize

- Docker ensures a reproducible development environment.
- It simplifies setup for database and services.
- It reduces "works on my machine" issues.

### Why split public and private views

- It creates clearer security boundaries.
- It supports separate layouts for unauthenticated and authenticated pages.
- It simplifies route protection.

### Why create services for endpoints

- It centralizes HTTP logic.
- It keeps component code cleaner.
- It makes token refresh and error handling reusable.

### Exception handling

- Backend uses global exception handling for consistent API error responses.
- Frontend interceptors centralize auth failure handling and token refresh.
- This makes error states easier to manage and user feedback more consistent.

---

## 📍 Routes

- `/auth` — Authentication screen
- `/ecommerce` — E-commerce shopping experience
- `/order-processing` — Order processing screen
- `/another` — 404 / fallback route

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

````

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
````

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
