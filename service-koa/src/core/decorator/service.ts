/* eslint-disable no-unused-vars */
import { component } from './component';

export function service(singleton = true): ClassDecorator {
  return (target: any): any => {
    return component(singleton)(target);
  };
};
