import * as fs from 'fs';
import * as supertest from 'supertest';
import * as mysql from 'mysql2';
import * as dotenv from 'dotenv';
import { expect } from 'chai';
import app from '../..';
import { errorTypes } from '../../controllers/utils/errors/usersControllerErrors';

dotenv.config()

const agent = supertest(app)

describe('users/signin 테스트', async () => {
	before(() => {
		const dbconnection = mysql.createConnection({
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_TEST,
		});
		dbconnection.connect();

		(() => {
			return new Promise<object[]>(function (resolve, reject) {
				dbconnection.query('select * from users where social_i="1111"', (err, result) => {
					if (!err) resolve(JSON.parse(JSON.stringify(result))); 
					else reject(err);
				});
			});
		})()
			.then(res => {
				if (res.length === 0) dbconnection.query('insert into users (username, social_id, uuid) value ("최원준", "1111", uuid());')
			});

		(() => {
			return new Promise<object[]>(function (resolve, reject) {
				dbconnection.query('select * from users where social_i="2222"', (err, result) => {
					if (!err) resolve(JSON.parse(JSON.stringify(result))); 
					else reject(err);
				});
			});
		})()
			.then(res => {
				if (res.length !== 0) dbconnection.query('delete from users where social_id = "2222";')
			});

		dbconnection.end();
	});

	it('signin controller 파일이 존재해야합니다', () => {
		const hasSignupController = fs.existsSync("src/controllers/users/signin.ts");
		expect(hasSignupController).to.be.true;
	});

	it('signin test 전에 social_id = "1111"인 유저가 있어야합니다.', async () => {
		const dbconnection = mysql.createConnection({
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_TEST,
		});
		dbconnection.connect();
		const testuser = await (() => {
			return new Promise<object[]>(function (resolve, reject) {
				dbconnection.query('select * from users where social_id="1111"', (err, result) => {
					if (!err) resolve(JSON.parse(JSON.stringify(result))); 
					else reject(err);
				});
			});
		})();

		expect(testuser.length).to.eql(1);
	
		dbconnection.end();
	});

	it('signin test 전에 social_id = "2222"인 유저가 없어야합니다.', async () => {
		const dbconnection = mysql.createConnection({
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_TEST,
		});
		dbconnection.connect();
		const testuser = await (() => {
			return new Promise<object[]>(function (resolve, reject) {
				dbconnection.query('select * from users where social_id="2222"', (err, result) => {
					if (!err) resolve(JSON.parse(JSON.stringify(result))); 
					else reject(err);
				});
			});
		})();

		expect(testuser.length).to.eql(0);
	
		dbconnection.end();
	});

	describe(" POST /signin", () => {
		it('정상적으로 로그인이 된 경우 200 status code와 함께 토큰이 있어야 합니다.', async () => {
			const response = await agent.post('/users/signin').send({
				social_id: "1111"
			});
			expect(response.status).to.eql(200);
		});

		it('회원가입이 되지 않은 유저인경우 404 status code가 반환되어야합니다.', async () => {
			const response = await agent.post('/users/signin').send({
				social_id: "2222"
			});
			expect(response.status).to.eql(errorTypes.USER_NOT_FOUND.statusCode);
		});

		it('필수적인 요소가 없는 요청일 경우 400 status code가 반환되어야합니다.', async () => {
			const response = await agent.post('/users/signin').send({
				id: "1111"
			});
			expect(response.status).to.eql(errorTypes.BAD_REQUEST.statusCode);
		});
	})
});