import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ComplianceService } from '../../core/services/compliance.service';
import { SummaryCard, AuditLog } from '../../core/models/compliance.model';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf'; 
import autoTable from 'jspdf-autotable'; 

@Component({
  selector: 'app-compliance-and-regulatory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compliance-and-regulatory.html',
  styleUrl: './compliance-and-regulatory.css',
})
export class ComplianceAndRegulatory implements OnInit {
  auditLogs: AuditLog[] = [];
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(
    private complianceService: ComplianceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAuditLogs(this.currentPage);
  }

  loadAuditLogs(page: number): void {
    this.complianceService.getAuditLogs(page).subscribe({
      next: (data: any) => {
        this.auditLogs = data.content; 
        this.totalPages = data.totalPages;
        this.currentPage = data.number; 
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error fetching logs:', err)
    });
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadAuditLogs(this.currentPage + 1);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.loadAuditLogs(this.currentPage - 1);
    }
  }

  // downloadPDF() {
  //   const doc = new jsPDF();
  //   doc.text('FinGuard System Audit Logs', 14, 15);
    
  //   const tableData = this.auditLogs.map(log => [
  //     log.timestamp,
  //     log.user,
  //     log.role,
  //     log.action,
  //     log.module,
  //     log.ipAddress
  //   ]);

  //   autoTable(doc, {
  //     head: [['Timestamp', 'User', 'Role', 'Action', 'Module', 'IP Address']],
  //     body: tableData,
  //     startY: 25,
  //     theme: 'grid'
  //   });

  //   doc.save('finguard-audit-report.pdf');
  // }
  // ... other imports ...

  downloadPDF() {
    // 1. Fetch a larger dataset specifically for the report
    // We pass 0 for page and a high number (e.g., 1000) for size
    this.complianceService.getAuditLogs(0, 1000).subscribe({
      next: (data: any) => {
        const fullLogs: AuditLog[] = data.content; // This now contains all rows
        
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('FinGuard System Audit Logs - Complete Report', 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

        // 2. Map the full dataset for the table
        const tableData = fullLogs.map(log => [
          log.timestamp,
          log.user,
          log.role,
          log.action,
          log.module,
          log.ipAddress
        ]);

        // 3. Generate the table using the full list
        autoTable(doc, {
          head: [['Timestamp', 'User', 'Role', 'Action', 'Module', 'IP Address']],
          body: tableData,
          startY: 30,
          theme: 'striped',
          styles: { fontSize: 8 },
          headStyles: { fillColor: [37, 99, 235] } // FinGuard Blue
        });

        doc.save('finguard-complete-audit-report.pdf');
      },
      error: (err: any) => console.error('Error fetching full logs for PDF:', err)
    });
  }
}