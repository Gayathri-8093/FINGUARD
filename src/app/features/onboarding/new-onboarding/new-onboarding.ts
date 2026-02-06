import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { Onboarding } from '../../../core/services/onboarding';
import { OnboardingApplication } from '../../../core/models/onboarding.model';


@Component({
  selector: 'app-new-onboarding',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './new-onboarding.html',
  styleUrl: './new-onboarding.css',
})
export class NewOnboarding {
  currentStep = 1;
 
  customerForm!: FormGroup<{
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
  
  mobileOtp = '';
  emailOtp = '';

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
    
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }
  
    
    const formValue = this.customerForm.getRawValue();
 
    const fullName = formValue.fullName;
    const mobile = formValue.mobile;
    const email = formValue.email;
  
    
    if (!fullName || !mobile) {
      return;
    }
  
   
    const newApplication: OnboardingApplication = {
      applicationId: 'KYC' + Math.floor(1000 + Math.random() * 9000),
      name: fullName,
      email: email,
      mobile: mobile,
      date: new Date().toLocaleDateString(),
      status: 'Pending'
    };
  
    
    this.onboardingService.addApplication(newApplication);
  
   
    alert(
      'KYC Submitted Successfully!\n\n' +
      'The application will be reviewed and the status will be updated within 3 working days.'
    );
  
 
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
