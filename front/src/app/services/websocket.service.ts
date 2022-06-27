import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { User } from '../models/usuario';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public user!: User;
  public room!: Room;
  callback$: Subject<any> = new Subject();

  constructor(private socket: Socket, private router: Router) {
    this.loadStorage();
    this.listenNewRoom();
    this.errorMessage();
  }

  emit(event: string, payload?: {}, callback$?: Function) {
    this.socket.emit(event, payload, callback$);
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
    localStorage.clear();
  }

  sabeStorageEmail(email: string) {
    localStorage.setItem('email', JSON.stringify(email));
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
    this.socket.emit('newRoom', payload);
  };

  listenNewRoom() {
    this.socket.on('roomCreated', (res: any) => {
      this.callback$.next(res);
    });
  }
  emitDeletingRoom = (payload: any) => {
    this.socket.emit('deleteRoom', payload);
  };

  getAllRoomsSocket = () => {
    this.socket.emit('getAllRooms');
  };

  errorMessage() {
    this.socket.on('errorMessage', (res: any) => {
      console.log(res);
      Swal.fire({
        title: res,
        width: 600,
        padding: '3em',
        color: '#fff',
        background: '#555555',
        backdrop: `
          rgba(123,31,162,0.08)
        `,
      });
    });
  }

  allRoomsfroDB = () => {
    let observable = new Observable<{
      _id: string;
      name: string;
      chat: [];
      usersOnlines: [];
    }>((observer) => {
      this.socket.on('allRoomsSended', (data: any) => {
        return observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  };

  updateNameRoom = (payload: any) => {
    this.socket.emit('updateNameRoom', payload);
  };

  getRoomId = (payload: any) => {
    this.socket.emit('getRoomId', payload);
  };

  getRoomSelectedDB = () => {
    let observable = new Observable<{
      _id: string;
      name: string;
      chat: [];
      usersOnlines: [];
    }>((observer) => {
      this.socket.on('roomSelected', (data: any) => {
        return observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  };
}
