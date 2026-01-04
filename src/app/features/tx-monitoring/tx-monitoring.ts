import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Transaction {
 id: string;
 customer: string;
 amount: number;
 channel: string;
 timestamp: string;
 location:string;
 risk: 'LOW' | 'MEDIUM' | 'HIGH';
 status: 'completed' | 'pending' | 'flagged' | 'blocked';
} 
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
 transactions: Transaction[] = [
   {
     id: 'TXN-1001',
     customer: 'Alice Johnson',
     amount: 25000,
     channel: 'Online Banking',
     timestamp: '2024-12-28 10:15:23',
     location: 'Lagos, Nigeria',
     risk: 'HIGH',
     status: 'flagged'
   },
   {
     id: 'TXN-1002',
     customer: 'Bob Smith',
     amount: 5000,
     channel: 'Mobile App',
     timestamp: '2024-12-28 10:12:45',
     location: 'Abuja, Nigeria',
     risk: 'LOW',
     status: 'completed'
   },
   {
     id: 'TXN-1003',
     customer: 'Carol White',
     amount: 15000,
     channel: 'ATM',
     timestamp: '2024-12-28 10:08:12',
     location: 'Ibadan, Nigeria',
     risk: 'MEDIUM',
     status: 'pending'
   },
    {
     id: 'TXN-1004',
     customer: 'David Brown',
     amount: 50000,
     channel: 'Wire Transfer',
     timestamp: '2024-12-28 09:45:33',
     location: 'Lagos, Nigeria',
     risk: 'HIGH',
     status: 'flagged'
   },
   {
     id: 'TXN-1005',
     customer: 'Eve Davis',
     amount: 3000,
     channel: 'POS',
     timestamp: '2024-12-28 09:30:18',
     location: 'Benin, Nigeria',
     risk: 'LOW',
     status: 'completed'
   }
 ];
 get filteredTransactions() {
    const search = this.searchText.toLowerCase().trim();
   return this.transactions.filter(t =>
     (!search || t.id.toLowerCase().includes(search) || t.customer.toLowerCase().includes(search)) &&
     (this.selectedRisk === 'ALL' || t.risk === this.selectedRisk) &&
     (this.selectedStatus === 'ALL' || t.status === this.selectedStatus)
   );
 }
 openModal(tx: Transaction) {
  console.log('View clicked:',tx);
   this.selectedTransaction = tx;
   this.showModal = true;
 }
 closeModal() {
   this.showModal = false;
   this.selectedTransaction = null;
 }
 allowTransaction() {
   if (!this.selectedTransaction) return;
   this.selectedTransaction.status = 'completed';
   this.closeModal();
 }
 blockTransaction() {
   if (!this.selectedTransaction) return;
   this.selectedTransaction.status = 'blocked';
   this.closeModal();
 }
}