import mongoose, { Document, Schema } from "mongoose";

export interface IRoom {
  name: string;
  chat: [];
}

export interface IRoomModel extends IRoom, Document {}

const RoomSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    chat: [],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IRoomModel>("Room ", RoomSchema);
