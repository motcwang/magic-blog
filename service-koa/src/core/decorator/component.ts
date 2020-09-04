/* eslint-disable no-unused-vars */
import { injectable, singleton } from './tsyringe';

export function component(isSingleton = true): ClassDecorator {
  return (target: any): any => {
    if (isSingleton) {
      singleton()(target);
    } else {
      injectable()(target);
    }
  };
}
