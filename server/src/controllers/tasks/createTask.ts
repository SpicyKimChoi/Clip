import { Request, Response } from "express";
import { errorTypes } from "../utils/errors/privateClipsErrors";
import { getCustomRepository } from "typeorm";

import * as jwt from "jsonwebtoken";
import { TasksRepository } from "../../repositories/TasksRepo";

export const createTask = async (req:Request, res:Response) => {
	try {
		if(!req.cookies) throw errorTypes.LOGIN_IS_REQUIRED;
		const { projectId, sectionId, labelIds, tasksParams } = req.body;

		const token = req.cookies.token;
		const uuid = await new Promise<string> ((resolve, reject) => {
			jwt.verify(token, process.env.jWT_SECRET, (err: never, decoded: {id:string})=>{
				if(err) reject(err);
				resolve(decoded.id)
			});
		});

		const taskRepo = getCustomRepository(TasksRepository);
		const data = await taskRepo.createTask(uuid, projectId, sectionId, labelIds, tasksParams);
		res.status(201).json(data);
	} catch (err) {
		if(!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	}
}
// interface tasksParams{
// 	title: string;
// 	description: string | null;
// 	start_date: Date | null;
// 	due_date: Date | null;
// 	assignee: string[];
// }