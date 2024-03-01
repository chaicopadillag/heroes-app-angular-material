import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const canNotActivateGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);

  const router = inject(Router);

  return authService.verifyToken().pipe(
    tap((isAuthenticated) => console.log('isAuthenticated =', isAuthenticated)),
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['/hero/list']);
      }
    }),
    map((isAuth) => !isAuth)
  );
};
