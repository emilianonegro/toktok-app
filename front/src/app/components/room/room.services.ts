import { Injectable } from '@angular/core';
import { RoomInterface } from './room.interface';
import { WebsocketService } from '../../services/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private _rooms: RoomInterface[] = [];

  get rooms(): RoomInterface[] {
    return [...this._rooms];
  }
  constructor(private wsService: WebsocketService) {
    this.wsService.callback.subscribe((res) => {
      this.addNewRoom(res);
      this.loadRooms();
    });
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
