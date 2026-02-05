import { Routes } from '@angular/router';

export const COMPONENTS_ROUTES: Routes = [
  {
    path: 'input',
    loadComponent: () =>
      import('./input-docs-page/input-docs-page.component').then(
        (m) => m.InputDocsPageComponent,
      ),
  },
  {
    path: 'datetimepicker',
    loadComponent: () =>
      import('./datetimepicker-docs-page/datetimepicker-docs-page.component').then(
        (m) => m.DatetimepickerDocsPageComponent,
      ),
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./button-docs-page/button-docs-page.component').then(
        (m) => m.ButtonDocsPageComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
