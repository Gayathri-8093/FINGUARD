// src/app/core/services/customer-tx-service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type TxStatus = 'SUCCESS' | 'PENDING';

export interface Transaction {
  id: string;
  recipientId: string;
  amount: number;
  channel: 'UPI';
  riskLevel: RiskLevel;
  status: TxStatus;
  timestamp: string; // ISO string
}

@Injectable({ providedIn: 'root' })
export class CustomerTxService {
  private BALANCE_KEY = 'demo.balance';
  private TX_KEY = 'demo.transactions';

  constructor() {
    this.ensureSeed();
  }

  private ensureSeed() {
    if (localStorage.getItem(this.BALANCE_KEY) === null) {
      // Seed with an initial balance
      localStorage.setItem(this.BALANCE_KEY, JSON.stringify(250000));
    }
    if (localStorage.getItem(this.TX_KEY) === null) {
      localStorage.setItem(this.TX_KEY, JSON.stringify([]));
    }
  }

  getBalance(): Observable<{ balance: number }> {
    const balance = JSON.parse(localStorage.getItem(this.BALANCE_KEY) || '0');
    return of({ balance }).pipe(delay(150));
  }

  getTransactions(): Observable<Transaction[]> {
    const list: Transaction[] = JSON.parse(localStorage.getItem(this.TX_KEY) || '[]');
    // Return newest first
    const sorted = [...list].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return of(sorted).pipe(delay(150));
  }

  /**
   * Simulate sending a transaction.
   * - Risk:
   *   < 50,000 -> LOW, < 100,000 -> MEDIUM, >= 100,000 -> HIGH
   * - Status:
   *   HIGH -> PENDING, else SUCCESS
   * - Balance:
   *   Deduct immediately only for SUCCESS.
   */
  sendTransaction(payload: {
    channel: 'UPI';
    recipientId: string;
    amount: number;
    password?: string; // ignored in mock
  }): Observable<Transaction> {
    const amount = Number(payload.amount);
    if (!payload.recipientId || !amount || amount <= 0) {
      return throwError(() => ({ message: 'Invalid input' }));
    }

    const currentBalance = JSON.parse(localStorage.getItem(this.BALANCE_KEY) || '0') as number;

    // Even in mock, don’t allow sending more than available (for SUCCESS path)
    // For HIGH (PENDING), we allow creating the tx without deduction.
    if (amount > currentBalance) {
      // If this would be HIGH risk (pending), allow creating the pending tx
      const risk = this.computeRisk(amount);
      if (risk !== 'HIGH') {
        return throwError(() => ({ message: 'Insufficient balance' }));
      }
    }

    const risk = this.computeRisk(amount);
    const status: TxStatus = risk === 'HIGH' ? 'PENDING' : 'SUCCESS';

    const tx: Transaction = {
      id: this.generateId(),
      recipientId: payload.recipientId,
      amount,
      channel: payload.channel,
      riskLevel: risk,
      status,
      timestamp: new Date().toISOString(),
    };

    const list: Transaction[] = JSON.parse(localStorage.getItem(this.TX_KEY) || '[]');
    list.push(tx);
    localStorage.setItem(this.TX_KEY, JSON.stringify(list));

    // Deduct only if SUCCESS
    if (status === 'SUCCESS') {
      localStorage.setItem(this.BALANCE_KEY, JSON.stringify(currentBalance - amount));
    }

    return of(tx).pipe(delay(300));
  }

  /**
   * Approve a pending HIGH risk transaction.
   * Deducts the amount if balance is sufficient at the time of approval.
   */
  approveTransaction(id: string): Observable<Transaction | null> {
    const list: Transaction[] = JSON.parse(localStorage.getItem(this.TX_KEY) || '[]');
    const idx = list.findIndex(t => t.id === id && t.status === 'PENDING');
    if (idx === -1) {
      return of(null).pipe(delay(150));
    }

    const bal = JSON.parse(localStorage.getItem(this.BALANCE_KEY) || '0') as number;
    const amt = list[idx].amount;

    if (amt > bal) {
      return throwError(() => ({ message: 'Insufficient balance to approve' }));
    }

    list[idx] = { ...list[idx], status: 'SUCCESS' };
    localStorage.setItem(this.TX_KEY, JSON.stringify(list));
    localStorage.setItem(this.BALANCE_KEY, JSON.stringify(bal - amt));

    return of(list[idx]).pipe(delay(250));
  }

  private computeRisk(amount: number): RiskLevel {
    if (amount < 50000) return 'LOW';
    if (amount < 100000) return 'MEDIUM';
    return 'HIGH';
  }

  private generateId(): string {
    return 'TX-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
  }
}