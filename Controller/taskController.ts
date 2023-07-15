import { Request, Response } from "express";
import authModel from "../Model/authModel";
import taskModel from "../Model/taskModel";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { task, priority } = req.body;
    const user = await authModel.findById(id);
    const tasked = await taskModel.create({
      task,
      priority,
      name: user?.userName,
      avatar: user?.avatar,
    });
    return res.status(201).json({
      message: "Created Task Successfully",
      data: tasked,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const readTask = async (req: Request, res: Response) => {
  try {
    const tasked = await taskModel.find();

    return res.status(200).json({
      message: "Reading Task successfully",
      data: tasked,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error reading task",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasked = await taskModel.findByIdAndDelete(id);
    return res.status(201).json({
      message: "Deleted Task",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error deleting task",
    });
  }
};
