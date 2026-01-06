import { Routes } from '@angular/router';
import { AdminLayout } from './admin-layout/admin-layout';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminGuard } from '../core/guards/admin.guard';
 
export const adminRoutes: Routes = [
  // {
  //   path: 'admin',
  //   component: AdminLayout,
  //   canActivate: [AdminGuard],   // 🔐 GUARD HERE
  //   children: [
  //     { path: 'dashboard', component: AdminDashboard },
  //     { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  //   ]
  // }

  { path: 'dashboard', component: AdminDashboard },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
 