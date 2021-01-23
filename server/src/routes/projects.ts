import { Router } from "express";
import { projectsController } from "../controllers/projects";

export const projectsRouter = Router();

projectsRouter.post('/create', projectsController.create);