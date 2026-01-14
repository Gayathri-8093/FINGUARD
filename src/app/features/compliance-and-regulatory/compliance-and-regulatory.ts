import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComplianceService } from '../../core/services/compliance.service';
import { SummaryCard,AuditLog } from '../../core/models/compliance.model';

@Component({
  selector: 'app-compliance-and-regulatory',
  imports: [CommonModule],
  templateUrl: './compliance-and-regulatory.html',
  styleUrl: './compliance-and-regulatory.css',
})
export class ComplianceAndRegulatory {
   summaryCards: SummaryCard[] = [];
  auditLogs: AuditLog[] = [];
 
  constructor(private complianceService: ComplianceService) {
    this.summaryCards = this.complianceService.getSummaryCards();
    this.auditLogs = this.complianceService.getAuditLogs();
  }
}
