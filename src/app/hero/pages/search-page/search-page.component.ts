import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HeroType } from '../../interfaces/heroes-response.interface';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent {
  searchInput = new FormControl('');

  heroes: HeroType[] = [];
  heroSelected?: HeroType;

  constructor(private heroService: HeroService) {}

  searchHeroes() {
    if (!this.searchInput.value) return;

    this.heroService
      .getHeroesSuggestions(this.searchInput.value)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  optionSelect(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    if (!event.option.value) {
      this.heroSelected = undefined;
      return;
    }
    this.heroSelected = event.option.value;
    this.searchInput.setValue(this.heroSelected!.superhero);
  }
}
