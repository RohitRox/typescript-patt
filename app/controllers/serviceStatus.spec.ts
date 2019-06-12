import { ServiceStatusController } from ".";
import { mockRequest, mockResponse } from '../spec_helpers'
import { describeUserPoolClient } from '../services/cognito';

jest.mock('../services/cognito', () => {
  return {
    describeUserPoolClient: jest.fn()
  }
});
jest.mock('./responder')

describe("serviceStatusController", () => {
  describe('when the user is preesent', () => {
    let mockReq = mockRequest();
    let res = mockResponse();
    const serviceStatusController = new ServiceStatusController(mockReq, res)

    it("returns unauthorized", async () => {
      await serviceStatusController.handler()

      expect(serviceStatusController.responder.unauthorized).toHaveBeenCalled()
    });
  })

  describe('when the user is preesent', () => {
    let mockReq = mockRequest({
      currentUser: { email: 'user@mail.com' }
    });
    let res = mockResponse();
    const serviceStatusController = new ServiceStatusController(mockReq, res)

    it("does the thing", async () => {
      const userPoolClient = {
        UserPoolClient: {
          ClientName: 'client-name',
        },
      };
      (describeUserPoolClient as jest.Mock).mockImplementation(() => userPoolClient)

      await serviceStatusController.handler()

      expect(serviceStatusController.responder.ok).toHaveBeenCalledWith({
        current_user: {
          email: 'user@mail.com',
          pool: "client-name",
        },
        status: "ok"
      })
    });
  })

});
