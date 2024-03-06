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
    return this.httpClient.get<HeroType[]>(`${this.apiUrl}/hero`);
  }
  getHeroesSuggestions(keyword: string) {
    return this.httpClient.get<HeroType[]>(`${this.apiUrl}/hero?q=${keyword}`);
  }

  getHero(name: string) {
    return this.httpClient
      .get<HeroType | null>(`${this.apiUrl}/hero/${name}`)
      .pipe(catchError((err) => of(null)));
  }

  create(hero: HeroType) {
    const { _id: _, slug: __, ...restHero } = hero;
    return this.httpClient.post<HeroType>(`${this.apiUrl}/hero`, restHero);
  }

  update(hero: HeroType) {
    const { _id, slug: __, ...restHero } = hero;
    return this.httpClient.patch<HeroType>(
      `${this.apiUrl}/hero/${_id}`,
      restHero
    );
  }
  delete(heroId: string) {
    return this.httpClient
      .delete<boolean>(`${this.apiUrl}/hero/${heroId}`)
      .pipe(
        map((res) => true),
        catchError((err) => of(false))
      );
  }
}
