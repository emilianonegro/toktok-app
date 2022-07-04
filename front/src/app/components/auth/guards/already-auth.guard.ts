import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AlreadyAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
