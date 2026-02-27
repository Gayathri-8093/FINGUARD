import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Onboarding } from '../../../core/services/onboarding';
import { OnboardingApplication } from '../../../core/models/onboarding.model';
import { UiState } from '../../../shared/services/ui-state';

@Component({
  selector: 'app-customer-onboarding-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-onboarding-list.html',
  styleUrl: './customer-onboarding-list.css',
})
export class CustomerOnboardingList implements OnInit {
  applications: OnboardingApplication[] = [];
  isLoading: boolean = true;
  private refreshInterval: any;

  constructor(
    private onboarding: Onboarding,
    private router: Router,
    private uiState: UiState,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadApplications();

    this.refreshInterval = setInterval(() => {
      if (this.applications.length === 0) {
        console.log("Automatic retry fetching data...");
        this.loadApplications();
      } else {
        this.stopInterval(); 
      }
    }, 1000);
  }

  loadApplications() {
    this.onboarding.getAll().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.applications = data
            .sort((a: OnboardingApplication, b: OnboardingApplication) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
            .slice(0, 10);
          
          this.isLoading = false;
          this.cdr.detectChanges(); 
          this.stopInterval(); 
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private stopInterval() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  goToNewOnboarding() {
    this.router.navigate(['/banker/onboarding/new']);
  }
}
