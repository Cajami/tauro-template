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
    path: 'forms',
    loadComponent: () =>
      import('./theme-forms-page/theme-forms-page.component').then(
        (m) => m.ThemeFormsPageComponent,
      ),
  },
  {
    path: 'icons',
    loadComponent: () =>
      import('./theme-icons-page/theme-icons-page.component').then(
        (m) => m.ThemeIconsPageComponent,
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
