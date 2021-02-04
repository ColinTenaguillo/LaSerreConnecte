import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import v1 from './routes/v1/v1'
import Logger from "./utils/logger";
import app from "./preStart"

Logger.info("Application Startup: Initializing ExpressJS.")

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

Logger.info("Application Startup: ExpressJS Initialized.")

type dictionary = {[id: string]: string}

const VERSIONS: dictionary = {'Version 1': '/v1'};

// versioned routes go in the routes/ directory
// import the routes
// for (let k in VERSIONS) {
//     app.use(VERSIONS[k], require('./routes' + VERSIONS[k] + VERSIONS[k]));
// }

Logger.info("Application Startup: Registering routes.")
app.use('/v1', v1);
Logger.info("Application Startup: Routes registered.")

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

export default app;