import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/auth/pages/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { RoomChatComponent } from './components/room/room-chat/room-chat.component';
import { RegisterComponent } from './components/auth/pages/register/register.component';
import { ValidateTokenGuard } from './components/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ValidateTokenGuard],
  },
  {
    path: `home/room-chat/:id`,
    component: RoomChatComponent,
    canActivate: [ValidateTokenGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ValidateTokenGuard],
  },
  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: '',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
