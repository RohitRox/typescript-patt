import { Response } from 'express'
import { IAuthRequest } from 'sputnik-app-kit';

export default class Responder {
  protected req: IAuthRequest;
  protected res: Response;

  constructor(req: IAuthRequest, res: Response) {
    this.req = req;
    this.res = res;
  }

  renderJson (code: number, message: string) {
    return this.res.status(code).json({ message });
  }

  ok<T> (dto?: T) {
    if (!!dto) {
      return this.res.status(200).json(dto);
    } else {
      return this.res.sendStatus(200);
    }
  }

  created () {
    return this.res.sendStatus(201);
  }

  unauthorized (message?: string) {
    return this.renderJson(401, message ? message : 'Unauthorized');
  }

  forbidden (message?: string) {
    return this.renderJson(403, message ? message : 'Forbidden');
  }

  notFound (message?: string) {
    return this.renderJson(404, message ? message : 'Not found');
  }

  tooMany (message?: string) {
    return this.renderJson(429, message ? message : 'Too many requests');
  }

  fail (error: Error | string) {
    return this.res.status(500).json({
      message: error.toString()
    })
  }
}
