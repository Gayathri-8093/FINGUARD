import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Onboarding } from '../services/onboarding';
import { OnboardingApplication } from '../models/onboarding.model';

@Component({
  selector: 'app-new-onboarding',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './new-onboarding.html',
  styleUrl: './new-onboarding.css',
})
export class NewOnboarding {
  currentStep = 1;
 
  customerForm;

  mobileOtpSent = false;
  emailOtpSent = false;
  
  mobileVerified = false;
  emailVerified = false;
  
  mobileOtp = '';
  emailOtp = '';

  aadhaarFrontFile?: File;
  aadhaarBackFile?: File;
  panFile?: File;
  photoFile?: File;
 
  constructor(private fb: FormBuilder, private router: Router, private onboardingService: Onboarding) {
  this.customerForm = this.fb.group({
    fullName: ['', Validators.required],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
    address: ['', Validators.required],
    mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    email: ['', [Validators.required, Validators.email]]
  });
}
 
  nextStep() {
    if (this.currentStep === 1) {
      if (this.customerForm.invalid || !this.mobileVerified || !this.emailVerified) {
        this.customerForm.markAllAsTouched();
        alert('Please complete OTP verification');
        return;
      }
    }
    this.currentStep++;
  }
 
  previousStep() {
    this.currentStep--;
  }
 
  submit() {
    // 1️⃣ Guard clause – stop if form is invalid
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }
  
    // 2️⃣ Safely extract values (NO type assertion)
    const {
      fullName,
      mobile
    } = this.customerForm.getRawValue();
  
    // 3️⃣ Defensive check (extra safety for strict mode)
    if (!fullName || !mobile) {
      return;
    }
  
    // 4️⃣ Map explicitly to domain model
    const newApplication: OnboardingApplication = {
      applicationId: 'KYC' + Math.floor(1000 + Math.random() * 9000),
      name: fullName,
      mobile: mobile,
      date: new Date().toLocaleDateString(),
      status: 'Pending'
    };
  
    // 5️⃣ Update shared service (mock backend)
    this.onboardingService.addApplication(newApplication);
  
    // 6️⃣ User feedback
    alert(
      'KYC Submitted Successfully!\n\n' +
      'The application will be reviewed and the status will be updated within 3 working days.'
    );
  
    // 7️⃣ Redirect
    this.router.navigate(['/banker/onboarding']);
  }

  sendMobileOtp() {
  this.mobileOtpSent = true;
  alert('Mobile OTP sent (Demo OTP: 123456)');
}
 
  verifyMobileOtp() {
    const enteredOtp=this.mobileOtp?.toString().trim();

    if (enteredOtp === '123456') {
      this.mobileVerified = true;
    } else {
      alert('Invalid Mobile OTP');
    }
  }
  
  sendEmailOtp() {
    this.emailOtpSent = true;
    alert('Email OTP sent (Demo OTP: 123456)');
  }
  
  verifyEmailOtp() {
  const enteredOtp = this.emailOtp?.toString().trim();
  if (enteredOtp === '123456') {
    this.emailVerified = true;
  } else {
    alert('Invalid Email OTP');
  }
}
  onFileSelect(event: Event, type: string) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
 
  switch (type) {
    case 'aadhaarFront':
      this.aadhaarFrontFile = file;
      break;
    case 'aadhaarBack':
      this.aadhaarBackFile = file;
      break;
    case 'pan':
      this.panFile = file;
      break;
    case 'photo':
      this.photoFile = file;
      break;
  }
}
}
