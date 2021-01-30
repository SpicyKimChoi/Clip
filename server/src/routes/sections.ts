import { Router } from "express";
import { sectionController } from "../controllers/sections";

export const sectionsRouter = Router();

sectionsRouter.post('/create', sectionController.createSec);