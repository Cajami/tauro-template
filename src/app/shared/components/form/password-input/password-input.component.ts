import {
  Component,
  forwardRef,
  ContentChild,
  ElementRef,
  AfterContentInit,
  input,
  output,
  signal,
  model,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent
  implements ControlValueAccessor, AfterContentInit
{
  readonly EyeIcon = Eye;
  readonly EyeOffIcon = EyeOff;

  // Inputs v19 (Signals)
  label = input<string>('');
  placeholder = input<string>('');
  size = input<'sm' | 'md' | 'lg'>('md');

  // Output v19 (Nueva API de eventos)
  valueChange = output<string>();

  private ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  // Detecta si hay iconos proyectados EN ESTE COMPONENTE
  @ContentChild('leftIcon', { read: ElementRef }) leftIconRef?: ElementRef;

  hasLeftIcon = false;
  hasRightIcon = true; // Siempre tiene el botón de toggle a la derecha

  show = signal<boolean>(false);
  value = model<string>('');
  disabled = model<boolean>(false);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (value: string) => {};
  onTouched = () => {};

  ngAfterContentInit() {
    // Detecta si hay icono izquierdo
    this.hasLeftIcon = !!this.leftIconRef;
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

  handleValueChange(value: string) {
    this.value.set(value);
    this.onChange(value);
  }

  toggle() {
    this.show.update((v) => !v);
    this.onTouched();
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
    const control = this.ngControl?.control;

    if (!control || !control.validator) return false;

    const validator = control.validator({} as any);

    return !!validator?.['required'];
  }

  getInputClasses(): string {
    const baseClasses = `block w-full box-border border rounded-lg transition-colors outline-none
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed placeholder:text-gray-400
    `;

    const stateClasses = this.isInvalid
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
