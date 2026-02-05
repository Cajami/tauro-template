import {
  Component,
  forwardRef,
  ContentChild,
  ElementRef,
  AfterContentInit,
  EventEmitter,
  input,
  output,
  signal,
  model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './password-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
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

  // Detecta si hay iconos proyectados EN ESTE COMPONENTE
  @ContentChild('leftIcon', { read: ElementRef }) leftIconRef?: ElementRef;

  hasLeftIcon = false;
  hasRightIcon = true; // Siempre tiene el botón de toggle a la derecha

  show = signal<boolean>(false);
  value = model<string>('');
  disabled = model<boolean>(false);

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

  getInputClasses(): string {
    const baseClasses =
      'block w-full border border-gray-300 rounded-lg outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed placeholder:text-gray-400';

    // Clases de tamaño
    const sizeClasses = {
      sm: 'py-1.5 text-sm',
      md: 'py-2.5 text-base',
      lg: 'py-3 text-lg',
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

    return `${baseClasses} ${sizeClasses[this.size()]} ${paddingClasses}`;
  }
}
