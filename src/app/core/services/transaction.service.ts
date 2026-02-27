import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../../environments/environment';
import { TransactionSummary } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = `${environment.apiBaseUrl}/api/transactions`;

  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/all`);
  }

  updateStatus(id: number | string, newStatus: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, null, {
      params: { status: newStatus }
    });
  }

  getBalance(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/balance/${userId}`);
  }
  getTransactionSummary():Observable<TransactionSummary>{
    return this.http.get<TransactionSummary>(`${this.apiUrl}/summary`);
  }
}