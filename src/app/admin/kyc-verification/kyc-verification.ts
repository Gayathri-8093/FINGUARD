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
    this.uiState.refreshRequested$.subscribe(() => {
      this.loadKyc();
    });

    this.loadKyc();
  }
  
  loadKyc() {
    this.isLoading = true;
    this.onboardingService.getAll().subscribe({
      next: (data: OnboardingApplication[]) => {
        this.kycList = data.sort((a: OnboardingApplication, b: OnboardingApplication) => {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        });
        
        this.isLoading = false;
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

  const appId = this.selectedKyc.applicationId; 

  if (!appId) {
    alert("Error: Application ID is missing.");
    return;
  }

  this.onboardingService
    .updateStatus(appId, 'APPROVED')
    .subscribe({
      next: () => {
        alert('KYC Approved');
        this.loadKyc(); 
        this.back();
      },
      error: (err) => alert("Failed to approve: " + err.message)
    });
}

reject() {
  if (!this.selectedKyc) return;

  if (!this.remarks) {
    alert('Remarks required for rejection');
    return;
  }

  const appId = this.selectedKyc.applicationId;

  this.onboardingService
    .updateStatus(appId, 'REJECTED')
    .subscribe({
      next: () => {
        alert('KYC Rejected');
        this.loadKyc();
        this.back();
      },
      error: (err) => alert("Failed to reject: " + err.message)
    });
}
 
 
  back() {
    this.view = 'list';
    this.remarks = '';
    this.selectedKyc = undefined;
  }
}
