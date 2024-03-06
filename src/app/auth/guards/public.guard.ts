import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthStatus } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

export const canNotActivateGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);

  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigate(['hero/list']);
    return false;
  }

  return true;
};
