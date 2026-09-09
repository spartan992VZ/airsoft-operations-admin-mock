# High-Fidelity Airsoft Dashboard

Dashboard de gestión de eventos de airsoft construido con React, Vite y Tailwind CSS v4.

## 🚀 Instalación y Ejecución

### Requisitos Previos
- **Node.js**: v22 (definido en `.mise.toml`)
- **npm**: (alternativa a pnpm)
- **Docker**: (opcional, para contenerización)

### Instalación de Dependencias
```bash
npm install
# o
pnpm install
```

### Comandos Disponibles

#### Desarrollo
```bash
npm run dev
# o
pnpm dev
```
Inicia el servidor de desarrollo en `http://localhost:8443` (o el puerto definido en `$PORT`).

#### Build para Producción
```bash
npm run build
# o
pnpm build
```
Genera la versión optimizada de la aplicación en la carpeta `dist/`.

#### Preview de Producción
```bash
npm run preview
# o
pnpm preview
```
Sirve la versión de producción localmente en `http://localhost:8443`.

#### Formateo de Código
```bash
npm run format
# o
pnpm format
```
Formatea el código usando `oxfmt`.

### Docker

#### Construir Imagen Docker
```bash
docker build -t airsoft-operations-admin .
```

#### Ejecutar Contenedor
```bash
docker run -p 8080:80 airsoft-operations-admin
```
La aplicación estará disponible en `http://localhost:8080`.

#### Ejecutar en Modo Detached
```bash
docker run -d -p 8080:80 --name airsoft-admin airsoft-operations-admin
```

#### Detener y Eliminar Contenedor
```bash
docker stop airsoft-admin
docker rm airsoft-admin
```

## 📁 Estructura del Proyecto

```
High-Fidelity Airsoft Dashboard - VERSION CON GRUPOS/
├── .figma/                    # Configuración de Figma Make
├── src/
│   ├── App.tsx               # Componente principal con Dashboard y navegación
│   ├── main.tsx              # Punto de entrada de React
│   ├── index.css             # Estilos globales e import de Tailwind CSS v4
│   ├── shared.tsx            # Componentes compartidos y constantes
│   ├── vite-env.d.ts         # Tipos de Vite
│   ├── components/           # Componentes UI reutilizables
│   │   ├── shared/           # Componentes compartidos (StatusBadge, LimeButton, GhostButton)
│   │   └── ui/               # Componentes base (por crear)
│   ├── pages/                # Páginas de la aplicación
│   │   ├── MisEventos.tsx    # Gestión de eventos creados
│   │   ├── CrearEvento.tsx   # Formulario de creación de eventos (4 pasos)
│   │   ├── Inscripciones.tsx # Gestión de inscripciones y pagos
│   │   ├── Equipos.tsx       # Gestión de equipos
│   │   └── Campos.tsx        # Gestión de campos de juego
│   ├── types/                # Definiciones de TypeScript
│   │   ├── event.ts          # Tipos de Event
│   │   ├── registration.ts   # Tipos de Registration
│   │   ├── team.ts           # Tipos de Team
│   │   ├── field.ts          # Tipos de Field
│   │   ├── player.ts         # Tipos de Player
│   │   └── index.ts          # Export de todos los tipos
│   ├── repositories/         # Patrón Repository para acceso a datos
│   │   ├── baseRepository.ts # Repository base genérico
│   │   ├── eventRepository.ts
│   │   ├── registrationRepository.ts
│   │   ├── teamRepository.ts
│   │   ├── fieldRepository.ts
│   │   ├── playerRepository.ts
│   │   └── index.ts
│   ├── stores/               # State management con Zustand
│   │   ├── eventStore.ts
│   │   ├── registrationStore.ts
│   │   ├── teamStore.ts
│   │   ├── fieldStore.ts
│   │   ├── playerStore.ts
│   │   ├── uiStore.ts
│   │   └── index.ts
│   └── persistence/          # Persistencia local
│       └── seedData.ts       # Datos iniciales para LocalStorage
├── index.html                # HTML shell con #root
├── package.json              # Dependencias y scripts
├── vite.config.ts            # Configuración de Vite con plugins de Figma
├── tsconfig.json             # Configuración de TypeScript
├── Dockerfile                # Configuración de Docker
├── nginx.conf                # Configuración de nginx para Docker
├── .dockerignore             # Archivos ignorados por Docker
└── .mise.toml                # Versiones de herramientas (Node.js, pnpm)
```

## 🏗️ Arquitectura Actual

### Stack Tecnológico
- **Runtime**: React 19 + React DOM 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **TypeScript**: v5.7 con modo estricto
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router Dom v7
- **State Management**: Zustand v5
- **Persistence**: LocalStorage con patrón Repository
- **Formatter**: oxfmt
- **Containerization**: Docker + nginx

### Patrones Actuales
- **Componentes Funcionales**: Todos los componentes usan React hooks
- **State Management**: Zustand stores por dominio (Event, Registration, Team, Field, Player, UI)
- **Navegación**: React Router con rutas formales (`/`, `/events`, `/events/create`, `/registrations`, `/teams`, `/fields`)
- **Datos**: Seed data en LocalStorage con patrón Repository para acceso a datos
- **Estilos**: Utility-first con Tailwind CSS + estilos inline dinámicos
- **Tipado**: TypeScript interfaces centralizadas en `src/types/`
- **Arquitectura en Capas**: UI → Stores → Repositories → LocalStorage

### Componentes Compartidos
- **`src/shared.tsx`**: Constantes globales (LIME, LIME_DIM, NAV_ITEMS, CHART_TOOLTIP, CARD)
- **`src/components/shared/`**: Componentes reutilizables
  - `StatusBadge`: Badge de estado con colores configurables
  - `LimeButton`: Botón primario con tema lime
  - `GhostButton`: Botón secundario con tema ghost

### Páginas Implementadas
1. **Dashboard** (`App.tsx`): Vista principal con KPIs, eventos próximos, acciones rápidas, actividad reciente, gráficos
2. **Mis Eventos**: Listado de eventos con filtros, búsqueda, paginación
3. **Crear Evento**: Formulario multi-paso (4 pasos) para crear nuevos eventos
4. **Inscripciones**: Gestión de inscripciones con filtros, aprobación/rechazo
5. **Equipos**: Gestión de equipos y miembros
6. **Campos**: Gestión de campos de juego

## 🔍 Análisis de Arquitectura Actual

### Fortalezas
- ✅ Stack moderno y actualizado (React 19, Vite 8, Tailwind v4)
- ✅ TypeScript con modo estricto
- ✅ Componentes reutilizables básicos
- ✅ Diseño consistente con tema lime
- ✅ Hot reload configurado
- ✅ **Routing formal implementado**: React Router con rutas declarativas
- ✅ **State management global**: Zustand stores por dominio
- ✅ **Persistencia local**: LocalStorage con patrón Repository
- ✅ **Tipado centralizado**: TypeScript interfaces en `src/types/`
- ✅ **Arquitectura en capas**: Separación clara entre UI, Stores, Repositories y Persistencia
- ✅ **Containerización**: Docker + nginx para despliegue

### Debilidades
- ❌ **Sin conexión a API real**: Datos persisten en LocalStorage (mock)
- ❌ **Sin testing**: No hay pruebas unitarias ni de integración
- ❌ **Sin validación de formularios**: Formularios sin validación robusta
- ❌ **Componentes monolíticos**: Archivos muy grandes (App.tsx ~600 líneas, páginas ~400-800 líneas)
- ❌ **Sin manejo de errores**: No hay error boundaries ni manejo de errores
- ❌ **Sin optimización**: No hay memoization, lazy loading, ni code splitting
- ❌ **Sin internacionalización**: Textos hardcoded en español

## 📋 Plan de Mejora Modular por Fases

### ✅ Fase 1: Fundamentos de Arquitectura (COMPLETADA)

**Objetivo**: Establecer patrones de diseño estándar y separación de concerns

#### ✅ 1.1 Implementar Routing
- Instalado `react-router-dom` v7
- Migrada navegación manual a `<Routes>` y `<Route>`
- Estructura de rutas implementada:
  - `/` → Dashboard
  - `/events` → Mis Eventos
  - `/events/create` → Crear Evento
  - `/registrations` → Inscripciones
  - `/teams` → Equipos
  - `/fields` → Campos

#### ✅ 1.2 Implementar State Management Global
- Instalado Zustand v5
- Creados stores separados por dominio:
  - `useEventStore`: Eventos, filtros, selección
  - `useRegistrationStore`: Inscripciones, pagos
  - `useTeamStore`: Equipos, miembros
  - `useFieldStore`: Campos, disponibilidad
  - `usePlayerStore`: Jugadores
  - `useUIStore`: Navegación, modales, notificaciones

#### ✅ 1.3 Implementar Patrón Repository
- Creada carpeta `src/repositories/`:
  - `baseRepository.ts`: Repository base genérico con CRUD
  - `eventRepository.ts`: Repository para eventos
  - `registrationRepository.ts`: Repository para inscripciones
  - `teamRepository.ts`: Repository para equipos
  - `fieldRepository.ts`: Repository para campos
  - `playerRepository.ts`: Repository para jugadores
- Implementado seed data en `src/persistence/seedData.ts`

#### ✅ 1.4 Estructura de Carpetas
```
src/
├── components/          # Componentes UI reutilizables
│   ├── ui/             # Componentes base (Button, Input, Card, etc.)
│   ├── layout/         # Componentes de layout (Header, Sidebar, etc.)
│   └── features/       # Componentes específicos de features
├── pages/              # Páginas (contenedores)
├── services/           # Lógica de negocio y API calls
├── stores/             # State management (Zustand/Redux)
├── hooks/              # Custom hooks
├── types/              # Definiciones de TypeScript
├── utils/              # Utilidades helpers
├── constants/          # Constantes y configuraciones
└── config/             # Configuración de la app
```

### Fase 2: Componentización y Reutilización (Prioridad Alta)

**Objetivo**: Extraer componentes reutilizables y reducir duplicación

#### 2.1 Sistema de Design System
- Crear `src/components/ui/` con componentes base:
  - `Button.tsx`: Variantes (primary, secondary, ghost, danger)
  - `Input.tsx`: Text, number, date, select
  - `Card.tsx`: Contenedor con header/body/footer
  - `Badge.tsx`: Badge de estado
  - `Table.tsx`: Tabla con paginación y sorting
  - `Modal.tsx`: Modal reutilizable
  - `Tooltip.tsx`: Tooltip
  - `Dropdown.tsx`: Dropdown menu

#### 2.2 Componentes de Layout
- Crear `src/components/layout/`:
  - `Sidebar.tsx`: Navegación lateral
  - `Header.tsx`: Header con usuario y notificaciones
  - `MainLayout.tsx`: Layout principal combinando sidebar + header

#### 2.3 Extraer Componentes de Páginas
- Descomponer páginas monolíticas en componentes más pequeños:
  - `MisEventos.tsx` → `EventList.tsx`, `EventCard.tsx`, `EventFilters.tsx`
  - `CrearEvento.tsx` → `EventFormStep1.tsx`, `EventFormStep2.tsx`, etc.
  - `Inscripciones.tsx` → `RegistrationTable.tsx`, `RegistrationFilters.tsx`

### Fase 3: Validación y Forms (Prioridad Media)

**Objetivo**: Implementar validación robusta de formularios

#### 3.1 Implementar React Hook Form
- Instalar `react-hook-form` + `zod`
- Migrar formularios a React Hook Form:
  - `CrearEvento.tsx`: Formulario multi-paso con validación
  - Otros formularios de creación/edición

#### 3.2 Esquemas de Validación Zod
- Crear `src/schemas/`:
  - `eventSchema.ts`: Validación de eventos
  - `registrationSchema.ts`: Validación de inscripciones
  - `teamSchema.ts`: Validación de equipos

### Fase 4: Conexión a Backend (Prioridad Alta)

**Objetivo**: Conectar la app a una API real

#### 4.1 Configurar Cliente HTTP
- Instalar `axios` o usar `fetch` con interceptors
- Crear `src/services/api.ts`:
  - Configuración base (baseURL, headers)
  - Interceptors para auth, errores, refresh token
  - Manejo centralizado de errores

#### 4.2 Implementar Endpoints
- Crear servicios en `src/services/`:
  - `eventService.ts`: CRUD de eventos
  - `registrationService.ts`: CRUD de inscripciones
  - `teamService.ts`: CRUD de equipos
  - `fieldService.ts`: CRUD de campos
  - `authService.ts`: Autenticación

#### 4.3 Manejo de Loading y Errores
- Implementar hooks personalizados:
  - `useQuery.ts`: Para GET requests
  - `useMutation.ts`: Para POST/PUT/DELETE
  - Manejo de estados loading/error/success

### Fase 5: Testing (Prioridad Media)

**Objetivo**: Implementar suite de pruebas

#### 5.1 Configurar Testing
- Instalar `vitest`, `@testing-library/react`, `@testing-library/user-event`
- Configurar `vitest.config.ts`

#### 5.2 Pruebas Unitarias
- Testear componentes UI (`src/components/ui/`)
- Testear hooks personalizados (`src/hooks/`)
- Testear servicios (`src/services/`)

#### 5.3 Pruebas de Integración
- Testear flujos completos (crear evento, inscribirse, etc.)
- Testear páginas completas

### Fase 6: Optimización de Performance (Prioridad Media)

**Objetivo**: Mejorar performance y experiencia de usuario

#### 6.1 Code Splitting
- Implementar lazy loading de rutas:
  ```tsx
  const Dashboard = lazy(() => import('./pages/Dashboard'))
  const MisEventos = lazy(() => import('./pages/MisEventos'))
  ```

#### 6.2 Memoization
- Usar `React.memo` en componentes que no necesitan re-render
- Usar `useMemo` para cálculos costosos
- Usar `useCallback` para callbacks pasados a hijos

#### 6.3 Virtualización
- Para listas largas (inscripciones, eventos), implementar virtual scrolling con `react-window`

### Fase 7: Internacionalización (Prioridad Baja)

**Objetivo**: Soportar múltiples idiomas

#### 7.1 Implementar i18n
- Instalar `react-i18next`
- Crear archivos de traducción:
  - `src/locales/es.json`
  - `src/locales/en.json`
- Migrar todos los textos hardcoded a usar `t('key')`

### Fase 8: Accesibilidad y UX (Prioridad Media)

**Objetivo**: Mejorar accesibilidad y experiencia de usuario

#### 8.1 Accesibilidad
- Implementar ARIA labels
- Soporte de navegación por teclado
- Contrast ratios adecuados
- Screen reader friendly

#### 8.2 UX Improvements
- Skeleton loaders para estados de carga
- Empty states para listas vacías
- Error boundaries para manejo de errores
- Toast notifications para feedback de acciones
- Confirm dialogs para acciones destructivas

### Fase 9: DevOps y Deploy (Prioridad Alta)

**Objetivo**: Configurar pipeline de despliegue

#### 9.1 CI/CD
- Configurar GitHub Actions o similar:
  - Linting en cada PR
  - Tests en cada PR
  - Build automático
  - Deploy automático a staging/producción

#### 9.2 Environment Variables
- Configurar `.env.example`
- Manejo de variables de entorno por entorno (dev, staging, prod)

#### 9.3 Monitoring
- Implementar error tracking (Sentry)
- Implementar analytics (Google Analytics ya configurado en vite.config.ts)

## 🎯 Resumen de Prioridades

1. **✅ Completado (Fase 1)**: Routing, State Management, Separación de concerns, Patrón Repository
2. **Corto plazo (Fase 2, 4)**: Componentización, Conexión a Backend
3. **Medio plazo (Fase 3, 5, 6, 8)**: Validación, Testing, Optimización, UX
4. **Largo plazo (Fase 7, 9)**: Internacionalización, DevOps avanzado

## 📝 Notas Adicionales

- La aplicación corre dentro de Figma Make con un servidor de desarrollo ya configurado en el puerto `$PORT` (default 8443)
- Los plugins de Figma en `vite.config.ts` manejan configuración del sitio, error overlay, y React Refresh
- El tema usa colores lime (`#a3e635`) como acento principal sobre fondo oscuro (`#080809`)
- Las fuentes usadas son Barlow Condensed, Inter y JetBrains Mono
