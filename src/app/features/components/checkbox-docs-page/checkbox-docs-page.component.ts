import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiInfoComponent } from '../api-info/api-info.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';

interface CheckboxApiItem {
  property: string;
  values: string;
  defaultValue: string;
  description: string;
}

@Component({
  selector: 'app-checkbox-docs-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    CheckboxComponent,
    ApiInfoComponent,
  ],
  templateUrl: './checkbox-docs-page.component.html',
})
export class CheckboxDocsPageComponent {
  readonly form: FormGroup;
  marketingConsent = false;
  readonly checkboxProps: CheckboxApiItem[] = [
    {
      property: 'label',
      values: 'string',
      defaultValue: "''",
      description: 'Texto descriptivo asociado a la casilla.',
    },
    {
      property: 'disabled',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Bloquea la interaccion del usuario con el checkbox.',
    },
    {
      property: 'valueChange',
      values: 'Output<boolean>',
      defaultValue: 'Se emite cada vez que cambia el estado',
      description: 'Notifica el valor actual cuando el usuario marca o desmarca.',
    },
    {
      property: 'ControlValueAccessor',
      values: 'Integracion con Forms',
      defaultValue: 'Disponible siempre',
      description: 'Permite usar `formControlName`, `formControl` o `ngModel` sin codigo extra.',
    },
  ];

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      terms: [false, Validators.requiredTrue],
      notifications: [true],
    });
  }

  htmlEjemplo1 = `<app-checkbox
  label="Acepto los terminos y condiciones"
  formControlName="terms"
></app-checkbox>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ form.get('terms')?.value ? 'Aceptado' : 'Pendiente' }}</strong>
</div>`;

  tsEjemplo1 = `readonly form = this.fb.group({
  terms: [false, Validators.requiredTrue],
});`;

  htmlEjemplo2 = `<app-checkbox
  label="Recibir novedades del producto"
  [(ngModel)]="marketingConsent"
  [ngModelOptions]="{ standalone: true }"
></app-checkbox>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ marketingConsent ? 'Activo' : 'Inactivo' }}</strong>
</div>`;

  tsEjemplo2 = `marketingConsent = false;`;

  htmlEjemplo3 = `<app-checkbox
  label="Notificaciones habilitadas"
  formControlName="notifications"
></app-checkbox>

<app-checkbox
  label="Opcion bloqueada"
  [disabled]="true"
  [ngModel]="true"
  [ngModelOptions]="{ standalone: true }"
></app-checkbox>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ form.get('notifications')?.value ? 'Activo' : 'Inactivo' }}</strong>
</div>`;

  tsEjemplo3 = `readonly form = this.fb.group({
  notifications: [true],
});`;
}
