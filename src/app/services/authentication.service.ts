import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { LoginDto } from '../models/login-dto.interface';
import { Tokens } from '../models/tokens.interface';
import { environment } from '../../environments/environment';

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(loginData: LoginDto): Observable<Tokens> {
    return this.http
      .post<Tokens>(`${environment.apiUrl}/auth/login`, loginData)
      .pipe(
        tap((response) => {
          if (response && response.accessToken && response.token) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.token);
          } else {
            console.error('Token not found in response');
          }
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/logout`, {});
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('No refresh token found');
      return throwError(() => new Error('No refresh token found'));
    }
    const body = {
      refreshToken: refreshToken,
      expiredAccessToken: localStorage.getItem('token'),
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
