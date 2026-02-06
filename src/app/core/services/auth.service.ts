import { Injectable } from '@angular/core';

export type UserRole = 'ADMIN' | 'BANKER' | 'CUSTOMER';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private role: UserRole | null = null;

  /**
   * Persist the selected role and cache it in memory
   */
  setRole(role: UserRole) {
    this.role = role;
    localStorage.setItem('role', role);
  }

  /**
   * Returns the currently active role (reads from cache, falls back to localStorage).
   * Also refreshes the in-memory cache if it was empty.
   */
  getRole(): UserRole | null {
    if (this.role) return this.role;
    const stored = localStorage.getItem('role') as UserRole | null;
    this.role = stored ?? null;
    return this.role;
  }

  /**
   * Convenience: true if any role is set.
   */
  isLoggedIn(): boolean {
    return this.getRole() !== null;
  }

  /**
   * Role checks (existing)
   */
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isBanker(): boolean {
    return this.getRole() === 'BANKER';
  }

  /**
   * ⭐ NEW: Customer role check
   */
  isCustomer(): boolean {
    return this.getRole() === 'CUSTOMER';
  }

  /**
   * ⭐ NEW: Generic helpers (useful for guards/components)
   */
  isInRole(role: UserRole): boolean {
    return this.getRole() === role;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const r = this.getRole();
    return !!r && roles.includes(r);
  }

  /**
   * Clear role and storage
   */
  logout() {
    this.role = null;
    localStorage.removeItem('role');
  }
}