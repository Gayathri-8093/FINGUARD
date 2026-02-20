import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
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
  userName='';
  applicationId = '';
  transactions: Transaction[] = [];
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
  constructor(private dashboardService: CustomerTxService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  setTimeout(() => {
    this.loadDashboard();
  }, 50);
}

loadDashboard() {
  const userId = Number(localStorage.getItem('userId'));
  if (!userId) return;
  this.dashboardService.getProfile(userId).subscribe({
      next: (data) => {
        this.userName = data.fullName;
        this.applicationId = data.applicationId;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Profile fetch error:", err)
    });
  this.dashboardService.getBalance(userId).subscribe({
    next: (val) => {
      this.balance = val;
      this.cdr.detectChanges(); 
    },
    error: (err) => console.error("Balance fetch error:", err)
  });
  this.dashboardService.getTransactions(userId).subscribe({
    next: (res) => {
      this.transactions = res;
      this.cdr.detectChanges(); 
    },
    error: (err) => console.error("History fetch error:", err)
  });
}
submitTransaction() {
  const userId = Number(localStorage.getItem('userId'));
  const payload = {
    senderId: userId,
    recipientId: Number(this.transaction.recipientId),
    amount: Number(this.transaction.amount),
    channel: this.transaction.channel,
    password: this.transaction.password
  };
  this.dashboardService.sendTransaction(payload).subscribe({
    next: (res) => {
      alert("Transaction Status: " + res.status);
      this.resetForm();
      this.loadDashboard();
    },
    error: (err) => {
      alert(err.error.message);
    },
  });
}

  private resetForm() {
    this.transaction.recipientId = '';
    this.transaction.amount = 0;
    this.transaction.password = '';
  }
}