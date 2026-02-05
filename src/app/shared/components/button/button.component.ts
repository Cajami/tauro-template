import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  // Inputs v19 (Signals)
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<'primary' | 'secondary' | 'success' | 'error' | 'link'>(
    'primary',
  );
  size = input<'sm' | 'md' | 'lg'>('md');
  color = input<'primary' | 'secondary' | 'success' | 'error' | 'neutral'>(
    'primary',
  );
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);
  circle = input<boolean>(false);

  // Output v19 (Nueva API de eventos)
  clicked = output<Event>();

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  getButtonClasses(): string {
    // Solo usar color personalizado en link
    const variantClass =
      this.variant() === 'link'
        ? `btn-link-${this.color()}`
        : `btn-${this.variant()}`;

    return [
      'btn',
      variantClass,
      `btn-${this.size()}`,
      this.circle() ? 'btn-circle' : '',
      this.fullWidth() ? 'btn-block' : '',
      this.disabled() || this.loading() ? 'btn-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
