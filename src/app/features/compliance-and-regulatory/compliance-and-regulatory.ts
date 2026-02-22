
import { Component } from '@angular/core';
import { ComplianceService } from '../../core/services/compliance.service';
import { SummaryCard,AuditLog } from '../../core/models/compliance.model';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf'; // For PDF generation
import autoTable from 'jspdf-autotable'; // For table formatting in PDF

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

  downloadPDF() {
    const doc = new jsPDF();
    doc.text('FinGuard System Audit Logs', 14, 15);
    
    // Summary: Maps data into the table format for the PDF
    const tableData = this.auditLogs.map(log => [
      log.timestamp,
      log.user,
      log.role,
      log.action,
      log.module,
      log.ipAddress
    ]);

    autoTable(doc, {
      head: [['Timestamp', 'User', 'Role', 'Action', 'Module', 'IP Address']],
      body: tableData,
      startY: 25,
      theme: 'grid'
    });

    doc.save('finguard-audit-report.pdf');
  }
}
