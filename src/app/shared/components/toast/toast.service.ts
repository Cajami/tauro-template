import { Injectable, computed, signal } from '@angular/core';
import { ToastConfig, ToastItem, ToastVariant } from './toast.types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastsState = signal<ToastItem[]>([]);
  private nextId = 1;

  readonly toasts = this.toastsState.asReadonly();
  readonly hasToasts = computed(() => this.toastsState().length > 0);

  show(config: ToastConfig): number {
    const toast: ToastItem = {
      id: this.nextId++,
      title: config.title,
      description: config.description,
      variant: config.variant ?? 'info',
      duration: config.duration ?? 5000,
      position: config.position ?? 'top-right',
      dismissible: config.dismissible ?? true,
      action: config.action,
    };

    this.toastsState.update((current) => [...current, toast]);
    return toast.id;
  }

  success(config: Omit<ToastConfig, 'variant'>): number {
    return this.show({ ...config, variant: 'success' });
  }

  error(config: Omit<ToastConfig, 'variant'>): number {
    return this.show({ ...config, variant: 'error' });
  }

  warning(config: Omit<ToastConfig, 'variant'>): number {
    return this.show({ ...config, variant: 'warning' });
  }

  info(config: Omit<ToastConfig, 'variant'>): number {
    return this.show({ ...config, variant: 'info' });
  }

  question(config: Omit<ToastConfig, 'variant'>): number {
    return this.show({ ...config, variant: 'question' });
  }

  remove(id: number): void {
    this.toastsState.update((current) => current.filter((toast) => toast.id !== id));
  }

  clear(): void {
    this.toastsState.set([]);
  }

  getVariantButtonClass(variant: ToastVariant): string {
    switch (variant) {
      case 'success':
        return 'text-success-700 hover:text-success-800';
      case 'error':
        return 'text-error-700 hover:text-error-800';
      case 'warning':
        return 'text-warning-700 hover:text-warning-800';
      case 'question':
        return 'text-primary-700 hover:text-primary-800';
      case 'info':
      default:
        return 'text-info-700 hover:text-info-800';
    }
  }
}
