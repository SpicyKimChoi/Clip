import * as dotenv from 'dotenv';
dotenv.config();

const database = {
  development: "clip",
  production: 'clip',
  test: 'clip_test'
}
console.log(process.env.DATABASE_ENV);

export default {
	"type": "mysql",
	"host": "database",
	"port": 3306,
	"username": process.env.DATABASE_USERNAME,
	"password": process.env.DATABASE_PASSWORD,
	"database": database[process.env.DATABASE_ENV],
	"synchronize": true,
	"logging": false,
	"entities": [
		 "src/entity/**/*.ts"
	],
	"migrations": [
		 "src/migration/**/*.ts"
	],
	"subscribers": [
		 "src/subscriber/**/*.ts"
	],
	"cli": {
		 "entitiesDir": "src/entity",
		 "migrationsDir": "src/migration",
		 "subscribersDir": "src/subscriber"
	}
}