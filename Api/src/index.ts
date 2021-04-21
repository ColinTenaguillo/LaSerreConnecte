
import './preStart'
import './influxdb'
import optionsSwagger from './configs/swagger';
import Logger from './utils/logger'
import bodyParser from 'body-parser'
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import path from 'path';
import cookieParser from 'cookie-parser';
import v1 from './routes/v1/v1'
import express from 'express';

const port = Number(process.env.PORT || 3001);

const app = express();

// ---------------------------------------------------

Logger.info("Application Startup: Initializing Sentry.")

Logger.info(process.env.SENTRY_DSN_KEY)

Sentry.init({
  dsn: process.env.SENTRY_DSN_KEY,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that 
// every transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

Logger.info("Application Startup: Sentry initialized")

// ---------------------------------------------------

Logger.info("Application Startup: Initializing API Doc.")

let Swagger = require('express-swagger-generator')(app);

Swagger(optionsSwagger)

Logger.info("Application Startup: API Doc initialized.")

// ---------------------------------------------------


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ---------------------------------------------------

Logger.info("Application Startup: Initializing ExpressJS.")

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

Logger.info("Application Startup: ExpressJS Initialized.")

// ---------------------------------------------------

Logger.info("Application Startup: Registering routes.")

app.use('/v1', v1);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("Test Sentry error");
});

Logger.info("Application Startup: Routes registered.")

// ---------------------------------------------------


// Need to be the very last one
app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

// Start the server
app.listen(port, () => {
  return Logger.info(`Application started and listening on ${port}`);
});
