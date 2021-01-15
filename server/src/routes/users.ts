import { Router } from "express";
import { usersController } from "../controllers/users";

export const usersRouter = Router();

usersRouter.post('/signup', usersController.signUp);
usersRouter.post('/signin', usersController.signIn);