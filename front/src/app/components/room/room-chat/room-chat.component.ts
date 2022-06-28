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

  public messageText: string = '';
  public messagesSubscription: Subscription | undefined;
  public messagesChat: any[] = [];
  public messageArray: Array<{ user: String; message: String }> = [];
  public onlineUsers: Array<{ user: String }> = [];

  public roomName: any;
  @Output() usersOnline: string[] | any;

  public roomIdNew: string = '';

  // public roomIdNew:string = this.router.url.substring(16);

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

    // this.wsService.callback$.subscribe((res) => {
    //   this.roomService.addNewRoom(res);
    //   this.roomService.loadRooms();
    //   this.roomService.loadRoomSelected();
    // });
  }

  ngOnInit(): void {
    this.roomService.recivedRoomId().subscribe((data) => {
      this.roomIdNew = data;
      this.getRoomdb(this.roomIdNew);
      this.loadOldMessages(this.roomIdNew);
    });
  }

  ngOnDestroy(): void {
    this.messagesSubscription?.unsubscribe();
  }

  // leaveRoom() {
  //   this.router.navigate(['/home']);
  // }

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

  getRoomdb(roomIdNew: string) {
    if (roomIdNew != '') {
      this._api.getRoom(`${this.roomIdNew}`).subscribe((res: any) => {
        this.roomName = res.rooms.name;
      });
    }
  }

  loadOldMessages(roomIdNew: string) {
    if (roomIdNew != '') {
      this._api
        .getOldMessages(`chatGetMessage/${this.roomIdNew}`)
        .subscribe((res: any) => {
          this.messageArray = res.chat;
        });
    }
  }
}
