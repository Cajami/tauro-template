import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'neutral';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() color: ButtonColor = 'primary'; // ← NUEVO
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() circle = false;

  @Output() clicked = new EventEmitter<Event>();

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  getButtonClasses(): string {
    // Solo usar color personalizado en link
    const variantClass =
      this.variant === 'link'
        ? `btn-link-${this.color}`
        : `btn-${this.variant}`;

    return [
      'btn',
      variantClass,
      `btn-${this.size}`,
      this.circle ? 'btn-circle' : '',
      this.fullWidth ? 'btn-block' : '',
      this.disabled || this.loading ? 'btn-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
