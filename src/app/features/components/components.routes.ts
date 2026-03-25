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
    path: 'textarea',
    loadComponent: () =>
      import('./textarea-docs-page/textarea-docs-page.component').then(
        (m) => m.TextareaDocsPageComponent,
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
    path: 'switch',
    loadComponent: () =>
      import('./switch-docs-page/switch-docs-page.component').then(
        (m) => m.SwitchDocsPageComponent,
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
    path: 'tabs',
    loadComponent: () =>
      import('./tabs-docs-page/tabs-docs-page.component').then(
        (m) => m.TabsDocsPageComponent,
      ),
  },
  {
    path: 'grid',
    loadComponent: () =>
      import('./grid-docs-page/grid-docs-page.component').then(
        (m) => m.GridDocsPageComponent,
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
    path: 'loading',
    loadComponent: () =>
      import('./loading-docs-page/loading-docs-page.component').then(
        (m) => m.LoadingDocsPageComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'input',
    pathMatch: 'full',
  },
];
