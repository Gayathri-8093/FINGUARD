import { LoginPage } from './login-page/login-page';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { Routes } from '@angular/router';
import { bankerRoutes } from './banker/banker.routes';
import { TxMonitoring } from './tx-monitoring/tx-monitoring';
import { RiskScoringAndManagement } from './risk-scoring-and-management/risk-scoring-and-management';
import { ComplianceAndRegulatory } from './compliance-and-regulatory/compliance-and-regulatory';
import { AnalyticsAndDashboard } from './analytics-and-dashboard/analytics-and-dashboard';

export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login', component:LoginPage},
  {path:'admin-dashboard',component:AdminDashboard},
  {path: 'transactions', component:TxMonitoring},
  {path: 'risk', component:RiskScoringAndManagement},
  {path: 'compliance', component:ComplianceAndRegulatory},
  {path: 'analytics', component:AnalyticsAndDashboard},
  ...bankerRoutes
]
