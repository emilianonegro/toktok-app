import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//sockets 
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: 'http://localhost:3000/' , options: {}
};

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
