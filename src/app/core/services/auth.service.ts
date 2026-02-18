import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';
 
export type UserRole = 'ADMIN' | 'BANKER' | 'CUSTOMER';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private API_URL = `${environment.apiBaseUrl}/auth`;
 
  constructor(private http: HttpClient) {}
 
  // ========================
  // REGISTER
  // ========================
  register(payload: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) {
    return this.http.post<any>(`${this.API_URL}/register`, payload);
  }
 

  login(payload: { email: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${this.API_URL}/login`, payload)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
 
          const claims = this.parseJwt(res.token);
          localStorage.setItem('email', claims.sub);
          localStorage.setItem('role', claims.role);

            if (claims.userId) {
            localStorage.setItem('userId', claims.userId.toString());
          } else if (claims.id) {
            localStorage.setItem('userId', claims.id.toString());
          }
        })
      );
  }
 
 
  getRole(): UserRole | null {
    return localStorage.getItem('role') as UserRole | null;
  }
 
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
 
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
 
  isBanker(): boolean {
    return this.getRole() === 'BANKER';
  }
 
  isCustomer(): boolean {
    return this.getRole() === 'CUSTOMER';
  }
 
  isInRole(role: UserRole): boolean {
    return this.getRole() === role;
  }
 
  hasAnyRole(roles: UserRole[]): boolean {
    const role = this.getRole();
    return !!role && roles.includes(role);
  }
 

  logout(): void {
    localStorage.clear();
  }

  private parseJwt(token: string): any {
    const base64 = token
      .split('.')[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
 
    return JSON.parse(atob(base64));
  }
}
 