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
import {
  RadioGroupComponent,
  RadioOption,
} from '@shared/components/radio-group/radio-group.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';

interface RadioApiItem {
  property: string;
  values: string;
  defaultValue: string;
  description: string;
}

@Component({
  selector: 'app-radio-docs-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    RadioGroupComponent,
    ApiInfoComponent,
  ],
  templateUrl: './radio-docs-page.component.html',
})
export class RadioDocsPageComponent {
  readonly radioProps: RadioApiItem[] = [
    {
      property: 'label',
      values: 'string',
      defaultValue: "''",
      description: 'Titulo visible del grupo.',
    },
    {
      property: 'hint',
      values: 'string',
      defaultValue: "''",
      description: 'Texto de apoyo debajo del label para explicar la decision.',
    },
    {
      property: 'required',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Marca visualmente el grupo como obligatorio.',
    },
    {
      property: 'disabled',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Bloquea la interaccion con todas las opciones del grupo.',
    },
    {
      property: 'name',
      values: 'string',
      defaultValue: 'Se genera automaticamente',
      description: 'Nombre HTML compartido por las opciones para que funcionen como grupo nativo.',
    },
    {
      property: 'layout',
      values: "`'vertical'` o `'horizontal'`",
      defaultValue: "'vertical'",
      description: 'Distribuye las opciones en columna o en fila.',
    },
    {
      property: 'variant',
      values: "`'default'` o `'card'`",
      defaultValue: "'default'",
      description: 'La variante `default` es ligera; `card` da mas presencia visual a cada opcion.',
    },
    {
      property: 'options',
      values: 'RadioOption<T>[]',
      defaultValue: '[]',
      description: 'Listado de opciones renderizadas dentro del grupo.',
    },
    {
      property: 'valueChange',
      values: 'Output<T | null>',
      defaultValue: 'Se emite cuando cambia la opcion',
      description: 'Notifica el valor elegido por el usuario.',
    },
    {
      property: 'ControlValueAccessor',
      values: 'Integracion con Forms',
      defaultValue: 'Disponible siempre',
      description: 'Permite usar `formControlName`, `formControl` o `ngModel` sin wiring adicional.',
    },
  ];

  readonly optionProps: RadioApiItem[] = [
    {
      property: 'label',
      values: 'string',
      defaultValue: 'Requerido',
      description: 'Texto principal visible de la opcion.',
    },
    {
      property: 'value',
      values: 'T',
      defaultValue: 'Requerido',
      description: 'Valor real que se guarda en el modelo cuando esa opcion queda seleccionada.',
    },
    {
      property: 'description',
      values: 'string',
      defaultValue: 'Sin descripcion',
      description: 'Texto secundario opcional para dar mas contexto.',
    },
    {
      property: 'disabled',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Deshabilita solo esa opcion puntual.',
    },
  ];
  readonly paymentOptions: RadioOption<string>[] = [
    {
      label: 'Transferencia bancaria',
      value: 'bank_transfer',
      description: 'Ideal para operaciones administrativas o pagos B2B.',
    },
    {
      label: 'Tarjeta corporativa',
      value: 'card',
      description: 'Permite pagos mas rapidos y conciliacion posterior.',
    },
    {
      label: 'Credito interno',
      value: 'internal_credit',
      description: 'Usa saldo disponible dentro del sistema.',
    },
  ];

  readonly statusOptions: RadioOption<string>[] = [
    {
      label: 'Borrador',
      value: 'draft',
      description: 'Todavia puede seguir editandose.',
    },
    {
      label: 'Publicado',
      value: 'published',
      description: 'Visible para los usuarios finales.',
    },
    {
      label: 'Archivado',
      value: 'archived',
      description: 'Solo consulta historica.',
      disabled: true,
    },
  ];

  readonly colorModeOptions: RadioOption<string>[] = [
    {
      label: 'Claro',
      value: 'light',
      description: 'Apariencia limpia para el dia a dia.',
    },
    {
      label: 'Oscuro',
      value: 'dark',
      description: 'Mayor contraste en ambientes de baja luz.',
    },
    {
      label: 'Automatico',
      value: 'system',
      description: 'Respeta la preferencia del sistema operativo.',
    },
  ];

  readonly simplePriorityOptions: RadioOption<string>[] = [
    { label: 'Baja', value: 'low' },
    { label: 'Media', value: 'medium' },
    { label: 'Alta', value: 'high' },
  ];

  readonly form: FormGroup;
  selectedColorMode = 'system';
  selectedPriority = 'medium';

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      paymentMethod: ['bank_transfer', Validators.required],
      status: ['published', Validators.required],
    });
  }

  htmlEjemplo1 = `<app-radio-group
  label="Metodo de pago"
  hint="Selecciona la opcion principal para este flujo."
  [options]="paymentOptions"
  formControlName="paymentMethod"
></app-radio-group>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ form.get('paymentMethod')?.value }}</strong>
</div>`;

  tsEjemplo1 = `readonly paymentOptions: RadioOption<string>[] = [
  {
    label: 'Transferencia bancaria',
    value: 'bank_transfer',
    description: 'Ideal para operaciones administrativas o pagos B2B.',
  },
  {
    label: 'Tarjeta corporativa',
    value: 'card',
    description: 'Permite pagos mas rapidos y conciliacion posterior.',
  },
  {
    label: 'Credito interno',
    value: 'internal_credit',
    description: 'Usa saldo disponible dentro del sistema.',
  },
];

readonly form = this.fb.group({
  paymentMethod: ['bank_transfer', Validators.required],
});`;

  htmlEjemplo2 = `<app-radio-group
  label="Modo de color"
  [options]="colorModeOptions"
  layout="horizontal"
  [(ngModel)]="selectedColorMode"
  [ngModelOptions]="{ standalone: true }"
></app-radio-group>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ selectedColorMode }}</strong>
</div>`;

  tsEjemplo2 = `readonly colorModeOptions: RadioOption<string>[] = [
  {
    label: 'Claro',
    value: 'light',
    description: 'Apariencia limpia para el dia a dia.',
  },
  {
    label: 'Oscuro',
    value: 'dark',
    description: 'Mayor contraste en ambientes de baja luz.',
  },
  {
    label: 'Automatico',
    value: 'system',
    description: 'Respeta la preferencia del sistema operativo.',
  },
];

selectedColorMode = 'system';`;

  htmlEjemplo3 = `<app-radio-group
  label="Estado editorial"
  [options]="statusOptions"
  [required]="true"
  variant="card"
  formControlName="status"
></app-radio-group>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ form.get('status')?.value }}</strong>
</div>`;

  tsEjemplo3 = `readonly statusOptions: RadioOption<string>[] = [
  {
    label: 'Borrador',
    value: 'draft',
    description: 'Todavia puede seguir editandose.',
  },
  {
    label: 'Publicado',
    value: 'published',
    description: 'Visible para los usuarios finales.',
  },
  {
    label: 'Archivado',
    value: 'archived',
    description: 'Solo consulta historica.',
    disabled: true,
  },
];

readonly form = this.fb.group({
  status: ['published', Validators.required],
});`;

  htmlEjemplo4 = `<app-radio-group
  label="Prioridad"
  [options]="simplePriorityOptions"
  [(ngModel)]="selectedPriority"
  [ngModelOptions]="{ standalone: true }"
></app-radio-group>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ selectedPriority }}</strong>
</div>`;

  tsEjemplo4 = `readonly simplePriorityOptions: RadioOption<string>[] = [
  { label: 'Baja', value: 'low' },
  { label: 'Media', value: 'medium' },
  { label: 'Alta', value: 'high' },
];

selectedPriority = 'medium';`;
}
