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
- Sistema global de modal dinamico mediante `modalService.open(MiComponente, config)`.

Actualmente aun esta en construccion o expansion:
- La autenticacion sigue siendo simulada; no hay backend real integrado.
- Las features de negocio siguen siendo demo o placeholder.
- La documentacion aun no cubre necesariamente todo el inventario posible del template.
- La experiencia desktop es la referencia principal actual; la version mobile/tablet todavia no esta estabilizada por completo y puede presentar fallas de layout o scroll.
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
- TanStack Table para el nuevo shared `Grid`
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
- El header muestra branding, boton hamburguesa, breadcrumbs visuales segun la ruta activa y una campana de notificaciones placeholder con badge semantico.
- El shell del dashboard esta organizado con CSS Grid: header arriba, sidebar a la izquierda y columna principal a la derecha con `main` y `footer`.
- El footer queda como pieza opcional del shell; si se retira, `main` ocupa el alto disponible sin romper la estructura.
- El sidebar es responsive.
- En desktop se abre por defecto.
- En mobile se cierra por defecto y puede abrirse o cerrarse por interaccion del usuario, pero esa experiencia todavia no debe considerarse cerrada ni lista como referencia final del template.
- Cada cambio de ruta reinicia el scroll al inicio para evitar heredar la posicion anterior entre paginas.
- El menu lateral fue simplificado para dejar solo Main, Components y Theme.
- La parte inferior del sidebar muestra el bloque de usuario y abre un menu de cuenta flotante: a la derecha en desktop y hacia arriba en mobile, con ajuste al viewport y scroll propio si crece.
- `AppComponent` monta un `ModalHostComponent` global para que cualquier ruta pueda abrir modales dinamicos desde el servicio.

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
- `grid`
- `dialog`
- `loading-block`
- `modal`
- `radio-group`
- `switch`
- `tabs`
- `toast`

Estos componentes son parte central del valor del template y deben crecer con enfoque de reusabilidad.

### Documentacion de componentes
La documentacion publica dentro de `Components` ahora sigue un patron mas consistente:
- Primero muestra ejemplos visuales y casos de uso reales.
- Luego deja notas de implementacion o recomendaciones cuando aplica.
- Finalmente cierra con una referencia API al final de la pagina.

Esa referencia API ya se esta usando en los componentes documentados para listar:
- Propiedad o metodo.
- Valores admitidos.
- Valor por defecto.
- Descripcion de uso.

Los componentes mas simples usan una sola tabla corta y los mas complejos pueden cerrar con varias tablas, por ejemplo:
- `Grid`: inputs del componente y propiedades por columna.
- `Modal`: `ModalConfig`, `actions` y `ModalRef`.
- `Dialog`: configs de alert y confirm, mas metodos del servicio.
- `Toast`: config, accion y helpers del servicio.
- `Select`, `Radio` y `Tabs`: propiedades del componente y de sus items/opciones.

### Componente Grid
La tabla shared del template ahora se apoya en TanStack Table para ofrecer una base mas potente que una tabla HTML simple.

Capacidades actuales:
- Sticky header configurable.
- Paginacion local con selector de tamanos y rango visible.
- Sorting opt-in por columna; cada columna debe declarar explicitamente `enableSorting: true` si debe ordenarse.
- Header groups y footer groups.
- Pinning de columnas a izquierda o derecha mediante metadata declarativa.
- Resize de columnas cuando la grid y la columna lo permiten.
- Scroll horizontal cuando el ancho de columnas supera el espacio visible.
- Celdas custom con Angular real usando renderers, incluyendo componentes shared como `Checkbox`.
- Documentacion propia en `Components > Grid` con ejemplos detallados de listados, resumen financiero y celdas custom.
- La demo avanzada del `Grid` ya muestra varios componentes shared reales dentro de celdas: `Checkbox`, `Input`, `DateTimePicker` y un boton que abre un modal.
- La documentacion del `Grid` ahora incluye tambien una seccion de referencia API que enumera las propiedades soportadas por `app-grid` y por la definicion de columnas.
- La documentacion del `Grid` muestra tambien la data enlazada dentro de cada showcase, justo debajo de la grilla, como una linea compacta de texto para visualizar al instante la relacion entre la grilla y el array fuente.

### Componente ComponentShowcase
El `ComponentShowcase` es la base visual usada en la documentacion de componentes para mostrar preview y codigo lado a lado.

Capacidades actuales:
- Soporta preview a la izquierda y panel de codigo a la derecha.
- En desktop permite redimensionar manualmente ambas secciones arrastrando el divisor central.
- El divisor muestra un estado visual de hover para comunicar que puede moverse horizontalmente.
- La vista previa ya no queda limitada a un ancho fijo, por lo que aprovecha el espacio extra cuando el usuario ensancha la columna izquierda.
- En mobile mantiene una disposicion apilada sin redimensionamiento manual.

### Componente LoadingBlock
El template ahora tiene un shared reutilizable para estados de espera visual cuando una seccion o toda la pagina central debe quedar bloqueada mientras responde un API.

Capacidades actuales:
- Envuelve cualquier contenido proyectado.
- Muestra un mensaje por defecto: `Un momento por favor...`.
- Permite sobrescribir el mensaje por caso de uso.
- Permite un mensaje secundario opcional para procesos que requieran contexto adicional.
- Soporta `mode="section"` para tablas, cards o formularios puntuales.
- Soporta `mode="page"` para cubrir toda el area central envuelta dentro de `main`, sin tocar header ni sidebar.
- Bloquea la interaccion del contenido mientras el overlay esta activo.
- Tiene documentacion demo propia en `Components > Loading`.
- El `DashboardLayout` ya renderiza un overlay absoluto sobre su `main` y el estado se controla desde `MainLoadingService`, de modo que una pagina puede disparar un loading real del area central sin implementar overlays propios.

### Componente Alert
El `Alert` compartido se mantiene como mensaje inline dentro del flujo de la pagina.

Capacidades actuales:
- Variantes `success`, `error`, `warning`, `info` y `question`.
- Soporta `title`, `description`, contenido proyectado y acciones con el slot `alertActions`.
- Puede ocultarse localmente con `dismissible`.
- Usa tokens del tema para colores semanticos y la variante `question` usa la escala `primary-*`.
- Tiene documentacion demo propia en la seccion Components.
- No reemplaza dialogs ni toasts; esos patrones deben resolverse como componentes o servicios separados.

### Sistema de Dialog
El template ahora tiene una capa de dialogs encima del sistema de modal.

Capacidades actuales:
- `dialogService.alert(...)` para mensajes modales informativos con una sola accion.
- `dialogService.confirm(...)` para confirmaciones bloqueantes con respuesta booleana.
- Los dialogs se presentan siempre en posicion `top-center`.
- Reutiliza el shell global del modal y el lenguaje visual de `app-alert`.
- Se documenta por separado en `Components > Dialog`.
- No reemplaza el futuro `Toast`, que debe seguir siendo un patron distinto para notificaciones flotantes.

### Sistema de Toast
El template ahora tiene un sistema global de toasts para notificaciones flotantes no bloqueantes.

Capacidades actuales:
- `toastService.show(...)` con posicion configurable y default `top-right`.
- Helpers `success`, `error`, `warning`, `info` y `question`.
- Icono por variante, barra de progreso y autocierre.
- Pausa del temporizador cuando el mouse pasa por encima del toast.
- Cierre manual con `X` y una sola accion opcional tipo `Deshacer` o `Ver`.
- No reemplaza confirmaciones; para eso se sigue usando `DialogService`.
- `AppComponent` monta un `ToastHostComponent` global para renderizar notificaciones desde cualquier ruta.

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
- Marca sabados y domingos con una senal roja cuando no estan seleccionados.

### Sistema de Modal
El modal compartido se resolvio como un shell global con contenido dinamico.

Capacidades actuales:
- Se abre con `modalService.open(MiComponente, config)`.
- Renderiza componentes standalone de forma dinamica dentro de un host global.
- Inyecta `MODAL_DATA` y `MODAL_REF` al componente cargado.
- Permite definir `title`, `subtitle`, `size`, `draggable`, `showCloseButton`, `closeOnBackdrop` y `closeOnEscape`.
- Permite definir multiples botones en el footer mediante `actions`, sin limitarse a `Aceptar` y `Cancelar`.
- Cada accion puede ejecutar logica personalizada y luego cerrar o no cerrar el modal.
- El contenido interno puede cerrar el modal con su propio resultado usando `MODAL_REF`.
- Los modales son dragables por defecto y pueden desactivarse con `draggable: false` cuando un caso puntual lo necesite.
- No cierra por `Escape` ni por clic fuera por defecto.
- Bloquea el scroll del `body` mientras hay un modal abierto.
- Tiene documentacion demo en `Components > Modal`.
- La documentacion de `Modal` ya incluye una referencia API al final con propiedades de `ModalConfig`, `actions` y `ModalRef`.

### Seccion Theme
La feature `theme` agrupa documentacion para personalizar el template sin mezclarla con el catalogo de componentes.

Estado actual:
- Existe la ruta `Theme > Layout`.
- `Theme > Layout` documenta el shell del dashboard, la estructura base del layout y como retirar el footer sin romper la grilla.
- Existe la ruta `Theme > Forms`.
- `Theme > Forms` documenta patrones reales para maquetar formularios con Tailwind y con los componentes shared del template, usando ejemplos de una columna, composiciones responsive y layouts con columna secundaria.
- La misma guia ahora cierra con una referencia rapida de utilities base de Tailwind usadas en formularios, para acelerar la lectura de clases como `grid-cols-1`, `gap-6`, `col-span-full` y patrones `auto-fit/minmax`.
- Existe la ruta `Theme > Color`.
- Explica que el color principal se cambia desde `src/styles/theme.scss`.
- Muestra paletas sugeridas para empezar rapido.
- Aplica la paleta seleccionada en caliente sobre la app y la mantiene entre rutas o recargas durante la sesion de desarrollo.
- Incluye un selector de color personalizado que genera una escala base `primary-*` como punto de partida, la aplica en vivo y permite restaurar el tema original.
- La vista previa se guarda en `localStorage` con la clave `tauro-template.theme-preview`.

## Navegacion actual
Rutas principales detectadas:
- `/auth/login`
- `/dashboard/home`
- `/components/input`
- `/components/textarea`
- `/components/select`
- `/components/alert`
- `/components/dialog`
- `/components/toast`
- `/components/checkbox`
- `/components/switch`
- `/components/radio`
- `/components/tabs`
- `/components/grid`
- `/components/datetimepicker`
- `/components/button`
- `/components/modal`
- `/components/loading`
- `/theme/layout`
- `/theme/forms`
- `/theme/color`

Comportamiento general:
- Las rutas privadas cuelgan del `DashboardLayoutComponent`.
- El root redirige a `dashboard` cuando el usuario esta autenticado.
- Rutas desconocidas redirigen a `auth/login`.
- La seccion `components` redirige a `input` por defecto.
- La seccion `theme` redirige a `layout` por defecto.
- El sidebar expande automaticamente la seccion correspondiente cuando la URL activa cae dentro de ella.

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
- Se agrego un sistema de modal dinamico con host global y apertura por servicio.
- Se agregaron documentacion para `Checkbox` y un nuevo shared `Radio Group` con soporte para Reactive Forms y ngModel.
- Se agrego un nuevo shared `Tabs` con soporte para iconos, badges, variantes visuales, navegacion por teclado y documentacion propia en `Components > Tabs`.
- Se agrego un nuevo shared `Grid` construido sobre TanStack Table con sticky header, paginacion, grouped headers/footers, pinning, resize y soporte para celdas custom con componentes Angular.
- Se agrego redimensionamiento manual al `ComponentShowcase` en desktop para ajustar el ancho entre preview y codigo durante las demos.
- Se fortalecio `app-alert` como mensaje inline reusable y se agrego su pagina de documentacion.
- Se agrego `DialogService` sobre el sistema de modal para mensajes modales y confirmaciones.
- Se agrego `ToastService` con host global, posiciones configurables y autocierre con pausa al hover.
- Se refino el sidebar para distinguir mejor padres con y sin hijos, y se normalizo un scrollbar global mas sutil para todo el template.
- La documentacion publica de componentes ahora incorpora una referencia API al final de cada pagina, con nivel de detalle variable segun la complejidad de cada componente.
- Se agrego `app-loading-block` para estados de carga de seccion o de pagina dentro del `main`, con mensaje por defecto y posibilidad de sobrescribirlo.
- Se agrego un nuevo shared `Switch` como alternativa visual al `Checkbox`, con soporte para Angular Forms, estados deshabilitados y documentacion propia en `Components > Switch`.
- Se agrego `Theme > Forms` para ensenar como componer formularios del template con Tailwind y los shared existentes, evitando recrear un sistema de layout tipo Bootstrap.

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
- Ampliar la seccion `theme` con mas configuraciones de layout y personalizacion del shell.
- Reemplazar autenticacion simulada por una interfaz mas adaptable a backend real.
- Migrar Sass `@import` a `@use`.
- Revisar y normalizar textos o codificacion en archivos fuente donde aparezcan caracteres danados.
- Agregar mas ejemplos reales de paginas administrativas usando los componentes base.

