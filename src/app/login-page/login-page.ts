import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone:true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  form!:FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
  this.form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[A-Za-z0-9@#$%^&+=!._-]{6,}$/),
      ],
    ],
  });
}

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.value;

    if (email === 'banker@finguard.com' && password === 'banker123') {
      localStorage.setItem('role', 'BANKER');
      this.router.navigate(['/banker']);
    } else if (email === 'admin@finguard.com' && password === 'admin123') {
      localStorage.setItem('role', 'ADMIN');
      this.router.navigate(['/admin']);
    } else {
      alert('Invalid Credentials');
    }
  }
}
