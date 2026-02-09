import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BankerService {
  private baseUrl = environment.apiBaseUrl;
 
  constructor(private http: HttpClient) {}
 
  getDashboard() {
    return this.http.get(`${this.baseUrl}/banker/dashboard`);
  }  
}
