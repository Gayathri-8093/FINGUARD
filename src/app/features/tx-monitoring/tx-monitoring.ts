import { CommonModule } from '@angular/common';
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../core/models/transaction.model';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-tx-monitoring',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tx-monitoring.html',
  styleUrl: './tx-monitoring.css',
})
export class TxMonitoring implements OnInit {
  searchText = '';
  selectedRisk = 'ALL';
  selectedStatus = 'ALL';
  popupMessage: string = '';
  showPopup: boolean = false;

  selectedTransaction: Transaction | null = null;
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refreshTransactions();
  }

  get filteredTransactions(): Transaction[] {
    const search = this.searchText.toLowerCase().trim();
    return this.transactions.filter(t =>
      (!search || 
        t.id?.toString().toLowerCase().includes(search) || 
        t.sender?.username?.toLowerCase().includes(search)) &&
      (this.selectedRisk === 'ALL' || t.riskLevel === this.selectedRisk) &&
      (this.selectedStatus === 'ALL' || t.status?.toUpperCase() === this.selectedStatus.toUpperCase())
    );
  }

  refreshTransactions(): void {
    // Calling the correct method name from your service
    this.transactionService.getAllTransactions().subscribe({
      next: (data: Transaction[]) => {
        this.transactions = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error fetching transactions:', err)
    });
  }

  viewTransaction(tx: Transaction): void {
    this.selectedTransaction = tx;
  }

  approveTransaction(): void {
    if (this.selectedTransaction) {
      this.transactionService.updateStatus(this.selectedTransaction.id, 'COMPLETED').subscribe({
        next: () => {
          this.refreshTransactions();
          this.selectedTransaction = null;
          alert('Transaction Approved');
        }
      });
    }
  }

  rejectTransaction(): void {
    if (this.selectedTransaction) {
      this.transactionService.updateStatus(this.selectedTransaction.id, 'FLAGGED').subscribe({
        next: () => {
          this.refreshTransactions();
          this.selectedTransaction = null;
          alert('Transaction Rejected');
        }
      });
    }
  }

  closePopup(): void {
    this.selectedTransaction = null;
  }
}