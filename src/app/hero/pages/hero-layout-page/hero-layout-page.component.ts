import { Component } from '@angular/core';

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
}
