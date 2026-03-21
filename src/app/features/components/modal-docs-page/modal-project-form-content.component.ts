import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '@shared/components/form/input/input.component';
import { TextareaComponent } from '@shared/components/form/textarea/textarea.component';
import {
  SelectComponent,
  SelectOption,
} from '@shared/components/form/select/select.component';
import { MODAL_DATA, MODAL_REF } from '@shared/components/modal/modal.tokens';
import { ModalRef } from '@shared/components/modal/modal-ref';

interface ProjectFormModalData {
  defaultOwner: string;
}

interface ProjectFormResult {
  action: 'draft' | 'publish';
  payload: {
    name: string;
    owner: string;
    area: string;
    priority: string;
    objective: string;
    summary: string;
    rolloutNotes: string;
    supportNotes: string;
  };
}

@Component({
  selector: 'app-modal-project-form-content',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    TextareaComponent,
    SelectComponent,
  ],
  template: `
    <form [formGroup]="form" class="space-y-5">
      <div class="grid gap-4 md:grid-cols-2">
        <app-input
          label="Nombre del modulo"
          placeholder="Ej. Control de Inventario"
          formControlName="name"
        />

        <app-input
          label="Responsable"
          placeholder="Ej. Equipo Frontend"
          formControlName="owner"
        />
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <app-select
          label="Area funcional"
          placeholder="Selecciona un area"
          [options]="areaOptions"
          formControlName="area"
        />

        <app-select
          label="Prioridad"
          placeholder="Selecciona una prioridad"
          [options]="priorityOptions"
          formControlName="priority"
        />
      </div>

      <app-textarea
        label="Objetivo del modulo"
        placeholder="Explica el problema de negocio que resuelve este modulo."
        formControlName="objective"
        [rows]="3"
      />

      <app-textarea
        label="Resumen funcional"
        placeholder="Describe el flujo principal, las vistas y las acciones clave."
        formControlName="summary"
        [rows]="4"
      />

      <div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <p class="text-sm font-semibold text-gray-900">Checklist de implementacion</p>
        <p class="mt-1 text-sm text-gray-600">
          Este bloque existe a proposito para forzar contenido real dentro del modal y
          validar el comportamiento del scroll.
        </p>
      </div>

      <app-textarea
        label="Notas de despliegue"
        placeholder="Dependencias, migraciones, scripts o consideraciones para pasar a QA."
        formControlName="rolloutNotes"
        [rows]="4"
      />

      <app-textarea
        label="Notas de soporte"
        placeholder="Alertas, monitoreo, fallback manual o criterios de soporte post release."
        formControlName="supportNotes"
        [rows]="4"
      />

      <div class="rounded-xl border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        Arrastra el header del modal para moverlo. Este ejemplo no se cierra con Escape ni
        con clic fuera; solo con acciones explicitas del footer.
      </div>
    </form>
  `,
})
export class ModalProjectFormContentComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly data = inject<ProjectFormModalData | undefined>(MODAL_DATA, {
    optional: true,
  });
  private readonly modalRef = inject(MODAL_REF) as ModalRef<
    ModalProjectFormContentComponent,
    ProjectFormResult
  >;

  readonly areaOptions: SelectOption<string>[] = [
    { label: 'Operaciones', value: 'operations' },
    { label: 'Finanzas', value: 'finance' },
    { label: 'Comercial', value: 'sales' },
    { label: 'Soporte', value: 'support' },
  ];

  readonly priorityOptions: SelectOption<string>[] = [
    { label: 'Alta', value: 'high' },
    { label: 'Media', value: 'medium' },
    { label: 'Baja', value: 'low' },
  ];

  readonly form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    owner: [this.data?.defaultOwner ?? '', Validators.required],
    area: ['operations', Validators.required],
    priority: ['medium', Validators.required],
    objective: ['', Validators.required],
    summary: ['', Validators.required],
    rolloutNotes: ['', Validators.required],
    supportNotes: ['', Validators.required],
  });

  clearForm(): void {
    this.form.reset({
      name: '',
      owner: this.data?.defaultOwner ?? '',
      area: 'operations',
      priority: 'medium',
      objective: '',
      summary: '',
      rolloutNotes: '',
      supportNotes: '',
    });
  }

  saveDraft(): void {
    if (!this.ensureValid()) {
      return;
    }

    this.modalRef.close({
      action: 'draft',
      payload: this.form.getRawValue(),
    });
  }

  publish(): void {
    if (!this.ensureValid()) {
      return;
    }

    this.modalRef.close({
      action: 'publish',
      payload: this.form.getRawValue(),
    });
  }

  private ensureValid(): boolean {
    this.form.markAllAsTouched();
    return this.form.valid;
  }
}
