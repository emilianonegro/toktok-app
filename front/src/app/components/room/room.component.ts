import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  route = this.router.url || false;
  userOnline = this.wsService.user?.name;

  public roomId!: number;

  newName = {
    name: '',
  };
  roomIdInput!: number;
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

  deleteRoom(roomIds: string) {
    this.roomService.deleteRoom(roomIds);
  }

  goIn(id: number) {
    let roomId = id.toString();
    let payload = { room: roomId, user: this.userOnline };
    this.wsService.joinRoom(payload);
    let payload2 = { roomId: roomId, user: this.userOnline };
    this.wsService.getRoomId(payload2);
    this.roomService.sendRoomId(roomId);
  }

  statusInputFunc(roomId: number) {
    if (roomId) {
      this.statusInput = false;
    }
  }
}
