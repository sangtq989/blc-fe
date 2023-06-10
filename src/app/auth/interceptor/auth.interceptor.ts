import { AuthenticationUtil } from './../../utils/authentication.util';
import { catchError, Observable, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/services/common/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = AuthenticationUtil.getToken();
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.logout();
        }
        return throwError(err);
      })
    );
  }
}
