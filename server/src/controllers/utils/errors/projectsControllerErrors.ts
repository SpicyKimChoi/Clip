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
	TOKEN_NOT_FOUND:{
		statusCode:403,
		message: "토큰이 존재하지 않습니다."
	},
	PERMISSION_ERROR:{
		statusCode:403,
		message: "해당하는 권한이 없습니다."
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
}