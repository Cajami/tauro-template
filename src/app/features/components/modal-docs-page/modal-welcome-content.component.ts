import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODAL_DATA } from '@shared/components/modal/modal.tokens';

interface WelcomeModalData {
  projectName: string;
  focusArea: string;
}

@Component({
  selector: 'app-modal-welcome-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4 text-sm leading-6 text-muted-foreground">
      <p>
        Este modal esta renderizando un componente dinamico dentro del shell global del
        template.
      </p>

      <div class="rounded-xl border border-border bg-muted/40 p-4">
        <p class="font-semibold text-foreground">Proyecto actual</p>
        <p class="mt-1">{{ data?.projectName }}</p>
      </div>

      <ul class="space-y-2 rounded-xl border border-border bg-background p-4 text-foreground">
        <li class="flex items-start gap-2">
          <span class="mt-2 size-2 rounded-full bg-primary-500"></span>
          <span>Header, body y footer configurables desde el servicio.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-2 size-2 rounded-full bg-primary-500"></span>
          <span>Contenido desacoplado del contenedor del modal.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-2 size-2 rounded-full bg-primary-500"></span>
          <span>Ideal para flujos de {{ data?.focusArea?.toLowerCase() || 'negocio' }}.</span>
        </li>
      </ul>
    </div>
  `,
})
export class ModalWelcomeContentComponent {
  protected readonly data = inject<WelcomeModalData | undefined>(MODAL_DATA, {
    optional: true,
  });
}
