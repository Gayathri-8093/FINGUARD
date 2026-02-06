
import { Component} from '@angular/core';
import { UiState } from '../services/ui-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  showProfile = false;
 
  userName = '';
  userEmail = '';
  userRole: 'ADMIN' | 'BANKER' | 'CUSTOMER' | '' = '';
 
  constructor(
    private uiStateService: UiState,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.userName = localStorage.getItem('name') || 'User';
    this.userEmail = localStorage.getItem('email') || '';
    this.userRole = localStorage.getItem('role') as 'ADMIN' | 'BANKER' | 'CUSTOMER';
  }
 

  toggleSidebar() {
    this.uiStateService.toggleSidebar();
  }
 

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }
 
 
  goToDashboard() {
    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
    } else if(this.userRole === 'BANKER'){
      this.router.navigate(['/banker/dashboard']);
    } else{
      this.router.navigate(['/customer/dashboard']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
