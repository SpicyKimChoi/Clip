import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../../entity/Users";
import { errorTypes } from "../utils/errors/usersControllerErrors";
import * as jwt from "jsonwebtoken";

export const signIn = async (req:Request, res: Response) => {
	const {social_id} = req.body;
	const usersRepository  = getRepository(Users);

	try {
		//필수적인 요소가 들어오지 않은 경우 400 에러
		if(!social_id) throw errorTypes.BAD_REQUEST;

		//유저 탐색
		const user = await usersRepository.find({social_id: social_id});

		//등록된 유저가 아닌 경우
		if(user.length === 0) throw errorTypes.USER_NOT_FOUND;
		//데이터베이스에 유저가 2명이상 있는 경우
		if(user.length > 1) throw errorTypes.INTERNAL_SERVER_ERROR;
		jwt.sign({id: user[0].uuid}, process.env.jWT_SECRET, {expiresIn:'60m'}, (err, token) => {
			if(err){
				throw errorTypes.JWT_SIGN_ERROR;
			}else{
				res.cookie('token', token);
				res.status(200).json({message: 'login!'})
			}
		});
		
	} catch (err) {
		console.log(err);
		if(!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	}
}