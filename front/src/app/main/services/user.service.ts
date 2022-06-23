import { Injectable } from '@angular/core';
import { UserInterface } from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _usersOnline: UserInterface[] = [];

  get usersOnline() {
    return this._usersOnline;
  }

  userOn(userName: any) {
    this._usersOnline.push(userName);
  }
}
