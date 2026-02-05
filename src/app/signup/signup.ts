import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  standalone:true,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm!: FormGroup;
  submitted = false;
 
  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', 
          [Validators.required, 
           Validators.minLength(8),
           Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$')]],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }
 
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
 
    if (password && confirmPassword !== confirmPassword) 
    {
      return {mismatch: true};
    }
    return null; 
  }
 
  onSubmit() {
    this.submitted = true;
 
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
 
    console.log('Signup Data:', this.signupForm.value);
 
    // API call will come here later
  }
 
  get f() {
    return this.signupForm.controls;
  }

}
