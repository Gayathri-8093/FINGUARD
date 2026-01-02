import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule,FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
   email = '';
 password = '';
 constructor(private router: Router) {}
 login() {
   if (this.email === 'banker@finguard.com' && this.password === 'banker123') {
     localStorage.setItem('role', 'banker');
     this.router.navigate(['/banker-dashboard']);
   }
   else if (this.email === 'admin@finguard.com' && this.password === 'admin123') {
     localStorage.setItem('role', 'admin');
     this.router.navigate(['/admin-dashboard']);
   }
   else {
     alert('Invalid Credentials');
   }
 }
}
