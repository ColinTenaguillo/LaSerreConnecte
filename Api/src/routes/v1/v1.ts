// Version 1
import express from 'express';
import expressLogger from "../../utils/expressLogger";
import indexRouter from './index';
import temperature from "./temperature"
import humidity from "./humidity"
import pressure from "./pressure"


const app = express();


// normal routes, all will be pre-fixed by the version
app.use(expressLogger);
app.use('/', indexRouter) // /v1
app.use('/temperature', temperature) // /v1
app.use('/humidity', humidity) // /v1
app.use('/pressure', pressure) // /v1

export default app;