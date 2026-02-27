import { Routes } from '@angular/router';
 
export const adminRoutes: Routes = [

  { path: 'dashboard',loadComponent:()=> import('./admin-dashboard/admin-dashboard').then(m=> m.AdminDashboard) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path:'verification', loadComponent:()=> import('./kyc-verification/kyc-verification').then(m=> m.KycVerification)},
   { path: 'tx-monitoring', loadComponent:()=> import('../features/tx-monitoring/tx-monitoring').then(m=> m.TxMonitoring) },
  { path: 'risk', loadComponent:()=> import ('../features/risk-scoring-and-management/risk-scoring-and-management').then(m=>m.RiskScoringAndManagement)},
  { path: 'compliance', loadComponent:()=> import ('../features/compliance-and-regulatory/compliance-and-regulatory').then(m=>m.ComplianceAndRegulatory) },
  { path: 'analytics', loadComponent:()=> import ('../features/analytics-and-dashboard/analytics-and-dashboard').then(m=>m.AnalyticsAndDashboard)},
];
 