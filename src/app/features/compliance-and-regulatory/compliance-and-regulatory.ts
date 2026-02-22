
import { Component } from '@angular/core';
import { ComplianceService } from '../../core/services/compliance.service';
import { SummaryCard,AuditLog } from '../../core/models/compliance.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compliance-and-regulatory',
  imports: [CommonModule],
  templateUrl: './compliance-and-regulatory.html',
  styleUrl: './compliance-and-regulatory.css',
})
export class ComplianceAndRegulatory {
   summaryCards: SummaryCard[] = [];
  auditLogs: AuditLog[] = [];

  constructor(private complianceService: ComplianceService) {}

  // Summary: Lifecycle hook to trigger data fetch on load
  ngOnInit(): void {
    this.summaryCards = this.complianceService.getSummaryCards();
    this.loadAuditLogs();
  }

  // Summary: Subscribes to the backend stream to populate the table
  loadAuditLogs(): void {
    this.complianceService.getAuditLogs().subscribe({
      next: (data: AuditLog[]) => {
        this.auditLogs = data;
      },
      error: (err: any) => console.error('Error fetching logs:', err)
    });
  }
}
