// src/app/features/customer-dashboard/customer-dashboard.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CustomerTxService,
  Transaction,
} from '../../core/services/customer-tx-service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-dashboard.html',
  styleUrls: ['./customer-dashboard.css'],
})
export class CustomerDashboard implements OnInit {
  balance = 0;
  transactions: Transaction[] = [];

  // password is ignored in the mock but kept for UI consistency
  transaction: {
    channel: 'UPI';
    recipientId: string;
    amount: number;
    password: string;
  } = {
    channel: 'UPI',
    recipientId: '',
    amount: 0,
    password: '',
  };

  isBusy = false;

  constructor(private dashboardService: CustomerTxService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.dashboardService.getBalance().subscribe((res) => (this.balance = res.balance));
    this.dashboardService.getTransactions().subscribe((res) => (this.transactions = res));
  }

  submitTransaction() {
    const { recipientId, amount, channel } = this.transaction;

    // Quick client-side validation
    if (!recipientId?.trim()) {
      alert('Please enter a valid Recipient Customer ID');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid amount (> 0)');
      return;
    }
    if (channel !== 'UPI') {
      alert('Only UPI is supported in mock');
      return;
    }

    this.isBusy = true;
    this.dashboardService.sendTransaction({
      channel,
      recipientId: recipientId.trim(),
      amount: Number(amount),
      // password is ignored in the mock
    })
    .subscribe({
      next: (tx) => {
        const msg =
          tx.status === 'PENDING'
            ? 'High-risk transaction created. Status: PENDING (needs approval).'
            : 'Transaction submitted successfully.';
        alert(msg);
        this.resetForm();
        this.loadDashboard();
      },
      error: (err) => {
        console.error(err);
        alert(err?.message || 'Transaction failed');
      },
      complete: () => (this.isBusy = false),
    });
  }

  approveTx(id: string) {
    this.isBusy = true;
    this.dashboardService.approveTransaction(id).subscribe({
      next: (tx) => {
        if (!tx) {
          alert('Transaction not found or not pending.');
        } else {
          alert('Transaction approved successfully.');
        }
        this.loadDashboard();
      },
      error: (err) => {
        console.error(err);
        alert(err?.message || 'Approval failed');
      },
      complete: () => (this.isBusy = false),
    });
  }

  private resetForm() {
    this.transaction.recipientId = '';
    this.transaction.amount = 0;
    this.transaction.password = '';
  }
}