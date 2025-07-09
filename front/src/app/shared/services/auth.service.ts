import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  firstname: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api';
  
  private readonly _isAuthenticated = signal<boolean>(false);
  private readonly _currentUser = signal<any>(null);
  
  public readonly isAuthenticated = this._isAuthenticated.asReadonly();
  public readonly currentUser = this._currentUser.asReadonly();
  
  constructor() {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      this._isAuthenticated.set(true);
      // You could decode the JWT to get user info
    }
  }
  
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/token`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this._isAuthenticated.set(true);
      })
    );
  }
  
  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/account`, userData);
  }
  
  logout(): void {
    localStorage.removeItem('token');
    this._isAuthenticated.set(false);
    this._currentUser.set(null);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}