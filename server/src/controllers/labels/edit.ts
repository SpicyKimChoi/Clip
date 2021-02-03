import { Request, Response } from "express";
import { errorTypes } from "../utils/errors/privateClipsErrors";

import * as jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { LabelRepository } from "../../repositories/LabelRepo";

export const edit = async (req: Request, res: Response) => {
	try {
		if(!req.cookies) throw errorTypes.LOGIN_IS_REQUIRED;
		const { labelId, name, color } = req.body;

		const token = req.cookies.token;
		const uuid = await new Promise<string> ((resolve, reject) => {
			jwt.verify(token, process.env.jWT_SECRET, (err: never, decoded: {id:string})=>{
				if(err) reject(err);
				resolve(decoded.id)
			});
		});

		const labelRepo = getCustomRepository(LabelRepository);
		const data = await labelRepo.edit(labelId, name, color);
		res.status(201).json(data);
	} catch (err) {
		if(!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	}
}