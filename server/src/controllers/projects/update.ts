import { Request, Response } from "express";
import { errorTypes } from "../utils/errors/projectsControllerErrors";
import * as jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { ProjectsRepository } from "../../repositories/ProjectsRepo";

export const update = async (req: Request, res: Response) => {
	try {
		const { id, name, description } = req.body;
		if(!req.cookies || !id) throw errorTypes.BAD_REQUEST;

		const token = req.cookies.token;
		const uuid = await new Promise<string>((resolve, reject) => {
			jwt.verify(token, process.env.jWT_SECRET, (err: never, decoded: { id: string }) => {
				if (err) reject(err);
				resolve(decoded.id)
			});
		});


		const projectRepo = getCustomRepository(ProjectsRepository)
		projectRepo.editProject(uuid, id ,name, description)
			.then(proj => {
				console.log(proj);
				res.status(201).json(proj);
			})
			.catch(err => {
				console.log(err);
				throw err;
			})


	} catch (err) {
		if (!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	}
}