import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

//Import Routers
import { usersRouter } from "./routes/users";
import { clipsRouter } from "./routes/clips";
import { projectsRouter } from "./routes/projects";
import { sectionsRouter } from "./routes/sections"
import { tasksRouter } from "./routes/tasks";
import { labelsRouter } from "./routes/labels";

//Connect TypeORM mysql
createConnection()
	.then(() => {
		console.log('Database Connect!')
	})
	.catch((err) => console.log(err));

const app = express();

//cors 
const options : cors.CorsOptions= {
	allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,

}

//Middlewares
app.use(cors(options));
app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(cookieParser());

//Routes
app.get('/', (_, res) => {
	res.status(200).send('hello! Clip server!')
});
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/clips', clipsRouter);
app.use('/sections', sectionsRouter);
app.use('/tasks', tasksRouter);
app.use('/labels', labelsRouter);


app.listen(app.get('port'), () => {
	console.log(`Clip server listening on PORT ${app.get('port')}`)
})

export default app;