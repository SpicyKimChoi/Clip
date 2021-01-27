import { Request, Response } from "express";
import { errorTypes } from "../utils/errors/projectsControllerErrors";
import * as jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { ProjectsPermissionsRepository } from "../../repositories/ProjectPermissionRepo";

export const kickTeam = async (req: Request, res: Response) =>{
	try {
		const { projectId, email } = req.body;
		if(!req.cookies) throw errorTypes.BAD_REQUEST;

		const token = req.cookies.token;
		const uuid = await new Promise<string>((resolve, reject) => {
			jwt.verify(token, process.env.jWT_SECRET, (err: never, decoded: { id: string }) => {
				if (err) reject(err);
				resolve(decoded.id)
			});
		});

		const projPermissionRepo = getCustomRepository(ProjectsPermissionsRepository);
		projPermissionRepo.kickUser(uuid, projectId, email)
			.then(data => {
				console.log(data);
				res.status(200).json(data);
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