import {
  afterNextRender,
  Component,
  ElementRef,
  forwardRef,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // Idioma español
import { InputComponent } from '../form/input/input.component';

@Component({
  selector: 'app-datetime-picker',
  imports: [InputComponent],
  standalone: true,
  templateUrl: './datetime-picker.component.html',
  styleUrl: './datetime-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimePickerComponent),
      multi: true,
    },
  ],
})
export class DatetimePickerComponent implements OnInit, ControlValueAccessor {
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

  constructor() {
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

  ngOnInit(): void {}

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
}
//   // Inputs v19
//   mode = input<'date' | 'time' | 'datetime'>('date');
//   format = input<string>('d/m/Y'); // Formato corto/largo según necesites
//   placeholder = input<string>('Seleccionar...');

//   private inputRef =
//     viewChild.required<ElementRef<HTMLInputElement>>('inputElement');
//   private instance?: flatpickr.Instance;

//   constructor() {
//     // Usamos afterNextRender porque Flatpickr necesita el DOM real (no funciona en SSR directamente)
//     afterNextRender(() => {
//       this.initFlatpickr();
//     });
//   }

//   private initFlatpickr() {
//     this.instance = flatpickr(this.inputRef().nativeElement, {
//       locale: Spanish,
//       dateFormat: this.format(),
//       enableTime: this.mode() === 'datetime' || this.mode() === 'time',
//       noCalendar: this.mode() === 'time',
//       time_24hr: true,
//       allowInput: true, // Permite escribir por teclado
//       onChange: (selectedDates) => {
//         this.onChange(selectedDates[0]);
//       },
//       // Clases personalizadas para el dropdown
//       static: true,
//     });
//   }

//   // Métodos ControlValueAccessor
//   private onChange = (value: any) => {};
//   private onTouched = () => {};

//   writeValue(value: any): void {
//     this.instance?.setDate(value);
//   }
//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }
//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }
// }
