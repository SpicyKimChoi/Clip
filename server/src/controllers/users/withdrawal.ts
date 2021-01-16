import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../../entity/Users";
import { errorTypes } from "../utils/errors/usersControllerErrors";
import * as jwt from "jsonwebtoken";

export const withdrawal = async (req:Request, res: Response) => {
	const usersRepository = getRepository(Users);

	try {
		//토큰이 없는 경우
		if(!req.cookies.token) throw errorTypes.TOKEN_NOT_FOUND
		const token = req.cookies.token;

		//토큰에서 uuid가져오기
		const uuid = await new Promise<string> ((resolve, reject) => {
			jwt.verify(token, process.env.jWT_SECRET, (err: never, decoded: {id:string})=>{
				if(err) reject(err);
				resolve(decoded.id)
			});
		});
		//uuid로 유저 찾기
		const user = await usersRepository.find({uuid: uuid});

		//이미 삭제된 유저인경우
		if(user.length === 0) throw errorTypes.USER_NOT_FOUND;

		//유저 삭제
		usersRepository.delete({uuid: uuid})
			.then(() => {
				res.clearCookie('token');
    		res.redirect('/');
    		res.end();
			})
			.catch(err => {throw err})		

	} catch (err) {
		console.log(err);
		if(!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	}
}