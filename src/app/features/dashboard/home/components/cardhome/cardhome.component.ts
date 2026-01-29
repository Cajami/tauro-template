import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cardhome',
  imports: [],
  templateUrl: './cardhome.component.html',
  styleUrl: './cardhome.component.scss',
})
export class CardhomeComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() isPositive: boolean = true;
  @Input() change: string = '';
  @Input() icon: string = '';
}
