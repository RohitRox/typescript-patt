import { Response } from 'express'
import { IAuthRequest } from 'sputnik-app-kit';

import Responder from './responder';

export default abstract class BaseController {
  protected req: IAuthRequest;
  protected res: Response;
  public responder: Responder;

  public abstract handler (): Promise<void | any>;

  constructor(req: IAuthRequest, res: Response) {
    this.req = req;
    this.res = res;
    this.responder = new Responder(req, res)
  }
}
