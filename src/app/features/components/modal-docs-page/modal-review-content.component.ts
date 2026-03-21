import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODAL_DATA } from '@shared/components/modal/modal.tokens';

interface ReviewModalData {
  title: string;
  owner: string;
  updatedAt: string;
}

@Component({
  selector: 'app-modal-review-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4 text-sm leading-6 text-muted-foreground">
      <div class="rounded-xl border border-border bg-background p-4">
        <p class="text-base font-semibold text-foreground">{{ data?.title }}</p>
        <p class="mt-1">Responsable: {{ data?.owner }}</p>
        <p>Ultima actualizacion: {{ data?.updatedAt }}</p>
      </div>

      <p>
        Este ejemplo demuestra que el footer puede tener tantas acciones como necesites,
        sin obligar al modal a usar solo "Aceptar" y "Cancelar".
      </p>

      <div class="grid gap-3 rounded-xl border border-dashed border-border p-4 sm:grid-cols-2">
        <div class="rounded-lg bg-muted/50 p-3">
          <p class="font-medium text-foreground">Aprobar</p>
          <p class="text-xs">Cierra el flujo con una decision positiva.</p>
        </div>
        <div class="rounded-lg bg-muted/50 p-3">
          <p class="font-medium text-foreground">Solicitar cambios</p>
          <p class="text-xs">Mantiene trazabilidad sin perder contexto.</p>
        </div>
        <div class="rounded-lg bg-muted/50 p-3">
          <p class="font-medium text-foreground">Escalar</p>
          <p class="text-xs">Permite delegar el siguiente paso.</p>
        </div>
        <div class="rounded-lg bg-muted/50 p-3">
          <p class="font-medium text-foreground">Cerrar</p>
          <p class="text-xs">Sale del modal sin acciones laterales.</p>
        </div>
      </div>
    </div>
  `,
})
export class ModalReviewContentComponent {
  protected readonly data = inject<ReviewModalData | undefined>(MODAL_DATA, {
    optional: true,
  });
}
