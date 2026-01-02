import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { BankerDashboard } from './banker-dashboard/banker-dashboard';


export const routes: Routes = [
    {path:'',redirectTo:'LoginPage',pathMatch:'full'},
    {path:'', component:LoginPage},
    {path:'admin-dashboard',component:AdminDashboard},
    {path:'banker-dashboard',component:BankerDashboard},

];
