/* eslint-disable no-unused-vars */
import { getMapping, controller } from '../core/decorator';
import { Context } from '../core/types';
import { injectable } from 'tsyringe';

// 自动引入  不用手动引入

@controller()
@injectable()
export class TestController {
  @getMapping('/')
  public async test(ctx: Context) {
    ctx.body = 'hello';
  }
}
