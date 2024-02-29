import { Component, Input, OnInit } from '@angular/core';
import { HeroType } from '../../interfaces/heroes-response.interface';

@Component({
  selector: 'card-hero',
  templateUrl: './cardhero.component.html',
  styles: ``,
})
export class CardheroComponent implements OnInit {
  @Input()
  hero!: HeroType;

  ngOnInit(): void {
    if (!this.hero) {
      throw new Error('Hero not implemented.');
    }
  }
}
