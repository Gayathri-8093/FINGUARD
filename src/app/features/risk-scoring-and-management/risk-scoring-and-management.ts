import { Component, OnInit,ChangeDetectorRef } from '@angular/core'; // Added OnInit for lifecycle management
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
  // Summary: Maintains the current tab state for the UI filter
  activeTab: 'open' | 'in-progress' | 'closed' = 'open';

  // Summary: Holds the list of alerts fetched from the backend (e.g., ALT-001)
  alerts: Alert[] = [];

  constructor(private alertService: AlertRiskService,private cdr:ChangeDetectorRef) {}

  // Summary: Lifecycle hook to trigger data fetching as soon as the component loads
  ngOnInit(): void {
    this.loadAlerts();
  }

  // Summary: Calls the service to fetch real-time alerts and updates the local array
  loadAlerts(): void {
    this.alertService.getAlerts().subscribe({
      next: (data: Alert[]) => {
        this.alerts = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error fetching alerts:', err)
    });
  }

  // Summary: Computed property to count alerts with 'open' status for summary cards
  get openAlertsCount(): number {
    return this.alerts.filter(a => a.status?.toLowerCase() === 'open').length;
  }

  // Summary: Computed property to count alerts currently being investigated
  get inProgressAlertsCount(): number {
    return this.alerts.filter(a => a.status?.toLowerCase() === 'in-progress').length;
  }

  // Summary: Computed property to count resolved alerts
  get closedAlertsCount(): number {
    return this.alerts.filter(a => a.status?.toLowerCase() === 'closed').length;
  }

  // Summary: Dynamically filters the table rows based on the user's selected tab
  get filteredAlerts(): Alert[] {
    return this.alerts.filter(a => a.status?.toLowerCase() === this.activeTab);
  }
}