import {
  afterNextRender,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // Idioma español
import { InputComponent } from '../form/input/input.component';

@Component({
  selector: 'app-datetime-picker',
  imports: [InputComponent],
  standalone: true,
  templateUrl: './datetime-picker.component.html',
  styleUrl: './datetime-picker.component.scss',
})
export class DatetimePickerComponent
  implements ControlValueAccessor, OnDestroy
{
  /*
  PLUGIN = https://flatpickr.js.org/
  */

  // Inputs v19 (Signals)
  label = input<string>('');
  placeholder = input<string>('Seleccionar...');
  size = input<'sm' | 'md' | 'lg'>('md');
  mode = input<'date' | 'time' | 'datetime'>('date');
  formatType = input<'short' | 'long'>('short');

  disabled = signal(false);

  // Accedemos al elemento nativo dentro de tu app-input
  private wrapper = viewChild.required<any>('inputWrapper');
  private instance?: flatpickr.Instance;

  private ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  private touchedSignal = signal(0);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    afterNextRender(() => {
      // Buscamos el input nativo que está dentro de tu app-input
      const nativeInput = (
        this.wrapper() as any
      ).elementRef.nativeElement.querySelector('input');

      this.instance = flatpickr(nativeInput, {
        locale: Spanish,
        dateFormat: this.resolveFormat(),
        enableTime: this.mode() !== 'date',
        noCalendar: this.mode() === 'time',
        time_24hr: true,

        onDayCreate: (dObj, dStr, fp, dayElem) => {
          // 0 es Domingo, 6 es Sábado
          const date = dayElem.dateObj;
          if (date.getDay() === 0 || date.getDay() === 6) {
            dayElem.classList.add('is-weekend');
          }
        },
        onChange: (selectedDates, dateStr) => {
          // dateStr es el valor formateado según el dateFormat (ej: "21:00" o "05/02/2026")
          if (this.mode() === 'time') {
            // Si solo es hora, enviamos el string "21:00" al formulario
            this.onChange(dateStr);
          } else {
            // Si es fecha, decidimos si enviar el objeto Date o el string formateado
            this.onChange(selectedDates[0]);
          }
        },
      });
    });
  }

  // Lógica para el formato que pediste (D/M/Y o Y/M/D)
  private resolveFormat(): string {
    if (this.mode() === 'time') return 'H:i';

    // Aquí puedes ajustar según tu preferencia de "short" o "long"
    const datePart =
      this.formatType() === 'short' ? 'd/m/Y' : 'l, j \\de F \\de Y';
    return this.mode() === 'datetime' ? `${datePart} H:i` : datePart;
  }

  // ControlValueAccessor
  onChange = (value: any) => {};
  onTouched = () => {};

  onBlurChange = () => {
    this.touchedSignal.update((v) => v + 1);
    this.ngControl?.control?.markAsTouched();
  };

  onValueChange = () => {
    this.touchedSignal.update((v) => v + 1);
    this.ngControl?.control?.markAsDirty();
  };

  writeValue(value: any): void {
    if (this.instance) this.instance.setDate(value);
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

  isInvalid = computed(() => {
    this.touchedSignal();

    const c = this.ngControl?.control;
    return !!(c && c.invalid && (c.touched || c.dirty));
  });

  isRequired = computed(() => {
    const c = this.ngControl?.control;

    if (!c || !c.validator) return false;

    const v = c.validator({} as any);

    return !!v?.['required'];
  });

  ngOnDestroy(): void {
    if (this.instance) {
      this.instance.destroy();
      this.instance = undefined;
    }
  }
}
