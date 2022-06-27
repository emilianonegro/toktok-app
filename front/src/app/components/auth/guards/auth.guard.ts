import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
  public isLocalstorage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    if (localStorage.getItem('user') == '') {
      this.isLocalstorage = true;
    }

    return this.isLocalstorage;
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    if (localStorage.getItem('user') == '') {
      this.isLocalstorage = true;
    }

    return this.isLocalstorage;
  }
}
