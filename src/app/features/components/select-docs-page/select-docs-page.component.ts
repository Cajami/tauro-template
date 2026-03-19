import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  SelectComponent,
  SelectOption,
} from '@shared/components/form/select/select.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { ApiInfoComponent } from '../api-info/api-info.component';

@Component({
  selector: 'app-select-docs-page',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    SelectComponent,
    ApiInfoComponent,
  ],
  templateUrl: './select-docs-page.component.html',
  styleUrl: './select-docs-page.component.scss',
})
export class SelectDocsPageComponent {
  readonly countryOptions: SelectOption<string>[] = [
    {
      label: 'Peru',
      value: 'pe',
      description: 'Lima, Arequipa, Cusco',
      keywords: ['lima', 'peru', 'andes'],
    },
    {
      label: 'Colombia',
      value: 'co',
      description: 'Bogota, Medellin, Cali',
      keywords: ['bogota', 'colombia', 'medellin'],
    },
    {
      label: 'Mexico',
      value: 'mx',
      description: 'CDMX, Guadalajara, Monterrey',
      keywords: ['mexico', 'cdmx', 'guadalajara'],
    },
    {
      label: 'Chile',
      value: 'cl',
      description: 'Santiago, Valparaiso, Concepcion',
      keywords: ['chile', 'santiago'],
    },
    {
      label: 'Argentina',
      value: 'ar',
      description: 'Buenos Aires, Cordoba, Rosario',
      keywords: ['argentina', 'buenos aires'],
    },
    {
      label: 'Uruguay',
      value: 'uy',
      description: 'Montevideo, Punta del Este',
      keywords: ['uruguay', 'montevideo'],
    },
    {
      label: 'Paraguay',
      value: 'py',
      description: 'Asuncion, Ciudad del Este',
      keywords: ['paraguay', 'asuncion'],
    },
    {
      label: 'Bolivia',
      value: 'bo',
      description: 'La Paz, Santa Cruz, Cochabamba',
      keywords: ['bolivia', 'la paz'],
    },
    {
      label: 'Ecuador',
      value: 'ec',
      description: 'Quito, Guayaquil, Cuenca',
      keywords: ['ecuador', 'quito'],
    },
    {
      label: 'Venezuela',
      value: 've',
      description: 'Caracas, Maracaibo, Valencia',
      keywords: ['venezuela', 'caracas'],
    },
    {
      label: 'Brasil',
      value: 'br',
      description: 'Sao Paulo, Rio, Brasilia',
      keywords: ['brasil', 'rio', 'sao paulo'],
    },
    {
      label: 'Estados Unidos',
      value: 'us',
      description: 'New York, Miami, Los Angeles',
      keywords: ['usa', 'miami', 'new york'],
    },
  ];

  readonly roleOptions: SelectOption<string>[] = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Soporte', value: 'support' },
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Operador', value: 'operator' },
    { label: 'Analista', value: 'analyst' },
    { label: 'Auditor', value: 'auditor' },
    { label: 'Coordinador', value: 'coordinator' },
    { label: 'Gerente', value: 'manager' },
    { label: 'Invitado', value: 'guest', disabled: true },
  ];

  readonly statusOptions: SelectOption<string>[] = [
    { label: 'Activo', value: 'active', description: 'Visible en el sistema' },
    {
      label: 'Pendiente',
      value: 'pending',
      description: 'Requiere revision manual',
    },
    {
      label: 'Archivado',
      value: 'archived',
      description: 'Solo consulta historica',
    },
    {
      label: 'En proceso',
      value: 'in_progress',
      description: 'Tiene tareas en ejecucion',
    },
    {
      label: 'Observado',
      value: 'observed',
      description: 'Necesita correcciones',
    },
    {
      label: 'Suspendido',
      value: 'suspended',
      description: 'Temporalmente bloqueado',
    },
    {
      label: 'Cerrado',
      value: 'closed',
      description: 'Flujo completado',
    },
    {
      label: 'Programado',
      value: 'scheduled',
      description: 'Pendiente de fecha de inicio',
    },
  ];

  form: FormGroup;
  selectedStatus = 'pending';

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      country: ['', Validators.required],
      role: ['editor', Validators.required],
    });
  }

  htmlEjemplo1 = `<app-select
  label="Pais"
  placeholder="Selecciona un pais"
  [options]="countryOptions"
  formControlName="country"
/>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ form.get('country')?.value || 'Sin seleccionar' }}</strong>
</div>`;

  tsEjemplo1 = `readonly countryOptions: SelectOption<string>[] = [
  { label: 'Peru', value: 'pe' },
  { label: 'Colombia', value: 'co' },
  { label: 'Mexico', value: 'mx' },
  { label: 'Chile', value: 'cl' },
  { label: 'Argentina', value: 'ar' },
  { label: 'Brasil', value: 'br' },
];

form: FormGroup;

constructor(private fb: NonNullableFormBuilder) {
  this.form = this.fb.group({
    country: ['', Validators.required],
  });
}`;

  htmlEjemplo2 = `<app-select
  label="Rol del usuario"
  placeholder="Busca y selecciona un rol"
  [options]="roleOptions"
  [searchable]="true"
  formControlName="role"
/>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ form.get('role')?.value || 'Sin seleccionar' }}</strong>
</div>`;

  tsEjemplo2 = `readonly roleOptions: SelectOption<string>[] = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Soporte', value: 'support' },
  { label: 'Supervisor', value: 'supervisor' },
  { label: 'Operador', value: 'operator' },
];

form: FormGroup;

constructor(private fb: NonNullableFormBuilder) {
  this.form = this.fb.group({
    role: ['editor', Validators.required],
  });
}`;

  htmlEjemplo3 = `<app-select
  label="Estado"
  [options]="statusOptions"
  [searchable]="true"
  [(ngModel)]="selectedStatus"
  [ngModelOptions]="{ standalone: true }"
  name="estado"
/>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ selectedStatus }}</strong>
</div>`;

  tsEjemplo3 = `selectedStatus = 'pending';

readonly statusOptions: SelectOption<string>[] = [
  { label: 'Activo', value: 'active' },
  { label: 'Pendiente', value: 'pending' },
  { label: 'Archivado', value: 'archived' },
  { label: 'En proceso', value: 'in_progress' },
  { label: 'Observado', value: 'observed' },
];`;
}
