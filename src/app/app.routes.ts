import { LoginPage } from './login-page/login-page';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { Routes } from '@angular/router';
import { bankerRoutes } from './banker/banker.routes';
import { adminRoutes } from './admin/admin.routes';
import { AdminGuard } from './core/guards/admin.guard';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { BankerLayout } from './banker/banker-layout/banker-layout';
import { BankerGuard } from './core/guards/banker.guard';
import { NotFound } from './shared/not-found/not-found';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 
  {
    path: 'login',
    component: LoginPage
  },
 

  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [AdminGuard],
    children: adminRoutes
  },
 
  
  {
    path: 'banker',
    component: BankerLayout,
    canActivate: [BankerGuard],
    children: bankerRoutes
  },
 
  {
    path: '**',
    component:NotFound
  }
]
