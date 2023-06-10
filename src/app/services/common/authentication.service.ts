import { ApiUrlUtil } from './../../utils/api-url.util';
import { ParamUtil } from './../../utils/param.util';
import { Router } from '@angular/router';
import { AuthenticationUtil } from './../../utils/authentication.util';
import { HeadersUtil } from './../../utils/headers.util';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  login(request: any): Observable<any> {
    const header: HttpHeaders = HeadersUtil.getHeaders();
    let url = environment.apiMainUrl + '/auth/login';
    return this.http.post(url, request, { headers: header });
  }

  signup(request: any): Observable<any> {
    const header: HttpHeaders = HeadersUtil.getHeaders();
    let url = environment.apiMainUrl + '/auth/signup';
    return this.http.post(url, request, { headers: header });
  }

  getUserInfo(request: any): Observable<any> {
    const header: HttpHeaders = HeadersUtil.getHeadersAuth();
    let url = environment.apiMainUrl + '/staff/' + request + '/';
    return this.http.get(url, { headers: header });
  }

  logout() {
    AuthenticationUtil.deleteAllCookie();
    window.location.href = '/login';
  }

  checkCredentials() {
    if (!AuthenticationUtil.isLoggedIn()) {
      AuthenticationUtil.deleteAllCookie();
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
