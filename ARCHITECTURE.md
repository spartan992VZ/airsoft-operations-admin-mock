# Arquitectura y refactorización

## Estado actual

AIRSOFT Operations es un mock local de React + Vite. La aplicación no tiene backend ni una API externa: Zustand mantiene el estado de la sesión y `localStorage` conserva los datos de demostración.

La estructura funcional queda organizada así:

```text
src/
  types/                  # Dominio: entidades y filtros
  application/            # Casos de uso y selectores puros
    dashboard/            # Consultas derivadas del dashboard
    mockData/             # Orquestación de hidratación del mock
  infrastructure/         # Adaptadores externos
    storage/              # Acceso seguro al localStorage del navegador
  stores/                 # Estado de presentación compartido (Zustand)
  pages/                  # Pantallas y composición de UI
  components/             # Componentes visuales reutilizables
  persistence/            # Dataset inicial del mock
  repositories/           # CRUD local genérico preparado para futuras migraciones
```

## Refactor aplicado

### Hidratación única del mock

Antes, `MisEventos`, `Inscripciones`, `Equipos` y `Campos` leían `localStorage` directamente con efectos casi idénticos. Ahora `useHydrateMockData` centraliza esa responsabilidad y se ejecuta desde el shell de la aplicación.

Esto reduce duplicación, evita que una pantalla conozca detalles de persistencia y asegura que todas las vistas consuman el mismo estado compartido.

### Adaptador de almacenamiento

`browserStorage` encapsula el acceso al navegador y maneja ausencia de `window` y JSON inválido. La aplicación puede reemplazarlo por IndexedDB, una API o un adaptador de test sin modificar páginas.

### Selectores de aplicación

`dashboardSelectors` contiene consultas puras para:

- resumen de eventos, publicaciones, inscripciones, capacidad, ingresos y operaciones pendientes;
- próximos eventos;
- inscripciones recientes.

El dashboard conserva su diseño, pero ya no contiene las reglas de cálculo principales.

### Tipado corregido

El formatter de Recharts acepta valores opcionales antes de convertirlos a importe ARS. Esto elimina el diagnóstico de TypeScript sin cambiar el resultado visual.

## Hallazgos relevantes

- `App.tsx` sigue siendo grande porque contiene el shell, el dashboard y parte de la configuración de navegación.
- Hay datos visuales estáticos de demo en `App.tsx` que conviven con datos derivados del store. Deben eliminarse o convertirse en una fuente explícita de contenido editorial en una iteración posterior.
- `repositories/` no tiene consumidores activos. Es una abstracción válida para infraestructura futura, pero hoy no participa en el flujo de la aplicación.
- Las stores de Zustand mezclan estado, persistencia middleware y acciones CRUD. Para un backend futuro convendría separar repositorios de casos de uso y dejar las stores como adaptadores de UI.
- `EventDetail.tsx` es la implementación activa. `EventoDetalle.tsx` aparece como eliminado en el estado de Git y `App.tsx` ya importa `EventDetail`; debe limpiarse en una revisión de integración, respetando cualquier cambio local pendiente.
- No se introdujo una capa de servicios artificial: para un mock sin backend habría añadido complejidad sin beneficio inmediato.

## Recomendaciones futuras

1. Extraer `AppShell`, `Dashboard` y la navegación a `components/layout` y `pages/Dashboard`.
2. Sustituir los arrays editoriales del dashboard por selectores de dominio o eliminar los elementos que no representen datos reales del mock.
3. Definir interfaces de repositorio por agregado (`EventRepository`, `RegistrationRepository`) y adaptar Zustand a ellas cuando exista una API real.
4. Añadir pruebas unitarias para `dashboardSelectors`, filtros y reglas de publicación.
5. Añadir una estrategia de migración/versionado de `localStorage` para cambios de esquema.
6. Eliminar los repositories no usados o conectarlos mediante casos de uso, evitando mantener abstracciones huérfanas.

## Validación

- `npm run build` pasa correctamente tras la refactorización.
- La lógica de hidratación permanece local y de demostración.
- No se agregaron pagos, reservas, backend ni funcionalidades de producto real.
