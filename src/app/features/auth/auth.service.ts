import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User
} from '../../core/models/user.model';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly baseUrl = `${environment.apiUrl}/api/auth`;

  // Reactive state signals for UI reactivity
  readonly currentUser = signal<User | null>(this.getStoredUser());
  readonly isAuthenticated = signal<boolean>(this.isLoggedIn());

  constructor() {
    // Sync state on initialization
    this.syncAuthState();
  }

  /**
   * Authenticate user with email and password
   */
  login(credentials: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.success && response.data) {
          this.handleAuthSuccess(response.data);
        }
      })
    );
  }

  /**
   * Register a new user
   */
  register(data: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/register`, data).pipe(
      tap((response) => {
        if (response.success && response.data) {
          this.handleAuthSuccess(response.data);
        }
      })
    );
  }

  /**
   * Logout user, clear storage and navigate to login
   */
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  /**
   * Retrieve JWT token from localStorage
   */
  getToken(): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Retrieve current user role
   */
  getUserRole(): string | null {
    const user = this.currentUser();
    if (user?.role) {
      return String(user.role);
    }

    // Fallback: check JWT payload claims
    const token = this.getToken();
    if (token) {
      const payload = this.decodeTokenPayload(token);
      if (payload?.role) {
        return payload.role;
      }
    }
    return null;
  }

  /**
   * Retrieve current user ID
   */
  getUserId(): number | null {
    const user = this.currentUser();
    if (user?.userId) {
      return Number(user.userId);
    }
    if (user?.id) {
      return Number(user.id);
    }

    const token = this.getToken();
    if (token) {
      const payload = this.decodeTokenPayload(token);
      if (payload?.userId) {
        return Number(payload.userId);
      }
    }
    return null;
  }

  /**
   * Check whether user is currently logged in
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Verify token expiration
    const payload = this.decodeTokenPayload(token);
    if (payload?.exp) {
      const expirationDate = new Date(payload.exp * 1000);
      if (expirationDate <= new Date()) {
        this.logout();
        return false;
      }
    }

    return true;
  }

  /**
   * Helper to store session after successful login or registration
   */
  private handleAuthSuccess(authData: AuthResponse): void {
    if (this.isBrowser()) {
      localStorage.setItem(TOKEN_KEY, authData.token);
      const user: User = {
        userId: authData.userId,
        id: authData.userId,
        email: authData.email,
        name: authData.name,
        role: authData.role,
        profession: authData.profession
      };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
    }
  }

  private getStoredUser(): User | null {
    if (!this.isBrowser()) {
      return null;
    }
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  }

  private syncAuthState(): void {
    if (this.isLoggedIn()) {
      const stored = this.getStoredUser();
      if (stored) {
        this.currentUser.set(stored);
      } else {
        const token = this.getToken();
        if (token) {
          const payload = this.decodeTokenPayload(token);
          if (payload) {
            this.currentUser.set({
              userId: payload.userId,
              id: payload.userId,
              email: payload.email || payload.sub,
              name: payload.name || '',
              role: payload.role || ''
            });
          }
        }
      }
      this.isAuthenticated.set(true);
    } else {
      this.currentUser.set(null);
      this.isAuthenticated.set(false);
    }
  }

  private decodeTokenPayload(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
