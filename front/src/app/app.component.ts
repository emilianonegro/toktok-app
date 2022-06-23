import { Component } from '@angular/core';
import { WebsocketService } from './shared/services/websocket.service';
import { ChatService } from './shared/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'tok-tok';

  constructor(
    public weService: WebsocketService,
    public chatService: ChatService
  ){}

}
