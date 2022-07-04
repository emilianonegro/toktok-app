import { Socket } from "socket.io";
import socketIO from "socket.io";
import { User } from "../classes/user";
import { UserList } from "../classes/user-list";
import RoomModel from "../models/Room.model";
import mongoose from "mongoose";

export const usersOnline = new UserList();

let usuariosOnline: string[] = [];
export const userJoin = (client: Socket, io: socketIO.Server) => {
  client.on("join", data => {
    client.join(data.room);
    client.data.user = data;
  });
};

export const conectClient = (client: Socket, io: socketIO.Server) => {
  const user = new User(client.id);
  usersOnline.addUser(user);
};

export const confiUser = (client: Socket, io: socketIO.Server) => {
  client.on("configUser", (payload: string) => {
    usersOnline.updateUser(client.id, payload);
    io.emit("usersActives", usersOnline.getList());
  });
};

export const confiUserRoom = (client: Socket, io: socketIO.Server) => {
  client.on("configUserRoom", (payload: string) => {
    usersOnline.updateUserRoom(client.id, payload);

    io.emit("usersActivesRoom", usersOnline.getList());
  });
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
    const name = data.name;
    const room = new RoomModel({
      _id: new mongoose.Types.ObjectId(),
      name,
      chat: [],
      usersOnline: [],
    });
    room.save();

    io.emit("roomCreated", room);
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
    RoomModel.findByIdAndUpdate(roomId, { name: name }).then((room: any) => {
      room;
    });
    RoomModel.find().then(rooms => {
      client.broadcast.emit("allRoomsSended", rooms);
      client.emit("allRoomsSended", rooms);
    });
  });
};

export const getUsersInTheRoom = (client: Socket, io: socketIO.Server) => {
  client.on("usersInRoom", payload => {
    const roomId = payload;
    io.to(roomId).emit("newUsersInRoom", usersOnline.getUsersInRoom(roomId));
  });
};

export const disconnected = (client: Socket, io: socketIO.Server) => {
  client.on("disconnect", () => {
    usersOnline.deleteUser(client.id);
    io.emit("usuarios-activos", usersOnline.getList());
  });
};
