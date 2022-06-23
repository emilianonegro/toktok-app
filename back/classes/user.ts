export class User {
  public id: string;
  public user: string;
  public room: string;

  constructor(id: string) {
    this.id = id;
    this.user = "";
    this.room = "";
  }
}
