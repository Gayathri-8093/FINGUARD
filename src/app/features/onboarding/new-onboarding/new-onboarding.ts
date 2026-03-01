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
  
  sendEmailOtp() {
    this.emailOtpSent = true;
    alert('Email OTP sent (Demo: 123456)');
  }

  verifyEmailOtp() {
    if (this.emailOtp === '123456') {
      this.emailVerified = true;
      alert('Email Verified!');
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
    // 1. Check if all files are selected
    if (!this.aadhaarFrontFile || !this.aadhaarBackFile || !this.panFile || !this.photoFile) {
      alert("Please upload all required documents before submitting.");
      return;
    }

    const formValue = this.customerForm.getRawValue();
    const formData = new FormData();

    // 2. Prepare JSON data as a Blob for the @RequestPart("customer") in Spring Boot
    const customerData = {
      fullName: formValue.fullName,
      email: formValue.email,
      mobile: formValue.mobile,
      address: formValue.address,
      dateOfBirth: formValue.dob, // Ensure this matches backend LocalDate format (YYYY-MM-DD)
      gender: formValue.gender
    };

    formData.append('customer', new Blob([JSON.stringify(customerData)], {
      type: 'application/json'
    }));

    // 3. Append physical files using keys that match your Java @RequestPart names
    formData.append('aadhaarFront', this.aadhaarFrontFile);
    formData.append('aadhaarBack', this.aadhaarBackFile);
    formData.append('panCard', this.panFile);
    formData.append('photo', this.photoFile);

    // 4. Call the service
    this.onboardingService.create(formData).subscribe({
      next: () => {
        alert('KYC Submitted Successfully');
        this.router.navigate(['/banker/onboarding']);
      },
      error: (err) => {
        console.error("KYC Submission Error:", err);
        alert('Failed to submit KYC. Please check the console for details.');
      }
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