import { Router } from "express";
import { privateClipsController } from "../controllers/privateClips";

export const clipsRouter = Router();

clipsRouter.post('/private/create', privateClipsController.createClip);