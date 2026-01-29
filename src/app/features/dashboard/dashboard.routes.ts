import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  // {
  //   path: 'users',
  //   children: [
  //     {
  //       path: 'list',
  //       loadComponent: () => import('./users/user-list/user-list.component').then(m => m.UserListComponent)
  //     },
  //     // {
  //     //   path: 'create',
  //     //   loadComponent: () => import('./users/user-create/user-create.component').then(m => m.UserCreateComponent)
  //     // }
  //   ]
  // },
  // {
  //   path: 'reports',
  //   children: [
  //     {
  //       path: 'sales',
  //       loadComponent: () => import('./reports/sales/sales.component').then(m => m.SalesComponent)
  //     },
  //     {
  //       path: 'analytics',
  //       loadComponent: () => import('./reports/analytics/analytics.component').then(m => m.AnalyticsComponent)
  //     }
  //   ]
  // },
  // {
  //   path: 'settings',
  //   loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];