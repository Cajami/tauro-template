import { Injectable, Type, signal } from '@angular/core';
import { ModalRef } from './modal-ref';
import {
  ActiveModalState,
  ModalConfig,
  ResolvedModalConfig,
} from './modal.types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly activeModalState = signal<ActiveModalState<any, any, any> | null>(
    null,
  );
  private nextId = 1;

  readonly activeModal = this.activeModalState.asReadonly();

  open<TComponent, TData = unknown, TResult = unknown>(
    component: Type<TComponent>,
    config: ModalConfig<TComponent, TData, TResult> = {},
  ): ModalRef<TComponent, TResult> {
    this.activeModalState()?.ref.close();

    const ref = new ModalRef<TComponent, TResult>();
    const modalConfig = this.resolveConfig(config);

    ref._setCloseHandler(() => {
      const activeModal = this.activeModalState();

      if (activeModal?.ref === ref) {
        this.activeModalState.set(null);
      }
    });

    this.activeModalState.set({
      id: this.nextId++,
      component,
      config: modalConfig,
      ref,
    });

    return ref;
  }

  close<TResult = unknown>(result?: TResult): void {
    this.activeModalState()?.ref.close(result);
  }

  private resolveConfig<TComponent, TData, TResult>(
    config: ModalConfig<TComponent, TData, TResult>,
  ): ResolvedModalConfig<TComponent, TData, TResult> {
    return {
      title: config.title ?? 'Modal',
      subtitle: config.subtitle,
      size: config.size ?? 'md',
      draggable: config.draggable ?? true,
      showCloseButton: config.showCloseButton ?? false,
      closeOnBackdrop: config.closeOnBackdrop ?? false,
      closeOnEscape: config.closeOnEscape ?? false,
      data: config.data,
      inputs: config.inputs ?? {},
      actions: config.actions ?? [],
    };
  }
}

