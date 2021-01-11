import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

//Import Routers
import { usersRouter } from "./routes/users";

//Connect TypeORM mysql
createConnection()
	.then(() => {
		console.log('Database Connect!')
		
		const app = express();

		//Middlewares
		app.set('port', process.env.PORT || 4000);
		app.use(morgan('dev'));
		app.use(bodyParser.json());
		app.use(
			bodyParser.urlencoded({
				extended: true,
			}),
		);

		//Routes
		app.get('/', (_, res) => {
			res.status(200).send('hello! Clip server!')
		});
		app.use('/users', usersRouter);
		

		app.listen(app.get('port'), () => {
			console.log(`Clip server listening on PORT ${app.get('port')}`)
		})
	})
	.catch((err) => console.log(err));

