import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor, AfterContentInit {
  // Inputs v19 (Signals)
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  autocomplete = input<string>('off');
  size = input<'sm' | 'md' | 'lg'>('md');
  hasError = input<boolean>(false); //PARA COMPONENTES QUE UTILIZAN EL COMPONENTE (COMO DATATIMEPICKER)
  required = input<boolean>(false); //PARA COMPONENTES QUE UTILIZAN EL COMPONENTE (COMO DATATIMEPICKER)

  // Output v19 (Nueva API de eventos)
  valueChange = output<string>();
  blurChange = output<void>();

  private ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  // Detecta si hay iconos proyectados
  @ContentChild('leftIcon', { read: ElementRef }) leftIconRef?: ElementRef;
  @ContentChild('rightIcon', { read: ElementRef }) rightIconRef?: ElementRef;

  hasLeftIcon = false;
  hasRightIcon = false;

  value = model<string>('');
  disabled = model<boolean>(false);

  constructor(
    public elementRef: ElementRef, // Necesario para Datetimepicker (wrapper)
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (value: string) => {};
  onTouched = () => {
    this.blurChange.emit();
  };

  ngAfterContentInit() {
    this.hasLeftIcon = !!this.leftIconRef;
    this.hasRightIcon = !!this.rightIconRef;
  }

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
    const value = (event.target as HTMLInputElement).value;
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
    if (this.required()) return true;

    const control = this.ngControl?.control;

    if (!control || !control.validator) return false;

    const v = control.validator({} as any);

    return !!v?.['required'];
  }

  getInputClasses(): string {
    const baseClasses = `block w-full box-border border rounded-lg transition-colors outline-none
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed placeholder:text-gray-400
    `;

    const stateClasses =
      this.isInvalid || this.hasError()
        ? 'border-red-500'
        : 'border-gray-300 focus:border-primary-500';

    // Clases de tamaño
    const sizeClasses = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-3 text-base',
      lg: 'h-13 px-4 text-lg',
    };

    // Padding según iconos y tamaño
    let paddingClasses = '';
    if (this.hasLeftIcon && this.hasRightIcon) {
      paddingClasses =
        this.size() === 'sm'
          ? 'pl-9 pr-9'
          : this.size() === 'lg'
            ? 'pl-12 pr-12'
            : 'pl-10 pr-10';
    } else if (this.hasLeftIcon) {
      paddingClasses =
        this.size() === 'sm'
          ? 'pl-9 pr-3'
          : this.size() === 'lg'
            ? 'pl-12 pr-3'
            : 'pl-10 pr-3';
    } else if (this.hasRightIcon) {
      paddingClasses =
        this.size() === 'sm'
          ? 'pl-3 pr-9'
          : this.size() === 'lg'
            ? 'pl-3 pr-12'
            : 'pl-3 pr-10';
    } else {
      paddingClasses = 'px-3';
    }

    return `${baseClasses} ${stateClasses} ${sizeClasses[this.size()]} ${paddingClasses}`;
  }
}
