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


  getAuditLogs(page: number = 0, size:number=10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
  
}
