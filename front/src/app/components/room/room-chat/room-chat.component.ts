import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { WebsocketService } from '../../../services/websocket.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-room-chat',
  templateUrl: './room-chat.component.html',
  styleUrls: ['./room-chat.component.css'],
})
export class RoomChatComponent implements OnInit, OnDestroy {
  public messageText!: string;
  public messagesSubscription!: Subscription;
  public messageArray: Array<{ user: String; message: String }> = [];
  public roomName!: string;
  public roomIdNew!: string;
  public userJWT!: string;
  // public roomIdNew:string = this.router.url.substring(16);

  get rooms() {
    return this.roomService.rooms;
  }

  constructor(
    // private router: Router,
    private _api: ApiService,
    private roomService: RoomService,
    public wsService: WebsocketService,
    public authService: AuthService
  ) {
    this.wsService.newMessageRecived().subscribe((data) => {
      this.messageArray.push(data);
    });
  }

  ngOnInit(): void {
    this.roomService.recivedRoomId().subscribe((data) => {
      this.roomIdNew = data;
      this.getRoomdb(this.roomIdNew);
      this.loadOldMessages(this.roomIdNew);
    });

    this.userJWT = this.authService.userName();
  }

  ngOnDestroy(): void {
    this.messagesSubscription?.unsubscribe();
  }

  sendMessage() {
    let payload = {
      message: this.messageText,
      user: this.authService.userName(),
      room: this.roomIdNew,
    };

    this.wsService.sendMessage(payload);
    this.messageArray.push({
      message: this.messageText,
      user: this.authService.userName(),
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
