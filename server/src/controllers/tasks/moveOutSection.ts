import { Request, Response } from "express";
import { errorTypes } from "../utils/errors/privateClipsErrors";
import { getCustomRepository } from "typeorm";

import * as jwt from "jsonwebtoken";
import { TasksRepository } from "../../repositories/TasksRepo";
import { ProjectsRepository } from "../../repositories/ProjectsRepo";

export const moveOutSecion = async (req:Request, res:Response) => {
	try {
		if(!req.cookies) throw errorTypes.LOGIN_IS_REQUIRED;
		const { projectId, taskId, sectionId, index } = req.body;

		const token = req.cookies.token;
		const uuid = await new Promise<string> ((resolve, reject) => {
			jwt.verify(token, process.env.jWT_SECRET, (err: never, decoded: {id:string})=>{
				if(err) reject(err);
				resolve(decoded.id)
			});
		});

		const taskRepo = getCustomRepository(TasksRepository);
		const projectRepo = getCustomRepository(ProjectsRepository);
		
		await taskRepo.moveOutSection(taskId, sectionId, index);
		const data = await projectRepo.getAllTasksByProjectId(projectId);
		res.status(200).json(data);
	} catch (err) {
		if(!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	}
}