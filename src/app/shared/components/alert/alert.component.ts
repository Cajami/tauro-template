import { Component, Input } from '@angular/core';

type AlertVariant = 'error' | 'success' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() variant: AlertVariant = 'info';
}