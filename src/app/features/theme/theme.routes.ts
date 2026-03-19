import { Routes } from '@angular/router';

export const THEME_ROUTES: Routes = [
  {
    path: 'color',
    loadComponent: () =>
      import('./theme-color-page/theme-color-page.component').then(
        (m) => m.ThemeColorPageComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'color',
    pathMatch: 'full',
  },
];