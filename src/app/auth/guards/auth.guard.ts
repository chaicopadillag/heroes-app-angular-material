import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthStatus } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

const verifyAuthUserStatus = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    console.log('isAuthenticated =', authService.authStatus());
    return true;
  }

  router.navigate(['auth/login']);
  return false;
};

export const canActivateGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => verifyAuthUserStatus();

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => verifyAuthUserStatus();
