# 🐂 Tauro Template

> **Template profesional de Dashboard con Angular 19 y Tailwind CSS v4**  
> Inicia tus proyectos web en minutos, no en días.

<img width="1924" height="884" alt="image" src="https://github.com/user-attachments/assets/c82d4321-a5eb-45f7-b4e7-3d6a8397ef48" />
<img width="1919" height="879" alt="image" src="https://github.com/user-attachments/assets/eebaa604-c1bf-4a52-9da4-5f731562e5fe" />
<img width="1919" height="877" alt="image" src="https://github.com/user-attachments/assets/01fe7df6-0c11-4095-ae4c-3c50fcfab9c5" />
<img width="1918" height="878" alt="image" src="https://github.com/user-attachments/assets/ce05b68f-577a-4739-b1fa-ae77dd9c2bff" />

---

## 🌐 Demo en línea

Puedes ver y probar el template en el siguiente enlace:

👉 https://cajami.github.io/tauro-template/

> ⚠️ **Nota importante**  
> La demo está desplegada en **GitHub Pages**, un hosting estático.  
> Por esta razón, la navegación funciona correctamente al ingresar desde la URL principal, pero **si se actualiza la página (F5) estando en una ruta interna**, GitHub Pages puede mostrar un error **404**.  
>
> Esto es una **limitación del entorno de despliegue**, no un problema del template ni de la configuración de Angular.  
> En un entorno real (servidor propio, cloud, etc.), el routing funciona sin inconvenientes.

## 📋 Índice

- [✨ Características](#-características)
- [🎯 ¿Por qué Tauro Template?](#-por-qué-tauro-template)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🎨 Sistema de Temas](#-sistema-de-temas)
- [🧩 Componentes Incluidos](#-componentes-incluidos)
- [📱 Responsive Design](#-responsive-design)
- [🔐 Autenticación](#-autenticación)
- [🛠️ Desarrollo](#️-desarrollo)
- [📦 Build y Deploy](#-build-y-deploy)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

---

## ✨ Características

### 🎨 **Sistema de Temas Personalizable**
- Sistema de colores centralizado basado en CSS Variables
- Cambia toda la paleta de colores editando un solo archivo
- Soporte para Primary, Secondary, Success, Error, Warning
- Todos los componentes reaccionan automáticamente al tema

### 📱 **Dashboard Completo y Responsive**
- Header con menú hamburguesa
- Sidebar colapsable con animaciones suaves
- Menús expandibles multinivel
- Comportamiento diferenciado entre desktop y mobile
- Footer opcional

### 🔐 **Sistema de Autenticación**
- Página de login responsive con diseño moderno
- Guards y interceptores configurados
- Gestión de tokens 
- Protección de rutas

### 🧩 **Componentes Base Reutilizables**
- **Button**: 5 variantes (primary, secondary, success, error, link), 3 tamaños, circular, loading state
- **Input**: Con soporte para iconos izquierda/derecha, validaciones, disabled
- **Password Input**: Toggle para mostrar/ocultar contraseña
- **Textarea**: Redimensionable, contador de caracteres
- **Checkbox**: Estilizado y accesible
- **Alert**: Para mensajes de éxito, error, advertencia, info
- Todos compatibles con **Formularios Reactivos**

### 🏗️ **Arquitectura Escalable**
- Standalone Components (Angular 19)
- Lazy Loading en todas las rutas
- Separación por features
- Signals para gestión de estado reactivo
- TypeScript estricto

### ⚡ **Tecnologías Modernas**
- Angular 19
- Tailwind CSS v4 (nueva sintaxis con @theme)
- Signals API
- Control Flow syntax (@if, @for)

---

## 🎯 ¿Por qué Tauro Template?

Cada vez que inicias un proyecto web, te enfrentas a las mismas tareas repetitivas:

❌ Diseñar el sistema de login  
❌ Crear el layout del dashboard  
❌ Configurar el sistema de colores  
❌ Desarrollar componentes básicos  
❌ Configurar autenticación y rutas  
❌ Hacer todo responsive  

**Tauro Template** elimina estas semanas de trabajo inicial. Solo:

✅ Clona el repositorio  
✅ Personaliza el tema con tus colores  
✅ Cambia el logo  
✅ ¡Comienza a desarrollar tu lógica de negocio!

---

## 🚀 Inicio Rápido

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
ng serve

# 4. Abrir en navegador
# http://localhost:4200
```

### Credenciales de prueba

```
Usuario: cualquier texto
Contraseña: cualquier texto
```

---

## 🎨 Sistema de Temas

### Personalizar Colores

Edita `src/styles/theme.scss`:

```css
@theme {
  /* Cambia solo estos valores */
  --color-primary-500: #3b82f6;    /* Tu color principal */
  --color-primary-600: #2563eb;    /* Hover */
  --color-primary-700: #1d4ed8;    /* Active */
  
  /* O genera la paleta completa en https://uicolors.app */
}
```

### Generar Paleta Completa

1. Ve a [uicolors.app](https://uicolors.app/create)
2. Ingresa tu color base
3. Copia las variables generadas
4. Pégalas en `theme.scss`

### Colores Disponibles

- **Primary**: Color principal de la marca
- **Secondary**: Color complementario
- **Success**: Acciones exitosas (verde)
- **Error**: Errores y eliminaciones (rojo)
- **Warning**: Advertencias (amarillo)
- **Info**: Información (cyan)
- **Neutral**: Grises del sistema

Todos los componentes se actualizan automáticamente al cambiar el tema.

---

## 🧩 Componentes Incluidos

### Button

```html
<!-- Variantes -->
<app-button variant="primary">Primary</app-button>
<app-button variant="secondary">Secondary</app-button>
<app-button variant="success">Success</app-button>
<app-button variant="error">Error</app-button>
<app-button variant="link" color="primary">Link</app-button>

<!-- Tamaños -->
<app-button size="sm">Small</app-button>
<app-button size="md">Medium</app-button>
<app-button size="lg">Large</app-button>

<!-- Estados -->
<app-button [loading]="true">Loading...</app-button>
<app-button [disabled]="true">Disabled</app-button>
<app-button [circle]="true">+</app-button>
<app-button [fullWidth]="true">Full Width</app-button>
```

### Input

```html
<!-- Básico -->
<app-input 
  label="Email" 
  placeholder="tu@email.com"
  formControlName="email">
</app-input>

<!-- Con iconos -->
<app-input label="Buscar">
  <svg leftIcon>...</svg>
  <button rightIcon>Buscar</button>
</app-input>

<!-- Tamaños -->
<app-input size="sm" label="Pequeño"></app-input>
<app-input size="md" label="Mediano"></app-input>
<app-input size="lg" label="Grande"></app-input>
```

### Password Input

```html
<app-password-input 
  label="Contraseña" 
  formControlName="password">
</app-password-input>
```

### Textarea

```html
<app-textarea 
  label="Descripción"
  [rows]="4"
  [maxLength]="200"
  [showCharCount]="true"
  resize="vertical">
</app-textarea>
```

### Checkbox

```html
<app-checkbox 
  label="Acepto términos y condiciones"
  formControlName="terms">
</app-checkbox>
```

### Alert

```html
<app-alert variant="success">
  Los cambios se guardaron correctamente.
</app-alert>

<app-alert variant="error">
  Ocurrió un problema al guardar.
</app-alert>
```
---

## 👨‍💻 Autor

**Cajami**

- GitHub: [@Cajami](https://github.com/Cajami)
- Proyecto: [tauro-template](https://github.com/Cajami/tauro-template)

---

## ⭐ Star History

Si este template te ha sido útil, ¡considera darle una estrella! ⭐

---

## 🤖 Desarrollo con IA

Este template fue desarrollado en colaboración con herramientas de Inteligencia Artificial:

- **Claude** (Anthropic)
- **ChatGPT** (OpenAI)

### 💡 Reflexión sobre el uso de IA en el desarrollo

En la era actual del desarrollo de software, **trabajar con IA no es opcional, es esencial**. Sin embargo, es importante entender algunos puntos clave:

#### ✅ La IA como herramienta, no como reemplazo

- Las IAs son **asistentes poderosos** que aceleran el desarrollo
- No reemplazan al desarrollador, **amplifican sus capacidades**
- Permiten enfocarse en la arquitectura y lógica de negocio
- Reducen tiempo en tareas repetitivas y boilerplate

#### 📚 La importancia de entender el código

Aunque la IA puede generar código rápidamente, es **fundamental**:

- ✅ **Revisar y entender** cada línea de código generada
- ✅ **Validar** que sigue las mejores prácticas
- ✅ **Adaptar** el código a las necesidades específicas del proyecto
- ✅ **Aprender** de las soluciones propuestas por la IA
- ✅ **Cuestionar** y mejorar las implementaciones cuando sea necesario

#### 🚀 Productividad con IA

La combinación de **conocimiento humano + asistencia de IA** resulta en:

- ⚡ Desarrollo 3-5x más rápido
- 🎯 Menos errores de sintaxis
- 📖 Mejor documentación
- 🏗️ Arquitecturas más consistentes
- 💪 Más tiempo para resolver problemas complejos

#### 🎓 El desarrollador del futuro

El desarrollador moderno necesita:

1. **Fundamentos sólidos** de programación
2. **Criterio técnico** para evaluar soluciones
3. **Habilidad** para trabajar con IAs como asistentes
4. **Pensamiento crítico** para validar y mejorar código
5. **Aprendizaje continuo** de nuevas herramientas

> 💬 *"La IA no reemplaza a los desarrolladores que saben usarla, pero los desarrolladores que usan IA reemplazarán a los que no."*

Este template es un ejemplo de cómo la colaboración humano-IA puede crear herramientas útiles para la comunidad. El conocimiento y la experiencia del desarrollador guían a la IA, y la IA acelera la implementación.



## Build y Deploy

El desarrollo del proyecto debe hacerse en la rama `main`. La publicaci�n en GitHub Pages ahora se realiza autom�ticamente con GitHub Actions cada vez que hagas push a `main`.

### Flujo recomendado

1. Trabaja normalmente en `main`.
2. Haz commit y push a `origin/main`.
3. GitHub Actions ejecutar� `npm ci` y `npm run build`.
4. El contenido de `dist/tauro-template/browser` se publicar� en GitHub Pages.

### Configuraci�n requerida en GitHub

En el repositorio, ve a `Settings > Pages` y aseg�rate de que la fuente de publicaci�n est� configurada como `GitHub Actions`.

### Notas

- Ya no necesitas mantener una carpeta local separada para la rama `gh-pages`.
- El workflow genera un archivo `404.html` a partir de `index.html` para mejorar el fallback de rutas en GitHub Pages.
</div>


