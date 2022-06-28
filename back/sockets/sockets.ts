import { Socket } from "socket.io";
import socketIO from "socket.io";
import { User } from "../classes/user";
import { UserList } from "../classes/user-list";
import RoomModel from "../models/Room.model";
import mongoose from "mongoose";

export const usersOnline = new UserList();

export const conectClient = (client: Socket, io: socketIO.Server) => {
  const user = new User(client.id);
  usersOnline.addUser(user);
};
export const newMessage = (client: Socket, io: socketIO.Server) => {
  client.on("message", data => {
    let chatInfo = { user: data.user, message: data.message };

    RoomModel.findByIdAndUpdate(
      data.room,
      { $push: { chat: chatInfo } },
      { strict: false },
      err => {
        if (err) {
          return err.message;
        }
      }
    );

    client
      .to(data.room)
      .emit("newMessage", { user: data.user, message: data.message });
  });
};

export const newRoomShow = (client: Socket, io: socketIO.Server) => {
  client.on("newRoom", data => {
    if (data.email === "xenialab@ingogroup.com") {
      const name = data.name;
      const room = new RoomModel({
        _id: new mongoose.Types.ObjectId(),
        name,
        chat: [],
        usersOnline: [],
      });
      room.save();

      client.broadcast.emit("roomCreated", room);
      client.emit("roomCreated", room);
    } else {
      let msg = "you don't have permission to create a new room";
      console.log(msg);
      client.emit("errorMessage", msg);
    }
  });
};

let usuariosOnline: [][] = [];
export const userJoin = (client: Socket, io: socketIO.Server) => {
  client.on("join", data => {
    client.join(data.room);
    if (data.user != undefined) {
      usuariosOnline.push(data);
    }
    client.to(data.room).emit("newUserJoined", usuariosOnline);
    client.data.user = data;
  });
};

export const deleteRoom = (client: Socket, io: socketIO.Server) => {
  client.on("deleteRoom", data => {
    let roomId = data.roomId;
    RoomModel.findByIdAndDelete(roomId).then((room: any) => {
      room;
    });
    RoomModel.find().then(rooms => {
      client.broadcast.emit("allRoomsSended", rooms);
      client.emit("allRoomsSended", rooms);
    });
  });
};

export const getAllRoomsSocket = (client: Socket, io: socketIO.Server) => {
  client.on("getAllRooms", () => {
    RoomModel.find().then(rooms => {
      client.emit("allRoomsSended", rooms);
    });
  });
};

export const updateNameRoom = (client: Socket, io: socketIO.Server) => {
  client.on("updateNameRoom", data => {
    const roomId = data.roomId;
    const name = data.name;
    if (data.email === "xenialab@ingogroup.com") {
      RoomModel.findByIdAndUpdate(roomId, { name: name }).then((room: any) => {
        room;
      });
      RoomModel.find().then(rooms => {
        client.broadcast.emit("allRoomsSended", rooms);
        client.emit("allRoomsSended", rooms);
      });
    } else {
      let msg = "you don't have permission to rename the room";
      console.log(msg);
      client.emit("errorMessage", msg);
    }
  });
};

export const getRoomId = (client: Socket, io: socketIO.Server) => {
  client.on("getRoomId", data => {
    let roomId = data.roomId;
    console.log(data, "data go in room");
    RoomModel.findById(roomId).then((room: any) => {
      room;
      console.log(room, "room go in room");
      return client.emit("roomSelected", room);
    });
  });
};
