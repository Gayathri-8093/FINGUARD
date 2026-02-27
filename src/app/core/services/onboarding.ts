import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Onboarding {
  private baseUrl = `${environment.apiBaseUrl}/api/onboarding`;

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  updateStatus(applicationId: string, status: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${applicationId}/status?status=${status}`, {}
    );
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}