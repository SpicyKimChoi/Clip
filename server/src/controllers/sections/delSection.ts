import { Request, Response } from "express";
import { errorTypes } from "../utils/errors/privateClipsErrors";
import { getCustomRepository } from "typeorm";
import { SectionsRepository } from "../../repositories/SectionRepo"
import * as jwt from "jsonwebtoken";

export const delSec = async (req:Request, res:Response) => {
	try {
		if(!req.cookies) throw errorTypes.LOGIN_IS_REQUIRED;
		const { projectId, sectionId } = req.body;

		const token = req.cookies.token;
		const uuid = await new Promise<string> ((resolve, reject) => {
			jwt.verify(token, process.env.jWT_SECRET, (err: never, decoded: {id:string})=>{
				if(err) reject(err);
				resolve(decoded.id)
			});
		});

		const sectionRepo = getCustomRepository(SectionsRepository);
		const data = await sectionRepo.delSect(uuid, projectId, sectionId);
		res.status(201).json(data);
	} catch (err) {
		if(!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	}
}