import { Router } from "express";
import { tasksController } from "../controllers/tasks";

export const tasksRouter = Router();

tasksRouter.post('/create', tasksController.createTask);
tasksRouter.get('/readOne', tasksController.readOne);