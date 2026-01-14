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
 
  }