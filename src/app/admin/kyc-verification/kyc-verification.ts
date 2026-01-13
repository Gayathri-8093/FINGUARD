
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnboardingApplication } from '../../core/models/onboarding.model';
import { Onboarding } from '../../core/services/onboarding';


@Component({
  selector: 'app-kyc-verification',
  imports: [FormsModule],
  templateUrl: './kyc-verification.html',
  styleUrl: './kyc-verification.css',
})
export class KycVerification implements OnInit{
  view: 'list' | 'review' = 'list';
  selectedKyc?: OnboardingApplication;
  remarks = '';
 
  kycList: OnboardingApplication[] = [];
    constructor(private onboardingService: Onboarding){}
    ngOnInit() : void{
      this.kycList = this.onboardingService.getApplications();
    }
 
  reviewKyc(kyc: OnboardingApplication) {
    this.selectedKyc = kyc;
    this.view = 'review';
  }
 
  approve() {
    if (!this.selectedKyc) return;
    this.selectedKyc.status = 'Approved';
    alert('KYC Approved');
    this.back();
  }
 
  reject() {
    if (!this.remarks) {
      alert('Remarks required');
      return;
    }
    if (!this.selectedKyc) return;
    this.selectedKyc.status = 'Rejected';
    alert('KYC Rejected');
    this.back();
  }
 
  back() {
    this.view = 'list';
    this.remarks = '';
    this.selectedKyc = undefined;
  }
}
