import { getClassName, isString } from '../utils';

export const METADATA_CONTROLLER_PATH = 'metadata:controller:path';

export const controllerPathKeyResolve = (target: any) => {
  const className = isString(target) ? target : getClassName(target);
  return `${METADATA_CONTROLLER_PATH}:${className}`;
};
