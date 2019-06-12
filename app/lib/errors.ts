export interface IAWSError {
  code: string
  message: string
  stack: string
}

export enum ErrorCodes {
  G_401 = 'G_401'
}

export class SputnikUnauthorized extends Error {
  code = ErrorCodes.G_401

  constructor(message: string = "Unauthorized access") {
    super(message);

    this.name = this.constructor.name;
  }
}
