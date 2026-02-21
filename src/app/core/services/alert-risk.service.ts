import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Added for API calls
import { Observable } from 'rxjs'; // Added to handle async data streams
import { Alert } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertRiskService {
  // Summary: Points to the new Spring Boot AlertController endpoint
  private apiUrl = 'http://localhost:9091/api/alerts'; 

  constructor(private http: HttpClient) {} // Summary: Injected HttpClient

  // Summary: Changed return type to Observable so the component can subscribe to backend data
  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.apiUrl);
  }

  // Summary: Updates alert status in the database via a PUT request
  updateAlertStatus(id: string, status: string): Observable<Alert> {
    return this.http.put<Alert>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }
}