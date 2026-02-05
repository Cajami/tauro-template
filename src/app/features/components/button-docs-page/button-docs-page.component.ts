import { Component } from '@angular/core';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { ApiInfoComponent } from '../api-info/api-info.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { LucideAngularModule, Save } from 'lucide-angular';

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
