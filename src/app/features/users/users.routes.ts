import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import('./user-list/user-list.component').then(
        (m) => m.UserListComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
