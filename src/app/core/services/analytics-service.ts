import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ChartData {
  label: string;
  value: number;
}


@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private baseUrl = 'http://localhost:9091/api/analytics';

  constructor(private http: HttpClient) {}

  getRiskDistribution(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(`${this.baseUrl}/risk-distribution`);
  }

  getStatusBreakdown(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(`${this.baseUrl}/status-breakdown`);
  }

  getChannelVolume(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(`${this.baseUrl}/channel-volume`);
  }

  getAlertSeverity(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(`${this.baseUrl}/alert-severity`);
  }
  
}
