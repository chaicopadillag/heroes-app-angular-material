import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces/auth.interface';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isUserAuthenticated = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.cheking) {
      return false;
    }
    return true;
  });

  private changeAuthStatus = effect(() => {
    console.log('authStatus', this.authService.authStatus());
    switch (this.authService.authStatus()) {
      case AuthStatus.cheking:
        break;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('hero/list');
        break;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('auth/login');
        break;
      default:
        break;
    }
  });
}
