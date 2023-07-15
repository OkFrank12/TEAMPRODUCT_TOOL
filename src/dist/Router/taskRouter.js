"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../Controller/taskController");
const router = (0, express_1.Router)();
router.route("/:id/create-task").post(taskController_1.createTask);
router.route("/view-task").get(taskController_1.readTask);
router.route("/:id/delete-task").delete(taskController_1.deleteTask);
exports.default = router;
