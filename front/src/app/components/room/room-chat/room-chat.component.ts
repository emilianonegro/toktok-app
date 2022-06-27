import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-room-chat',
  templateUrl: './room-chat.component.html',
  styleUrls: ['./room-chat.component.css'],
})
export class RoomChatComponent implements OnInit, OnDestroy {
  room: any;
  local = localStorage.getItem('user');
  userOnline = this.wsService.user?.name;

  chat: any = {
    chat: '',
  };

  messageText: string = '';
  messagesSubscription: Subscription | undefined;
  messagesChat: any[] = [];
  messageArray: Array<{ user: String; message: String }> = [];
  onlineUsers: Array<{ user: String }> = [];

  roomName: any;
  @Output() usersOnline: string[] | any;
  roomIdNew = this.router.url.substring(16);

  get rooms() {
    return this.roomService.rooms;
  }

  constructor(
    private router: Router,
    private _api: ApiService,
    private roomService: RoomService,
    public wsService: WebsocketService
  ) {
    this.wsService.newMessageRecived().subscribe((data) => {
      this.messageArray.push(data);
    });

    this.loadOldMessages();

    this.getRoomdb();

    this.wsService.callback$.subscribe((res) => {
      this.roomService.addNewRoom(res);
      this.roomService.loadRooms();
      this.roomService.loadRoomSelected();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.messagesSubscription?.unsubscribe();
  }

  leaveRoom() {
    this.router.navigate(['/home']);
  }

  sendMessage() {
    let payload = {
      message: this.messageText,
      user: this.userOnline,
      room: this.roomIdNew,
    };

    this.wsService.sendMessage(payload);
    this.messageArray.push({
      message: this.messageText,
      user: this.userOnline,
    });

    this.messageText = '';
  }

  getRoomdb() {
    this._api.getRoom(`/${this.roomIdNew}`).subscribe((res: any) => {
      this.roomName = res.rooms.name;
    });
  }

  loadOldMessages() {
    this._api
      .getOldMessages(`/chatGetMessage/${this.roomIdNew}`)
      .subscribe((res: any) => {
        this.messageArray = res.chat;
      });
  }
}
