import { Router } from "express";
import { clipsController } from "../controllers/clips";

export const clipsRouter = Router();
clipsRouter.post('/create', clipsController.create);
clipsRouter.get('/getlist', clipsController.getList);

