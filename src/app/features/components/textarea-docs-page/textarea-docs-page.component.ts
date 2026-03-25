import { Component } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiInfoComponent } from '../api-info/api-info.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { TextareaComponent } from '@shared/components/form/textarea/textarea.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';

interface TextareaApiItem {
  property: string;
  values: string;
  defaultValue: string;
  description: string;
}

@Component({
  selector: 'app-textarea-docs-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    TextareaComponent,
    ApiInfoComponent,
  ],
  templateUrl: './textarea-docs-page.component.html',
  styleUrl: './textarea-docs-page.component.scss',
})
export class TextareaDocsPageComponent {
  readonly form: FormGroup;
  commentsValue = 'Texto inicial para ngModel';

  readonly textareaProps: TextareaApiItem[] = [
    {
      property: 'label',
      values: 'string',
      defaultValue: "''",
      description: 'Etiqueta visible del textarea. Si el campo es requerido en Angular Forms, el asterisco aparece automaticamente.',
    },
    {
      property: 'placeholder',
      values: 'string',
      defaultValue: "''",
      description: 'Texto de apoyo mostrado mientras el control no tiene contenido.',
    },
    {
      property: 'rows',
      values: 'number',
      defaultValue: '4',
      description: 'Cantidad inicial de filas visibles del textarea.',
    },
    {
      property: 'resize',
      values: "`'none'`, `'vertical'`, `'horizontal'`, `'both'`",
      defaultValue: "'vertical'",
      description: 'Define si el usuario puede redimensionar el campo y en que eje.',
    },
    {
      property: 'maxLength',
      values: 'number | null',
      defaultValue: 'null',
      description: 'Limita la cantidad maxima de caracteres que se pueden escribir.',
    },
    {
      property: 'showCharCount',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Muestra el contador de caracteres debajo del textarea cuando tambien existe `maxLength`.',
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
      description: 'Deshabilita el control y sincroniza el estado desde Angular Forms.',
    },
    {
      property: 'valueChange',
      values: 'Output<string>',
      defaultValue: 'Se emite en cada input',
      description: 'Evento para reaccionar manualmente al cambio del texto.',
    },
    {
      property: 'ControlValueAccessor',
      values: 'Integracion con Forms',
      defaultValue: 'Disponible siempre',
      description: 'Permite usar `formControlName`, `formControl` o `ngModel` sin wiring adicional.',
    },
  ];

  readonly resizeValues: TextareaApiItem[] = [
    {
      property: 'none',
      values: 'Sin resize',
      defaultValue: 'No',
      description: 'Bloquea completamente el cambio de tamaño manual.',
    },
    {
      property: 'vertical',
      values: 'Resize vertical',
      defaultValue: 'Si',
      description: 'Permite crecer o reducir solo en altura.',
    },
    {
      property: 'horizontal',
      values: 'Resize horizontal',
      defaultValue: 'No',
      description: 'Permite modificar solo el ancho del control.',
    },
    {
      property: 'both',
      values: 'Resize libre',
      defaultValue: 'No',
      description: 'Permite cambiar ancho y alto manualmente.',
    },
  ];

  htmlEjemplo1 = `<app-textarea
  label="Descripcion del modulo"
  placeholder="Explica el objetivo principal de esta funcionalidad"
  formControlName="description"
></app-textarea>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ form.get('description')?.value || 'Sin contenido' }}</strong>
</div>`;

  tsEjemplo1 = `readonly form = this.fb.group({
  description: ['', Validators.required],
});`;

  htmlEjemplo2 = `<app-textarea
  label="Notas internas"
  placeholder="Agrega observaciones rapidas para el equipo"
  [rows]="6"
  resize="none"
  [(ngModel)]="commentsValue"
  [ngModelOptions]="{ standalone: true }"
></app-textarea>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Valor actual: <strong>{{ commentsValue }}</strong>
</div>`;

  tsEjemplo2 = `commentsValue = 'Texto inicial para ngModel';`;

  htmlEjemplo3 = `<app-textarea
  label="Resumen ejecutivo"
  placeholder="Escribe un resumen breve para el tablero"
  [maxLength]="180"
  [showCharCount]="true"
  [rows]="5"
  formControlName="summary"
></app-textarea>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Longitud actual: <strong>{{ form.get('summary')?.value?.length || 0 }}</strong>
</div>`;

  tsEjemplo3 = `readonly form = this.fb.group({
  summary: ['Pendiente de revision por el equipo de operaciones.'],
});`;

  constructor(private readonly fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      summary: ['Pendiente de revision por el equipo de operaciones.'],
    });
  }
}
