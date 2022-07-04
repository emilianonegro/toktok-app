import { User } from "./user";

export class UserList {
  private list: User[] = [];

  constructor() {}

  public addUser(user: User) {
    this.list.push(user);
    return user;
  }

  public updateUser(id: string, name: string) {
    for (let user of this.list) {
      if (user.id === id) {
        user.user = name;
        break;
      }
    }
  }

  public updateUserRoom(id: string, room: string) {
    for (let user of this.list) {
      if (user.id === id) {
        user.room = room;
        break;
      }
    }
  }

  public getList() {
    return this.list;
  }

  public getUser(userName: string) {
    return this.list.find(user => {
      return user.user === userName;
    });
  }

  public getUsersInRoom(room: string) {
    return this.list.filter(user => {
      return user.room === room;
    });
  }

  public deleteUser(id: string) {
    const tempUser = this.getUser(id);

    this.list = this.list.filter(user => {
      return user.id !== id;
    });

    return tempUser;
  }
}
