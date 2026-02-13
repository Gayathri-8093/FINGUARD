import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnboardingApplication } from '../../core/models/onboarding.model';
import { Onboarding } from '../../core/services/onboarding';
import { CommonModule } from '@angular/common';
import { UiState } from '../../shared/services/ui-state';


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
  isLoading = true;
 
  kycList: OnboardingApplication[] = [];
    constructor(
      private onboardingService: Onboarding,
      private cdr: ChangeDetectorRef,
      private uiState: UiState
    ){}
    ngOnInit(): void {
    // Logic: Listen for the refresh signal from the Header
    this.uiState.refreshRequested$.subscribe(() => {
      this.loadKyc();
    });

    // Initial load
    this.loadKyc();
  }
// loadKyc() {
//  this.onboardingService.getAll()
//    .subscribe((data: any) => {
//      this.kycList = data;
//    });
// }
  
  loadKyc() {
    this.isLoading = true;
    this.onboardingService.getAll().subscribe({
      next: (data: OnboardingApplication[]) => {
        // Sort: Newest first (using a, b parameters)
        this.kycList = data.sort((a: OnboardingApplication, b: OnboardingApplication) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        
        this.isLoading = false;
        // THIS IS THE FIX: Forces the Admin list to show up on refresh
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error loading KYC list', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
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
