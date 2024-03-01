import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environments } from '../../../environments/environments';
import { UserAuthType, UserType } from '../interfaces/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrlHost = environments.apiUrlHost;
  private authUser_?: UserType;

  constructor(private httpClient: HttpClient) {}

  get authUser() {
    return this.authUser_;
  }

  login(authUser: UserAuthType) {
    // return  this.httpClient.post()
    console.log({ authUser });
    return this.httpClient.get<UserType>(`${this.apiUrlHost}/users/1`).pipe(
      tap((user) => (this.authUser_ = user)),
      tap((user) =>
        localStorage.setItem(
          'token',
          'DiTqjGm5IltFFHBUZpMKtsPrwYEN2piQ9iBluc437VJHm'
        )
      ),
      catchError((e) => of(undefined))
    );
  }

  verifyToken(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');

    // return  this.httpClient.post()
    return this.httpClient.get<UserType>(`${this.apiUrlHost}/users/1`).pipe(
      tap((user) => (this.authUser_ = user)),
      tap((user) =>
        localStorage.setItem(
          'token',
          'DiTqjGm5IltFFHBUZpMKtsPrwYEN2piQ9iBluc437VJHm'
        )
      ),
      map((user) => !!user),
      catchError((e) => of(false))
    );
  }

  logout() {
    this.authUser_ = undefined;
    localStorage.clear();
  }
}
