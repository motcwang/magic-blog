/* eslint-disable no-unused-vars */
import { controllerPathKeyResolve } from '../constants';
import { Metadata } from '../../common/metadata';
import { component } from './component';

export function controller(path = '/', singleton = true): ClassDecorator {
  return (target: any): any => {
    Metadata.set(controllerPathKeyResolve(target), path, target);
    return component(singleton)(target);
  };
};
