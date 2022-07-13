import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { WebsocketService } from '../../services/websocket.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  public route = this.router.url || false;
  public userOnline = this.wsService.user?.name;
  public roomId!: number;
  public newName = {
    name: '',
  };
  public roomIdInput!: number;
  public statusInput: boolean = true;

  get rooms() {
    return this.roomService.rooms;
  }

  constructor(
    private roomService: RoomService,
    private router: Router,
    private wsService: WebsocketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.wsService.getAllRoomsSocket();
  }

  deleteRoom(roomIds: string) {
    this.roomService.deleteRoom(roomIds);
  }

  goIn(id: number) {
    let roomId = id.toString();
    let user = this.authService.userName();
    let payload = { room: roomId, user: user };
    this.wsService.joinRoom(payload);
    this.roomService.sendRoomId(roomId);
    this.wsService.confiUser(user);
    this.wsService.confiUserRoom(roomId);
  }

  statusInputFunc(roomId: number) {
    if (roomId) {
      this.statusInput = false;
    }
  }
}
