import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HeroType } from '../../interfaces/heroes-response.interface';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``,
})
export class HeroPageComponent implements OnInit {
  public hero: HeroType | null = null;

  constructor(
    private heroService: HeroService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.heroService.getHero(id)))
      .subscribe((hero) => {
        if (!hero) {
          this.router.navigate(['/heroes/list']);
        }
        this.hero = hero;
      });
  }
  toBack() {
    this.router.navigateByUrl('hero/list');
  }
}
