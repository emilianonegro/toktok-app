import { Component, Input } from '@angular/core';
import { RoomInterface } from 'src/app/main/components/room/room.interface';
import { WebsocketService } from '../../../../shared/services/websocket.service';

@Component({
  selector: 'app-add-new-room',
  templateUrl: './add-new-room.component.html',
  styleUrls: ['./add-new-room.component.css'],
})
export class AddNewRoomComponent {
  @Input() newName: RoomInterface = {
    _id: 0,
    name: '',
    chat: [],
  };

  constructor(private swService: WebsocketService) {}

  add() {
    if (this.newName.name.trim().length === 0) return;
    let payload = {
      name: `${this.newName.name}`,
    };
    this.swService.emitEvent(payload);

    this.newName = {
      _id: 0,
      name: '',
      chat: [],
    };
  }
}
