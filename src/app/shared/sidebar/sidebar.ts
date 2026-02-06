import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiState } from '../services/ui-state';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'], // corrected to plural
})
export class Sidebar implements OnInit {
  @Input() isOpen = false;

  isAdmin = false;
  isBanker = false;
  isCustomer = false; // ⭐ NEW

  constructor(
    private uiStateService: UiState,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // react to open/close
    this.uiStateService.sidebarOpen$.subscribe(open => (this.isOpen = open));

    // role flags (keep your existing pattern)
    this.isAdmin = this.safeBool(() => this.authService.isAdmin());
    this.isBanker = this.safeBool(() => this.authService.isBanker());

    // ⭐ NEW: Try isCustomer(); fallback to generic helpers if your service doesn't have it
    this.isCustomer =
      this.safeBool(() => (this.authService as any).isCustomer?.()) ||
      this.safeBool(() => (this.authService as any).isInRole?.('CUSTOMER')) ||
      this.safeBool(() => {
        const user = (this.authService as any).currentUser;
        return Array.isArray(user?.roles) && user.roles.includes('CUSTOMER');
      });
  }

  onMenuClick() {
    this.uiStateService.closeSidebar();
  }

  /** Guard against undefined method access or thrown errors */
  private safeBool(fn: () => any): boolean {
    try {
      const v = fn();
      return !!v;
    } catch {
      return false;
    }
  }
}