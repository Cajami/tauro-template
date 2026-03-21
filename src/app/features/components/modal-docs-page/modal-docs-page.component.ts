import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { ModalService } from '@shared/components/modal/modal.service';
import { ApiInfoComponent } from '../api-info/api-info.component';
import { ModalProjectFormContentComponent } from './modal-project-form-content.component';
import { ModalReviewContentComponent } from './modal-review-content.component';
import { ModalWelcomeContentComponent } from './modal-welcome-content.component';

@Component({
  selector: 'app-modal-docs-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    ButtonComponent,
    ApiInfoComponent,
  ],
  templateUrl: './modal-docs-page.component.html',
})
export class ModalDocsPageComponent {
  protected readonly lastBasicResult = signal('Sin acciones todavia');
  protected readonly lastReviewResult = signal('Sin acciones todavia');
  protected readonly lastFormResult = signal('Sin acciones todavia');

  protected readonly htmlEjemplo1 = `openWelcomeModal(): void {
  const ref = this.modalService.open(ModalWelcomeContentComponent, {
    title: 'Bienvenido al modal del template',
    subtitle: 'El contenido se carga de forma dinamica con modalService.open().',
    size: 'md',
    data: {
      projectName: 'Tauro Template',
      focusArea: 'Dashboards administrativos',
    },
    actions: [
      { label: 'Cancelar', variant: 'secondary', closeOnClick: true, result: 'cancelado' },
      { label: 'Aceptar', variant: 'primary', closeOnClick: true, result: 'aceptado' },
    ],
  });

  ref.afterClosed$.subscribe((result) => {
    this.lastBasicResult.set(result ?? 'cerrado');
  });
}`;

  protected readonly tsEjemplo1 = `constructor(private readonly modalService: ModalService) {}

openWelcomeModal(): void {
  this.modalService.open(ModalWelcomeContentComponent, {
    title: 'Bienvenido al modal del template',
    subtitle: 'El contenido se carga de forma dinamica con modalService.open().',
    actions: [
      { label: 'Cancelar', variant: 'secondary', closeOnClick: true },
      { label: 'Aceptar', variant: 'primary', closeOnClick: true },
    ],
  });
}`;

  protected readonly htmlEjemplo2 = `this.modalService.open(ModalReviewContentComponent, {
  title: 'Revision de propuesta',
  subtitle: 'Un footer reusable puede tener 3 o 4 botones segun el flujo.',
  size: 'lg',
  data: {
    title: 'Landing de onboarding',
    owner: 'Equipo UX',
    updatedAt: '18/03/2026 10:45',
  },
  actions: [
    { label: 'Cerrar', variant: 'secondary', closeOnClick: true, result: 'cerrado' },
    { label: 'Escalar', variant: 'link', color: 'secondary', closeOnClick: true, result: 'escalado' },
    { label: 'Solicitar cambios', variant: 'error', closeOnClick: true, result: 'cambios' },
    { label: 'Aprobar', variant: 'success', closeOnClick: true, result: 'aprobado' },
  ],
});`;

  protected readonly tsEjemplo2 = `La cantidad de botones depende del arreglo actions.
Cada accion puede cerrar el modal o ejecutar logica personalizada antes de cerrarlo.`;

  protected readonly htmlEjemplo3 = `this.modalService.open(ModalProjectFormContentComponent, {
  title: 'Nuevo modulo reutilizable',
  subtitle: 'Los modales del template son movibles por defecto y el footer dispara metodos del componente cargado.',
  size: 'lg',
  data: { defaultOwner: 'Equipo Frontend' },
  actions: [
    { label: 'Cancelar', variant: 'secondary', closeOnClick: true, result: 'cancelado' },
    {
      label: 'Limpiar',
      variant: 'link',
      color: 'secondary',
      onClick: ({ componentInstance }) => componentInstance?.clearForm(),
    },
    {
      label: 'Guardar borrador',
      variant: 'secondary',
      onClick: ({ componentInstance }) => componentInstance?.saveDraft(),
    },
    {
      label: 'Publicar',
      variant: 'primary',
      onClick: ({ componentInstance }) => componentInstance?.publish(),
    },
  ],
});`;

  protected readonly tsEjemplo3 = `Los modales del template son dragables por defecto.
El contenido dinamico recibe MODAL_DATA y MODAL_REF por inyeccion.
Eso permite que el componente interno cierre el modal con resultados propios.`;

  protected readonly htmlEjemplo4 = `openSuppliersModal(): void {
  const ref = this.modalService.open(SuppliersParticipantsModalComponent, {
    title: 'Proveedores participantes',
    size: 'xl',
    data: { saleId: 25 },
    actions: [
      {
        label: 'Cancelar',
        variant: 'secondary',
        closeOnClick: true,
      },
      {
        label: 'Guardar',
        variant: 'primary',
        onClick: ({ componentInstance }) => componentInstance?.save(),
      },
    ],
  });

  ref.afterClosed$.subscribe((result) => {
    if (result?.updated) {
      this.reloadSale();
    }
  });
}`;

  protected readonly tsEjemplo4 = `// Componente padre: solo abre el modal y escucha el resultado.
openSuppliersModal(): void {
  const ref = this.modalService.open(SuppliersParticipantsModalComponent, {
    title: 'Proveedores participantes',
    actions: [
      {
        label: 'Guardar',
        variant: 'primary',
        onClick: ({ componentInstance }) => componentInstance?.save(),
      },
    ],
  });

  ref.afterClosed$.subscribe((result) => {
    if (result?.updated) {
      this.reloadSale();
    }
  });
}

// Componente dentro del modal: conoce la validacion y la logica de guardado.
export class SuppliersParticipantsModalComponent {
  constructor(
    private readonly salesService: SalesService,
    private readonly modalRef: ModalRef<SuppliersParticipantsModalComponent>,
  ) {}

  async save(): Promise<void> {
    await this.salesService.saveParticipants();
    this.modalRef.close({ updated: true });
  }
}`;

  constructor(private readonly modalService: ModalService) {}

  protected openWelcomeModal(): void {
    const ref = this.modalService.open(ModalWelcomeContentComponent, {
      title: 'Bienvenido al modal del template',
      subtitle: 'El contenido se carga de forma dinamica con modalService.open().',
      size: 'md',
      data: {
        projectName: 'Tauro Template',
        focusArea: 'Dashboards administrativos',
      },
      actions: [
        {
          label: 'Cancelar',
          variant: 'secondary',
          closeOnClick: true,
          result: 'cancelado',
        },
        {
          label: 'Aceptar',
          variant: 'primary',
          closeOnClick: true,
          result: 'aceptado',
        },
      ],
    });

    ref.afterClosed$.subscribe((result) => {
      this.lastBasicResult.set(result ?? 'cerrado');
    });
  }

  protected openReviewModal(): void {
    const ref = this.modalService.open(ModalReviewContentComponent, {
      title: 'Revision de propuesta',
      subtitle: 'Un footer reusable puede tener 3 o 4 botones segun el flujo.',
      size: 'lg',
      data: {
        title: 'Landing de onboarding',
        owner: 'Equipo UX',
        updatedAt: '18/03/2026 10:45',
      },
      actions: [
        {
          label: 'Cerrar',
          variant: 'secondary',
          closeOnClick: true,
          result: 'cerrado',
        },
        {
          label: 'Escalar',
          variant: 'link',
          color: 'secondary',
          closeOnClick: true,
          result: 'escalado',
        },
        {
          label: 'Solicitar cambios',
          variant: 'error',
          closeOnClick: true,
          result: 'cambios solicitados',
        },
        {
          label: 'Aprobar',
          variant: 'success',
          closeOnClick: true,
          result: 'aprobado',
        },
      ],
    });

    ref.afterClosed$.subscribe((result) => {
      this.lastReviewResult.set(result ?? 'cerrado');
    });
  }

  protected openFormModal(): void {
    const ref = this.modalService.open(ModalProjectFormContentComponent, {
      title: 'Nuevo modulo reutilizable',
      subtitle:
        'Los modales del template son movibles por defecto y el footer dispara metodos del componente cargado.',
      size: 'lg',
      data: {
        defaultOwner: 'Equipo Frontend',
      },
      actions: [
        {
          label: 'Cancelar',
          variant: 'secondary',
          closeOnClick: true,
          result: 'cancelado',
        },
        {
          label: 'Limpiar',
          variant: 'link',
          color: 'secondary',
          onClick: ({ componentInstance }) => componentInstance?.clearForm(),
        },
        {
          label: 'Guardar borrador',
          variant: 'secondary',
          onClick: ({ componentInstance }) => componentInstance?.saveDraft(),
        },
        {
          label: 'Publicar',
          variant: 'primary',
          onClick: ({ componentInstance }) => componentInstance?.publish(),
        },
      ],
    });

    ref.afterClosed$.subscribe((result) => {
      if (!result) {
        this.lastFormResult.set('cerrado');
        return;
      }

      this.lastFormResult.set(JSON.stringify(result));
    });
  }
}
