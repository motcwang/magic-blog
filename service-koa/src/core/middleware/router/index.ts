/* eslint-disable no-unused-vars */
import Router from 'koa-router';
import { singleton, injectable } from '../../decorator';
import { RouterService } from '../../service/router';
import { Logger } from '../../../common/logger';
const logger = Logger.create('RouterMiddleware');

@singleton()
@injectable()
export class RouterMiddleware extends Router {
  public constructor(routerService: RouterService) {
    super();
    logger.pink('test router middleware routerService: %o', routerService);
    routerService.loadRoutes(this);
  }
}
