import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { MainRoutingModule } from './main-routing.module';


import { HomeComponent } from './pages/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { RoomChatComponent } from './components/room/room-chat/room-chat.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddNewRoomComponent } from './pages/admin/add-new-room/add-new-room.component';
import { UsersOnlineComponent } from './components/room/room-chat/users-online/users-online.component';
import { InputChangeComponent } from './components/room/input-change/input-change.component';


@NgModule({
  declarations: [
    HomeComponent,
    RoomComponent,
    RoomChatComponent,
    AdminComponent,
    NavBarComponent,
    AddNewRoomComponent,
    UsersOnlineComponent,
    InputChangeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    MainRoutingModule
  ]
})
export class MainModule { }
