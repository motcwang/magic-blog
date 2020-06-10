/* eslint-disable no-unused-vars */
import Router from 'koa-router';
import { singleton, autoInjectable } from 'tsyringe';
import { RouterService } from '../../service/router';
// import '../../../controller/test';

@singleton()
@autoInjectable()
export class RouterMiddleware extends Router {
  public constructor(routerService: RouterService) {
    super();
    routerService.loadRoutes(this);
  }
}
