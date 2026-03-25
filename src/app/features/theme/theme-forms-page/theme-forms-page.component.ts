import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { DatetimePickerComponent } from '@shared/components/datetime-picker/datetime-picker.component';
import { InputComponent } from '@shared/components/form/input/input.component';
import {
  SelectComponent,
  SelectOption,
} from '@shared/components/form/select/select.component';
import { TextareaComponent } from '@shared/components/form/textarea/textarea.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { SwitchComponent } from '@shared/components/switch/switch.component';

interface FormPatternTip {
  title: string;
  description: string;
}

interface TailwindClassTip {
  utility: string;
  meaning: string;
  usage: string;
}

@Component({
  selector: 'app-theme-forms-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    InputComponent,
    SelectComponent,
    DatetimePickerComponent,
    TextareaComponent,
    CheckboxComponent,
    SwitchComponent,
    ButtonComponent,
  ],
  templateUrl: './theme-forms-page.component.html',
})
export class ThemeFormsPageComponent {
  readonly roleOptions: SelectOption<string>[] = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Analista', value: 'analyst' },
    { label: 'Operaciones', value: 'operations' },
  ];

  readonly areaOptions: SelectOption<string>[] = [
    { label: 'Finanzas', value: 'finanzas' },
    { label: 'Operaciones', value: 'operaciones' },
    { label: 'Comercial', value: 'comercial' },
    { label: 'TI', value: 'ti' },
  ];

  readonly regionOptions: SelectOption<string>[] = [
    { label: 'Lima', value: 'lima' },
    { label: 'Bogota', value: 'bogota' },
    { label: 'Quito', value: 'quito' },
    { label: 'CDMX', value: 'cdmx' },
  ];

  readonly environmentOptions: SelectOption<string>[] = [
    { label: 'Produccion', value: 'prod' },
    { label: 'QA', value: 'qa' },
    { label: 'Staging', value: 'staging' },
    { label: 'Sandbox', value: 'sandbox' },
  ];

  readonly compositionTips: FormPatternTip[] = [
    {
      title: 'Empieza mobile-first',
      description:
        'Parte de `grid-cols-1` y escala con breakpoints solo cuando ayuden. Si el formulario puede vivir en cards o previews redimensionables, prefiere `auto-fit/minmax` para responder al ancho real disponible.',
    },
    {
      title: 'Reserva aire con `gap` estable',
      description:
        'En formularios del template conviene mantener `gap-4` o `gap-6` para que Input, Select y DateTimePicker respiren igual.',
    },
    {
      title: 'Usa `col-span-full` para campos narrativos',
      description:
        'Textareas, alertas de ayuda y acciones de cierre suelen verse mejor ocupando todo el ancho de la grilla.',
    },
    {
      title: 'Separa preferencias de datos',
      description:
        'Checkboxes y switches suelen vivir en bloques propios o en una columna secundaria, no mezclados con los datos principales.',
    },
  ];

  readonly utilityCheatSheet: TailwindClassTip[] = [
    {
      utility: 'grid',
      meaning: 'Activa CSS Grid en el contenedor.',
      usage:
        'Se usa como base para ordenar campos en filas y columnas sin depender de un sistema tipo row/col.',
    },
    {
      utility: 'grid-cols-1',
      meaning: 'Define una sola columna.',
      usage:
        'Es el punto de partida mobile-first. Si no hay suficiente ancho, todo cae naturalmente en una columna.',
    },
    {
      utility: 'gap-4 / gap-6',
      meaning: 'Controla la separacion entre filas y columnas del grid.',
      usage:
        'Sirve para dar aire consistente entre controles. `gap-4` es una base compacta; `gap-6` respira mas.',
    },
    {
      utility: 'md:grid-cols-2',
      meaning: 'Desde el breakpoint `md`, el contenedor pasa a dos columnas.',
      usage:
        'Util para formularios normales cuando el ancho depende del viewport completo y no de un contenedor interno.',
    },
    {
      utility: 'col-span-full',
      meaning: 'Hace que el elemento ocupe todo el ancho del grid actual.',
      usage:
        'Ideal para `Textarea`, alertas de ayuda, bloques de acciones o configuraciones que no deben quedar estrechos.',
    },
    {
      utility: 'grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]',
      meaning: 'Crea columnas flexibles que se acomodan solas segun el ancho disponible.',
      usage:
        'Muy util dentro de cards, modales o previews redimensionables, donde los breakpoints del viewport no bastan.',
    },
    {
      utility: '2xl:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]',
      meaning: 'En pantallas muy amplias divide el espacio en una columna principal y otra secundaria fija.',
      usage:
        'Buen patron para formularios complejos con un bloque lateral de preferencias o resumen.',
    },
    {
      utility: 'flex justify-end gap-3',
      meaning: 'Alinea acciones en horizontal al lado derecho con separacion estable.',
      usage:
        'Se usa mucho para footers de formularios o filas de botones como Guardar / Cancelar.',
    },
  ];

  readonly basicForm;
  readonly twoColumnForm;
  readonly advancedForm;

  readonly singleColumnHtml = `<form class="grid grid-cols-1 gap-4">
  <app-input
    label="Nombre completo"
    placeholder="Ej. Lucia Herrera"
    formControlName="fullName"
  ></app-input>

  <app-input
    label="Correo de contacto"
    type="email"
    placeholder="equipo@empresa.com"
    formControlName="email"
  ></app-input>

  <app-textarea
    label="Notas"
    [rows]="4"
    formControlName="notes"
  ></app-textarea>

  <div class="flex justify-end">
    <app-button>Guardar borrador</app-button>
  </div>
</form>`;

  readonly twoColumnHtml = `<form class="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-4">
  <app-input label="Documento" formControlName="documentNumber"></app-input>
  <app-select label="Rol" [options]="roleOptions" formControlName="role"></app-select>
  <app-select label="Area" [options]="areaOptions" formControlName="area"></app-select>
  <app-select label="Region" [options]="regionOptions" formControlName="region"></app-select>

  <app-datetime-picker
    label="Inicio"
    mode="date"
    formControlName="startDate"
  ></app-datetime-picker>

  <app-datetime-picker
    label="Fin"
    mode="date"
    formControlName="endDate"
  ></app-datetime-picker>

  <div class="col-span-full grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2">
    <app-switch label="Usuario activo" formControlName="active"></app-switch>
    <app-checkbox label="Enviar alertas" formControlName="alerts"></app-checkbox>
  </div>
</form>`;

  readonly advancedHtml = `<div class="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
  <form class="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-4">
    <app-input label="Proyecto" formControlName="projectName"></app-input>
    <app-input label="Responsable" formControlName="owner"></app-input>
    <app-select label="Ambiente" [options]="environmentOptions" formControlName="environment"></app-select>
    <app-select label="Region" [options]="regionOptions" formControlName="region"></app-select>
    <app-datetime-picker label="Salida" mode="date" formControlName="launchDate"></app-datetime-picker>
    <app-datetime-picker label="Corte" mode="date" formControlName="cutoffDate"></app-datetime-picker>

    <div class="col-span-full">
      <app-textarea label="Resumen funcional" [rows]="4" formControlName="summary"></app-textarea>
    </div>

    <div class="col-span-full">
      <app-textarea label="Notas internas" [rows]="4" formControlName="internalNotes"></app-textarea>
    </div>
  </form>

  <aside class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
    <div class="space-y-4">
      <app-switch label="Publicar portal" formControlName="publishPortal"></app-switch>
      <app-switch label="Requiere aprobacion" formControlName="requireApproval"></app-switch>
      <app-checkbox label="Enviar resumen diario" formControlName="sendDigest"></app-checkbox>
    </div>
  </aside>
</div>`;

  constructor(private readonly fb: NonNullableFormBuilder) {
    this.basicForm = this.fb.group({
      fullName: ['Lucia Herrera', Validators.required],
      email: ['lucia@empresa.com', [Validators.required, Validators.email]],
      notes: ['Mantener seguimiento semanal con el equipo comercial.'],
    });

    this.twoColumnForm = this.fb.group({
      documentNumber: ['74258196', Validators.required],
      role: ['supervisor', Validators.required],
      area: ['operaciones', Validators.required],
      region: ['lima', Validators.required],
      startDate: ['2026-03-24'],
      endDate: ['2026-04-15'],
      active: [true],
      alerts: [false],
    });

    this.advancedForm = this.fb.group({
      projectName: ['Portal de cobranzas', Validators.required],
      owner: ['Ana Paredes', Validators.required],
      environment: ['qa', Validators.required],
      region: ['bogota', Validators.required],
      launchDate: ['2026-04-05'],
      cutoffDate: ['2026-04-12'],
      summary: [
        'Centralizar aprobaciones, publicaciones y trazabilidad del despliegue comercial.',
      ],
      internalNotes: ['Coordinar validacion final con seguridad y operaciones.'],
      publishPortal: [true],
      requireApproval: [true],
      sendDigest: [false],
    });
  }
}
