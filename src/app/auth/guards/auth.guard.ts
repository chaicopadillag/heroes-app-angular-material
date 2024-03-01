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
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const verifyAuthUserStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifyToken().pipe(
    tap((isAuthenticated) => console.log('isAuthenticated =', isAuthenticated)),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auht/login']);
      }
    })
  );
};

export const canActivateGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => verifyAuthUserStatus();

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => verifyAuthUserStatus();
