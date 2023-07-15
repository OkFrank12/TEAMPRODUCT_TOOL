import express, { Application } from "express";
import dotenv from "dotenv";
import { dbConfig } from "./Config/db";
import { mainApp } from "./mainApp";
dotenv.config();

const port: any = process.env.PORT;

const app: Application = express();
mainApp(app);

const server = app.listen(process.env.PORT || port, () => {
  dbConfig();
});

process.on("uncaughtException", (error: any) => {
  console.log("Server is shutting down because of uncaught exception");
  console.log("uncaughtException: ", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("Server is shutting down because of unhandled rejection");
  console.log("unhandledRejection: ", reason);
  server.close(() => {
    process.exit(1);
  });
});
