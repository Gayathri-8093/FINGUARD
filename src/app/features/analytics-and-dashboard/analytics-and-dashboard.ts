import { Component, AfterViewInit, OnInit,ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AnalyticsService, ChartData } from '../../core/services/analytics-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics-and-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-and-dashboard.html',
  styleUrl: './analytics-and-dashboard.css',
})
export class AnalyticsAndDashboard implements OnInit {
  activeTab: 'patterns' | 'drilldown' = 'patterns';
  private charts: { [key: string]: Chart } = {};

  constructor(private analyticsService: AnalyticsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.refreshDashboard();
  }


  setTab(tab: 'patterns' | 'drilldown') {
    this.activeTab = tab;
  }

  refreshDashboard() {
    this.cdr.detectChanges();
    this.analyticsService.getRiskDistribution().subscribe(data => {
      this.createPieChart('riskChart', data, ['#22c55e', '#f59e0b', '#ef4444']);
    });

    this.analyticsService.getStatusBreakdown().subscribe(data => {
      this.createBarChart('fraudTrends', data, 'Transaction Status', '#2563eb');
    });

    this.analyticsService.getChannelVolume().subscribe(data => {
      this.createHorizontalBarChart('channelPerformanceChart', data);
    });

    this.analyticsService.getAlertSeverity().subscribe(data => {
      this.createLineChart('transactionVolume', data);
    });
  }

  createPieChart(id: string, data: ChartData[], colors: string[]) {
    this.destroyChart(id);
    this.charts[id] = new Chart(id, {
      type: 'pie',
      data: {
        labels: data.map(d => d.label),
        datasets: [{
          data: data.map(d => d.value),
          backgroundColor: colors
        }]
      },
      options: { responsive: true, plugins: { legend: { position: 'right' } } }
    });
  }

  createBarChart(id: string, data: ChartData[], label: string, color: string) {
    this.destroyChart(id);
    this.charts[id] = new Chart(id, {
      type: 'bar',
      data: {
        labels: data.map(d => d.label),
        datasets: [{
          label: label,
          data: data.map(d => d.value),
          backgroundColor: color,
          borderRadius: 6
        }]
      }
    });
  }

  createLineChart(id: string, data: ChartData[]) {
    this.destroyChart(id);
    this.charts[id] = new Chart(id, {
      type: 'line',
      data: {
        labels: data.map(d => d.label),
        datasets: [{
          label: 'Alerts',
          data: data.map(d => d.value),
          borderColor: '#ef4444',
          fill: true,
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4
        }]
      }
    });
  }

  createHorizontalBarChart(id: string, data: ChartData[]) {
    this.destroyChart(id);
    this.charts[id] = new Chart(id, {
      type: 'bar',
      data: {
        labels: data.map(d => d.label),
        datasets: [{
          label: 'Volume',
          data: data.map(d => d.value),
          backgroundColor: '#3b82f6'
        }]
      },
      options: { indexAxis: 'y', responsive: true }
    });
  }

  private destroyChart(id: string) {
    if (this.charts[id]) {
      this.charts[id].destroy();
    }
  }
}