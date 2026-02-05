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
