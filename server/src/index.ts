import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from 'express';

//Import Routers

//Connect TypeORM mysql
createConnection()
	.then(() => {
		console.log('Database Connect!')
		
		const app = express();

		//Middlewares
		app.set('port', process.env.PORT || 4000);

		//Routes
		app.get('/', (_, res) => {
			res.status(200).send('hello! Clip server!')
		})


		app.listen(app.get('port'), () => {
			console.log(`Clip server listening on PORT ${app.get('port')}`)
		})
	})
	.catch((err) => console.log(err))

