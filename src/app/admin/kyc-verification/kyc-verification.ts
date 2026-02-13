
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnboardingApplication } from '../../core/models/onboarding.model';
import { Onboarding } from '../../core/services/onboarding';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-kyc-verification',
  imports: [FormsModule,CommonModule],
  templateUrl: './kyc-verification.html',
  styleUrl: './kyc-verification.css',
})
export class KycVerification implements OnInit{

  view: 'list' | 'review' = 'list';
  selectedKyc?: OnboardingApplication;
  remarks = '';
 
  kycList: OnboardingApplication[] = [];
    constructor(private onboardingService: Onboarding){}
    ngOnInit(): void {
 this.loadKyc();
}
loadKyc() {
 this.onboardingService.getAll()
   .subscribe((data: any) => {
     this.kycList = data;
   });
}
 
  reviewKyc(kyc: OnboardingApplication) {
    this.selectedKyc = kyc;
    this.view = 'review';
  }
 
 approve() {

  if (!this.selectedKyc) return;

  this.onboardingService

    .updateStatus(this.selectedKyc.id, 'APPROVED')

    .subscribe(() => {

      alert('KYC Approved');

      this.loadKyc();   // reload from DB

      this.back();

    });

}
 
reject() {

  if (!this.selectedKyc) return;

  if (!this.remarks) {

    alert('Remarks required');

    return;

  }

  this.onboardingService

    .updateStatus(this.selectedKyc.id, 'REJECTED')

    .subscribe(() => {

      alert('KYC Rejected');

      this.loadKyc();

      this.back();

    });

}
 
 
  back() {
    this.view = 'list';
    this.remarks = '';
    this.selectedKyc = undefined;
  }
}
