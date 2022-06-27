import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { usersOnline } from "../sockets/sockets";
import controller from "../controllers/Room.controllers";
import { check } from "express-validator";
import {
  createUser,
  loginUser,
  revalidateToken,
} from "../controllers/auth.controllers";
import { validateFields } from "../middlewares/validar-campos";

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

//create user
router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "The password is mandatory").isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

//Login User
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "The password is mandatory").isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);

//validate JWT
router.get("/renew", revalidateToken);

export default router;
