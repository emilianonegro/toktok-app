import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { RoomChatComponent } from './components/room/room-chat/room-chat.component';
import { AdminComponent } from './components/admin/admin.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddNewRoomComponent } from './components/admin/add-new-room/add-new-room.component';
import { UsersOnlineComponent } from './components/room/room-chat/users-online/users-online.component';
import { InputChangeComponent } from './components/room/input-change/input-change.component';
import { LoginComponent } from './components/auth/pages/login/login.component';
import { RegisterComponent } from './components/auth/pages/register/register.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

const config: SocketIoConfig = {
  url: 'http://localhost:3000/',
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    RoomChatComponent,
    AdminComponent,
    NavBarComponent,
    AddNewRoomComponent,
    UsersOnlineComponent,
    InputChangeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
