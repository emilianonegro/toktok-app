import { Component, Input, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RoomInterface } from '../../../interfaces/room.interface';
import { AuthService } from '../../../services/auth.service';
import { RoomService } from '../../../services/room.service';

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

  constructor(
    private wsService: WebsocketService,
    private authService: AuthService,
    private roomService: RoomService
  ) {}
  ngOnInit(): void {}

  add() {
    if (this.authService.isAdmin()) {
      if (this.newName.name.trim().length === 0) return;
      if (this.newName.name.trim().length >= 14) {
        this.newName.name = '';
        let msg = 'The name have to be less than 15 characters';
        this.roomService.errorMessage(msg);

        return;
      }
      let payload = {
        name: `${this.newName.name}`,
      };
      this.wsService.emitEvent(payload);
    } else {
      let msg = "you don't have permission to create a new room";
      this.roomService.errorMessage(msg);
    }

    this.newName = {
      _id: 0,
      name: '',
      chat: [],
    };
  }
}
