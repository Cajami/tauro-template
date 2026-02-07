import { Component, inject, input, output, model } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  templateUrl: './textarea.component.html',
})
export class TextareaComponent implements ControlValueAccessor {
  // Inputs v19 (Signals)
  label = input<string>('');
  placeholder = input<string>('');
  rows = input<number>(4);
  resize = input<'none' | 'vertical' | 'horizontal' | 'both'>('vertical');
  maxLength = input<number | null>(null);
  showCharCount = input<boolean>(false); //MOSTRAR CANTIDAD DE CARACTERES

  // Output v19 (Nueva API de eventos)
  valueChange = output<string>();

  private ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  value = model<string>('');
  disabled = model<boolean>(false);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  handleInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.value.set(value);
    this.onChange(value);
    this.valueChange.emit(value);
  }

  get isInvalid(): boolean {
    const control = this.ngControl?.control;

    if (!control || !control.validator) return false;

    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  get isRequired(): boolean {
    const control = this.ngControl?.control;

    if (!control || !control.validator) return false;

    const validator = control.validator({} as any);

    return !!validator?.['required'];
  }

  getTextareaClasses(): string {
    const baseClasses = `
    block w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-colors resize-none
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed placeholder:text-gray-400
    `;

    const stateClasses = this.isInvalid
      ? 'border-red-500'
      : 'border-gray-300 focus:border-primary-500';

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    return `${baseClasses} ${stateClasses} ${resizeClasses[this.resize()]}`;
  }

  get remainingChars(): number {
    return this.maxLength() ? this.maxLength()! - this.value.length : 0;
  }
}
