# 🐂 Tauro Template

> **Template profesional de dashboard con Angular 19 y Tailwind CSS v4**  
> Inicia proyectos administrativos con una base reusable, moderna y lista para crecer.

<img width="1924" height="884" alt="image" src="https://github.com/user-attachments/assets/c82d4321-a5eb-45f7-b4e7-3d6a8397ef48" />
<img width="1919" height="879" alt="image" src="https://github.com/user-attachments/assets/eebaa604-c1bf-4a52-9da4-5f731562e5fe" />
<img width="1919" height="877" alt="image" src="https://github.com/user-attachments/assets/01fe7df6-0c11-4095-ae4c-3c50fcfab9c5" />
<img width="1918" height="878" alt="image" src="https://github.com/user-attachments/assets/ce05b68f-577a-4739-b1fa-ae77dd9c2bff" />

---

## 🌐 Demo en línea

Puedes ver y probar el template aquí:

👉 https://cajami.github.io/tauro-template/

La demo publicada en GitHub Pages ya soporta recarga directa de rutas internas, así que puedes navegar y usar `F5` sin problema.

## 📋 Índice

- [✨ Características](#-características)
- [🎯 ¿Por qué Tauro Template?](#-por-qué-tauro-template)
- [🚀 Inicio rápido](#-inicio-rápido)
- [🎨 Sistema de temas](#-sistema-de-temas)
- [🧩 Componentes incluidos](#-componentes-incluidos)
- [📦 Build y deploy](#-build-y-deploy)
- [👨‍💻 Autor](#-autor)

---

## ✨ Características

### 🎨 Sistema de temas personalizable
- Paleta centralizada con tokens `primary-*` y variables de tema.
- Vista de documentación en `Theme > Color` para probar cambios en caliente.
- Persistencia temporal del color elegido en `localStorage` durante desarrollo.
- Los componentes principales reaccionan automáticamente al tema activo.

### 📱 Dashboard completo y responsive
- Header, sidebar, footer y layout administrativo base.
- Sidebar con secciones para `Dashboard`, `Componentes` y `Theme`.
- Comportamiento adaptado para desktop y mobile.
- El scroll vuelve al inicio en cada cambio de ruta.

### 🔐 Base de autenticación
- Login demo funcional.
- Guard e interceptor listos para evolucionar a backend real.
- Protección de rutas privadas.

### 🧩 Componentes reutilizables
- `Button`
- `Input`
- `Password Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Radio Group`
- `DateTimePicker`
- `Modal`
- `Alert`

La mayoría de componentes de formulario soportan `Reactive Forms` y `ngModel`, y cuentan con páginas de documentación dentro del template.

### 🏗️ Arquitectura moderna
- Angular 19 con standalone components.
- Lazy loading en features y páginas de documentación.
- Signals para estado y UI reactiva.
- Tailwind CSS v4 + SCSS.

---

## 🎯 ¿Por qué Tauro Template?

Tauro Template busca resolver la parte repetitiva del inicio de un sistema administrativo:

- Layout base del dashboard.
- Flujo inicial de autenticación.
- Navegación y estructura escalable por features.
- Componentes shared listos para reutilizar.
- Sistema de temas centralizado.
- Documentación visual para acelerar la adopción.

La idea es que el desarrollador se enfoque en la lógica de negocio, no en volver a construir lo mismo desde cero.

---

## 🚀 Inicio rápido

### Prerrequisitos

- Node.js 18+
- Angular CLI 19+

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Cajami/tauro-template.git mi-proyecto
cd mi-proyecto

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm start
```

Abre [http://localhost:4200](http://localhost:4200).

### Credenciales de prueba

```text
Usuario: cualquier texto
Contraseña: cualquier texto
```

---

## 🎨 Sistema de temas

La configuración principal del tema vive en `src/styles/theme.scss`.

```css
@theme {
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
}
```

Si quieres construir una paleta completa desde un color base, puedes usar [uicolors.app](https://uicolors.app/create) y luego copiar los tokens generados.

Dentro del propio template existe la ruta `Theme > Color`, donde puedes:
- probar paletas sugeridas,
- generar una paleta desde un color personalizado,
- ver los cambios aplicados en caliente.

---

## 🧩 Componentes incluidos

### Button

```html
<app-button variant="primary">Guardar</app-button>
<app-button variant="secondary">Cancelar</app-button>
<app-button [loading]="true">Procesando</app-button>
```

### Input

```html
<app-input
  label="Correo"
  placeholder="tu@email.com"
  formControlName="email"
></app-input>
```

### Select

```html
<app-select
  label="Pais"
  [options]="countryOptions"
  formControlName="country"
></app-select>
```

### Checkbox

```html
<app-checkbox
  label="Acepto terminos y condiciones"
  formControlName="terms"
></app-checkbox>
```

### Radio Group

```html
<app-radio-group
  label="Prioridad"
  [options]="priorityOptions"
  formControlName="priority"
></app-radio-group>
```

### DateTimePicker

```html
<app-datetime-picker
  label="Fecha de entrega"
  formControlName="deliveryDate"
></app-datetime-picker>
```

### Modal

```ts
this.modalService.open(MiComponenteStandalone, {
  title: 'Detalle',
  actions: [
    { label: 'Cerrar', variant: 'secondary', closeOnClick: true },
    {
      label: 'Guardar',
      variant: 'primary',
      onClick: ({ componentInstance }) => componentInstance?.save(),
    },
  ],
});
```

Para ver ejemplos completos, revisa las páginas dentro de `Components` en la app.

---

## 📦 Build y deploy

El desarrollo se realiza en la rama `main`. La publicación en GitHub Pages se hace automáticamente con GitHub Actions.

### Flujo recomendado

1. Trabaja normalmente en `main`.
2. Haz commit y push a `origin/main`.
3. GitHub Actions ejecutará `npm ci` y `npm run build`.
4. Se publicará `dist/tauro-template/browser` en GitHub Pages.

### Configuración requerida en GitHub

En el repositorio, ve a `Settings > Pages` y asegúrate de que la fuente esté configurada como `GitHub Actions`.

### Notas

- Ya no necesitas mantener una carpeta separada para `gh-pages`.
- El workflow genera `404.html` a partir de `index.html` para mejorar el fallback de rutas en GitHub Pages.

---

## 👨‍💻 Autor

**Cajami**

- GitHub: [@Cajami](https://github.com/Cajami)
- Proyecto: [tauro-template](https://github.com/Cajami/tauro-template)
