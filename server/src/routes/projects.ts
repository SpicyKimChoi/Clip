import { Router } from "express";
import { projectsController } from "../controllers/projects";

export const projectsRouter = Router();

projectsRouter.post('/create', projectsController.create);
projectsRouter.get('/all', projectsController.getProjects);
projectsRouter.put('/update', projectsController.update);
projectsRouter.delete('/del', projectsController.delPorj);
projectsRouter.post('/invite', projectsController.invite);
projectsRouter.get('/getUsers', projectsController.getUsers);
projectsRouter.delete('/kick', projectsController.kickTeam);