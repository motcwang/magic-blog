/* eslint-disable no-unused-vars */
import { singleton, autoInjectable } from 'tsyringe';
import { BaseMiddleware, Wrapper, BaseError } from '../../wrapper';
import { UNKNOW_ERROR } from '../../../common/error';
import { Next, Context } from '../../types/koa';

@singleton()
@autoInjectable()
export class ErrorMiddleware extends BaseMiddleware {
  public async middleware(ctx: Context, next?: Next) {
    try {
      await next();
    } catch (e) {
      if (e instanceof BaseError) {
        ctx.body = Wrapper.failure(e.toResponse());
      } else {
        ctx.body = Wrapper.failure(UNKNOW_ERROR.toResponse());
      }
    }
  }
}
