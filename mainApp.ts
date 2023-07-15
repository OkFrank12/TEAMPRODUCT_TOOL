import express, { Application, Request, Response } from "express";
import cors from "cors";
import auth from "./Router/authRouter";

export const mainApp = (app: Application) => {
  app
    .use(express.json())
    .use(cors())
    .use("/api/v1/auth", auth)
    .get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "You are connected to a backend source on Productivity tool",
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error connecting to app",
        });
      }
    });
};
