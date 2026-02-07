import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
