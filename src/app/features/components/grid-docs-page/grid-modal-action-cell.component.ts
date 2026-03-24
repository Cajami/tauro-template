import { Component, input, inject } from '@angular/core';
import { CellContext } from '@tanstack/angular-table';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ModalService } from '@shared/components/modal/modal.service';
import { GridTaskModalContentComponent } from './grid-task-modal-content.component';

@Component({
  selector: 'app-grid-modal-action-cell',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="flex justify-center">
      <app-button size="sm" variant="secondary" color="secondary" (clicked)="openModal()">
        Ver detalle
      </app-button>
    </div>
  `,
})
export class GridModalActionCellComponent {
  readonly context = input.required<CellContext<any, unknown>>();
  private readonly modalService = inject(ModalService);

  openModal(): void {
    const row = this.context().row.original as {
      task: string;
      owner: string;
      sprint: string;
      priority: string;
      note?: string;
      dueDate?: Date | null;
      alerts: number;
      done: boolean;
    };

    this.modalService.open(GridTaskModalContentComponent, {
      title: 'Detalle de la fila',
      subtitle: 'Ejemplo de modal abierto desde una celda del Grid.',
      size: 'md',
      data: row,
      actions: [
        {
          label: 'Cerrar',
          variant: 'primary',
          closeOnClick: true,
        },
      ],
    });
  }
}
