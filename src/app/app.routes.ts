import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { BankerLayout } from './banker/banker-layout/banker-layout';
import { adminRoutes } from './admin/admin.routes';
import { AdminGuard } from './core/guards/admin.guard';
import { bankerRoutes } from './banker/banker.routes';
import { BankerGuard } from './core/guards/banker.guard';

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
 
  // 🔐 ADMIN SECTION
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [AdminGuard],
    children: adminRoutes
  },
 
  // 🔐 BANKER SECTION
  {
    path: 'banker',
    component: BankerLayout,
    canActivate: [BankerGuard],
    children: bankerRoutes
  },
 
  {
    path: '**',
    redirectTo: 'login'
  }
]
