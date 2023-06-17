import { AuthenticationUtil } from '../utils/authentication.util';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private route: Router) {}

  canActivate(): boolean {
    if (AuthenticationUtil.isLoggedIn()) {
      return true;
    }
    this.route.navigate(['/home']);
    return false;
  }
}
