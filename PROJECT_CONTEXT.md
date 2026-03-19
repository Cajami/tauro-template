# Contexto del Proyecto: Tauro Template

## Resumen ejecutivo
Tauro Template es un template base de dashboard construido con Angular 19, Tailwind CSS v4 y SCSS. Su objetivo es acelerar el inicio de nuevos proyectos web ofreciendo una base ya resuelta para autenticacion, layout principal y componentes reutilizables, de modo que el desarrollador pueda concentrarse rapido en la logica de negocio.

Este proyecto no busca ser una aplicacion de negocio final, sino una base reusable para nuevos sistemas administrativos o dashboards.

## Objetivo del producto
El template debe permitir que un desarrollador tenga desde el inicio:
- Un layout de dashboard funcional con header, sidebar, footer y area de contenido.
- Navegacion base y estructura escalable por features.
- Pantalla de login y flujo de acceso inicial.
- Componentes reutilizables ya estilizados y listos para usar.
- Sistema visual base con tema centralizado.
- Guias y paginas demo para acelerar la integracion en proyectos reales.

La prioridad del template es reducir trabajo repetitivo y boilerplate al iniciar un proyecto Angular administrativo.

## Estado actual del proyecto
Estado general: funcional como template base en evolucion.

Actualmente ya existe:
- Layout principal de dashboard con header, sidebar responsive y footer.
- Login funcional con autenticacion simulada.
- Guard e interceptor base de autenticacion.
- Estructura por features y lazy loading.
- Componentes reutilizables compartidos.
- Paginas demo y documentacion para componentes y personalizacion del template.
- Deploy automatico en GitHub Pages desde la rama `main` mediante GitHub Actions.
- Workspace consolidado en una sola raiz de proyecto.
- Componente shared `Select` con busqueda interna y soporte para Reactive Forms y ngModel.
- Seccion `Theme > Color` para documentar como cambiar la paleta principal del template.
- `Theme > Color` mantiene la vista previa del color entre rutas y recargas durante desarrollo.

Actualmente aun esta en construccion o expansion:
- La autenticacion sigue siendo simulada; no hay backend real integrado.
- Las features de negocio siguen siendo demo o placeholder.
- La documentacion aun no cubre necesariamente todo el inventario posible del template.
- Existen warnings conocidos en build relacionados con Sass `@import`, `flatpickr` CommonJS y algunos selector warnings.
- Este archivo debe mantenerse actualizado cuando cambie la arquitectura, el flujo o el set de componentes y guias.

## Stack tecnico actual
- Angular 19
- Standalone Components
- Angular Router con lazy loading
- Signals
- Tailwind CSS v4
- SCSS
- Lucide Angular
- Flatpickr para DateTimePicker
- GitHub Pages para demo publica
- GitHub Actions para build y deploy

## Estructura de alto nivel
Raiz importante del proyecto:
- `src/app/core`: servicios, modelos, guards e interceptor.
- `src/app/layout`: layout principal del dashboard.
- `src/app/features`: paginas y features de ejemplo, demo o guia.
- `src/app/shared/components`: componentes reutilizables.
- `src/styles`: tema y estilos globales por componente.
- `.github/workflows`: automatizacion de deploy.

## Arquitectura actual
### Core
Contiene piezas base de infraestructura:
- `auth.service.ts`: maneja login/logout y estado de autenticacion con signals.
- `storage.service.ts`: persiste datos en almacenamiento local.
- `auth.guard.ts`: protege rutas privadas.
- `auth.interceptor.ts`: base para inyectar token en requests.
- `theme-preview.service.ts`: persiste y reaplica la vista previa del color del template durante desarrollo.

### Layout
El layout principal vive en `src/app/layout/dashboard-layout`.

Comportamiento actual:
- Usa `HeaderComponent`, `SidebarComponent` y `FooterComponent`.
- El sidebar es responsive.
- En desktop se abre por defecto.
- En mobile se cierra por defecto y puede abrirse o cerrarse por interaccion del usuario.
- El menu lateral fue simplificado para dejar solo Dashboard, Components y Theme.

### Features actuales
- `auth`: login.
- `dashboard`: home de ejemplo con metricas y actividad reciente.
- `components`: paginas demo de componentes reutilizables.
- `theme`: guias de personalizacion del template.

Las antiguas features `users` y `settings` fueron eliminadas para dejar el template minimo viable.

### Shared components actuales
Inventario identificado en `src/app/shared/components`:
- `alert`
- `button`
- `checkbox`
- `component-showcase`
- `datetime-picker`
- `form/input`
- `form/select`
- `form/password-input`
- `form/textarea`
- `header-page`

Estos componentes son parte central del valor del template y deben crecer con enfoque de reusabilidad.

### Componente Select
El `Select` compartido fue construido sin dependencia externa adicional.

Capacidades actuales:
- Soporta `ControlValueAccessor`.
- Funciona con Reactive Forms.
- Funciona con `ngModel`.
- Detecta `required` para mostrar `*` como el componente `Input`.
- Permite busqueda interna sobre `label`, `description` y `keywords`.
- Tiene documentacion demo propia en la seccion Components.
- Soporta navegacion por teclado con flechas arriba y abajo, y seleccion con `Enter`.
- Hace scroll automatico hacia la opcion resaltada o seleccionada para que no se pierda visualmente al navegar con teclado.
- Muestra limpieza de valor con una `x` cuando el campo no es `required`, tiene valor y no esta deshabilitado.
- La pagina de documentacion incluye ejemplos de valor actual para explicar su uso con Reactive Forms y `ngModel`.
- El dropdown eleva temporalmente su capa visual dentro de `component-showcase` para evitar recortes o solapamientos en las demos.

### Componente DateTimePicker
El `DateTimePicker` usa Flatpickr con una capa visual integrada al sistema de tema.

Estado actual:
- Usa tokens del tema para borde, fondo, estados y seleccion.
- Sigue el color `primary-*` del template, incluyendo la vista previa persistente de `Theme > Color`.
- Marca sabados y domingos con una senal roja que se mantiene visible incluso cuando el dia esta seleccionado.

### Seccion Theme
La feature `theme` agrupa documentacion para personalizar el template sin mezclarla con el catalogo de componentes.

Estado actual:
- Existe la ruta `Theme > Color`.
- Explica que el color principal se cambia desde `src/styles/theme.scss`.
- Muestra paletas sugeridas para empezar rapido.
- Aplica la paleta seleccionada en caliente sobre la app y la mantiene entre rutas o recargas durante la sesion de desarrollo.
- Incluye un selector de color personalizado que genera una escala base `primary-*` como punto de partida, la aplica en vivo y permite restaurar el tema original.

## Navegacion actual
Rutas principales detectadas:
- `/auth/login`
- `/dashboard/home`
- `/components/input`
- `/components/select`
- `/components/datetimepicker`
- `/components/button`
- `/theme/color`

Comportamiento general:
- Las rutas privadas cuelgan del `DashboardLayoutComponent`.
- El root redirige a `dashboard` cuando el usuario esta autenticado.
- Rutas desconocidas redirigen a `auth/login`.
- La seccion `components` redirige a `input` por defecto.
- La seccion `theme` redirige a `color` por defecto.

## Flujo de autenticacion actual
La autenticacion actual es de tipo demo.

Funcionamiento observado:
- Si usuario y password tienen valor, el login se considera exitoso.
- Se genera un token falso y se guarda en storage.
- Se guarda un usuario demo en storage.
- El guard valida la existencia del token.

Implicacion:
- Esto sirve como base visual y estructural.
- Cuando se conecte un backend real, el servicio de autenticacion debera evolucionar sin romper el resto del template.

## Sistema visual y estilos
- Los estilos globales viven en `src/styles.scss`.
- El tema base vive en `src/styles/theme.scss`.
- Existen estilos de componentes compartidos en `src/styles/components`.
- El proyecto usa Tailwind CSS v4 y SCSS al mismo tiempo.

Observacion tecnica importante:
- El build actual funciona, pero Angular muestra warnings por uso de `@import` en Sass.
- En algun momento convendra migrar a `@use` y `@forward` para evitar deuda tecnica futura.
- Los componentes nuevos deben seguir usando la escala `primary-*` del tema para que la personalizacion visual del template sea consistente.
- El asterisco de campos requeridos se mantiene como senal de validacion y no como color de marca.

## Deploy y entorno
### Desarrollo local
- `npm start` levanta el proyecto en `http://localhost:4200`.

### Build
- `npm run build`
- El build de produccion usa `--base-href /tauro-template/` para GitHub Pages.

### Publicacion
- La fuente de verdad es la rama `main`.
- GitHub Actions construye y publica automaticamente en GitHub Pages.
- Ya no se usa una carpeta separada `github-pages` ni una segunda copia local del proyecto.
- El workflow publica `dist/tauro-template/browser`.

## Decisiones recientes importantes
- El workspace fue consolidado en una sola raiz de repositorio.
- Se elimino el flujo manual con carpeta `github-pages`.
- Se configuro deploy automatico con GitHub Actions.
- Se agregaron reglas de idioma y codificacion en `AGENTS.md`, `.editorconfig` y `.vscode/settings.json`.
- Se agrego un componente shared `Select` con documentacion de uso.
- Se agrego la seccion `Theme > Color` para documentar como cambiar la paleta principal del template desde `src/styles/theme.scss`.
- La vista previa del tema ahora persiste entre rutas y recargas durante desarrollo.
- Se eliminaron las features `users` y `settings` para dejar el template minimo viable.
- Se ajusto `component-showcase` para soportar componentes con overlays o dropdowns sin cortar su render en las paginas de documentacion.

## Convenciones para futuros agentes
Antes de hacer cambios en el proyecto:
1. Leer este archivo completo.
2. Revisar `AGENTS.md`.
3. Confirmar si la tarea afecta layout, shared components, rutas, auth, estilos globales o deploy.
4. Priorizar cambios reutilizables y no acoplar soluciones a una sola pagina si pueden convertirse en componente base.

Al desarrollar nuevas funcionalidades:
- Pensar siempre si el cambio aporta al template o solo a una demo puntual.
- Favorecer componentes reutilizables sobre implementaciones duplicadas.
- Mantener la arquitectura por features.
- Mantener el proyecto en espanol para documentacion y mensajes al usuario, salvo necesidad explicita.
- Mantener archivos en UTF-8.
- Actualizar este archivo cuando se agreguen capacidades relevantes a shared components o a la experiencia de documentacion.
- Mantener la documentacion de `theme` separada de `components`, porque describe configuracion del template y no componentes reutilizables.

## Regla de mantenimiento de este archivo
Este archivo debe actualizarse siempre que ocurra cualquiera de estos cambios:
- Se agreguen o eliminen features principales.
- Se agreguen componentes compartidos reutilizables.
- Cambie la arquitectura del layout o navegacion.
- Cambie el flujo de autenticacion.
- Cambie el sistema de deploy.
- Se agreguen convenciones nuevas relevantes para agentes.

Si un agente hace cambios significativos y no actualiza este archivo, la documentacion operativa del proyecto queda desfasada.

## Sugerencias de proximos focos de trabajo
Posibles siguientes mejoras del template:
- Expandir catalogo de componentes reutilizables.
- Mejorar documentacion demo de componentes existentes.
- Ampliar la seccion `theme` con configuraciones adicionales ademas de color.
- Reemplazar autenticacion simulada por una interfaz mas adaptable a backend real.
- Migrar Sass `@import` a `@use`.
- Revisar y normalizar textos o codificacion en archivos fuente donde aparezcan caracteres danados.
- Agregar mas ejemplos reales de paginas administrativas usando los componentes base.