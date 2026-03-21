import { CommonModule } from '@angular/common';
import { Component, Input, computed, inject, signal } from '@angular/core';
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Info,
  LucideAngularModule,
  TriangleAlert,
  X,
} from 'lucide-angular';
import { ToastService } from './toast.service';
import { ToastItem } from './toast.types';

@Component({
  selector: 'app-toast-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast-item.component.html',
})
export class ToastItemComponent {
  @Input({ required: true })
  set toast(value: ToastItem) {
    this._toast = value;
    this.remainingMs.set(value.duration);
    this.lastTimestamp = 0;
    this.removed = false;
    this.paused = false;
    this.stopLoop();
    this.startLoop();
  }

  get toast(): ToastItem {
    return this._toast;
  }

  private _toast!: ToastItem;
  private readonly toastService = inject(ToastService);

  private frameId: number | null = null;
  private lastTimestamp = 0;
  private paused = false;
  private removed = false;

  protected readonly remainingMs = signal(0);
  protected readonly progress = computed(() => {
    const duration = this.toast?.duration || 1;
    return Math.max(0, (this.remainingMs() / duration) * 100);
  });

  protected readonly CheckCircle2Icon = CheckCircle2;
  protected readonly AlertCircleIcon = AlertCircle;
  protected readonly TriangleAlertIcon = TriangleAlert;
  protected readonly InfoIcon = Info;
  protected readonly HelpCircleIcon = HelpCircle;
  protected readonly CloseIcon = X;

  protected readonly icon = computed(() => {
    switch (this.toast?.variant) {
      case 'success':
        return this.CheckCircle2Icon;
      case 'error':
        return this.AlertCircleIcon;
      case 'warning':
        return this.TriangleAlertIcon;
      case 'question':
        return this.HelpCircleIcon;
      case 'info':
      default:
        return this.InfoIcon;
    }
  });

  protected readonly iconClasses = computed(() => {
    switch (this.toast?.variant) {
      case 'success':
        return 'text-success-700';
      case 'error':
        return 'text-error-700';
      case 'warning':
        return 'text-warning-700';
      case 'question':
        return 'text-primary-700';
      case 'info':
      default:
        return 'text-info-700';
    }
  });

  protected readonly progressClasses = computed(() => {
    switch (this.toast?.variant) {
      case 'success':
        return 'bg-success-600';
      case 'error':
        return 'bg-error-600';
      case 'warning':
        return 'bg-warning-600';
      case 'question':
        return 'bg-primary-600';
      case 'info':
      default:
        return 'bg-info-600';
    }
  });

  protected readonly actionClasses = computed(() => {
    return this.toastService.getVariantButtonClass(this.toast?.variant ?? 'info');
  });

  protected onMouseEnter(): void {
    this.paused = true;
  }

  protected onMouseLeave(): void {
    this.paused = false;
    this.lastTimestamp = 0;
    this.startLoop();
  }

  protected close(): void {
    if (this.removed) {
      return;
    }

    this.removed = true;
    this.stopLoop();
    this.toastService.remove(this.toast.id);
  }

  protected async handleAction(): Promise<void> {
    await this.toast.action?.onClick?.();

    if (this.toast.action?.closeOnClick ?? true) {
      this.close();
    }
  }

  private startLoop(): void {
    if (this.frameId !== null || this.paused || this.removed || !this._toast) {
      return;
    }

    const tick = (timestamp: number) => {
      if (this.paused || this.removed) {
        this.frameId = null;
        return;
      }

      if (!this.lastTimestamp) {
        this.lastTimestamp = timestamp;
      }

      const delta = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;

      const nextRemaining = Math.max(0, this.remainingMs() - delta);
      this.remainingMs.set(nextRemaining);

      if (nextRemaining <= 0) {
        this.close();
        return;
      }

      this.frameId = requestAnimationFrame(tick);
    };

    this.frameId = requestAnimationFrame(tick);
  }

  private stopLoop(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }
}
