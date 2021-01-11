import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../../entity/Users";
import { errorTypes } from "../utils/errors/usersControllerErrors";

export const signUp = async (req: Request, res: Response)=>{
	const {username, social_id} = req.body;
	const usersRepository = getRepository(Users);
	
	try{
		//필수적인 요소가 들어오지 않은 경우 400에러
		if(!username || !social_id) throw errorTypes.BAD_REQUEST;

		//이미 등록된 Social_id가 있는 경우 409에러
		const existsUser = await usersRepository.find(social_id);
		if(!!existsUser) throw errorTypes.USER_ALREADY_EXIST;

		//유저 
		const user = new Users();
		user.username = username;
		user.social_id = social_id;
		usersRepository.save(user)
			.then(() => {
				res.status(201).json('회원가입이 완료되었습니다')
			})
			.catch(err => {
				throw errorTypes.INTERNAL_SERVER_ERROR;
			});
	} catch (err) {
		console.log(err);
		if(!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	}
}