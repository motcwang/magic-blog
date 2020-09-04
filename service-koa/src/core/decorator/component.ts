/* eslint-disable no-unused-vars */
import * as container from '../container';
import { injectable } from './tsyringe';

export function component(singleton = true): ClassDecorator {
  return (target: any): any => {
    if (singleton) {
      container.registerSingleton(target);
    } else {
      container.register(target, target);
    }
    return injectable()(target);
  };
}
