import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.css'],
})
export class UsersOnlineComponent implements OnInit {
  usersActivesObs: Observable<any> | any;
  roomIdNew = this.router.url.substring(16);

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
