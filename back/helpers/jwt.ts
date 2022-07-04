import jwt from "jsonwebtoken";
import { config } from "../enviroment/enviroment";

export const generateJWT = (
  uid: any,
  name: string,
  email: string,
  rol: string
) => {
  const payload = { uid, name, email, rol };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.seed.port,
      {
        expiresIn: "24h",
      },
      (err: any, token: unknown) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default {
  generateJWT,
};
