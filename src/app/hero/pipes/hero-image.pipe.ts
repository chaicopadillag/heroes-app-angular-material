import { Pipe, PipeTransform } from '@angular/core';
import { HeroType } from '../interfaces/heroes-response.interface';

@Pipe({
  name: 'heroImage',
})
export class HeroImagePipe implements PipeTransform {
  transform(hero: HeroType): string {
    console.log(hero);
    if (!hero.slug && !hero.alt_img) return 'assets/no-image.png';

    if (hero.alt_img) return hero.alt_img;

    return `assets/heroes/${hero.slug}.jpg`;
  }
}
