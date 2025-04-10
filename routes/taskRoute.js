import { Router } from "express";
import { authenticateToken } from "../middlewares/authmiddleware.js";
import {
  createTask,
  deleteTask,
  getTasks,
} from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter.get("/get-tasks", authenticateToken, getTasks);
taskRouter.post("/create-task", authenticateToken, createTask);
taskRouter.delete("/delete-task/:id", authenticateToken, deleteTask);

export default taskRouter;
