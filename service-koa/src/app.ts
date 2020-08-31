/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-vars */
import 'reflect-metadata';
import { BaseApplication } from './core/wrapper';
import { Logger } from './common/logger';

const logger = Logger.create('app');

class Application extends BaseApplication {
  public constructor() {
    super();
    logger.pink('create application');
  }
}

(async() => {
  new Application().run();
})();

