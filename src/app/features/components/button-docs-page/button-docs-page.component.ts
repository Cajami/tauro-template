import { Component } from '@angular/core';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { ApiInfoComponent } from '../api-info/api-info.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { LucideAngularModule, Save } from 'lucide-angular';

interface ButtonApiItem {
  property: string;
  values: string;
  defaultValue: string;
  description: string;
}

@Component({
  selector: 'app-button-docs-page',
  imports: [
    LucideAngularModule,
    HeaderPageComponent,
    ButtonComponent,
    ComponentShowcaseComponent,
    ApiInfoComponent,
  ],
  templateUrl: './button-docs-page.component.html',
  styleUrl: './button-docs-page.component.scss',
})
export class ButtonDocsPageComponent {
  readonly SaveIcon = Save;
  readonly buttonProps: ButtonApiItem[] = [
    {
      property: 'type',
      values: "`'button'`, `'submit'`, `'reset'`",
      defaultValue: "'button'",
      description: 'Controla el comportamiento nativo del elemento boton dentro de formularios.',
    },
    {
      property: 'variant',
      values: "`'primary'`, `'secondary'`, `'success'`, `'error'`, `'link'`",
      defaultValue: "'primary'",
      description: 'Define la jerarquia visual principal del boton.',
    },
    {
      property: 'color',
      values: "`'primary'`, `'secondary'`, `'success'`, `'error'`, `'neutral'`",
      defaultValue: "'primary'",
      description: 'Permite ajustar la paleta usada por el boton, sobre todo en variantes como `link`.',
    },
    {
      property: 'size',
      values: "`'sm'`, `'md'`, `'lg'`",
      defaultValue: "'md'",
      description: 'Cambia altura, paddings y escala visual del boton.',
    },
    {
      property: 'disabled',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Bloquea interaccion, foco y evento `clicked`.',
    },
    {
      property: 'loading',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Muestra estado de carga y evita que el usuario dispare la accion otra vez.',
    },
    {
      property: 'fullWidth',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Hace que el boton ocupe todo el ancho disponible del contenedor.',
    },
    {
      property: 'circle',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Convierte el boton en una pieza circular, util para acciones compactas o iconicas.',
    },
    {
      property: 'clicked',
      values: 'Output<void>',
      defaultValue: 'Se emite al hacer clic si no esta disabled ni loading',
      description: 'Evento recomendado para reaccionar a la accion del usuario.',
    },
  ];

  // Ejemplo 1: Variantes de Color
  htmlEjemplo1 = `<app-button variant="primary">Primary</app-button>
<app-button variant="success">Success</app-button>
<app-button variant="error">Error</app-button>
<app-button variant="link" color="secondary">Link Button</app-button>`;

  // Ejemplo 2: Estados (Loading & Disabled)
  htmlEjemplo2 = `      <app-button [loading]="true">Guardando</app-button>
      <app-button [disabled]="true">No disponible</app-button>`;

  tsEjemplo2 = `// El botón gestiona automáticamente el estado
// bloqueando el evento 'clicked' si está en loading.`;

  // Ejemplo 3: Formas y Tamaños
  htmlEjemplo3 = `
        <app-button size="sm">Small</app-button>
        <app-button size="md">Medium</app-button>
        <app-button size="lg">Large</app-button>
        
        <app-button [circle]="true" variant="primary">+</app-button>
        <app-button [fullWidth]="true" variant="secondary">
          <lucide-icon [img]="SaveIcon" [size]="20" class="text-gray-400" />
          Full Width Button
        </app-button>        
  `;
}
