import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComplianceService } from '../../core/services/compliance.service';
import { SummaryCard,AuditLog } from '../../core/models/compliance.model';

@Component({
  selector: 'app-compliance-and-regulatory',
  imports: [CommonModule],
  templateUrl: './compliance-and-regulatory.html',
  styleUrl: './compliance-and-regulatory.css',
})
export class ComplianceAndRegulatory {
   summaryCards: SummaryCard[] = [];
  auditLogs: AuditLog[] = [];
 
  constructor(private complianceService: ComplianceService) {
    this.summaryCards = this.complianceService.getSummaryCards();
    this.auditLogs = this.complianceService.getAuditLogs();
  }
  //  summaryCards = [
  //   { title: 'Reports Generated', value: 142, sub: 'This month' },
  //   { title: 'Compliance Score', value: '98%', sub: '+7.2% improvement' },
  //   { title: 'Audit Events', value: '1,247', sub: 'Last 30 days' },
  //   { title: 'Regulatory Filings', value: 12, sub: 'Pending submission' }
  // ];
 
  // auditLogs = [
  //   {
  //     time: '2024-12-28 10:15:23',
  //     user: 'Sarah Operations',
  //     action: 'Approved KYC',
  //     module: 'KYC Verification',
  //     details: 'Approved KYC-001 for Alice Johnson',
  //     ip: '192.168.1.45'
  //   },
  //   {
  //     time: '2024-12-28 10:12:15',
  //     user: 'Sarah Operations',
  //     action: 'Blocked Transaction',
  //     module: 'Transaction Monitoring',
  //     details: 'Blocked TXN-1001 due to high risk',
  //     ip: '192.168.1.45'
  //   },
  //   {
  //     time: '2024-12-28 09:45:30',
  //     user: 'Admin User',
  //     action: 'Generated Report',
  //     module: 'Compliance',
  //     details: 'Generated AML report for December 2024',
  //     ip: '192.168.1.10'
  //   },
  //   {
  //     time: '2024-12-28 09:30:12',
  //     user: 'Sarah Operations',
  //     action: 'Closed Alert',
  //     module: 'Risk Management',
  //     details: 'Closed ALT-003 - False positive',
  //     ip: '192.168.1.45'
  //   },
  //   {
  //     time: '2024-12-28 09:15:45',
  //     user: 'Admin User',
  //     action: 'Login',
  //     module: 'Authentication',
  //     details: 'Successful login',
  //     ip: '192.168.1.10'
  //   }
  // ];
  


}
