import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import AWS from 'aws-sdk';
import { auth, createSession } from 'sputnik-app-kit';

import appRouter from './routes';
import config from './config'

function loadSharedCreds() {
  if (!process.env.AWS_PROFILE) return;

  AWS.config.credentials = new AWS.SharedIniFileCredentials({
    disableAssumeRole: false,
  });
}

async function makeServer() {
  loadSharedCreds();

  const app = express();

  app.set('trust proxy', true);
  app.use(helmet());
  app.use(morgan('common'));

  const session =  createSession({
    hosts: ['localhost:11211'],
    secret: 'a-secret-pass',
  });

  app.use(session);

  const authMiddleware = auth(
    config.cognito.clientId,
    "cognito.clientSecret",
    "http://localhost:4000",
    "a-public-key",
  ).middleware;

  app.use(authMiddleware)

  app.use('/api', appRouter);

  return app;
}

export { makeServer };
