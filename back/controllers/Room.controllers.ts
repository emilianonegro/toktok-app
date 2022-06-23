import { NextFunction, Request, Response } from "express";
import RoomModel from "../models/Room.model";

const getRoom = (req: Request, res: Response, next: NextFunction) => {
  const roomId = req.params.roomId;

  return RoomModel.findById(roomId)
    .then(rooms => {
      res.statusMessage = "Room requested";
      res.status(200).json({ rooms });
    })
    .catch(error => res.status(500).json({ error }));
};

const getMessage = (req: Request, res: Response, next: NextFunction) => {
  const roomId = req.params.roomId;

  return RoomModel.findById(roomId)
    .then(chat => {
      res.statusMessage = "All message requested";
      res.status(200).json({ chat: chat?.chat });
    })
    .catch((error: any) => res.status(500).json({ error }));
};

export default {
  getRoom,
  getMessage,
};
