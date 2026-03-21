import {
  Component,
  DestroyRef,
  HostListener,
  Injector,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule, DOCUMENT, NgComponentOutlet } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button.component';
import { MODAL_DATA, MODAL_REF } from './modal.tokens';
import { ModalService } from './modal.service';
import {
  ActiveModalState,
  ModalAction,
  ModalActionContext,
  ModalSize,
} from './modal.types';

@Component({
  selector: 'app-modal-host',
  standalone: true,
  imports: [CommonModule, ButtonComponent, NgComponentOutlet],
  templateUrl: './modal-host.component.html',
})
export class ModalHostComponent {
  private readonly modalService = inject(ModalService);
  private readonly parentInjector = inject(Injector);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly componentOutlet = viewChild(NgComponentOutlet);

  private bodyOverflowBeforeOpen = '';
  private dragOffsetX = 0;
  private dragOffsetY = 0;
  private animationTimeoutId: ReturnType<typeof setTimeout> | null = null;

  protected readonly activeModal = this.modalService.activeModal;
  protected readonly renderedModal = signal<ActiveModalState<any, any, any> | null>(null);
  protected readonly isVisible = signal(false);
  protected readonly translateX = signal(0);
  protected readonly translateY = signal(0);
  protected readonly isDragging = signal(false);
  protected readonly contentInjector = computed(() => {
    const modal = this.renderedModal();

    if (!modal) {
      return this.parentInjector;
    }

    return Injector.create({
      parent: this.parentInjector,
      providers: [
        {
          provide: MODAL_REF,
          useValue: modal.ref,
        },
        {
          provide: MODAL_DATA,
          useValue: modal.config.data,
        },
      ],
    });
  });

  constructor() {
    effect(() => {
      const modal = this.activeModal();

      if (modal) {
        this.clearAnimationTimeout();
        this.renderedModal.set(modal);
        this.translateX.set(0);
        this.translateY.set(0);

        if (!this.bodyOverflowBeforeOpen) {
          this.bodyOverflowBeforeOpen = this.document.body.style.overflow;
        }

        this.document.body.style.overflow = 'hidden';

        setTimeout(() => {
          this.isVisible.set(true);
        });
        return;
      }

      this.isVisible.set(false);
      this.document.body.style.overflow = this.bodyOverflowBeforeOpen;
      this.bodyOverflowBeforeOpen = '';

      this.clearAnimationTimeout();
      this.animationTimeoutId = setTimeout(() => {
        this.renderedModal.set(null);
        this.isDragging.set(false);
      }, 280);
    });

    this.destroyRef.onDestroy(() => {
      this.clearAnimationTimeout();
      this.document.body.style.overflow = this.bodyOverflowBeforeOpen;
    });
  }

  @HostListener('window:keydown', ['$event'])
  protected onWindowKeydown(event: KeyboardEvent): void {
    const activeModal = this.activeModal();

    if (event.key !== 'Escape' || !activeModal?.config.closeOnEscape) {
      return;
    }

    event.preventDefault();
    activeModal.ref.close();
  }

  @HostListener('window:pointermove', ['$event'])
  protected onWindowPointerMove(event: PointerEvent): void {
    if (!this.isDragging()) {
      return;
    }

    this.translateX.set(event.clientX - this.dragOffsetX);
    this.translateY.set(event.clientY - this.dragOffsetY);
  }

  @HostListener('window:pointerup')
  @HostListener('window:pointercancel')
  protected onWindowPointerUp(): void {
    this.isDragging.set(false);
  }

  protected onBackdropClick(): void {
    const activeModal = this.activeModal();

    if (activeModal?.config.closeOnBackdrop) {
      activeModal.ref.close();
    }
  }

  protected onHeaderPointerDown(event: PointerEvent): void {
    const activeModal = this.activeModal();

    if (!activeModal?.config.draggable) {
      return;
    }

    this.isDragging.set(true);
    this.dragOffsetX = event.clientX - this.translateX();
    this.dragOffsetY = event.clientY - this.translateY();
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  }

  protected closeFromChrome(): void {
    this.activeModal()?.ref.close();
  }

  protected getDialogClasses(size: ModalSize): string {
    const widthClasses: Record<ModalSize, string> = {
      sm: 'max-w-lg',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-5xl',
      full: 'max-w-[min(96vw,1280px)] h-[90vh]',
    };

    return [
      'relative z-[101] flex w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl transition-[opacity,transform,box-shadow] duration-280 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform',
      widthClasses[size],
    ].join(' ');
  }

  protected getDialogTransform(): string {
    const entranceY = this.isVisible() ? 0 : 28;
    const scale = this.isVisible() ? 1 : 0.93;
    return `translate(${this.translateX()}px, calc(${this.translateY()}px + ${entranceY}px)) scale(${scale})`;
  }

  protected trackAction(index: number, action: ModalAction): string {
    return action.id ?? `${action.label}-${index}`;
  }

  protected hasFooter(activeModal: ActiveModalState | null): boolean {
    return (activeModal?.config.actions.length ?? 0) > 0;
  }

  protected isActionDisabled(action: ModalAction): boolean {
    const disabled = action.disabled;

    if (typeof disabled === 'function') {
      return disabled(this.buildActionContext());
    }

    return disabled ?? false;
  }

  protected async onActionClick(action: ModalAction): Promise<void> {
    const activeModal = this.activeModal();

    if (!activeModal) {
      return;
    }

    const context = this.buildActionContext();

    await action.onClick?.(context);

    if (!action.closeOnClick) {
      return;
    }

    const result =
      typeof action.result === 'function' ? action.result(context) : action.result;

    activeModal.ref.close(result);
  }

  private buildActionContext(): ModalActionContext {
    const activeModal = this.activeModal();

    if (!activeModal) {
      throw new Error('No existe un modal activo para ejecutar esta accion.');
    }

    return {
      modalRef: activeModal.ref,
      componentInstance: this.componentOutlet()?.componentInstance ?? null,
      data: activeModal.config.data,
    };
  }

  private clearAnimationTimeout(): void {
    if (this.animationTimeoutId) {
      clearTimeout(this.animationTimeoutId);
      this.animationTimeoutId = null;
    }
  }
}


