import { Injectable } from '@angular/core';
 
export type UserRole = 'ADMIN' | 'BANKER';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private role: UserRole | null = null;
 
  setRole(role: UserRole) {
    this.role = role;
    localStorage.setItem('role', role); 
  }
 
  getRole(): UserRole | null {
    return this.role || (localStorage.getItem('role') as UserRole | null);
  }
 
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
 
  isBanker(): boolean {
    return this.getRole() === 'BANKER';
  }
 
  isLoggedIn(): boolean {
    return this.getRole() !== null;
  }
 
  logout() {
    this.role = null;
    localStorage.removeItem('role');
  }
}
 