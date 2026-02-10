import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BankerService {
  private API_URL = `${environment.apiBaseUrl}/banker`;

  constructor(private http: HttpClient) {}

  getDashboard() {
    // This will hit http://localhost:9091/banker/dashboard
    return this.http.get<any>(`${this.API_URL}/dashboard`);
  }
}
