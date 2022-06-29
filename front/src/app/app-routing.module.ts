import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/auth/pages/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { RoomChatComponent } from './components/room/room-chat/room-chat.component';
import { RegisterComponent } from './components/auth/pages/register/register.component';
import { IsLogin } from './components/auth/guards/auth.guard';
import { AdminGuard } from './components/admin/guard/admin.guard';
import { AlreadyAuthGuard } from './components/auth/guards/already-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AlreadyAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AlreadyAuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [IsLogin],
  },
  // {
  //   path: `home/room-chat/:id`,
  //   component: RoomChatComponent,
  //   canActivate: [IsLogin],
  // },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [IsLogin, AdminGuard],
  },
  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
