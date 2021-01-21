import { Router } from "express";
import { usersController } from "../controllers/users";

export const usersRouter = Router();

usersRouter.post('/signin', usersController.signIn);
usersRouter.post('/withdrawal', usersController.withdrawal);
usersRouter.post('/signout', usersController.signOut);