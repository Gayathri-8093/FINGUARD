import { Routes } from '@angular/router';
import { BankerLayout } from './banker-layout/banker-layout';
import { BankerDashboard } from './banker-dashboard/banker-dashboard';
import { CustomerOnboardingList } from '../features/onboarding/customer-onboarding-list/customer-onboarding-list';
import { NewOnboarding } from '../features/onboarding/new-onboarding/new-onboarding';
 
export const bankerRoutes: Routes = [
  {
    path: 'banker', component: BankerLayout,
    children:[
      {path: 'dashboard', component: BankerDashboard},
      {path: 'onboarding', component: CustomerOnboardingList},
      {path: 'onboarding/new', component: NewOnboarding},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  }
];