/* eslint-disable no-unused-vars */
import { getMapping, controller } from '../core/decorator';
import { Context } from '../core/types';
import { singleton } from 'tsyringe';
import { Logger } from '../common/logger';

const logger = Logger.create('TestController');

@controller()
@singleton()
export class TestController {
  @getMapping('/test')
  public async test(ctx: Context) {
    logger.pink('test');
    ctx.body = 'hello';
  }
}
