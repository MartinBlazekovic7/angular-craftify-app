import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationService } from '../services/authentication.service';
import { Tokens } from '../models/tokens.interface';

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Intercepting request...', req);
    const token = localStorage.getItem('accessToken');
    if (token) {
      console.log('Token found:', token);
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime && !this.isRefreshing) {
        console.log('Token has expired, refreshing token...');
        this.isRefreshing = true;
        return this.authService.refreshToken().pipe(
          switchMap((response: Tokens) => {
            this.isRefreshing = false;
            if (response && response.accessToken && response.token) {
              localStorage.setItem('accessToken', response.accessToken);
              localStorage.setItem('refreshToken', response.token);

              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`,
                },
              });
            }
            return next.handle(req);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            console.error('Refresh token failed:', error);
            return this.logoutUser();
          })
        );
      }
      return next.handle(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
    }
    return next.handle(req);
  }

  private logoutUser(): Observable<HttpEvent<any>> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
    return throwError(() => new Error('Session expired, user logged out.'));
  }
}
