import { Router } from "express";
import { clipsController } from "../controllers/clips";

export const clipsRouter = Router();
clipsRouter.post('/create', clipsController.create);
clipsRouter.get('/getPrivate', clipsController.getPrivateList);
clipsRouter.get('/getPublic', clipsController.getPublicList);
clipsRouter.put('/edit', clipsController.edit);
clipsRouter.delete('/del', clipsController.delClip);
