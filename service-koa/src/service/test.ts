/* eslint-disable no-unused-vars */
import { Logger } from '../common/logger';
import { log, service } from '../core/decorator';

@log()
@service()
export class TestService {
  private logger: Logger
  public log() {
    this.logger.pink('test service');
  }
}
