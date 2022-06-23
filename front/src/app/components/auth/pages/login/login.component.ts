import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { WebsocketService } from '../../../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent {
  name: string = '';

  constructor(private router: Router, public wsService: WebsocketService) {}

  login() {
    this.wsService.loginWS(this.name);
    this.router.navigate(['./home']);
  }
}
