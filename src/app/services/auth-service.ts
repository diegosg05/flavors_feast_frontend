import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos
      return payload.exp < now;
    } catch (e) {
      return true; // token inválido => lo tratamos como expirado
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // validar si el token ha expirado
    return !!token && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
