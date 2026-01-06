import { Routes } from '@angular/router';
import { AdminLayout } from './admin-layout/admin-layout';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminGuard } from '../core/guards/admin.guard';
import { CustomerOnboardingList } from '../features/onboarding/customer-onboarding-list/customer-onboarding-list';
import { NewOnboarding } from '../features/onboarding/new-onboarding/new-onboarding';
import { TxMonitoring } from '../features/tx-monitoring/tx-monitoring';
import { RiskScoringAndManagement } from '../features/risk-scoring-and-management/risk-scoring-and-management';
import { ComplianceAndRegulatory } from '../features/compliance-and-regulatory/compliance-and-regulatory';
import { AnalyticsAndDashboard } from '../features/analytics-and-dashboard/analytics-and-dashboard';
 
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

  { path: 'admin-dashboard', component: AdminDashboard },
    { path: 'onboarding', component: CustomerOnboardingList },
    { path: 'onboarding/new', component: NewOnboarding },
    { path: 'tx-monitoring', component: TxMonitoring },
    { path: 'risk', component: RiskScoringAndManagement },
    { path: 'compliance', component: ComplianceAndRegulatory },
    { path: 'analytics', component: AnalyticsAndDashboard },
  
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
 