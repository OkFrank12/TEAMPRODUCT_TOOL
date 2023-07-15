"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../Controller/authController");
const router = (0, express_1.Router)();
router.route("/all-users").get(authController_1.readUser);
router.route("/:id/get-one-user").get(authController_1.readOneUser);
router.route("/:id/update-user").patch(authController_1.updateOneUser);
router.route("/:id/delete-user").delete(authController_1.deleteOneUser);
router.route("/register").post(authController_1.createUser);
router.route("/sign-in").post(authController_1.signInUser);
exports.default = router;
