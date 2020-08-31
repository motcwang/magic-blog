/* eslint-disable no-unused-vars */
import { Next, Context } from '../types/koa';

export class BaseMiddleware {
  public middleware(_context: Context, _next?: Next) {

  }

  public order(): number {
    return 0;
  }
}
