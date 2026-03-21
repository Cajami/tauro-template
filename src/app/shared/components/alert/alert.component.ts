import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { LucideAngularModule, AlertCircle, CheckCircle2, HelpCircle, Info, TriangleAlert, X } from 'lucide-angular';

export type AlertVariant = 'error' | 'success' | 'warning' | 'info' | 'question';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() variant: AlertVariant = 'info';
  @Input() title = '';
  @Input() description = '';
  @Input() dismissible = false;
  @Input() bordered = true;

  protected readonly visible = signal(true);
  protected readonly CheckCircle2Icon = CheckCircle2;
  protected readonly AlertCircleIcon = AlertCircle;
  protected readonly TriangleAlertIcon = TriangleAlert;
  protected readonly InfoIcon = Info;
  protected readonly HelpCircleIcon = HelpCircle;
  protected readonly CloseIcon = X;

  protected readonly alertClasses = computed(() => {
    return [
      'alert',
      `alert-${this.variant}`,
      this.bordered ? 'alert-bordered' : 'alert-soft',
    ].join(' ');
  });

  protected readonly icon = computed(() => {
    switch (this.variant) {
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

  protected readonly hasStructuredContent = computed(() => {
    return Boolean(this.title || this.description);
  });

  close(): void {
    this.visible.set(false);
  }
}
