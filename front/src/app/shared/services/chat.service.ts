import { Injectable } from '@angular/core';
// import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // private _roomSelectedID: number = 0;

  // get roomSelectedID(): number {
  //   return this._roomSelectedID;
  // }

  constructor() // private wsService: WebsocketService
  {}

  // sendMessage(mensaje: string) {
  //   // const payload = {
  //   //   de: this.wsService.getUser().name,
  //   //   cuerpo: mensaje,
  //   // };
  //   // this.wsService.emit('message', payload);
  // }

  // getMessage() {
  //   // return this.wsService.listen('message-new');
  // }

  // getMessagesPrivate() {
  //   // return this.wsService.listen('message-private');
  // }

  // joinRoom() {
  //   // return this.wsService.joinRoom('data');
  // }

  // sendNewMessage() {
  //   return this.wsService.newMessageRecived();
  // }

  // getUsuariosActivos() {
  //   // return this.wsService.listen('usuariosActivos')
  // }
}
