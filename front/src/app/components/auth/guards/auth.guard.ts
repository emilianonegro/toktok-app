import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
  public isLocalstorage!: boolean;
  public userLocalStorage;

  constructor(private authService: AuthService, private router: Router) {
    this.userLocalStorage = localStorage.getItem('user');
  }

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    if (this.userLocalStorage == '') {
      this.router.navigateByUrl('');
      this.isLocalstorage = true;
    }

    return true;
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    if (this.userLocalStorage == '') {
      this.router.navigateByUrl('');
      this.isLocalstorage = true;
    }

    return true;
  }
}
