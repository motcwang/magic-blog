// eslint-disable-next-line no-unused-vars
import { RouterParams, RouterPath } from '../types';
import { RouterService } from '../service/router';

/**
 * Method decorator
 * @param params
 */
export const routerMapping = (params: RouterParams): Function => {
  return (target: any, name: string, _descriptor: ParameterDecorator) => {
    const config = {
      target,
      methodName: name,
      params
    };
    RouterService.saveDecoratorRouterInfo(config, target[name]);
  };
};

export const getMapping = (path: RouterPath): Function => {
  return routerMapping({ method: 'get', path });
};

export const postMapping = (path: RouterPath): Function => {
  return routerMapping({ method: 'post', path });
};

export const putMapping = (path: RouterPath): Function => {
  return routerMapping({ method: 'put', path });
};

export const deleteMapping = (path: RouterPath): Function => {
  return routerMapping({ method: 'delete', path });
};
