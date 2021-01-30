import { Request, Response } from "express";
import { errorTypes } from "../utils/errors/privateClipsErrors";
import { getCustomRepository } from "typeorm";
import { PublicClipsRepository } from "../../repositories/PublicClipRepo"
import * as jwt from "jsonwebtoken";

export const editClip = async (req:Request, res:Response) => {
	try {
		if(!req.cookies) throw errorTypes.LOGIN_IS_REQUIRED;
		const { clipId, projectId, title, description } = req.body;

		const token = req.cookies.token;
		const uuid = await new Promise<string> ((resolve, reject) => {
			jwt.verify(token, process.env.jWT_SECRET, (err: never, decoded: {id:string})=>{
				if(err) reject(err);
				resolve(decoded.id)
			});
		});

		const publicClipRepo = getCustomRepository(PublicClipsRepository);
		const data = await publicClipRepo.editClip(uuid, projectId, clipId, title, description);
		res.status(201).json(data);
	} catch (err) {
		if(!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	}
}