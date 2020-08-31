/* eslint-disable no-unused-vars */
import 'reflect-metadata';
import Koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import { autoInjectable } from 'tsyringe';
import { HttpServer } from '../server/http/index';
import { RouterMiddleware } from '../middleware/router';
import { ErrorMiddleware } from '../middleware/error';
import { BaseMiddleware } from './middleware';
import { Logger } from '../../common/logger';
import config from '../../config';
import * as container from '../container';

import '../../middleware';
import '../../service';
import '../../controller';

const logger = Logger.create('BaseApplication');

@autoInjectable()
export class BaseApplication {
  private app: Koa;
  private router: RouterMiddleware;
  public constructor(router?: RouterMiddleware, errorHandler?: ErrorMiddleware) {
    this.app = new Koa();
    this.router = router;

    // default middleware
    this.defaultMiddleware();

    // custom middleware
    this.middlesware().forEach(middleware => {
      this.app.use(middleware);
    });

    // error handler
    this.app.use(errorHandler.middleware);

    // routes
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());

    // error-handling
    this.app.on('error', (err: Error, ctx: Koa.Context) => {
      logger.error('server error', err, ctx);
    });
  }

  public async run() {
    // Create Http Server
    await HttpServer.create(this.app);
  }

  private middlesware(): Array<Koa.Middleware> {
    if (!container.isRegistered(BaseMiddleware, true)) {
      return [];
    }
    const middlewares = container.loadAll(BaseMiddleware);
    logger.pink('middelwares = %o', middlewares);
    if (middlewares) {
      return middlewares.sort((l, r) => l.order() - r.order()).map(item => item.middleware);
    }
    return [];
  }

  private defaultMiddleware() {
    // middlewares
    this.app.use(
      bodyparser({
        enableTypes: ['json', 'form', 'text']
      })
    );
    this.app.use(json());
    // logger
    this.app.use(async(ctx, next) => {
      const start = new Date().getTime();
      await next();
      const ms = new Date().getTime() - start;
      logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });

    this.app.use(koaStatic(config.httpServer.staticPath));
  }
}
