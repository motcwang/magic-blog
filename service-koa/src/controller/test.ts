/* eslint-disable no-unused-vars */
import { getMapping, controller, log } from '../core/decorator';
import { Context } from '../core/types';
import { TestService } from '../service';
import { BaseController } from '../core/wrapper';
import { Logger } from '../common/logger';

@log()
@controller()
export class TestController extends BaseController {
  private logger: Logger
  private testService: TestService
  public constructor(testService: TestService) {
    super();
    this.testService = testService;
  }

  @getMapping('/test')
  public async test(ctx: Context) {
    this.logger.pink('test');
    this.testService.log();
    ctx.body = 'hello';
  }

  @getMapping('/test2')
  public async test2(ctx: Context) {
    ctx.body = 'hello2';
  }
}
