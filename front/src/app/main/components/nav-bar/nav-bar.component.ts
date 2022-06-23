import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../../shared/services/websocket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router, public wsService: WebsocketService) {}

  ngOnInit(): void {}

  goToAdmin() {
    this.router.navigate(['./home/admin']);
  }

  backToHome() {
    this.router.navigate(['./home']);
  }

  logOut() {
    this.wsService.logoutWS();
    // this.wsService.logoutRoom()
    this.router.navigateByUrl('/auth');
  }
}
