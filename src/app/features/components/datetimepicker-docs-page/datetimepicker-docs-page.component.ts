import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { DatetimePickerComponent } from '@shared/components/datetime-picker/datetime-picker.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { ApiInfoComponent } from '../api-info/api-info.component';

interface DatetimepickerApiItem {
  property: string;
  values: string;
  defaultValue: string;
  description: string;
}

@Component({
  selector: 'app-example-datetimepicker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    DatetimePickerComponent,
    ApiInfoComponent,
  ],
  templateUrl: './datetimepicker-docs-page.component.html',
  styleUrl: './datetimepicker-docs-page.component.scss',
})
export class DatetimepickerDocsPageComponent {
  form: FormGroup;
  readonly datetimepickerProps: DatetimepickerApiItem[] = [
    {
      property: 'label',
      values: 'string',
      defaultValue: "''",
      description: 'Etiqueta visible encima del picker.',
    },
    {
      property: 'placeholder',
      values: 'string',
      defaultValue: "'Seleccionar...'",
      description: 'Texto mostrado cuando aun no hay fecha u hora elegida.',
    },
    {
      property: 'size',
      values: "`'sm'`, `'md'`, `'lg'`",
      defaultValue: "'md'",
      description: 'Ajusta altura y espaciado del control.',
    },
    {
      property: 'mode',
      values: "`'date'`, `'time'`, `'datetime'`",
      defaultValue: "'date'",
      description: 'Define si el usuario elige solo fecha, solo hora o ambas.',
    },
    {
      property: 'formatType',
      values: "`'short'` o `'long'`",
      defaultValue: "'short'",
      description: 'Controla el formato de salida mostrado en el input.',
    },
    {
      property: 'disabled',
      values: 'Signal<boolean>',
      defaultValue: 'false',
      description: 'Deshabilita el picker y bloquea apertura del calendario.',
    },
    {
      property: 'ControlValueAccessor',
      values: 'Integracion con Forms',
      defaultValue: 'Disponible siempre',
      description: 'Se usa con `formControlName`, `formControl` o `ngModel` sin outputs extras.',
    },
  ];

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      fechaNacimiento: [null, Validators.required],
      citaMedica: [null, Validators.required],
      horaEntrada: [null, Validators.required],
    });
  }

  htmlEjemplo1 = `
    <app-datetime-picker
      label="Fecha de Nacimiento"
      mode="date"
      formatType="short"
      formControlName="fechaNacimiento"
    />
  `;

  tsEjemplo1 = `form: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      fechaNacimiento: [null, Validators.required],
    });
  }
`;

  htmlEjemplo2 = `
    <app-datetime-picker
      label="Cita Médica"
      mode="datetime"
      placeholder="Selecciona día y hora"
      formControlName="citaMedica"
    />
  `;

  tsEjemplo2 = `form: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      citaMedica: [null, Validators.required],
    });
  }
`;

  htmlEjemplo3 = `
    <app-datetime-picker
      label="Hora de Entrada"
      mode="time"
      placeholder="Indique la hora"
      formControlName="horaEntrada"
    />
  `;

  tsEjemplo3 = `form: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      horaEntrada: [null, Validators.required],
    });
  }
`;
}
