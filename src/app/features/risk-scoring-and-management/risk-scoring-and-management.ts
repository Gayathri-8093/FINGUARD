import { Component, OnInit,ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertRiskService } from '../../core/services/alert-risk.service';
import { Alert } from '../../core/models/alert.model';

@Component({
  selector: 'app-risk-scoring-and-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './risk-scoring-and-management.html',
  styleUrl: './risk-scoring-and-management.css',
})

export class RiskScoringAndManagement implements OnInit {
  activeTab: 'open' | 'in-progress' | 'closed' = 'open';

  alerts: Alert[] = [];

  constructor(private alertService: AlertRiskService,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.alertService.getAlerts().subscribe({
      next: (data: Alert[]) => {
        this.alerts = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error fetching alerts:', err)
    });
  }
   
  get filteredAlerts(): Alert[] {
    return this.alerts.filter(a => a.status?.toLowerCase() === this.activeTab);
  }
}