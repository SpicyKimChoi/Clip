import { Request, Response } from "express";
import { errorTypes } from "../utils/errors/privateClipsErrors";
import { getCustomRepository } from "typeorm";
import { PrivateClipsRepository } from "../../repositories/PrivateClipRepo"
import * as jwt from "jsonwebtoken";

export const createClip = async (req:Request, res:Response) => {
	try {
		if(req.cookies.token === undefined) throw errorTypes.LOGIN_IS_REQUIRED;
		const {projectId, title, description, isMemo} = req.body;

		const token = req.cookies.token;
		const uuid = await new Promise<string> ((resolve, reject) => {
			jwt.verify(token, process.env.jWT_SECRET, (err: never, decoded: {id:string})=>{
				if(err) reject(err);
				resolve(decoded.id)
			});
		});

		const privateClipsRepo = getCustomRepository(PrivateClipsRepository);
		const data = await privateClipsRepo.createClip(uuid, projectId, title, description, isMemo)
		res.status(201).json(data);
	} catch (err) {
		if(!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	}
}