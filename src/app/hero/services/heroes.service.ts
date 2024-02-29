import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
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
}
