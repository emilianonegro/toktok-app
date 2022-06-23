import mongoose, { Document, Schema } from "mongoose";

export interface IRoom {
  name: string;
  chat: [];
  usersOnlines: [];
}

export interface IRoomModel extends IRoom, Document {}

const RoomSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    chat: [],
    usersOnlines: [],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IRoomModel>("Room ", RoomSchema);
