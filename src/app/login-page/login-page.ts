import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone:true,
  imports: [FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  form!:FormGroup;
  constructor(private fb: FormBuilder, private router: Router,private authService:AuthService) {
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

  login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.value;

    if (email === 'banker@finguard.com' && password === 'banker123') {
      this.authService.setRole('BANKER');
      localStorage.setItem('email', email);
      localStorage.setItem('name', 'Banker User');
      this.router.navigate(['/banker']);
    }
    else if (email === 'admin@finguard.com' && password === 'admin123') {
      this.authService.setRole('ADMIN');
      localStorage.setItem('email', email);
      localStorage.setItem('name', 'Admin User');
      this.router.navigate(['/admin']);
    }
    else if (email === 'customer@finguard.com' && password === 'customer123') {
      this.authService.setRole('CUSTOMER');
      localStorage.setItem('email', email);
      localStorage.setItem('name', 'Customer User');
      this.router.navigate(['/customer']);
    } else {
      alert('Invalid Credentials');
    }
  }
}
