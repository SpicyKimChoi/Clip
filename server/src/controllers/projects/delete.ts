import { Request, Response } from "express"
import { errorTypes } from "../utils/errors/projectsControllerErrors";
import * as jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { ProjectsRepository } from "../../repositories/ProjectsRepo";


export const delPorj = async ( req: Request, res: Response) => {
	try {
		const { id } = req.body;
		//어떤 프로젝트인지 들어오지 않은 경우
		if(!id) throw errorTypes.BAD_REQUEST;
		//쿠키가 없는 경우
		if(!req.cookies) throw errorTypes.TOKEN_NOT_FOUND;

		const token = req.cookies.token;
		const uuid = await new Promise<string>((resolve, reject) => {
			jwt.verify(token, process.env.jWT_SECRET, (err: never, decoded: { id: string }) => {
				if (err) reject(err);
				resolve(decoded.id)
			});
		});

		const projRepo = getCustomRepository(ProjectsRepository);
		projRepo.deleteProject(uuid, id)
			.then(proj => {
				// console.log(proj);
				res.status(200).json(proj);
			})
			.catch(err => {
				throw err;
			})

	} catch (err) {
		if (!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	}
}