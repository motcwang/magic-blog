import 'reflect-metadata';
import Koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import { Logger} from './common/logger';
import routers from './routes/index';
import { HttpServer } from './core/server/http/index';

const logger = Logger.create('app');

class Application {
  private app: Koa;
  public constructor() {
    this.app = new Koa();
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

    // routes
    this.app.use(routers.routes());

    // error-handling
    this.app.on('error', (err, ctx) => {
      logger.info('server error', err, ctx);
    });
  }

  public async run() {
    // Create Http Server
    await HttpServer.create(this.app);
  }
}

(async() => {
  new Application().run();
})();
