import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interfaces';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export const JWT_NAME = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.URL_BACKEND;

  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  register(name: string, email: string, password: string) {
    const url = `${this.baseUrl}api/auth/new`;
    const body = { name, email, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem(JWT_NAME, resp.token!);
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!,
          };
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}api/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem(JWT_NAME, resp.token!);
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!,
          };
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  validateToken(): Observable<boolean> {
    const url = `${this.baseUrl}api/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem(JWT_NAME) || ''
    );

    return this.http.get<AuthResponse>(url, { headers: headers }).pipe(
      map((resp) => {
        localStorage.setItem(JWT_NAME, resp.token!);
        this._usuario = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!,
        };

        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    const token: string = localStorage.getItem(JWT_NAME)!;
    return !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin(): boolean {
    const token: string = localStorage.getItem(JWT_NAME)!;

    console.log(this.jwtHelper.decodeToken(token));
    const { rol } = this.jwtHelper.decodeToken(token);
    let isAdmin: boolean;
    if (rol === 'admin') return (isAdmin = true);
    return isAdmin!;
  }

  userName(): string {
    const token: string = localStorage.getItem(JWT_NAME)!;
    console.log(this.jwtHelper.decodeToken(token));
    const { name } = this.jwtHelper.decodeToken(token);
    let userName: string = name;
    return userName;
  }
}
