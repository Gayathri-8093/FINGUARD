import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface Transaction {
  id: number;
  recipientAppId: string;
  amount: number;
  channel: string;
  riskLevel: string;
  status: string;
  createdAt: string;
  recipient: {
    id: number;
    name: string;
    applicationId?: string;
  };
}
export interface UserProfile {
  fullName: string;
  applicationId: string;
}
@Injectable({
  providedIn: 'root'
})
export class CustomerTxService {
  private baseUrl = `${environment.apiBaseUrl}/api/transactions`;
  private userUrl = `${environment.apiBaseUrl}/api/onboarding`;
  constructor(private http: HttpClient) {}
  sendTransaction(payload: any): Observable<Transaction> {
  //const token = localStorage.getItem('token');
  return this.http.post<Transaction>(this.baseUrl, payload, {
    //headers: { 'Authorization': `Bearer ${token}` }
  });
}

  getTransactions(userId: number): Observable<Transaction[]> {

    return this.http.get<Transaction[]>(`${this.baseUrl}/${userId}`);

  }

  getBalance(userId: number): Observable<number> {

    return this.http.get<number>(`${this.baseUrl}/balance/${userId}`);

  }
  getProfile(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.userUrl}/profile/${userId}`);
  }

}
 
  