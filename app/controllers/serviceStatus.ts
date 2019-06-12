import BaseController from './base';
import config from '../config';
import { describeUserPoolClient } from '../services/cognito'
import { SputnikUnauthorized, ErrorCodes } from '../lib/errors';

export interface IServiceStatusResponse {
  status: string
  current_user: {
    email: string
    pool: string
    id?: string
  }
}

export default class ServiceStatusController extends BaseController {

  public async handler () {
    try {

      const user = this.req.currentUser()
      if (!user)
        throw new SputnikUnauthorized()

      const userPoolDetails = await describeUserPoolClient(config.cognito.userPoolId, config.cognito.clientId)

      const res: IServiceStatusResponse = {
        status: 'ok',
        current_user: { email: user.email, pool: userPoolDetails.UserPoolClient.ClientName }
      }

      return this.responder.ok(res)

    } catch (err) {
      if (err.code == ErrorCodes.G_401)
        return this.responder.unauthorized()
      if (err.code)
        return this.responder.fail(`${err.code}: ${err.message}`)
      else
        return this.responder.fail(err.toString())
    }
  }
}
