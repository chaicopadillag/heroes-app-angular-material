import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent {
  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth
      .login({
        email: 'Alfred44@gmail.com',
        password: 'lcRWNZXuRn0_tcs',
      })
      .subscribe((user) => {
        console.log(user);
        this.router.navigateByUrl('/');
      });
  }
}
