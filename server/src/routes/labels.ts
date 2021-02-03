import { Router } from "express";
import { labelsController } from "../controllers/labels";

export const labelsRouter = Router();

labelsRouter.post('/create', labelsController.createLabel);
labelsRouter.get('/read', labelsController.readAll);
labelsRouter.put('/edit', labelsController.edit);
labelsRouter.delete('/del', labelsController.delLabel);