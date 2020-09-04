import { Logger } from '../../common/logger';
import { getClassName } from '../utils';

export function log(fieldName = 'logger'): ClassDecorator {
  return (target: any): any => {
    target.prototype[fieldName] = Logger.create(getClassName(target));
  };
}
