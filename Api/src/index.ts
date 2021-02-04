import './preStart'; // Must be the first import
// import './influxdb';
import app from './server';
import * as Sentry from "@sentry/node";
import Logger from './utils/logger';
import * as express from 'express';

// Start the server
const port = Number(process.env.PORT || 3001);

app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

Logger.info("Application Startup: Initializied Sentry.")

app.listen(port, () => {
  return Logger.info(`Application started and listening on ${port}`);
});
