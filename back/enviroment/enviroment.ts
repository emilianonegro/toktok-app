import dotenv from "dotenv";

dotenv.config();

const HOSTING_URL = "//localhost:27017";
const MONGO_URL = `mongodb:${HOSTING_URL}/tokTok`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 3000;

const FRONTEND_URL = "http://localhost:4200";

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  frontend: {
    port: FRONTEND_URL,
  },
};
