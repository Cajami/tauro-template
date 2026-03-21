import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Info,
  LucideAngularModule,
  TriangleAlert,
} from 'lucide-angular';
import { MODAL_DATA } from '@shared/components/modal/modal.tokens';
import { DialogMessageData } from './dialog.types';

@Component({
  selector: 'app-dialog-message-content',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex items-start gap-4">
      <div class="mt-0.5 flex shrink-0 items-center justify-center" [class]="iconClasses()">
        <lucide-icon [img]="icon()" [size]="24"></lucide-icon>
      </div>

      <div class="min-w-0 space-y-2">
        <p class="text-base font-semibold leading-6 text-gray-900">
          {{ data?.message }}
        </p>

        @if (data?.description) {
          <p class="text-sm leading-6 text-gray-600">
            {{ data?.description }}
          </p>
        }
      </div>
    </div>
  `,
})
export class DialogMessageContentComponent {
  protected readonly data = inject<DialogMessageData | undefined>(MODAL_DATA, {
    optional: true,
  });

  private readonly CheckCircle2Icon = CheckCircle2;
  private readonly AlertCircleIcon = AlertCircle;
  private readonly TriangleAlertIcon = TriangleAlert;
  private readonly InfoIcon = Info;
  private readonly HelpCircleIcon = HelpCircle;

  protected readonly icon = computed(() => {
    switch (this.data?.variant) {
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
    switch (this.data?.variant) {
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
}
