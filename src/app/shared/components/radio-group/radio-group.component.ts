import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RadioOption<T = string> {
  label: string;
  value: T;
  description?: string;
  disabled?: boolean;
}

let nextRadioGroupId = 0;

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})
export class RadioGroupComponent<T = string> implements ControlValueAccessor {
  @Input() label = '';
  @Input() hint = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() name = `radio-group-${++nextRadioGroupId}`;
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() variant: 'default' | 'card' = 'default';
  @Input() options: RadioOption<T>[] = [];
  @Output() valueChange = new EventEmitter<T | null>();

  value: T | null = null;

  onChange = (_value: T | null) => {};
  onTouched = () => {};

  writeValue(value: T | null): void {
    this.value = value ?? null;
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectOption(option: RadioOption<T>): void {
    if (this.disabled || option.disabled) {
      return;
    }

    this.value = option.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.onTouched();
  }

  isChecked(option: RadioOption<T>): boolean {
    return this.value === option.value;
  }

  getContainerClasses(): string {
    return this.layout === 'horizontal'
      ? 'flex flex-wrap gap-3'
      : 'space-y-3';
  }

  getOptionClasses(option: RadioOption<T>): string {
    const isSelected = this.isChecked(option);

    if (this.variant === 'card') {
      return [
        'flex items-start gap-3 rounded-xl border bg-white px-4 py-3 transition-colors',
        !this.disabled && !option.disabled ? 'cursor-pointer' : '',
        this.disabled || option.disabled ? 'opacity-60' : '',
        isSelected
          ? 'border-primary-500 bg-primary-50 shadow-sm'
          : 'border-gray-200',
      ]
        .filter(Boolean)
        .join(' ');
    }

    return [
      'flex items-start gap-3 rounded-lg px-1 py-1 transition-colors',
      !this.disabled && !option.disabled ? 'cursor-pointer' : '',
      this.disabled || option.disabled ? 'opacity-60' : '',
      isSelected ? 'text-primary-700' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
