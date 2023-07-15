import { Router } from "express";
import { createTask, deleteTask, readTask } from "../Controller/taskController";

const router: Router = Router();

router.route("/:id/create-task").post(createTask);
router.route("/view-task").get(readTask);
router.route("/:id/delete-task").delete(deleteTask);

export default router;
