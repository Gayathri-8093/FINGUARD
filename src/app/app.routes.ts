import { LoginPage } from './login-page/login-page';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { Routes } from '@angular/router';
import { bankerRoutes } from './banker/banker.routes';

export const routes: Routes = [
  {path:'',redirectTo:'LoginPage',pathMatch:'full'},
  {path:'', component:LoginPage},
  {path:'admin-dashboard',component:AdminDashboard},
  ...bankerRoutes
]
