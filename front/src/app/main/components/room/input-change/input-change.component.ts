import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../../../shared/services/websocket.service';
import { RoomService } from '../room.services';

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

    let payload = {
      name: `${this.newName.name}`,
      roomId: this.roomIdInput,
    };
    this.rooms[i].name = this.newName.name;
    this.wsService.updateNameRoom(payload);

    this.newName.name = '';
  }
}
