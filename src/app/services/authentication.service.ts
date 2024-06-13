import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { LoginDto } from '../models/login-dto.interface';
import { Tokens } from '../models/tokens.interface';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  router: any;
  constructor(private http: HttpClient) {}

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  isUserAdmin(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).admin;
    }
    return false;
  }

  login(loginData: LoginDto): Observable<Tokens> {
    return this.http
      .post<Tokens>(`${environment.apiUrl}/auth/login`, loginData)
      .pipe(
        tap((response) => {
          if (response && response.accessToken && response.token) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
          } else {
            console.error('Token not found in response');
          }
        })
      );
  }

  getUserId(): number | null {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).id;
    }
    return null;
  }
  getName(): string {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).name;
    }
    return '';
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/logout`, {}).pipe(
      tap({
        next: () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error during logout', error);
          // Clear local storage and navigate even if there's an error
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        },
      })
    );
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('No refresh token found');
      return throwError(() => new Error('No refresh token found'));
    }
    const body = {
      token: refreshToken,
    };
    return this.http.post<any>(`${environment.apiUrl}/refreshToken`, body).pipe(
      tap((response) => {
        if (response && response.tokens) {
          localStorage.setItem('token', response.tokens.accessToken);
          localStorage.setItem('refreshToken', response.tokens.refreshToken);
        }
      })
    );
  }
}
