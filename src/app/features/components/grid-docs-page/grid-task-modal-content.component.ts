import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MODAL_DATA } from '@shared/components/modal/modal.tokens';

interface GridTaskModalData {
  task: string;
  owner: string;
  sprint: string;
  priority: string;
  note?: string;
  dueDate?: Date | null;
  alerts: number;
  done: boolean;
}

@Component({
  selector: 'app-grid-task-modal-content',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="space-y-4 text-sm text-slate-700">
      <div class="rounded-xl border border-primary-200 bg-primary-50/70 p-4">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-primary-700">Tarea</p>
        <h3 class="mt-2 text-lg font-semibold text-slate-900">{{ data.task }}</h3>
        <p class="mt-2 text-sm text-slate-600">
          Responsable: <strong>{{ data.owner }}</strong> · Sprint: <strong>{{ data.sprint }}</strong>
        </p>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-xl border border-gray-200 bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Prioridad</p>
          <p class="mt-2 font-medium text-slate-900">{{ data.priority }}</p>
        </div>
        <div class="rounded-xl border border-gray-200 bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Estado</p>
          <p class="mt-2 font-medium text-slate-900">{{ data.done ? 'Completada' : 'Pendiente' }}</p>
        </div>
        <div class="rounded-xl border border-gray-200 bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Fecha objetivo</p>
          <p class="mt-2 font-medium text-slate-900">
            {{ data.dueDate ? (data.dueDate | date: 'dd/MM/yyyy') : 'Sin fecha' }}
          </p>
        </div>
        <div class="rounded-xl border border-gray-200 bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Alertas</p>
          <p class="mt-2 font-medium text-slate-900">{{ data.alerts }} pendientes</p>
        </div>
      </div>

      <div class="rounded-xl border border-gray-200 bg-white p-4">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Nota</p>
        <p class="mt-2 leading-6 text-slate-700">{{ data.note || 'Sin nota registrada' }}</p>
      </div>
    </div>
  `,
})
export class GridTaskModalContentComponent {
  protected readonly data = inject(MODAL_DATA) as GridTaskModalData;
}
