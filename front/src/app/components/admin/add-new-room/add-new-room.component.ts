import { Component, Input, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RoomInterface } from '../../../interfaces/room.interface';

@Component({
  selector: 'app-add-new-room',
  templateUrl: './add-new-room.component.html',
  styleUrls: ['./add-new-room.component.css'],
})
export class AddNewRoomComponent implements OnInit {
  @Input() newName: RoomInterface = {
    _id: 0,
    name: '',
    chat: [],
  };

  constructor(private wsService: WebsocketService) {}
  ngOnInit(): void {}

  add() {
    if (this.newName.name.trim().length === 0) return;

    let email = JSON.parse(localStorage.getItem('email')!);

    let payload = {
      name: `${this.newName.name}`,
      email: email,
    };
    this.wsService.emitEvent(payload);

    this.newName = {
      _id: 0,
      name: '',
      chat: [],
    };
  }
}
