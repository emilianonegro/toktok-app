import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { usersOnline } from "../sockets/sockets";
import controller from "../controllers/Room.controllers";

const router = Router();

router.get("/users", (req: Request, res: Response) => {
  const server = Server.instance;

  server.io
    .allSockets()
    .then(clients => {
      res.json({
        ok: true,
        clients: Array.from(clients),
      });
    })
    .catch((err: Error) => {
      res.json({
        ok: false,
        err,
      });
    });
});

router.get("/users/details", (req: Request, res: Response) => {
  res.json({
    ok: true,
    clients: usersOnline.getList(),
  });
});

router.get("/:roomId", controller.getRoom);
router.get("/chatGetMessage/:roomId", controller.getMessage);

export default router;
