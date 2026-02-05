import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-component-showcase',
  imports: [],
  templateUrl: './component-showcase.component.html',
  styleUrl: './component-showcase.component.scss',
})
export class ComponentShowcaseComponent {
  title = input<string>('Ejemplo');
  description = input<string>('');
  htmlCode = input.required<string>();
  tsCode = input<string>(''); // Ahora es opcional

  activeTab = signal<'html' | 'ts'>('html');
}
