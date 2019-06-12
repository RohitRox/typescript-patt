import express, { Response } from 'express';
import { IAuthRequest } from 'sputnik-app-kit';

export function mockRequest(requestAttrs: { query?: any, currentUser?: any } = {}) {
  const req: Partial<IAuthRequest> = {
    destroyUserSession: jest.fn(),
    createUserSession: jest.fn(),
    currentUser: jest.fn().mockImplementation(() => requestAttrs.currentUser || undefined),
    session: {} as Express.Session,
    query: requestAttrs.query || {}
  }

  return req as IAuthRequest
}

export function mockResponse() {
  let res: Partial<Response>
  res = {
    redirect: jest.fn(),
    send: jest.fn(),
    json: jest.fn(),
    sendStatus: jest.fn(),
    status: (code: number) => res as Response
  };
  return res as Response
}

export const mockConfig = {
  cognito: {
    clientId: 'us-east-1-xxxxxx',
    clientSecret: 'abcdef123456'
  }
}

export function makeApp() {
  const app = express();
  return app;
}
