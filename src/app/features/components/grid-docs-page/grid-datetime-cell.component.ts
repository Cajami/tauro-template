import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CellContext } from '@tanstack/angular-table';
import { DatetimePickerComponent } from '@shared/components/datetime-picker/datetime-picker.component';

@Component({
  selector: 'app-grid-datetime-cell',
  standalone: true,
  imports: [FormsModule, DatetimePickerComponent],
  template: `
    <div class="min-w-[170px]">
      <app-datetime-picker
        [ngModel]="value"
        (ngModelChange)="updateValue($event)"
        mode="date"
        size="sm"
        placeholder="Fecha"
      ></app-datetime-picker>
    </div>
  `,
})
export class GridDatetimeCellComponent {
  readonly context = input.required<CellContext<any, Date | null>>();

  get value(): Date | null {
    return this.context().getValue() ?? null;
  }

  updateValue(nextValue: Date | null): void {
    const row = this.context().row.original as { dueDate?: Date | null };
    row.dueDate = nextValue;
  }
}
