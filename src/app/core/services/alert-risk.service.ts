import { Injectable } from '@angular/core';
import { Alert } from '../models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertRiskService {
   private alerts: Alert[] = [
    {
      id: 'ALT-001',
      type: 'Unusual Transaction Pattern',
      customer: 'Alice Johnson',
      severity: 'HIGH',
      timestamp: '2024-12-28 10:15:23',
      status: 'open',
      description: 'Multiple high-value transactions to different accounts within 24 hours'
    },
    {
      id: 'ALT-002',
      type: 'Velocity Check Failed',
      customer: 'David Brown',
      severity: 'HIGH',
      timestamp: '2024-12-28 09:45:33',
      status: 'in-progress',
      description: 'Rapid transactions detected within short duration'
    },
    {
      id: 'ALT-003',
      type: 'Suspicious Login Activity',
      customer: 'Bob Smith',
      severity: 'MEDIUM',
      timestamp: '2024-12-28 08:30:15',
      status: 'open',
      description: 'Login from unusual device/location'
    },
    {
      id: 'ALT-004',
      type: 'Large Cash Withdrawal',
      customer: 'Carol White',
      severity: 'LOW',
      timestamp: '2024-12-27 16:22:10',
      status: 'closed',
      description: 'Cash withdrawal above threshold'
    }
  ];
 
  getAlerts(): Alert[] {
    return this.alerts;
  }
 
  updateAlertStatus(id: string, status: Alert['status']) {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.status = status;
    }
  }
  
}
