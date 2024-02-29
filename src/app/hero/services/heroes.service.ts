import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { HeroType } from '../interfaces/heroes-response.interface';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private apiUrl = environments.apiUrlHost;

  constructor(private httpClient: HttpClient) {}

  getHeroes() {
    return this.httpClient.get<HeroType[]>(`${this.apiUrl}/heroes`);
  }
  getHeroesSuggestions(keyword: string) {
    return this.httpClient.get<HeroType[]>(
      `${this.apiUrl}/heroes?_q=${keyword}&_limit=6`
    );
  }

  getHero(name: string) {
    return this.httpClient
      .get<HeroType | null>(`${this.apiUrl}/heroes/${name}`)
      .pipe(catchError((err) => of(null)));
  }

  create(hero: HeroType) {
    return this.httpClient.post<HeroType>(`${this.apiUrl}/heroes`, hero);
  }

  update(hero: HeroType) {
    return this.httpClient.patch<HeroType>(
      `${this.apiUrl}/heroes/${hero.id}`,
      hero
    );
  }
  delete(heroId: string) {
    return this.httpClient
      .delete<boolean>(`${this.apiUrl}/heroes/${heroId}`)
      .pipe(
        map((res) => true),
        catchError((err) => of(false))
      );
  }
}
