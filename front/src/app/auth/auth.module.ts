import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule { }
