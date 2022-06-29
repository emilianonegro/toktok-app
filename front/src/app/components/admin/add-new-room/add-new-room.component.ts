import { Component, Input, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RoomInterface } from '../../../interfaces/room.interface';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

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
    private authService: AuthService
  ) {}
  ngOnInit(): void {}

  add() {
    if (this.authService.isAdmin()) {
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
      let payload = {
        name: `${this.newName.name}`,
      };
      this.wsService.emitEvent(payload);
    } else {
      let msg = "you don't have permission to create a new room";
      console.log(msg);
      Swal.fire({
        title: msg,
        width: 600,
        padding: '3em',
        color: '#fff',
        background: '#555555',
        backdrop: `
        rgba(123,31,162,0.08)
      `,
      });
    }

    this.newName = {
      _id: 0,
      name: '',
      chat: [],
    };
  }
}
