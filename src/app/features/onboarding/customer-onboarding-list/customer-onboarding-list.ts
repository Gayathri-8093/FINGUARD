import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Onboarding } from '../../../core/services/onboarding';
import { OnboardingApplication } from '../../../core/models/onboarding.model';

@Component({
  selector: 'app-customer-onboarding-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-onboarding-list.html',
  styleUrl: './customer-onboarding-list.css',
})
export class CustomerOnboardingList implements OnInit {
   applications: OnboardingApplication[] = [];
 
  constructor(
    private onboarding: Onboarding,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.applications = this.onboarding.getApplications();
  }
 
  goToNewOnboarding() {
    this.router.navigate(['/banker/onboarding/new']);
  }
}
