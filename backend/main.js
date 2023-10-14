"use strict";

// Imports
import cookieParser from "cookie-parser"; // * unknown if required yet
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { ConnectMDB, CloseMDB } from "./mongoConnect.js";

// importing routes
import { subscribersRouter } from "./routes/subscribers.js";
import { tasksRouter } from "./routes/tasks.js";
import { usersRouter } from "./routes/users.js";

// run dotenv.config()
dotenv.config();

const app = express();

// middleware
app.use(cors({ origin: `${process.env.HOST}3000` }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/subscribers", subscribersRouter);
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

// connect to db at server start
ConnectMDB();

// close connection on "exit" and "uncaughtException"
process.on("exit", () => CloseMDB());
process.on("uncaughtException", (error) => {
  console.log(error);
  CloseMDB();
});

// listen for connections
app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.HOST}${process.env.PORT}`);
});
