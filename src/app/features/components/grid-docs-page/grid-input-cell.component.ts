import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CellContext } from '@tanstack/angular-table';
import { InputComponent } from '@shared/components/form/input/input.component';

@Component({
  selector: 'app-grid-input-cell',
  standalone: true,
  imports: [FormsModule, InputComponent],
  template: `
    <div class="min-w-[180px]">
      <app-input
        [ngModel]="value"
        (ngModelChange)="updateValue($event)"
        placeholder="Agregar nota"
        size="sm"
      ></app-input>
    </div>
  `,
})
export class GridInputCellComponent {
  readonly context = input.required<CellContext<any, string>>();

  get value(): string {
    return this.context().getValue() ?? '';
  }

  updateValue(nextValue: string): void {
    const row = this.context().row.original as { note?: string };
    row.note = nextValue;
  }
}
