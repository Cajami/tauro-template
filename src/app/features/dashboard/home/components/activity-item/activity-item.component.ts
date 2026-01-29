import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-item',
  imports: [],
  templateUrl: './activity-item.component.html',
  styleUrl: './activity-item.component.scss',
})
export class ActivityItemComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() time: string = '';
}
