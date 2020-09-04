// eslint-disable-next-line no-unused-vars
import { RouterParams, RouterPath } from '../types';
import { RouterService } from '../service/router';

/**
 * Method decorator
 * @param params
 */
export function routerMapping(params: RouterParams): Function {
  return (target: any, name: string, _descriptor: ParameterDecorator) => {
    const config = {
      target,
      methodName: name,
      params
    };
    RouterService.saveDecoratorRouterInfo(config, target[name]);
  };
};

export function getMapping(path: RouterPath): Function {
  return routerMapping({ method: 'get', path });
};

export function postMapping(path: RouterPath): Function {
  return routerMapping({ method: 'post', path });
};

export function putMapping(path: RouterPath): Function {
  return routerMapping({ method: 'put', path });
};

export function deleteMapping(path: RouterPath): Function {
  return routerMapping({ method: 'delete', path });
};
