import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Role } from './user.model';
import { UserStore } from './user.store';

export function hasAnyRole(role: Role | Role[]): boolean {
  const store = inject(UserStore);
  return store.hasUserRole(role);
}

export function isAdmin(): boolean {
  const store = inject(UserStore);
  return store.isUserAdmin();
}

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [() => isAdmin()],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => hasAnyRole('MANAGER')],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/no-access.component').then(
        (m) => m.NoAccessDashboardComponent,
      ),
  },
];
