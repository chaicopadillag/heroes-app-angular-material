import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import {
  AuthStatus,
  AuthUserResponse,
  AuthUserType,
  UserAuthReqType,
} from '../interfaces/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrlHost = `${environments.apiUrlHost}/auth`;
  private _currentUser = signal<AuthUserType | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.cheking);
  public authUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private httpClient: HttpClient) {
    this.verifyToken().subscribe();
  }

  register(userBody: UserAuthReqType): Observable<boolean> {
    return this.httpClient
      .post<AuthUserResponse>(`${this.apiUrlHost}/register`, userBody)
      .pipe(
        map((resp) => this.setAuthUser(resp)),
        catchError((e) => of(false))
      );
  }

  login(userBody: UserAuthReqType) {
    return this.httpClient
      .post<AuthUserResponse>(`${this.apiUrlHost}/login`, userBody)
      .pipe(
        map((resp) => this.setAuthUser(resp)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return throwError(() => new Error('Credenciales incorrectas'));
        })
      );
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this._authStatus.set(AuthStatus.notAuthenticated);
      return of(false);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient
      .get<AuthUserResponse>(`${this.apiUrlHost}/verify-token`, { headers })
      .pipe(
        map((resp) => this.setAuthUser(resp)),
        catchError(() => {
          this.logout();
          return of(false);
        })
      );
  }

  setAuthUser(resp: AuthUserResponse) {
    this._currentUser.set(resp.user);
    localStorage.setItem('token', resp.token);
    this._authStatus.set(AuthStatus.authenticated);
    return true;
  }

  logout() {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.clear();
  }
}
