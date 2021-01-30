import { Router } from "express";
import { privateClipsController } from "../controllers/privateClips";
import { publicClipsController } from "../controllers/publicClips";

export const clipsRouter = Router();

clipsRouter.post('/private/create', privateClipsController.createClip);
clipsRouter.get('/private/all', privateClipsController.getAllClips);
clipsRouter.get('/private/one', privateClipsController.getClip);
clipsRouter.put('/private/edit', privateClipsController.editClip);
clipsRouter.delete('/private/del', privateClipsController.delClip);
clipsRouter.put('/private/move', privateClipsController.moveClip);

clipsRouter.post('/public/create', publicClipsController.createClip);
clipsRouter.get('/public/all', publicClipsController.getAllClips);
clipsRouter.get('/public/one', publicClipsController.getClip);
clipsRouter.put('/public/edit', publicClipsController.editClip);
clipsRouter.delete('/public/del', publicClipsController.delClip);
clipsRouter.put('/public/move', publicClipsController.moveClip);