import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../core/models/transaction.model';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-tx-monitoring',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './tx-monitoring.html',
  styleUrl: './tx-monitoring.css',
})



export class TxMonitoring {
  searchText = '';
 selectedRisk = 'ALL';
 selectedStatus = 'ALL';
 showModal = false;
 selectedTransaction: Transaction|null=null;
 transactions: Transaction[] = [];
   constructor (private transactionService: TransactionService) {
    this.transactions=this.transactionService.getTransactions();
   }
 get filteredTransactions() {
    const search = this.searchText.toLowerCase().trim();
   return this.transactions.filter(t =>
     (!search || t.id.toLowerCase().includes(search) || t.customer.toLowerCase().includes(search)) &&
     (this.selectedRisk === 'ALL' || t.risk === this.selectedRisk) &&
     (this.selectedStatus === 'ALL' || t.status === this.selectedStatus)
   );
 }
 
}