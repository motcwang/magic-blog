/* eslint-disable no-unused-vars */
import { getMapping, controller } from '../core/decorator';
import { Context } from '../core/types';
import { Logger } from '../common/logger';
import { TestService } from '../service';
const logger = Logger.create('TestController');

@controller()
export class TestController {
  private testService: TestService
  public constructor(testService: TestService) {
    this.testService = testService;
  }

  @getMapping('/test')
  public async test(ctx: Context) {
    logger.pink('test');
    this.testService.log();
    ctx.body = 'hello';
  }

  @getMapping('/test2')
  public async test2(ctx: Context) {
    ctx.body = 'hello2';
  }
}
