import * as fs from 'fs';
import * as supertest from 'supertest';
import * as mysql from 'mysql2';
import * as dotenv from 'dotenv';
import { expect } from 'chai';
import app from '../..';
import { errorTypes } from '../../controllers/utils/errors/usersControllerErrors';
import { env } from 'process';

dotenv.config()

const agent = supertest(app)

describe('users/signup 테스트', () => {

	before(() => { 
		const dbconnection = mysql.createConnection({
			host: "172.18.0.2",
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_TEST,
		});
		dbconnection.connect();
		dbconnection.query("delete from users where social_id = '1111';")
		dbconnection.end();
	});

	it('signup controller 파일이 존재해야합니다', () => {
		const hasSignupController = fs.existsSync("src/controllers/users/signup.ts");
		expect(hasSignupController).to.be.true;
	});

	describe(" POST /signup", () => {
		it('정상적으로 회원가입 된 경우 201 status code를 반환해야합니다.', async () => {
			const response = await agent.post("/users/signup").send({
				username: '최원준',
				social_id: "1111"
			});
			expect(response.status).to.eql(201);
		});

		it('이미 등록된 social_id가 들어온 경우 409 status code를 반환해야합니다.', async () => {
			const response = await agent.post("/users/signup").send({
				username: '최원준',
				social_id: "1111"
			});
			expect(response.status).to.eql(errorTypes.USER_ALREADY_EXIST.statusCode);
		});

		it('필수적인 요소가 들어오지 않은 경우 400 status code를 반환해야합니다.', async () => {
			const response = await agent.post("/users/signup").send({
				username: '최원준',
			});
			expect(response.status).to.eql(errorTypes.BAD_REQUEST.statusCode);
		});
	});
});