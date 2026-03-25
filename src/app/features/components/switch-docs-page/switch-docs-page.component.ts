import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiInfoComponent } from '../api-info/api-info.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { SwitchComponent } from '@shared/components/switch/switch.component';

interface SwitchApiItem {
  property: string;
  values: string;
  defaultValue: string;
  description: string;
}

@Component({
  selector: 'app-switch-docs-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    SwitchComponent,
    ApiInfoComponent,
  ],
  templateUrl: './switch-docs-page.component.html',
})
export class SwitchDocsPageComponent {
  readonly form: FormGroup;
  autoSave = true;
  readonly compactSettings = {
    notifications: true,
    tracking: false,
    backups: true,
    publicView: false,
  };
  readonly switchProps: SwitchApiItem[] = [
    {
      property: 'label',
      values: 'string',
      defaultValue: "''",
      description: 'Texto principal que describe la configuracion o accion controlada por el switch.',
    },
    {
      property: 'description',
      values: 'string',
      defaultValue: "''",
      description: 'Texto secundario opcional para aclarar el impacto del estado activo o inactivo.',
    },
    {
      property: 'disabled',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Bloquea la interaccion del usuario y atenúa visualmente el control.',
    },
    {
      property: 'valueChange',
      values: 'Output<boolean>',
      defaultValue: 'Se emite cada vez que cambia el estado',
      description: 'Notifica el valor actual cuando el usuario activa o desactiva el switch.',
    },
    {
      property: 'ControlValueAccessor',
      values: 'Integracion con Forms',
      defaultValue: 'Disponible siempre',
      description: 'Permite usar `formControlName`, `formControl`, `ngModel` o `[(ngModel)]` sin codigo extra.',
    },
  ];

  readonly htmlEjemplo1 = `<app-switch
  label="Ahorro de energia"
  description="Reduce actualizaciones visuales cuando el usuario no esta interactuando."
  formControlName="energySaving"
></app-switch>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ form.get('energySaving')?.value ? 'Activo' : 'Inactivo' }}</strong>
</div>`;

  readonly tsEjemplo1 = `readonly form = this.fb.group({
  energySaving: [true],
  approvals: [false],
});`;

  readonly htmlEjemplo2 = `<app-switch
  label="Guardado automatico"
  description="Guarda borradores en segundo plano cada vez que detecta cambios."
  [(ngModel)]="autoSave"
  [ngModelOptions]="{ standalone: true }"
></app-switch>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ autoSave ? 'Activo' : 'Inactivo' }}</strong>
</div>`;

  readonly tsEjemplo2 = `autoSave = true;`;

  readonly htmlEjemplo3 = `<app-switch
  label="Aprobacion manual"
  description="Exige una validacion antes de publicar cambios."
  formControlName="approvals"
></app-switch>

<app-switch
  label="Sincronizacion externa"
  description="Control bloqueado para cuentas sin permisos."
  [disabled]="true"
  [ngModel]="true"
  [ngModelOptions]="{ standalone: true }"
></app-switch>`;

  readonly tsEjemplo3 = `readonly form = this.fb.group({
  approvals: [false],
});`;

  readonly htmlEjemplo4 = `<div class="space-y-4">
  <app-switch
    label="Notificaciones"
    [(ngModel)]="compactSettings.notifications"
    [ngModelOptions]="{ standalone: true }"
  ></app-switch>

  <app-switch
    label="Tracking"
    [(ngModel)]="compactSettings.tracking"
    [ngModelOptions]="{ standalone: true }"
  ></app-switch>

  <app-switch
    label="Backups"
    [(ngModel)]="compactSettings.backups"
    [ngModelOptions]="{ standalone: true }"
  ></app-switch>

  <app-switch
    label="Vista publica"
    [(ngModel)]="compactSettings.publicView"
    [ngModelOptions]="{ standalone: true }"
  ></app-switch>
</div>`;

  readonly tsEjemplo4 = `readonly compactSettings = {
  notifications: true,
  tracking: false,
  backups: true,
  publicView: false,
};`;

  constructor(private readonly fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      energySaving: [true],
      approvals: [false],
    });
  }
}
