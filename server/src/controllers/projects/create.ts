import { Request, Response } from "express";
import { errorTypes } from "../utils/errors/projectsControllerErrors";
import { getCustomRepository } from "typeorm";
import { ProjectsRepository } from "../../repositories/ProjectsRepo";
import { ProjectsPermissionsRepository } from "../../repositories/ProjectPermissionRepo";
import * as jwt from "jsonwebtoken";

export const create = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		const token = req.cookies.token;
		const uuid = await new Promise<string> ((resolve, reject) => {
			jwt.verify(token, process.env.jWT_SECRET, (err: never, decoded: {id:string})=>{
				if(err) reject(err);
				resolve(decoded.id)
			});
		});
		const projectRepo = getCustomRepository(ProjectsRepository);
		const permissionRepo = getCustomRepository(ProjectsPermissionsRepository);

		//잘못된 요청인 경우
		if(!name || !token) throw errorTypes.TOKEN_NOT_FOUND;

		//프로젝트 생성
		const project = await projectRepo.createProject(name);
		await permissionRepo.addPermission(uuid, project.id, true);
		
		res.status(201).json(project);

	} catch (err) {
		if(!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);

	}
}