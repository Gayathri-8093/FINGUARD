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
    const payload={
       email:this.form.value.email?.trim(),
       password : this.form.value.password
    };
    this.authService.login(payload).subscribe({
      next:(res)=>{
        alert('Login successful');

    if (res.role ==="BANKER") {
      this.router.navigate(['/banker']);
    }
    else if (res.role === 'ADMIN') {
      this.router.navigate(['/admin']);
    }
    else {
      this.router.navigate(['/customer']);
    } 
  },
  error:()=> {
      alert('Invalid Credentials');
    }
  });
  }
}
