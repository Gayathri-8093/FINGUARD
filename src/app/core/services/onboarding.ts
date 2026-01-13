import { Injectable } from '@angular/core';
import { OnboardingApplication } from '../models/onboarding.model';

@Injectable({
  providedIn: 'root',
})
export class Onboarding {
   private applications: OnboardingApplication[] = [
    {
      applicationId: 'KYC1001',
      name: 'Ramesh Kumar',
      mobile: '9849891099',
      email: 'alice@example.com',
      date: '12-May-2026',
      status: 'Pending'
    },
    {
      applicationId: 'KYC1002',
      name: 'Anjali Sharma',
      mobile: '8027893779',
      email: 'bob@example.com',
      date: '11-May-2026',
      status: 'Approved'
    }
  ];
 
  getApplications(): OnboardingApplication[] {
    return this.applications;
  }
 
  addApplication(app: OnboardingApplication) {
    this.applications.unshift(app); 
  }
}
