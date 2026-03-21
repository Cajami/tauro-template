import { Routes } from '@angular/router';

export const COMPONENTS_ROUTES: Routes = [
  {
    path: 'select',
    loadComponent: () =>
      import('./select-docs-page/select-docs-page.component').then(
        (m) => m.SelectDocsPageComponent,
      ),
  },
  {
    path: 'input',
    loadComponent: () =>
      import('./input-docs-page/input-docs-page.component').then(
        (m) => m.InputDocsPageComponent,
      ),
  },
  {
    path: 'alert',
    loadComponent: () =>
      import('./alert-docs-page/alert-docs-page.component').then(
        (m) => m.AlertDocsPageComponent,
      ),
  },
  {
    path: 'dialog',
    loadComponent: () =>
      import('./dialog-docs-page/dialog-docs-page.component').then(
        (m) => m.DialogDocsPageComponent,
      ),
  },
  {
    path: 'toast',
    loadComponent: () =>
      import('./toast-docs-page/toast-docs-page.component').then(
        (m) => m.ToastDocsPageComponent,
      ),
  },
  {
    path: 'checkbox',
    loadComponent: () =>
      import('./checkbox-docs-page/checkbox-docs-page.component').then(
        (m) => m.CheckboxDocsPageComponent,
      ),
  },
  {
    path: 'radio',
    loadComponent: () =>
      import('./radio-docs-page/radio-docs-page.component').then(
        (m) => m.RadioDocsPageComponent,
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
    path: 'modal',
    loadComponent: () =>
      import('./modal-docs-page/modal-docs-page.component').then(
        (m) => m.ModalDocsPageComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'input',
    pathMatch: 'full',
  },
];
