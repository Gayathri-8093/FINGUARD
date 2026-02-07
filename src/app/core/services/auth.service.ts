import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

export type UserRole = 'ADMIN' | 'BANKER' | 'CUSTOMER';

@Injectable({

  providedIn: 'root'

})

export class AuthService {

  private API_URL = 'http://localhost:9090/api/auth';

  constructor(private http: HttpClient) {}

  // ================= SIGNUP =================

  signup(payload: any): Observable<any> {

    return this.http.post(`${this.API_URL}/signup`, payload);

  }

  // ================= LOGIN =================

  login(payload: any): Observable<any> {

    return this.http.post<any>(`${this.API_URL}/login`, payload).pipe(

      tap((res) => {

        localStorage.setItem('token', res.token);

        localStorage.setItem('role', res.role);

        localStorage.setItem('email', res.email);

      })

    );

  }

  // ================= ROLE HELPERS (FIXES ALL ERRORS) =================

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

  // ================= LOGOUT =================

  logout(): void {

    localStorage.clear();

  }

}
 