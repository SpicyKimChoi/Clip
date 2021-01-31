import { Router } from "express";
import { tasksController } from "../controllers/tasks";

export const tasksRouter = Router();

tasksRouter.post('/create', tasksController.createTask);
tasksRouter.get('/readOne', tasksController.readOne);
tasksRouter.put('/edit', tasksController.editTask);

tasksRouter.put('/addAssignee', tasksController.addAssignee);
tasksRouter.delete('/delAssignee', tasksController.delAssignee);

tasksRouter.post('/comment', tasksController.addComment);
tasksRouter.put('/comment', tasksController.editCommnet);
tasksRouter.delete('/comment', tasksController.delComment);