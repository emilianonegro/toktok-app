import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RoomInterface } from '../interfaces/room.interface';
import { WebsocketService } from './websocket.service';

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

  deleteRoom(id: string, i: number) {
    let payload = { roomId: id };
    this.wsService.emitDeletingRoom(payload);
  }
}
