// eslint-disable-next-line no-unused-vars
import { IRouterParams } from '../router';

export const Router = (params: IRouterParams) => {
  return (target: any, name: string, descriptor: ParameterDecorator) => {

  };
};

export const GET = (path: string) => {
  return Router({method: 'get', path});
};

export const POST = (path: string) => {
  return Router({method: 'post', path});
};

export const PUT = (path: string) => {
  return Router({method: 'put', path});
};

export const DELETE = (path: string) => {
  return Router({method: 'delete', path});
};

