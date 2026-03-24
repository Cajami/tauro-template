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

interface SelectApiItem {
  property: string;
  values: string;
  defaultValue: string;
  description: string;
}

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
  readonly selectProps: SelectApiItem[] = [
    {
      property: 'label',
      values: 'string',
      defaultValue: "''",
      description: 'Etiqueta visible del control.',
    },
    {
      property: 'placeholder',
      values: 'string',
      defaultValue: "'Seleccionar...'",
      description: 'Texto mostrado cuando no hay valor seleccionado.',
    },
    {
      property: 'searchPlaceholder',
      values: 'string',
      defaultValue: "'Buscar...'",
      description: 'Placeholder interno del buscador cuando `searchable` esta activo.',
    },
    {
      property: 'emptyText',
      values: 'string',
      defaultValue: "'No se encontraron resultados'",
      description: 'Mensaje cuando el filtro no devuelve coincidencias.',
    },
    {
      property: 'noOptionsText',
      values: 'string',
      defaultValue: "'No hay opciones disponibles'",
      description: 'Mensaje cuando el arreglo `options` esta vacio.',
    },
    {
      property: 'size',
      values: "`'sm'`, `'md'`, `'lg'`",
      defaultValue: "'md'",
      description: 'Cambia altura y espaciado del control.',
    },
    {
      property: 'options',
      values: 'SelectOption<T>[]',
      defaultValue: '[]',
      description: 'Listado de opciones visibles en el dropdown.',
    },
    {
      property: 'searchable',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Activa el buscador interno por label, description y keywords.',
    },
    {
      property: 'hasError',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Fuerza el estado visual de error.',
    },
    {
      property: 'required',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Marca visualmente el select como obligatorio.',
    },
    {
      property: 'compareWith',
      values: 'funcion `(a, b) => boolean`',
      defaultValue: 'Object.is',
      description: 'Permite personalizar la comparacion entre valores seleccionados y opciones.',
    },
    {
      property: 'value',
      values: 'Model<T | null>',
      defaultValue: 'null',
      description: 'Valor actual del select cuando se usa con binding directo o como CVA.',
    },
    {
      property: 'disabled',
      values: 'Model<boolean>',
      defaultValue: 'false',
      description: 'Deshabilita interaccion y cierra el dropdown si estaba abierto.',
    },
    {
      property: 'valueChange / blurChange',
      values: 'Outputs',
      defaultValue: 'Se emiten en cambio de valor y blur',
      description: 'Eventos utiles para reaccionar fuera de formularios Angular.',
    },
  ];

  readonly optionProps: SelectApiItem[] = [
    {
      property: 'label',
      values: 'string',
      defaultValue: 'Requerido',
      description: 'Texto principal visible para el usuario.',
    },
    {
      property: 'value',
      values: 'T',
      defaultValue: 'Requerido',
      description: 'Valor real que se escribe en el modelo al seleccionar la opcion.',
    },
    {
      property: 'disabled',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Impide seleccionar esa opcion puntual.',
    },
    {
      property: 'description',
      values: 'string',
      defaultValue: 'Sin descripcion',
      description: 'Linea secundaria dentro del listado para dar mas contexto.',
    },
    {
      property: 'keywords',
      values: 'string[]',
      defaultValue: '[]',
      description: 'Palabras adicionales que tambien participan en la busqueda.',
    },
  ];

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
