import { Injectable } from '@angular/core';
 
@Injectable({ providedIn: 'root' })
export class AuthService {
  private role: 'ADMIN' | 'BANKER' | null = null;
 
  setRole(role: 'ADMIN' | 'BANKER') {
    this.role = role;
  }
 
  getRole(): 'ADMIN' | 'BANKER' | null {
    return localStorage.getItem('role') as 'ADMIN' | 'BANKER' | null;
  }
  
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
  
  isBanker(): boolean {
    return this.getRole() === 'BANKER';
  }
 
  isLoggedIn(): boolean {
    return this.role !== null;
  }
 
  logout() {
    this.role = null;
  }
}
 