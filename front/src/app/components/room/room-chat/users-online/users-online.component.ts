import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { WebsocketService } from '../../../../services/websocket.service';
import { RoomService } from '../../../../services/room.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.css'],
})
export class UsersOnlineComponent implements OnInit {
  usersActivesObs: Observable<any> | any;
  roomIdNew = this.router.url.substring(16);
  actives: Array<{ user: String; id: String; room: String }> = [];
  public ownUser!: string;

  get roomId() {
    return this.roomService.roomId;
  }

  constructor(
    private router: Router,
    private wsService: WebsocketService,
    private authService: AuthService,
    private roomService: RoomService
  ) {
    this.ownUser = this.authService.userName();
    this.wsService.listnUsersInTheRoom().subscribe((data) => {
      this.actives.push(data);
    });
  }

  ngOnInit(): void {
    this.wsService.getUsersInTheRoom(this.roomId);
    this.usersActivesObs = this.wsService.getUsuariosActivos();
  }
}
