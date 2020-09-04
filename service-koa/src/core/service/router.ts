/* eslint-disable no-unused-vars */
import { service } from '../decorator/service';
import { RouterPathConfig, RouterMiddleware, RouterPath, Router, Context, Next } from '../types';
import { Metadata } from '../../common/metadata';
import { controllerPathKeyResolve } from '../constants';
import * as path from 'path';
import { Logger } from '../../common/logger';
import config from '../../config';
import * as container from '../container';
import { getClass } from '../utils';

const logger = Logger.create('RouterService');

@service()
export class RouterService {
  private static routerConfigMap: Map<RouterPathConfig, RouterMiddleware> = new Map();

  /**
   * saveDecoratorRouterInfo
   */
  public static saveDecoratorRouterInfo(config: RouterPathConfig, middleware: RouterMiddleware) {
    RouterService.routerConfigMap.set(config, middleware);
  }

  /**
   * loadRoutes
   */
  public loadRoutes(router: Router) {
    logger.pink('>>> Http Api start.');
    for (const [config, middleware] of RouterService.routerConfigMap) {
      const routerParams = config.params;

      const path = this.handlePath(config.target, routerParams.path);
      logger.pink('api - method: %s, url: %s', routerParams.method, path);

      const target = container.load(getClass(config.target));
      router[routerParams.method.toLocaleLowerCase()](
        path,
        this.hanldeMiddleware(target, middleware)
      );
    }
    logger.pink('>>> Http Api end.');
    RouterService.routerConfigMap.clear();
  }

  private handlePath(target: any, routerPath: RouterPath) {
    const controllerPath = Metadata.getOwn(controllerPathKeyResolve(target), target);
    return path
      .join(config.httpServer.prefix, controllerPath, routerPath as string)
      .split(path.sep)
      .join('/');
  }

  private hanldeMiddleware(target: any, middleware: RouterMiddleware) {
    return async(ctx: Context, next: Next) => {
      await middleware.call(target, ctx, next);
    };
  }
}
