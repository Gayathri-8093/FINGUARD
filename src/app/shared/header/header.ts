import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { UiState } from '../services/ui-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  showProfile = false;
 
  constructor(
    private uiStateService: UiState,
    private router: Router
  ) {}
 
  // 🔹 Called when hamburger icon is clicked
  toggleSidebar() {
    this.uiStateService.toggleSidebar();
  }
 
  // 🔹 Show / hide profile dropdown
  toggleProfile() {
    this.showProfile = !this.showProfile;
  }
 
  // 🔹 Logout logic
  logout() {
    // later: clear tokens/session here
    this.router.navigate(['/login']);
  }
}
