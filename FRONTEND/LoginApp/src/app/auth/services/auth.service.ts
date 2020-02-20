import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { config } from 'src/app/config';
import { Tokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) { }

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error);
          return of(false);
        })
      );
  }

  logout() {
    return this.http.post<any>(`${config.apiUrl}/logout`, {
      //pass refresh token for log out
    })
      .pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
        catchError(error => {
          alert(error);
          return of(false);
        })
      );
  }

  isLoggedIn() {
    //check for token 
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
