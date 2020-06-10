/* eslint-disable no-unused-vars */
import { singleton } from 'tsyringe';
import { RouterPathConfig, RouterMiddleware, RouterPath, Router, Context, Next } from '../types';
import { Metadata } from '../../common/metadata';
import { controllerPathKeyResolve } from '../constants';
import * as path from 'path';

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

      router[routerParams.method.toLocaleLowerCase()](
        this.handlePath(config.target, routerParams.path),
        this.hanldeMiddleware(config.target, middleware)
      );
    }

    this.routerConfigMap.clear();
  }

  private handlePath(target: any, routerPath: RouterPath) {
    const controllerPath = Metadata.getOwn(controllerPathKeyResolve(target), target);
    return path
      .join(controllerPath, routerPath as string)
      .split(path.sep)
      .join('/');
  }

  private hanldeMiddleware(target: any, middleware: RouterMiddleware) {
    return async(ctx: Context, next: Next) => {
      await middleware.call(target, ctx, next);
    };
  }
}
