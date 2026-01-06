import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-risk-scoring-and-management',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './risk-scoring-and-management.html',
  styleUrl: './risk-scoring-and-management.css',
})
export class RiskScoringAndManagement {
  activeTab: 'open' | 'in-progress' | 'closed' = 'open';
  
  showModal = false;
  selectedAlert: any = null;
  assignedUser : string = '';
 
  alerts = [
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
 
  get filteredAlerts() {
    return this.alerts.filter(a => a.status === this.activeTab);
  }
 
  investigate(alert: any) {
    this.selectedAlert = alert;
    this.showModal = true;
  }
 
  closeModal() {
    this.showModal = false;
    this.selectedAlert = null;
    this.assignedUser = '';
  }
 
  closeAlert() {
    if (this.selectedAlert) {
      this.selectedAlert.status = 'closed';
    }
    this.closeModal();
  }
 
  escalateAlert() {
      if (this.selectedAlert) {
    alert(`Alert ${this.selectedAlert.id} has been escalated to senior management`);
    // this.selectedAlert.status = 'in-progress';
    
    this.closeModal();
  }
    // alert('Alert escalated successfully');
    // this.closeModal();

  }
  }