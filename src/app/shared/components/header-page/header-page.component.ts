import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-page',
  imports: [],
  templateUrl: './header-page.component.html',
  styleUrl: './header-page.component.scss',
})
export class HeaderPageComponent {
  @Input({ required: true }) title: string = '';
  @Input() subTitle: string = '';
}
