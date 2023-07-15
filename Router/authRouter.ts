import express, { Router } from "express";
import {
  createUser,
  deleteOneUser,
  readOneUser,
  readUser,
  signInUser,
  updateOneUser,
} from "../Controller/authController";

const router: Router = Router();

router.route("/all-users").get(readUser);
router.route("/:id/get-one-user").get(readOneUser);
router.route("/:id/update-user").patch(updateOneUser);
router.route("/:id/delete-user").delete(deleteOneUser);
router.route("/register").post(createUser);
router.route("/sign-in").post(signInUser);

export default router;
