/* eslint-disable no-unused-vars */
import { Response } from '../types';

export class BaseError extends Error {
  private code: number
  private origin: Error
  public constructor({code, message}: Response, origin?: Error) {
    super(message);
    this.code = code;
    this.origin = origin;
  }

  public originError(): Error {
    return this.origin;
  }

  public toResponse(): Response {
    return {code: this.code, message: this.message};
  }
}
