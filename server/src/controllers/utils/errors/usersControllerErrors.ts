interface errorList {
	[code: string]:{
		statusCode: number;
		message: string;
	}
}

export const errorTypes: errorList = {
	BAD_REQUEST:{
		statusCode:400,
		message: "잘못된 요청입니다."
	},
	USER_NOT_FOUND:{
		statusCode:404,
		message: "존재하지 않는 유저입니다."
	},
	USER_ALREADY_EXIST:{
		statusCode: 409,
		message: "이미 존재하는 유저입니다."
	},
	INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "서버에 오류가 발생했습니다.",
	},
	JWT_SIGN_ERROR:{
		statusCode: 500,
    message: "jwt 토큰 생성과정에서 문제가 발생했습니다",
	}
}