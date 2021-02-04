// Version 1
import express from 'express';
import expressLogger from "../../utils/expressLogger";

const app = express();

import indexRouter from './index';


// normal routes, all will be pre-fixed by the version
app.use(expressLogger);
app.use('/', indexRouter) // /v1


export default app;