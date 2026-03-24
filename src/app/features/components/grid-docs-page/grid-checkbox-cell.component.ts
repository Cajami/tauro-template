import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CellContext } from '@tanstack/angular-table';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';

@Component({
  selector: 'app-grid-checkbox-cell',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  template: `
    <div class="flex justify-center">
      <app-checkbox
        [ngModel]="checked"
        (ngModelChange)="updateChecked($event)"
      ></app-checkbox>
    </div>
  `,
})
export class GridCheckboxCellComponent {
  readonly context = input.required<CellContext<any, boolean>>();

  get checked(): boolean {
    return !!this.context().getValue();
  }

  updateChecked(nextValue: boolean): void {
    const row = this.context().row.original as { done?: boolean };
    row.done = nextValue;
  }
}
