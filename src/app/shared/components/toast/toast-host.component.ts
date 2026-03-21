import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ToastItemComponent } from './toast-item.component';
import { ToastService } from './toast.service';
import { ToastPosition } from './toast.types';

@Component({
  selector: 'app-toast-host',
  standalone: true,
  imports: [CommonModule, ToastItemComponent],
  templateUrl: './toast-host.component.html',
})
export class ToastHostComponent {
  private readonly toastService = inject(ToastService);

  protected readonly toasts = this.toastService.toasts;
  protected readonly positions: ToastPosition[] = [
    'top-right',
    'top-left',
    'top-center',
    'bottom-right',
    'bottom-left',
    'bottom-center',
  ];

  protected readonly groupedToasts = computed(() => {
    const allToasts = this.toasts();
    return this.positions.map((position) => ({
      position,
      items: allToasts.filter((toast) => toast.position === position),
    }));
  });

  protected getPositionClasses(position: ToastPosition): string {
    const base = 'pointer-events-none fixed z-[120] flex w-full max-w-sm flex-col gap-3 p-4 sm:p-5';

    switch (position) {
      case 'top-left':
        return `${base} top-0 left-0 items-start`;
      case 'top-center':
        return `${base} top-0 left-1/2 -translate-x-1/2 items-center`;
      case 'bottom-right':
        return `${base} right-0 bottom-0 items-end`;
      case 'bottom-left':
        return `${base} bottom-0 left-0 items-start`;
      case 'bottom-center':
        return `${base} bottom-0 left-1/2 -translate-x-1/2 items-center`;
      case 'top-right':
      default:
        return `${base} top-0 right-0 items-end`;
    }
  }
}
