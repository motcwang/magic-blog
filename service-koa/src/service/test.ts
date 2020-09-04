import { singleton } from 'tsyringe';
import { Logger } from '../common/logger';

const logger = Logger.create('TestService');

@singleton()
export class TestService {
  public log() {
    logger.pink('test service');
  }
}
