
// import { Component ,ChangeDetectorRef} from '@angular/core';
// import { ComplianceService } from '../../core/services/compliance.service';
// import { SummaryCard,AuditLog } from '../../core/models/compliance.model';
// import { CommonModule } from '@angular/common';
// import jsPDF from 'jspdf'; 
// import autoTable from 'jspdf-autotable'; 

// @Component({
//   selector: 'app-compliance-and-regulatory',
//   imports: [CommonModule],
//   templateUrl: './compliance-and-regulatory.html',
//   styleUrl: './compliance-and-regulatory.css',
// })
// export class ComplianceAndRegulatory {
//    summaryCards: SummaryCard[] = [];
//   auditLogs: AuditLog[] = [];
//   currentPage: number = 0;
//   totalPages: number = 0;

//   constructor(private complianceService: ComplianceService,
//     private cdr:ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.summaryCards = this.complianceService.getSummaryCards();
//     this.loadAuditLogs(this.currentPage);
//   }

//   loadAuditLogs(page:number): void {
//     this.currentPage=page;
//     this.complianceService.getAuditLogs(page).subscribe({
//       next: (data: any) => {
//      this.auditLogs = data.content; 
//         this.totalPages = data.totalPages;
//         this.cdr.detectChanges();
//       },
//       error: (err: any) => console.error('Error fetching logs:', err)
//     });
//   }
// goToNextPage(): void {
//     if (this.currentPage < this.totalPages - 1) {
//       this.loadAuditLogs(this.currentPage + 1);
//     }
//   }

//   goToPreviousPage(): void {
//     if (this.currentPage > 0) {
//       this.loadAuditLogs(this.currentPage - 1);
//     }
//   }
//   downloadPDF() {
//     const doc = new jsPDF();
//     doc.text('FinGuard System Audit Logs', 14, 15);
    
//     const tableData = this.auditLogs.map(log => [
//       log.timestamp,
//       log.user,
//       log.role,
//       log.action,
//       log.module,
//       log.ipAddress
//     ]);

//     autoTable(doc, {
//       head: [['Timestamp', 'User', 'Role', 'Action', 'Module', 'IP Address']],
//       body: tableData,
//       startY: 25,
//       theme: 'grid'
//     });

//     doc.save('finguard-audit-report.pdf');
//   }
// }
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
  summaryCards: SummaryCard[] = [];
  auditLogs: AuditLog[] = [];
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(
    private complianceService: ComplianceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.summaryCards = this.complianceService.getSummaryCards();
    this.loadAuditLogs(this.currentPage);
  }

  loadAuditLogs(page: number): void {
    this.complianceService.getAuditLogs(page).subscribe({
      next: (data: any) => {
        // Accessing .content to fix the Symbol.iterator error
        this.auditLogs = data.content; 
        this.totalPages = data.totalPages;
        this.currentPage = data.number; // Sync current page with backend state
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

  downloadPDF() {
    const doc = new jsPDF();
    doc.text('FinGuard System Audit Logs', 14, 15);
    
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