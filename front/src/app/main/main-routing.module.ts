import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoomChatComponent } from './components/room/room-chat/room-chat.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes : Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:`room-chat/:id`,
    component: RoomChatComponent
  }
  ,
  {
    path:'admin',
    component: AdminComponent
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class MainRoutingModule { }
