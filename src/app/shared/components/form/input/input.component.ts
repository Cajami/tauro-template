import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, AfterContentInit {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() autocomplete = 'off';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Output() valueChange = new EventEmitter<string>();

  // Detecta si hay iconos proyectados
  @ContentChild('leftIcon', { read: ElementRef }) leftIconRef?: ElementRef;
  @ContentChild('rightIcon', { read: ElementRef }) rightIconRef?: ElementRef;

  hasLeftIcon = false;
  hasRightIcon = false;

  @Input() value = '';
  @Input() disabled = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  ngAfterContentInit() {
    this.hasLeftIcon = !!this.leftIconRef;
    this.hasRightIcon = !!this.rightIconRef;
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  // getInputClasses(): string {
  //   const baseClasses =
  //     'block w-full py-3 border border-gray-300 rounded-lg outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed placeholder:text-gray-400';

  //   let paddingClasses = 'px-3';
  //   if (this.hasLeftIcon && this.hasRightIcon) {
  //     paddingClasses = 'pl-10 pr-10';
  //   } else if (this.hasLeftIcon) {
  //     paddingClasses = 'pl-10 pr-3';
  //   } else if (this.hasRightIcon) {
  //     paddingClasses = 'pl-3 pr-10';
  //   }

  //   return `${baseClasses} ${paddingClasses}`;
  // }

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
        this.size === 'sm'
          ? 'pl-9 pr-9'
          : this.size === 'lg'
            ? 'pl-12 pr-12'
            : 'pl-10 pr-10';
    } else if (this.hasLeftIcon) {
      paddingClasses =
        this.size === 'sm'
          ? 'pl-9 pr-3'
          : this.size === 'lg'
            ? 'pl-12 pr-3'
            : 'pl-10 pr-3';
    } else if (this.hasRightIcon) {
      paddingClasses =
        this.size === 'sm'
          ? 'pl-3 pr-9'
          : this.size === 'lg'
            ? 'pl-3 pr-12'
            : 'pl-3 pr-10';
    } else {
      paddingClasses = 'px-3';
    }

    return `${baseClasses} ${sizeClasses[this.size]} ${paddingClasses}`;
  }
}
