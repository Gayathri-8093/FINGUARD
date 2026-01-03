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
      mobile: '9XXXXXXXXX',
      date: '12-May-2026',
      status: 'Pending'
    },
    {
      applicationId: 'KYC1002',
      name: 'Anjali Sharma',
      mobile: '8XXXXXXXXX',
      date: '11-May-2026',
      status: 'Approved'
    }
  ];
 
  getApplications(): OnboardingApplication[] {
    return this.applications;
  }
 
  addApplication(app: OnboardingApplication) {
    this.applications.unshift(app); // add on top
  }
}
