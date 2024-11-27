import fs from "node:fs"
import path from "node:path"
import express from "express";
import { Server, Socket } from "socket.io";
import http from "node:http";
import cookieParser from "cookie-parser";
import cors from "cors";
import Logger from "./middlewares/Logger";
import errorHandler from "./middlewares/errorHandler";
import socketServer from "./socket.io/Server";
import { config as mainConfig } from "./config";
import dotEnv from "dotenv";
import authRouter from "./routers/auth.router";
import postsRouter from "./routers/posts.router";
import { userAuthorization } from "./middlewares/userAuthorization";
import { uploadsRouter } from "./routers/uploads.router";
import profileRouter from "./routers/profile.router";
import adminRouter from "./routers/admin.router";

dotEnv.config();



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.static(path.resolve(__dirname, "public","dist")));
app.use(cookieParser());
app.use(Logger);
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

let { PORT, currentUser, listVisitors, visitorsLength, base_path } = mainConfig;

// Authentication
app.use(base_path, authRouter);
//upload
app.use(base_path, uploadsRouter);
// Posts
app.use(base_path, userAuthorization, postsRouter);
//profiles
app.use(base_path, profileRouter);

//admin routes
app.use(base_path, userAuthorization, adminRouter);
// *******************************
// ///////////////////////////////
// **********Start With Socket IO..
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// *******************************

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "dist", "index.html"));
});

io.engine.on("initial_headers", (header, req, next) => {
  const index = req.rawHeaders.indexOf("User-Agent");
  currentUser = req.rawHeaders[index];
  if (listVisitors.includes(currentUser)) return;
  listVisitors.push(currentUser);
  visitorsLength++;
});

io.on("connect", (socket: Socket) => {
  console.log("new client connected ... ");
  console.log(visitorsLength);
  socketServer(socket);
  socket.on("disconnected", () => {
    console.log("The client left the room !");
  });
});

app.use(errorHandler);
server.listen(PORT, () => console.log("Server Is Running on port " + PORT));
