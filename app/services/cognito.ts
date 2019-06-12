const AWS = require('aws-sdk');

const serviceProvider = new AWS.CognitoIdentityServiceProvider();

interface IUserPoolClient {
  UserPoolId: string
  CallbackURLs: string[]
  ClientId: string
  ClientName: string
  ClientSecret: string
}

interface IDescribeUserPoolClientResponse {
  UserPoolClient: IUserPoolClient
}

type describeUserPoolClient = (userPoolID: string, clientID: string) => Promise<IDescribeUserPoolClientResponse>;

export function describeUserPoolClient(userPoolID: string, clientID: string): Promise<IDescribeUserPoolClientResponse> {
  const params = {
    ClientId: clientID,
    UserPoolId: userPoolID,
  };
  return new Promise((resolve, reject) => {
    serviceProvider.describeUserPoolClient(params, (err: Error, data: IDescribeUserPoolClientResponse) => {
      if (err) reject(err)
      else      resolve(data)
    })
  })
}
