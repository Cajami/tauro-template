import { Component } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { InputComponent } from '@shared/components/form/input/input.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { ApiInfoComponent } from '../api-info/api-info.component';

import { LucideAngularModule, Mail, Search } from 'lucide-angular';

interface InputApiItem {
  property: string;
  values: string;
  defaultValue: string;
  description: string;
}

@Component({
  selector: 'app-input-docs-page',
  imports: [
    LucideAngularModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    InputComponent,
    ReactiveFormsModule,
    ApiInfoComponent,
  ],
  templateUrl: './input-docs-page.component.html',
  styleUrl: './input-docs-page.component.scss',
})
export class InputDocsPageComponent {
  form: FormGroup;
  readonly MailIcon = Mail;
  readonly SearchIcon = Search;
  readonly inputProps: InputApiItem[] = [
    {
      property: 'label',
      values: 'string',
      defaultValue: "''",
      description: 'Texto superior del campo. Si el input es requerido, el asterisco se agrega automaticamente.',
    },
    {
      property: 'placeholder',
      values: 'string',
      defaultValue: "''",
      description: 'Texto guia dentro del input cuando aun no tiene valor.',
    },
    {
      property: 'type',
      values: 'Cualquier tipo nativo de input HTML, como `text`, `email`, `number`, `password`',
      defaultValue: "'text'",
      description: 'Define el comportamiento base del control y el teclado sugerido en mobile.',
    },
    {
      property: 'autocomplete',
      values: 'string',
      defaultValue: "'off'",
      description: 'Permite controlar el autocompletado nativo del navegador.',
    },
    {
      property: 'size',
      values: "`'sm'`, `'md'`, `'lg'`",
      defaultValue: "'md'",
      description: 'Ajusta altura y espaciado del input.',
    },
    {
      property: 'hasError',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Fuerza el estado visual de error cuando la pantalla lo necesita.',
    },
    {
      property: 'required',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Marca visualmente el campo como obligatorio.',
    },
    {
      property: 'value',
      values: 'Model<string>',
      defaultValue: "''",
      description: 'Valor actual del componente cuando se usa con binding directo o como ControlValueAccessor.',
    },
    {
      property: 'disabled',
      values: 'Model<boolean>',
      defaultValue: 'false',
      description: 'Deshabilita interaccion y sincroniza el estado desde formularios Angular.',
    },
    {
      property: 'valueChange',
      values: 'Output<string>',
      defaultValue: 'Se emite en cada cambio de valor',
      description: 'Sirve para reaccionar manualmente al contenido escrito por el usuario.',
    },
    {
      property: 'blurChange',
      values: 'Output<void>',
      defaultValue: 'Se emite al perder foco',
      description: 'Util para validaciones diferidas o telemetria de interaccion.',
    },
    {
      property: '#leftIcon / #rightIcon',
      values: 'Content projection',
      defaultValue: 'Sin iconos',
      description: 'Slots opcionales para proyectar iconos o adornos a la izquierda y derecha.',
    },
  ];

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['javier2315@gmail.com', [Validators.required, Validators.email]],
      busqueda: [''],
      precio: [''],
    });
  }

  // Ejemplo 1: Básico
  htmlEjemplo1 = `<app-input
  label="Nombre Completo"
  placeholder="Ej. Juan Pérez"
  formControlName="nombre"
/>`;

  tsEjemplo1 = `
  form: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  }  
  `;

  // Ejemplo 2: Con Iconos (Proyección)
  htmlEjemplo2 = `
    <app-input label="Correo Electrónico" type="email" formControlName="email">
      <lucide-icon
        #leftIcon
        leftIcon
        [img]="MailIcon"
        [size]="20"
        class="text-gray-400"
      />
    </app-input>
  </app-component-showcase>  
  `;

  tsEjemplo2 = `
  import { LucideAngularModule, Mail } from 'lucide-angular';

  imports: [
    LucideAngularModule,
    ...

  form: FormGroup;
  readonly MailIcon = Mail;

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      email: ['javier2315@gmail.com', [Validators.required, Validators.email]],
    });
  }    
  `;

  // Ejemplo 3: Tamaños e Icono Derecho
  htmlEjemplo3 = `
    <app-input
      label="Búsqueda Avanzada"
      size="lg"
      placeholder="Buscar productos..."
      formControlName="busqueda"
    >
      <lucide-icon
        #rightIcon
        rightIcon
        [img]="SearchIcon"
        [size]="20"
        class="text-gray-400"
      />
    </app-input>  
  `;

  tsEjemplo3 = `
  import { LucideAngularModule, Search } from 'lucide-angular';

  imports: [
    LucideAngularModule,
    ...

  form: FormGroup;
  readonly SearchIcon = Search;

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      busqueda: [''],
    });
  }  
  `;
}
