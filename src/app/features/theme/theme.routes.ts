import { Routes } from '@angular/router';

export const THEME_ROUTES: Routes = [
  {
    path: 'layout',
    loadComponent: () =>
      import('./theme-layout-page/theme-layout-page.component').then(
        (m) => m.ThemeLayoutPageComponent,
      ),
  },
  {
    path: 'color',
    loadComponent: () =>
      import('./theme-color-page/theme-color-page.component').then(
        (m) => m.ThemeColorPageComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full',
  },
];
