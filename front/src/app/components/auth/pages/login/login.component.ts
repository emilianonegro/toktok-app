import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { WebsocketService } from '../../../../services/websocket.service';
import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2';

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
        this.router.navigateByUrl('/home');
      } else {
        Swal.fire({
          title: 'user dont exist',
          width: 600,
          padding: '3em',
          color: '#fff',
          background: '#555555',
          backdrop: `
            rgba(123,31,162,0.08)
          `,
        });
        // console.log('user dont exist');

        // console.log('Error', ok, 'error');
      }
    });

    this.wsService.sabeStorageEmail(this.email);

    this.wsService.loginWS(this.name);
    // this.router.navigate(['./home']);
  }
}
