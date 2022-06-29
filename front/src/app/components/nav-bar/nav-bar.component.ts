import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public userName!: string;
  public isAdmin!: Boolean;

  constructor(
    private router: Router,
    public wsService: WebsocketService,
    private authService: AuthService
  ) {
    this.userName = this.authService.userName();
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {}

  goToAdmin() {
    this.router.navigate(['./admin']);
  }

  backToHome() {
    this.router.navigate(['./home']);
  }

  logOut() {
    this.wsService.logoutWS();
    this.router.navigateByUrl('/login');
  }
}
