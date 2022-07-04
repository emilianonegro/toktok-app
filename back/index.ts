import bodyParser from "body-parser";
import Server from "./classes/server";
import router from "./routes/router";
import cors from "cors";

const server = Server.instance;

//Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//CORS
server.app.use(cors({ origin: true, credentials: true }));
server.app.use("/room", router);
server.app.use("/api/auth", router);

server.start(() => {
  console.log("Servidor corriendo en el puerto " + server.port);
});
