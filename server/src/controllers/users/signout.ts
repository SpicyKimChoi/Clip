import { Request, Response } from "express";
import { errorTypes } from "../utils/errors/usersControllerErrors";

export const signOut = async (req:Request, res: Response) => {
	try {
		//토큰이 없는 경우
		if(!req.cookies.token) throw errorTypes.TOKEN_NOT_FOUND

		res.clearCookie('token');
    res.redirect('/');
    res.end();

	} catch (err) {
		console.log(err);
		if(!!err.statusCode) res.status(err.statusCode).json(err.message);
		else res.status(errorTypes.INTERNAL_SERVER_ERROR.statusCode).json(errorTypes.INTERNAL_SERVER_ERROR.message);
	}
}