import { Injectable } from '@angular/core';
import { SummaryCard,AuditLog } from '../models/compliance.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ComplianceService {
  //  private summaryCards: SummaryCard[] = [
  //   { title: 'Reports Generated', value: 142, sub: 'This month' },
  //   { title: 'Compliance Score', value: '98%', sub: '+2% improvement' },
  //   { title: 'Open Alerts', value: 12, sub: 'Last 24 hours' },
  //   { title: 'Regulatory Filings', value: 12, sub: 'Pending Submission' }
  // ];
 
  // private auditLogs: AuditLog[] = [
  //   {
  //     time: '2024-12-28 10:12:15',
  //     user: 'Sarah Banker',
  //     action: 'Blocked Transaction',
  //     module: 'Transaction Monitoring',
  //     details: 'Transaction TXN-1001 due to high risk',
  //     ip: '192.168.1.10'
  //   },
  //   {
  //     time: '2024-12-28 09:45:30',
  //     user: 'Admin User',
  //     action: 'Generated Report',
  //     module: 'Compliance Report',
  //     details: 'Generated AML report for December 2024',
  //     ip: '192.168.1.45'
  //   },
  //   {
  //     time: '2024-12-28 09:30:12',
  //     user: 'Sarah Banker',
  //     action: 'Closed Alert',
  //     module: 'Risk Management',
  //     details: 'Closed ALT-003 – False positive',
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
 
  // getSummaryCards(): SummaryCard[] {
  //   return this.summaryCards;
  // }
 
  // getAuditLogs(): AuditLog[] {
  //   return this.auditLogs;
  // }
  private apiUrl = 'http://localhost:9091/api/audit-logs';

  constructor(private http: HttpClient) {}

  // Summary: Static data for UI cards (can stay static or be moved to an API later)
  getSummaryCards(): SummaryCard[] {
    return [
      { title: 'Reports Generated', value: 142, sub: 'This month' },
      { title: 'Compliance Score', value: '98%', sub: '+2% improvement' },
      { title: 'Open Alerts', value: 12, sub: 'Last 24 hours' },
      { title: 'Regulatory Filings', value: 12, sub: 'Pending Submission' }
    ];
  }

  // Summary: Fetches real-time audit logs from the database
  getAuditLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(this.apiUrl);
  }
  
}
