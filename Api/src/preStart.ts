import express from 'express';
import optionsSwagger from './configs/swagger';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import Logger from './utils/logger'
import bodyParser from 'body-parser'

declare global {
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}

global.__rootdir__ = __dirname || process.cwd();

const app = express();

// ---------------------------------------------------

Logger.info("Application Startup: Initializing Sentry.")

Sentry.init({
  dsn: process.env.SENTRY_DSN_KEY,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// ---------------------------------------------------

Logger.info("Application Startup: Initializing API Doc.")

let Swagger = require('express-swagger-generator')(app);

Swagger(optionsSwagger)

Logger.info("Application Startup: API Doc initialized.")

// ---------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

export default app;