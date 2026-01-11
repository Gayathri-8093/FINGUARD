import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertRiskService } from '../../core/services/alert-risk.service';
import { Alert } from '../../core/models/alert.model';

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
  selectedAlert: Alert | null = null;
  assignedUser = '';
 
  alerts: Alert[] = [];
 
  constructor(private alertService: AlertRiskService) {
    this.alerts = this.alertService.getAlerts();
  }

  get openAlertsCount(): number {
    return this.alerts.filter(a => a.status === 'open').length;
  }

  get inProgressAlertsCount(): number {
    return this.alerts.filter(a => a.status === 'in-progress').length;
  }

  get closedAlertsCount(): number {
    return this.alerts.filter(a => a.status === 'closed').length;
  }
 
  get filteredAlerts(): Alert[] {
    return this.alerts.filter(a => a.status === this.activeTab);
  }
 
  investigate(alert: Alert) {
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
      this.alertService.updateAlertStatus(this.selectedAlert.id, 'closed');
    }
    this.closeModal();
  }
 
  escalateAlert() {
    if (this.selectedAlert) {
      alert(`Alert ${this.selectedAlert.id} has been escalated to senior management`);
      this.alertService.updateAlertStatus(this.selectedAlert.id, 'in-progress');
    }
    this.closeModal();
  }
}