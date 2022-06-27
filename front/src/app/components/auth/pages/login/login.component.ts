import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { WebsocketService } from '../../../../services/websocket.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent {
  email: string = '';
  name: string = '';
  password: string = '';

  constructor(
    private router: Router,
    public wsService: WebsocketService,
    private authService: AuthService
  ) {}

  login() {
    if (this.email.trim().length == 0) {
      return;
    }

    this.authService.login(this.email, this.password).subscribe((ok) => {
      if (ok === true) {
        console.log('user exist');
        this.router.navigateByUrl('/home');
      } else {
        console.log('user dont exist');

        console.log('Error', ok, 'error');
      }
    });

    this.wsService.sabeStorageEmail(this.email);

    this.wsService.loginWS(this.name);
    // this.router.navigate(['./home']);
  }
}
