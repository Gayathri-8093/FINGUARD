import { Routes } from '@angular/router';

 
export const bankerRoutes: Routes = [
 
  { path: 'dashboard', loadComponent:()=> import('./banker-dashboard/banker-dashboard').then(m=> m.BankerDashboard) },
  { path: 'onboarding', loadComponent:()=> import('../features/onboarding/customer-onboarding-list/customer-onboarding-list').then(m=> m.CustomerOnboardingList) },
  { path: 'onboarding/new', loadComponent:()=> import('../features/onboarding/new-onboarding/new-onboarding').then(m=> m.NewOnboarding) },
  { path: 'tx-monitoring', loadComponent:()=> import('../features/tx-monitoring/tx-monitoring').then(m=> m.TxMonitoring) },
  { path: 'risk', loadComponent:()=> import ('../features/risk-scoring-and-management/risk-scoring-and-management').then(m=>m.RiskScoringAndManagement)},
  { path: 'compliance', loadComponent:()=> import ('../features/compliance-and-regulatory/compliance-and-regulatory').then(m=>m.ComplianceAndRegulatory) },
  { path: 'analytics', loadComponent:()=> import ('../features/analytics-and-dashboard/analytics-and-dashboard').then(m=>m.AnalyticsAndDashboard)},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

];