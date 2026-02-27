import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { Onboarding } from '../../../core/services/onboarding';

@Component({
  selector: 'app-new-onboarding',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './new-onboarding.html',
  styleUrl: './new-onboarding.css',
})
export class NewOnboarding {
  currentStep = 1;
  
  customerForm: FormGroup<{
    fullName: FormControl<string>;
    dob: FormControl<string>;
    gender: FormControl<string>;
    address: FormControl<string>;
    mobile: FormControl<string>;
    email: FormControl<string>;
  }>;

  mobileOtpSent = false;
  emailOtpSent = false;
  mobileVerified = false;
  emailVerified = false;
  isSendingEmail = false; 
  
  mobileOtp = '';
  emailOtp = '';
  resendCountdown = 0;

  aadhaarFrontFile?: File;
  aadhaarBackFile?: File;
  panFile?: File;
  photoFile?: File;

  constructor(private fb: FormBuilder, private router: Router, private onboardingService: Onboarding) {
    this.customerForm = new FormGroup({
      fullName: new FormControl('', { nonNullable: true, validators: Validators.required }),
      dob: new FormControl('', { nonNullable: true, validators: Validators.required }),
      gender: new FormControl('', { nonNullable: true, validators: Validators.required }),
      address: new FormControl('', { nonNullable: true, validators: Validators.required }),
      mobile: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      })
    });
  }

  // sendEmailOtp() {
  //   const email = this.customerForm.controls.email.value;
  //   if (this.customerForm.controls.email.invalid) {
  //     alert('Please enter a valid email address.');
  //     return;
  //   }
  //   this.isSendingEmail = true;

  //   this.onboardingService.sendOtp(email).subscribe({
  //     next: () => {
  //       this.emailOtpSent = true;
  //       this.isSendingEmail = false;
  //       this.startResendTimer();
  //       alert('OTP sent to ' + email);
  //     },
  //     error: () => {
  //       this.isSendingEmail = false;
  //       alert('Backend Error: Could not send OTP.');
  //     }
  //   });
  // }

  // verifyEmailOtp() {
  //   const email = this.customerForm.controls.email.value;
  //   this.onboardingService.verifyOtp(email, this.emailOtp).subscribe({
  //     next: (res: any) => {
  //       if (res.success) {
  //         this.emailVerified = true;
  //         alert('Email Verified!');
  //       } else {
  //         alert('Invalid Code');
  //       }
  //     },
  //     error: () => alert('Verification service unavailable.')
  //   });
  // }

  // startResendTimer() {
  //   this.resendCountdown = 60;
  //   const interval = setInterval(() => {
  //     this.resendCountdown--;
  //     if (this.resendCountdown <= 0) clearInterval(interval);
  //   }, 1000);
  // }
   sendEmailOtp() {
    this.emailOtpSent = true;
    alert('Email OTP sent (Demo: 123456)');
  }

  verifyEmailOtp() {
    if (this.emailOtp === '123456') {
      this.emailVerified = true;
      alert('Mobile Verified!');
    } else {
      alert('Invalid Email OTP');
    }
  }

  sendMobileOtp() {
    this.mobileOtpSent = true;
    alert('Mobile OTP sent (Demo: 123456)');
  }

  verifyMobileOtp() {
    if (this.mobileOtp === '123456') {
      this.mobileVerified = true;
      alert('Mobile Verified!');
    } else {
      alert('Invalid Mobile OTP');
    }
  }

  nextStep() {
    if (this.currentStep === 1) {
      if (this.customerForm.invalid || !this.emailVerified || !this.mobileVerified) {
        this.customerForm.markAllAsTouched();
        alert('Please complete the form and verify both OTPs.');
        return;
      }
    }
    this.currentStep++;
  }

  previousStep() { this.currentStep--; }

  submit() {
    const formValue = this.customerForm.value;
    const requestData = {
      fullName: formValue.fullName,
      dateOfBirth: formValue.dob,
      gender: formValue.gender,
      address: formValue.address,
      mobile: formValue.mobile,
      email: formValue.email,
      aadhaarFront: this.aadhaarFrontFile?.name,
      aadhaarBack: this.aadhaarBackFile?.name,
      panCard: this.panFile?.name,
      photo: this.photoFile?.name
    };
    this.onboardingService.create(requestData).subscribe({
      next: () => {
        alert('KYC Submitted Successfully');
        this.router.navigate(['/banker/onboarding']);
      },
      error: () => alert('Failed to submit KYC. Please try again.')
    });
  }

  onFileSelect(event: Event, type: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (type === 'aadhaarFront') this.aadhaarFrontFile = file;
      if (type === 'aadhaarBack') this.aadhaarBackFile = file;
      if (type === 'pan') this.panFile = file;
      if (type === 'photo') this.photoFile = file;
    }
  }
}