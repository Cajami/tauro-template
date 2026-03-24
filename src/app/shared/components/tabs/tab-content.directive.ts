import { Directive, TemplateRef, input } from '@angular/core';

@Directive({
  selector: 'ng-template[tabContent]',
  standalone: true,
})
export class TabContentDirective {
  tabContent = input.required<string>();

  constructor(public readonly template: TemplateRef<unknown>) {}
}
