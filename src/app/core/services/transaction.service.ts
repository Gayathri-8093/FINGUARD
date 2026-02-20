import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  // Uses the URL from your environment.ts: http://localhost:9091/api/transactions
  private apiUrl = `${environment.apiBaseUrl}/api/transactions`;

  constructor(private http: HttpClient) {}

  /**
   * Fetches all transactions from the MySQL database via Spring Boot.
   * Matches Spring Boot: @GetMapping("/all")
   */
  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/all`);
  }

  /**
   * Updates the status of a specific transaction.
   * Matches Spring Boot: @PutMapping("/{id}/status") 
   * Note: It uses @RequestParam for the status string.
   */
  updateStatus(id: number | string, newStatus: string): Observable<any> {
    // Passing status as a query parameter as required by your @RequestParam in Java
    return this.http.put(`${this.apiUrl}/${id}/status`, null, {
      params: { status: newStatus }
    });
  }

  /**
   * Optional: Fetch balance for a specific user
   * Matches Spring Boot: @GetMapping("/balance/{userId}")
   */
  getBalance(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/balance/${userId}`);
  }
}