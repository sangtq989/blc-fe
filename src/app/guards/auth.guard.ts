import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthenticationService) {}
  canActivateChild(): boolean {
    return this.authService.checkCredentials();
  }
}
