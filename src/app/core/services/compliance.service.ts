import { Injectable } from '@angular/core';
import { SummaryCard,AuditLog } from '../models/compliance.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ComplianceService {
  private apiUrl = 'http://localhost:9091/api/audit-logs';

  constructor(private http: HttpClient) {}

  getSummaryCards(): SummaryCard[] {
    return [
      { title: 'Reports Generated', value: 142, sub: 'This month' },
      { title: 'Compliance Score', value: '98%', sub: '+2% improvement' },
      { title: 'Open Alerts', value: 12, sub: 'Last 24 hours' },
      { title: 'Regulatory Filings', value: 12, sub: 'Pending Submission' }
    ];
  }

  getAuditLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(this.apiUrl);
  }
  
}
