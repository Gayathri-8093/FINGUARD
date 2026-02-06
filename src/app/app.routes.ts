import { Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { BankerGuard } from './core/guards/banker.guard';
import { CustomerGuard } from './core/guards/customer.guard';
import { NotFound } from './shared/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login-page/login-page').then(m => m.LoginPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin-layout/admin-layout').then(m => m.AdminLayout),
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)
  },
  {
    path: 'banker',
    loadComponent: () => import('./banker/banker-layout/banker-layout').then(m => m.BankerLayout),
    canActivate: [BankerGuard],
    loadChildren: () => import('./banker/banker.routes').then(m => m.bankerRoutes)
  },

  // 🔧 FIXED PATHS: include subfolder names
  {
    path: 'customer',
    loadComponent: () =>
      import('./customer/customer-layout/customer-layout').then(m => m.CustomerLayout),
    canActivate: [CustomerGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./customer/customer-dashboard/customer-dashboard')
            .then(m => m.CustomerDashboard)
      }
    ]
  },

  {
    path: '**',
    component: NotFound
  }
];