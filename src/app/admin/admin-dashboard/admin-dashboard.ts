import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface DashboardModule {
 title: string;
 description: string;
 isActive: boolean;
 status: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone:true, 
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
 currentPage: string = 'Dashboard'; // Controls which page is visible
 // Data for the main dashboard cards
 modules = [
   { title: 'Transaction Monitoring & Fraud Detection', desc: 'Real-time monitoring of transactions with risk indicators and fraud alerts.', icon: '📊' },
   { title: 'Risk Scoring & Alert Management', desc: 'View risk scores, manage alerts, and handle case escalations.', icon: '🛡️' },
   { title: 'Compliance & Regulatory Reporting', desc: 'Generate AML reports, compliance documents, and audit logs.', icon: '📄' },
   { title: 'Analytics & Insights Dashboard', desc: 'Comprehensive analytics with fraud trends and predictive insights.', icon: '📈' }
 ];
 // Mock data for the Transactions table
 transactions = [
   { id: 'TXN-1001', customer: 'Alice Johnson', amount: '₦25,000', channel: 'Online Banking', time: '2024-12-28 10:15:23', risk: 'HIGH', status: 'flagged' },
   { id: 'TXN-1002', customer: 'Bob Smith', amount: '₦5,000', channel: 'Mobile App', time: '2024-12-28 10:12:45', risk: 'LOW', status: 'completed' },
   { id: 'TXN-1003', customer: 'Carol White', amount: '₦15,000', channel: 'ATM', time: '2024-12-28 10:08:12', risk: 'MEDIUM', status: 'pending' }
 ];
 switchPage(page: string) {
   this.currentPage = page;
 }
}
