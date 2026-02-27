
import { Component ,ChangeDetectorRef} from '@angular/core';
import { ComplianceService } from '../../core/services/compliance.service';
import { SummaryCard,AuditLog } from '../../core/models/compliance.model';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf'; 
import autoTable from 'jspdf-autotable'; 

@Component({
  selector: 'app-compliance-and-regulatory',
  imports: [CommonModule],
  templateUrl: './compliance-and-regulatory.html',
  styleUrl: './compliance-and-regulatory.css',
})
export class ComplianceAndRegulatory {
   summaryCards: SummaryCard[] = [];
  auditLogs: AuditLog[] = [];

  constructor(private complianceService: ComplianceService,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.summaryCards = this.complianceService.getSummaryCards();
    this.loadAuditLogs();
  }

  loadAuditLogs(): void {
    this.complianceService.getAuditLogs().subscribe({
      next: (data: AuditLog[]) => {
        this.auditLogs = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error fetching logs:', err)
    });
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
