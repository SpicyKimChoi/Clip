/**
 * 로그인한 유저가 들어간 프로젝트의 정보를 받아오는 API
 */

import { Request, Response } from "express";
import { errorTypes } from "../utils/errors/projectsControllerErrors";
import * as jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { ProjectsRepository } from "../../repositories/ProjectsRepo";

 export const getProjects = async (req: Request, res: Response) => {
	 try {
		if(!req.cookies.token) throw errorTypes.TOKEN_NOT_FOUND;

		const token = req.cookies.token;
		const uuid = await new Promise<string> ((resolve, reject) => {
			jwt.verify(token, process.env.jWT_SECRET, (err: never, decoded: {id:string})=>{
				if(err) reject(err);
				resolve(decoded.id)
			});
		});
		const projectRepo = getCustomRepository(ProjectsRepository);
		const projects = await projectRepo.getProjects(uuid);
		res.status(200).json(projects);


	 } catch (err) {
		console.log(err)
		if(!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	 }
 }