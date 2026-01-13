
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
  userRole: 'ADMIN' | 'BANKER' | '' = '';
 
  constructor(
    private uiStateService: UiState,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.userName = localStorage.getItem('name') || 'User';
    this.userEmail = localStorage.getItem('email') || '';
    this.userRole = localStorage.getItem('role') as 'ADMIN' | 'BANKER';
  }
 
  // Hamburger toggle
  toggleSidebar() {
    this.uiStateService.toggleSidebar();
  }
 
  // Profile dropdown
  toggleProfile() {
    this.showProfile = !this.showProfile;
  }
 
  // Role-aware dashboard navigation
  goToDashboard() {
    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/banker/dashboard']);
    }
  }
 
  // Proper logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
