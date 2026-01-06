import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: Transaction[]=
    [
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
  getTransactions() : Transaction[] {
    return this.transactions;
  }
  
}
