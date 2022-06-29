import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { WebsocketService } from '../../../services/websocket.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-input-change',
  templateUrl: './input-change.component.html',
  styleUrls: ['./input-change.component.css'],
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
    private wsService: WebsocketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  updateRoom(i: number) {
    if (this.authService.isAdmin()) {
      if (this.newName.name.trim().length === 0) return;
      if (this.newName.name.trim().length >= 14) {
        this.newName.name = '';
        Swal.fire({
          title: 'The new name have to be less than 15 characters',
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
        roomId: this.roomIdInput,
      };
      this.wsService.updateNameRoom(payload);
    } else {
      let msg = "you don't have permission to rename the room";
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

    this.newName.name = '';
  }
}
