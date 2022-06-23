import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { User } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public user!: User;
  public room!: Room;
  callback: EventEmitter<any> = new EventEmitter();

  constructor(private socket: Socket, private router: Router) {
    this.loadStorage();
    this.listenNewRoom();
  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  sabeStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loginWS(name: string) {
    this.emit('configUser', { name }, (resp: any) => {});
    this.user = new User(name);
    this.sabeStorage();
  }

  logoutWS() {
    this.user = User;
    localStorage.removeItem('user');
  }

  loadStorage() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.loginWS(this.user.name);
    }
  }

  getUser() {
    return this.user;
  }

  joinRoom(data: any) {
    this.socket.emit('join', data);
  }

  sendMessage(data: any) {
    this.socket.emit('message', data);
  }
  newMessageRecived() {
    let observable = new Observable<{ user: string; message: string }>(
      (observer) => {
        this.socket.on('newMessage', (data: any) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  emitEvent = (payload: any) => {
    console.log('alsdadasd');
    this.socket.emit('newRoom', payload);
  };

  listenNewRoom() {
    this.socket.on('roomCreated', (res: any) => {
      this.callback.emit(res);
    });
  }
  emitDeletingRoom = (payload: any) => {
    this.socket.emit('deleteRoom', payload);
    console.log(payload);
  };

  getAllRoomsSocket = () => {
    this.socket.emit('getAllRooms');
  };

  allRoomsfroDB = () => {
    let observable = new Observable<{
      _id: string;
      name: string;
      chat: [];
      usersOnlines: [];
    }>((observer) => {
      console.log(observer);
      this.socket.on('allRoomsSended', (data: any) => {
        console.log(data);
        return observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  };

  updateNameRoom = (payload: any) => {
    console.log(payload);
    this.socket.emit('updateNameRoom', payload);
  };

  getRoomId = (payload: any) => {
    console.log(payload);
    this.socket.emit('getRoomId', payload);
  };

  getRoomSelectedDB = () => {
    let observable = new Observable<{
      _id: string;
      name: string;
      chat: [];
      usersOnlines: [];
    }>((observer) => {
      console.log(observer);
      this.socket.on('roomSelected', (data: any) => {
        console.log(data);
        return observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  };
}
