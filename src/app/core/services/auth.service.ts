import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  
  currentUser = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);

  constructor(
    private router: Router,
    private storage: StorageService
  ) {
    this.checkAuthStatus();
  }

  login(username: string, password: string): boolean {
    // Simulación de login - reemplazar con llamada real al backend
    if (username && password) {
      const user: User = {
        id: '1',
        username: username,
        email: `${username}@example.com`,
        role: 'admin'
      };
      
      const token = 'fake-jwt-token-' + Date.now();
      
      this.storage.setItem(this.TOKEN_KEY, token);
      this.storage.setItem(this.USER_KEY, JSON.stringify(user));
      
      this.currentUser.set(user);
      this.isLoggedIn.set(true);
      
      return true;
    }
    return false;
  }

  logout(): void {
    this.storage.removeItem(this.TOKEN_KEY);
    this.storage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.storage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return this.storage.getItem(this.TOKEN_KEY);
  }

  private checkAuthStatus(): void {
    const token = this.storage.getItem(this.TOKEN_KEY);
    const userData = this.storage.getItem(this.USER_KEY);
    
    if (token && userData) {
      this.currentUser.set(JSON.parse(userData));
      this.isLoggedIn.set(true);
    }
  }
}