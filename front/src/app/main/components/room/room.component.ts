import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from './room.services';
import { WebsocketService } from '../../../shared/services/websocket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  route = this.router.url || false;
  userOnline = this.wsService.user?.name;

  public currentUser: any = 'prueba';
  public selectedUser: any;
  public roomId: number | any;

  usersActivesObs: Observable<any> | any;

  newName = {
    name: '',
  };
  roomIdInput: number | any;

  statusInput: boolean = true;

  get rooms() {
    return this.roomService.rooms;
  }

  constructor(
    private roomService: RoomService,
    private router: Router,
    private wsService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.roomService.loadRooms();
    this.wsService.getAllRoomsSocket();
  }

  deleteRoom(roomIds: string, i: number) {
    this.roomService.deleteRoom(roomIds, i);
  }

  goIn(roomId: any) {
    let payload = { room: roomId, user: this.userOnline };
    this.wsService.joinRoom(payload);
    let payload2 = { roomId: roomId, user: this.userOnline };
    this.wsService.getRoomId(payload2);
  }

  statusInputFunc(roomId: number) {
    if (roomId) {
      this.statusInput = false;
    }
  }
}
