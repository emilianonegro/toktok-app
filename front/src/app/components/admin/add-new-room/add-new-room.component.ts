import { Component, Input, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RoomInterface } from '../../../interfaces/room.interface';
import Swal from 'sweetalert2';

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
    if (this.newName.name.trim().length >= 14) {
      this.newName.name = '';
      Swal.fire({
        title: 'The name have to be less than 15 characters',
        width: 600,
        padding: '3em',
        color: '#fff',
        background: '#555555',
        backdrop: `
          rgba(123,31,162,0.08)
        `,
      });
      return;
    }

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
