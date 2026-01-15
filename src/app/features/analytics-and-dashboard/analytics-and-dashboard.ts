
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-analytics-and-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './analytics-and-dashboard.html',
  styleUrl: './analytics-and-dashboard.css',
})
export class AnalyticsAndDashboard {
  activeTab: 'patterns' | 'drilldown' = 'patterns';
  setTab(tab: 'patterns' | 'drilldown') {
    this.activeTab = tab;
  }

  ngAfterViewInit(): void {
    this.loadFraudTrendsChart();
    this.loadRiskChart();
    this.loadTransactionVolumeChart();
    this.loadChannelPerformanceChart();
  }


  loadFraudTrendsChart() {
    new Chart('fraudTrends', {
      type: 'bar',
      data: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Fraud Incidents',
            data: [45, 52, 38, 61, 47, 42],
            backgroundColor: '#ef4444',
            hoverBackgroundColor: '#dc2626',
            borderRadius: 6
          },

          {
            label: 'Prevented',
            data: [42, 48, 35, 55, 44, 40],
            backgroundColor: '#22c55e',
            hoverBackgroundColor: '#16a34a',
            borderRadius: 6
          }
        ]
      },

      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false
        },

        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#64748b',
              font: { size: 12 }
            }

          },

          tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#111827',
            bodyColor: '#374151',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx) =>
                `${ctx.dataset.label} : ${ctx.formattedValue}`
            }
          }
        },

        scales: {
          x: {
            grid: { color: '#e5e7eb' },
            ticks: { color: '#64748b' }
          },
          y: {
            beginAtZero: true,
            grid: { color: '#e5e7eb' },
            ticks: { color: '#64748b' }
          }
        }
      }
    });

  }
  loadRiskChart() {
    new Chart('riskChart', {
      type: 'pie',
      data: {
        labels: ['Low Risk', 'Medium Risk', 'High Risk'],
        datasets: [
          {
            data: [76, 20, 4],
            backgroundColor: [
              '#22c55e', 

              '#f59e0b',

              '#ef4444' 
            ],
            hoverOffset: 10
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#64748b',
              font: { size: 12 }
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed}%`
            }
          }
        }
      }
    });
  }
  loadTransactionVolumeChart() {
    new Chart('transactionVolume', {
      type: 'line',
      data: {
        labels: ['03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
        datasets: [
          {
            label: 'Transactions',
            data: [200, 180, 500, 1200, 1800, 2100, 1000],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.15)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },

      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#64748b',
              font: { size: 12 }

            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `Transactions: ${ctx.formattedValue}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: '#e5e7eb' },
            ticks: { color: '#64748b' }
          },
          y: {
            beginAtZero: true,
            grid: { color: '#e5e7eb' },
            ticks: { color: '#64748b' }
          }
        }
      }
    });

  }
  loadChannelPerformanceChart() {
    new Chart('channelPerformanceChart', {
      type: 'bar',
      data: {
        labels: ['Online', 'Mobile App', 'ATM', 'Wire Transfer'],
        datasets: [
          {
            label: 'Fraud Cases',
            data: [120, 98, 65, 30],
            backgroundColor: '#ef4444',
            borderRadius: 6,
            barPercentage: 0.5
          },
          {
            label: 'Total Transactions',
            data: [4600, 3800, 2400, 1100],
            backgroundColor: '#2563eb',
            borderRadius: 6,
            barPercentage: 0.5
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false   
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1500
            }
          }
        }
      }
    });
  }
}