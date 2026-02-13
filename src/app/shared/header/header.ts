import { Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { UiState } from '../services/ui-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  showProfile = false;
 
  userName = '';
  userEmail = '';
  userRole: 'ADMIN' | 'BANKER' | 'CUSTOMER' | '' = '';
 
  constructor(
    private uiStateService: UiState,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  this.userName = localStorage.getItem('name') || 'User';
  this.userEmail = localStorage.getItem('email') || '';
  this.userRole = localStorage.getItem('role') as any;

  setTimeout(() => {
    this.uiStateService.triggerRefresh();
  }, 100); 
}

  toggleSidebar() {
    this.uiStateService.toggleSidebar();
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  goToDashboard() {
    const currentUrl = this.router.url;
    let targetPath = '';

    if (this.userRole === 'ADMIN') targetPath = '/admin/dashboard';
    else if (this.userRole === 'BANKER') targetPath = '/banker/dashboard';
    else targetPath = '/customer/dashboard';

    // Logic: If already on the page, force a data reload instead of just navigating
    if (currentUrl === targetPath) {
        window.location.reload(); // Hard refresh if they click home while home
    } else {
        this.router.navigate([targetPath]);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}


// import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Add ChangeDetectorRef
// import { UiState } from '../services/ui-state';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [],
//   templateUrl: './header.html',
//   styleUrl: './header.css',
// })
// export class Header implements OnInit { // Add 'implements OnInit'
//   showProfile = false;
//   userName = '';
//   userEmail = '';
//   userRole: 'ADMIN' | 'BANKER' | 'CUSTOMER' | '' = '';

//   constructor(
//     private uiStateService: UiState,
//     private router: Router,
//     private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
//   ) {}

//   ngOnInit() {
//     this.loadUserData();
    
//     // Virtual click logic to wake up dashboards
//     setTimeout(() => {
//       this.uiStateService.triggerRefresh();
//     }, 100);
//   }

//   loadUserData() {
//     // Logic: Pull data and immediately tell Angular to update the view
//     this.userName = localStorage.getItem('name') || 'User';
//     this.userEmail = localStorage.getItem('email') || '';
//     this.userRole = localStorage.getItem('role') as any;
    
//     // THIS IS THE FIX: It tells Angular "The name changed, show it now!"
//     this.cdr.detectChanges();
//   }

//   toggleSidebar() {
//     this.uiStateService.toggleSidebar();
//   }

//   toggleProfile() {
//     this.showProfile = !this.showProfile;
//     // Ensure data is fresh when opening the profile menu
//     if (this.showProfile) {
//       this.loadUserData();
//     }
//   }

//   goToDashboard() {
//     const currentUrl = this.router.url;
//     let targetPath = '';

//     if (this.userRole === 'ADMIN') targetPath = '/admin/dashboard';
//     else if (this.userRole === 'BANKER') targetPath = '/banker/dashboard';
//     else targetPath = '/customer/dashboard';

//     if (currentUrl === targetPath) {
//         window.location.reload(); 
//     } else {
//         this.router.navigate([targetPath]);
//     }
//   }

//   logout() {
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }
// }