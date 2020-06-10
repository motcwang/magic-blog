import Router from 'koa-router';
import { injectable } from 'tsyringe';
import test from './test';

@injectable()
export class RouterMiddleware extends Router {
  public constructor() {
    super();
    this.use('/', test.routes(), test.allowedMethods());
  }
}
