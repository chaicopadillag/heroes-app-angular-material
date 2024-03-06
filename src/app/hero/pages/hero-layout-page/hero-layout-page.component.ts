import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-hero-layout-page',
  templateUrl: './hero-layout-page.component.html',
  styles: ``,
})
export class HeroLayoutPageComponent {
  menuSidebar = [
    {
      label: 'Listado',
      icon: 'label',
      url: './list',
    },
    {
      label: 'Crear',
      icon: 'add',
      url: './create',
    },
    {
      label: 'Search',
      icon: 'search',
      url: './search',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  get authUser() {
    return this.authService.authUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
