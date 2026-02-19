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
  userName='';
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

  // isBusy = false;

  constructor(private dashboardService: CustomerTxService) {}

  ngOnInit(): void {

  this.loadDashboard();

}

loadDashboard() {

  const userId = Number(localStorage.getItem('userId'));

  this.dashboardService.getBalance(userId)

    .subscribe(balance => this.balance = balance);

  this.dashboardService.getTransactions(userId)

    .subscribe(res => this.transactions = res);

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

  // this.isBusy = true;

  this.dashboardService.sendTransaction(payload).subscribe({

    next: (res) => {

      alert("Transaction Status: " + res.status);

      this.resetForm();

      this.loadDashboard();

    },

    error: (err) => {

      alert(err.error.message);
      // this.isBusy = false;

    },

    // complete: () => this.isBusy = false

  });

}
 
 

  private resetForm() {
    this.transaction.recipientId = '';
    this.transaction.amount = 0;
    this.transaction.password = '';
  }
}