import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { ApiInfoComponent } from '../api-info/api-info.component';

@Component({
  selector: 'app-alert-docs-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    AlertComponent,
    ButtonComponent,
    ApiInfoComponent,
  ],
  templateUrl: './alert-docs-page.component.html',
})
export class AlertDocsPageComponent {
  protected readonly inlineDecision = signal<'pendiente' | 'aceptado' | 'cancelado'>('pendiente');

  htmlEjemplo1 = `<app-alert variant="success">
  Los cambios se guardaron correctamente.
</app-alert>

<app-alert variant="error">
  No fue posible completar la operación.
</app-alert>

<app-alert variant="warning">
  Revisa los datos antes de continuar.
</app-alert>

<app-alert variant="info">
  Puedes continuar con el siguiente paso.
</app-alert>`;

  tsEjemplo1 = `// Usa app-alert para mensajes inline dentro del flujo de la página.
// Para modales informativos o confirmaciones, usa un dialog aparte.`;

  htmlEjemplo2 = `<app-alert
  variant="question"
  title="¿Deseas reenviar la invitación?"
  description="El sistema enviará un nuevo correo al usuario seleccionado."
>
  <div alertActions>
    <app-button size="sm" variant="secondary">Cancelar</app-button>
    <app-button size="sm" variant="primary">Reenviar</app-button>
  </div>
</app-alert>`;

  tsEjemplo2 = `// Puedes proyectar acciones personalizadas con el slot [alertActions].`;

  htmlEjemplo3 = `<app-alert
  variant="info"
  title="Sincronización programada"
  description="El proceso se ejecutará cada 30 minutos."
  [dismissible]="true"
></app-alert>`;

  tsEjemplo3 = `// dismissible oculta la alerta inline sin salir de la página.`;

  setDecision(value: 'aceptado' | 'cancelado'): void {
    this.inlineDecision.set(value);
  }
}
