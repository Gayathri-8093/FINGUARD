import { Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { BankerGuard } from './core/guards/banker.guard';
import { NotFound } from './shared/not-found/not-found';
import { Signup } from './signup/signup';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 
  {
    path: 'login',
    loadComponent:()=> import('./login-page/login-page') .then(m=>m.LoginPage)
  },
  {
    path:'signup',
    loadComponent:()=> import('./signup/signup').then(m => m.Signup)
      
  },


 

  {
    path: 'admin',
    loadComponent:()=> import('./admin/admin-layout/admin-layout') .then(m=>m.AdminLayout),
    canActivate: [AdminGuard],
    loadChildren:()=>import('./admin/admin.routes').then(m=>m.adminRoutes)
  },
 
  
  {
    path: 'banker',
    loadComponent:()=> import('./banker/banker-layout/banker-layout') .then(m=>m.BankerLayout),
    canActivate: [BankerGuard],
    loadChildren:()=>import('./banker/banker.routes').then(m=>m.bankerRoutes)
  },
 
  {
    path: '**',
    component:NotFound
  }
]
