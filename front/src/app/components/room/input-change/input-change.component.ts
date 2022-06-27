import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-input-change',
  templateUrl: './input-change.component.html',
})
export class InputChangeComponent implements OnInit {
  newName = {
    name: '',
  };

  @Input() roomIdInput: number | any;
  @Input() i: number | any;

  route = this.router.url || false;

  get rooms() {
    return this.roomService.rooms;
  }

  constructor(
    private roomService: RoomService,
    private router: Router,
    private wsService: WebsocketService
  ) {}

  ngOnInit(): void {}

  updateRoom(i: number) {
    if (this.newName.name.trim().length === 0) return;
    let email = JSON.parse(localStorage.getItem('email')!);
    let payload = {
      name: `${this.newName.name}`,
      roomId: this.roomIdInput,
      email,
    };
    this.wsService.updateNameRoom(payload);
    this.newName.name = '';
  }
}
