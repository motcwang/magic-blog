/* eslint-disable no-unused-vars */
import { singleton } from 'tsyringe';
import { RouterPathConfig, RouterMiddleware, RouterPath, Router, Context, Next } from '../types';
import { Metadata } from '../../common/metadata';
import { controllerPathKeyResolve } from '../constants';
import * as path from 'path';
import { Logger } from '../../common/logger';
import config from '../../config';
import * as container from '../container';
import { getClassName, getClass } from '../utils';

const logger = Logger.create('RouterService');

@singleton()
export class RouterService {
  private routerConfigMap: Map<RouterPathConfig, RouterMiddleware> = new Map();

  /**
   * saveDecoratorRouterInfo
   */
  public saveDecoratorRouterInfo(config: RouterPathConfig, middleware: RouterMiddleware) {
    this.routerConfigMap.set(config, middleware);
  }

  /**
   * loadRoutes
   */
  public loadRoutes(router: Router) {
    for (const [config, middleware] of this.routerConfigMap) {
      const routerParams = config.params;

      const path = this.handlePath(config.target, routerParams.path);
      logger.pink('api - method: %s, url: %s', routerParams.method, path);

      // Register the controller
      container.AntiDuplicateRegister(getClassName(config.target), {
        useClass: getClass(config.target)
      });
      const target = container.load(getClassName(config.target));

      router[routerParams.method.toLocaleLowerCase()](
        path,
        this.hanldeMiddleware(target, middleware)
      );
    }

    this.routerConfigMap.clear();
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
