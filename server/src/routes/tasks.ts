import { Router } from "express";
import { tasksController } from "../controllers/tasks";

export const tasksRouter = Router();

tasksRouter.post('/create', tasksController.createTask);
tasksRouter.get('/readOne', tasksController.readOne);
tasksRouter.put('/edit', tasksController.editTask);

tasksRouter.put('/changeMark', tasksController.changeMark);

tasksRouter.put('/addAssignee', tasksController.addAssignee);
tasksRouter.delete('/delAssignee', tasksController.delAssignee);

tasksRouter.put('/addLabel', tasksController.addLabel);
tasksRouter.delete('/delLabel', tasksController.delLabel);

tasksRouter.post('/comment', tasksController.addComment);
tasksRouter.put('/comment', tasksController.editCommnet);
tasksRouter.delete('/comment', tasksController.delComment);

tasksRouter.put('/like', tasksController.like);
tasksRouter.delete('/like', tasksController.unlike);

tasksRouter.put('/movein', tasksController.moveInSecion);
tasksRouter.put('/moveout', tasksController.moveOutSecion);

tasksRouter.delete('/del', tasksController.delTask);