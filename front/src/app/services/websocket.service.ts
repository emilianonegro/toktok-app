import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { User } from '../models/usuario';
import { Subject } from 'rxjs';

export enum RoomMessageType {
  AllRoomsSended = 'allRoomsSended',
  NewUsersInRoom ='newUsersInRoom',
  NewMessage = 'newMessage'
}

export interface RoomMessage {
  type: RoomMessageType;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements OnInit {
  public isSocketConnected = false;
  public user!: User;
  public callback$: Subject<any> = new Subject();

  private roomsSubject$  = new Subject<RoomMessage>();
  public get roomsObservable$(): Observable<RoomMessage>{
    return this.roomsSubject$.asObservable()
  }


  private userInRoomSubject$  = new Subject<any>();
  public get userInRooObservable$(): Observable<any>{
    return this.userInRoomSubject$.asObservable()
  }

  private newMessageSubject$ = new Subject<any>();
  public get newMessageObservable$() : Observable<any> {
    return this.newMessageSubject$.asObservable()
  }
  

  constructor(private socket: Socket) {
    this.listenNewRoom();
    this.checkStatusSocket();
  }

  ngOnInit(): void {
    this.socket.on(RoomMessageType.AllRoomsSended, (data:any)=>{
      this.roomsSubject$.next({
        type: RoomMessageType.AllRoomsSended,
        data:data
      })
    })

    this.socket.on(RoomMessageType.NewUsersInRoom, (data:any)=>{
      this.userInRoomSubject$.next({
        type: RoomMessageType.NewUsersInRoom,
        data:data
      })
    })

    this.socket.on(RoomMessageType.NewMessage, (data:any)=>{
      this.newMessageSubject$.next({
        type:RoomMessageType.NewMessage,
        data:data
      })
    })
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  emit(event: string, payload?: {}, callback$?: Function) {
    this.socket.emit(event, payload, callback$);
  }

  loginWS(name: string) {
    this.emit('configUser', { name });
  }

  logoutWS() {
    localStorage.clear();
  }

  getUser() {
    return this.user;
  }

  joinRoom(data: Object) {
    this.socket.emit('join', data);
  }

  sendMessage(data: Object) {
    this.socket.emit('message', data);
  }

  emitEvent(payload: Object) {
    this.socket.emit('newRoom', payload);
  }

  listenNewRoom() {
    this.socket.on('roomCreated', (res: any) => {
      this.callback$.next(res);
    });
  }
  emitDeletingRoom(payload: Object) {
    this.socket.emit('deleteRoom', payload);
  }

  getAllRoomsSocket() {
    this.socket.emit('getAllRooms');
  }

  updateNameRoom(payload: any) {
    this.socket.emit('updateNameRoom', payload);
  }

  confiUser(payload: string) {
    this.socket.emit('configUser', payload);
  }

  confiUserRoom(payload: string) {
    this.socket.emit('configUserRoom', payload);
  }

  getUsersInTheRoom(payload: string) {
    this.socket.emit('usersInRoom', payload);
  }

  getUsuariosActivos() {
    return this.listen('newUsersInRoom');
  }

  checkStatusSocket() {
    this.socket.on('disconnect', () => {
      console.log('Disconnected from the server');
      this.isSocketConnected = false;
    });
  }
}
