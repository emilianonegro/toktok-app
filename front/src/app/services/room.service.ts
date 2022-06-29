import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RoomInterface } from '../interfaces/room.interface';
import { WebsocketService } from './websocket.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private _rooms: RoomInterface[] = [];

  private subject = new Subject<string>();

  get rooms(): RoomInterface[] {
    return [...this._rooms];
  }
  constructor(private wsService: WebsocketService) {
    this.wsService.callback$.subscribe((res) => {
      this.addNewRoom(res);
      this.loadRooms();
    });
  }

  sendRoomId(roomId: string) {
    this.subject.next(roomId);
  }

  recivedRoomId(): Observable<string> {
    return this.subject.asObservable();
  }

  addNewRoom(room: RoomInterface) {
    this._rooms.push(room);
  }
  loadRooms() {
    this.wsService.allRoomsfroDB().subscribe((res: any) => {
      this._rooms = res;
    });
  }

  loadRoomSelected() {
    this.wsService.getRoomSelectedDB().subscribe((res: any) => {
      this._rooms = res;
    });
  }

  deleteRoom(id: string) {
    let payload = { roomId: id };
    this.wsService.emitDeletingRoom(payload);
  }

  errorMessage(msg: string) {
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
}
