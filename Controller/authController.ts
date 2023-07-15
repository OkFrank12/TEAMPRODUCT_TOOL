import { Request, Response } from "express";
import bcrypt from "bcrypt";
import authModel from "../Model/authModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, password, email, avatar } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await authModel.create({
      userName,
      email,
      password: hash,
      avatar,
    });

    return res.status(201).json({
      message: "Created user succesfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const getUser: any = await authModel.findOne({ email });
    const hash = await bcrypt.compare(password, getUser?.password);
    if (getUser) {
      if (hash) {
        return res.status(201).json({
          message: `Welcome back ${getUser?.userName}`,
          data: getUser?._id,
        });
      } else {
        return res.status(404).json({
          message: "Password is incorrect",
        });
      }
    } else {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error sign-in",
    });
  }
};

export const readUser = async (req: Request, res: Response) => {
  try {
    const user = await authModel.find();
    return res.status(200).json({
      message: "Reading users successfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error reading user",
    });
  }
};

export const readOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await authModel.findById(id);
    return res.status(200).json({
      message: "Reading one-user",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error reading one-user",
    });
  }
};

export const updateOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userName, avatar } = req.body;
    const user = await authModel.findByIdAndUpdate(
      id,
      {
        userName,
        avatar,
      },
      { new: true }
    );
    return res.status(201).json({
      message: "Updating users",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error updating user",
    });
  }
};

export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await authModel.findByIdAndDelete(id);
    return res.status(201).json({
      message: "Deleted user",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error deleting user",
    });
  }
};
