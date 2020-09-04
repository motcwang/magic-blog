/* eslint-disable no-unused-vars */
import { controllerPathKeyResolve } from '../constants';
import { Metadata } from '../../common/metadata';
import * as container from '../container';
import { injectable } from './tsyringe';

export const controller = (path = '/', singleton = true): ClassDecorator => {
  return (target: any): any => {
    Metadata.set(controllerPathKeyResolve(target), path, target);
    if (singleton) {
      container.registerSingleton(target);
    } else {
      container.register(target, target);
    }

    return injectable()(target);
  };
};
