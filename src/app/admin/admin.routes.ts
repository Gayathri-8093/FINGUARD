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
import { KycVerification } from './kyc-verification/kyc-verification';
 
export const adminRoutes: Routes = [

  { path: 'dashboard', component: AdminDashboard },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path:'verification',component:KycVerification},
   { path: 'tx-monitoring', component: TxMonitoring },
    { path: 'risk', component: RiskScoringAndManagement },
    { path: 'compliance', component: ComplianceAndRegulatory },
    { path: 'analytics', component: AnalyticsAndDashboard },
];
 