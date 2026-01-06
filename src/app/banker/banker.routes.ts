import { Routes } from '@angular/router';
import { BankerLayout } from './banker-layout/banker-layout';
import { BankerDashboard } from './banker-dashboard/banker-dashboard';
import { CustomerOnboardingList } from '../features/onboarding/customer-onboarding-list/customer-onboarding-list';
import { NewOnboarding } from '../features/onboarding/new-onboarding/new-onboarding';
import { TxMonitoring } from '../features/tx-monitoring/tx-monitoring';
import { RiskScoringAndManagement } from '../features/risk-scoring-and-management/risk-scoring-and-management';
import { ComplianceAndRegulatory } from '../features/compliance-and-regulatory/compliance-and-regulatory';
import { AnalyticsAndDashboard } from '../features/analytics-and-dashboard/analytics-and-dashboard';
import { BankerGuard } from '../core/guards/banker.guard';
 
export const bankerRoutes: Routes = [
 
  { path: 'dashboard', component: BankerDashboard },
  { path: 'onboarding', component: CustomerOnboardingList },
  { path: 'onboarding/new', component: NewOnboarding },
  { path: 'tx-monitoring', component: TxMonitoring },
  { path: 'risk', component: RiskScoringAndManagement },
  { path: 'compliance', component: ComplianceAndRegulatory },
  { path: 'analytics', component: AnalyticsAndDashboard },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

];