/* eslint-disable max-params */
import { getClass } from '../core/utils';

// type
export const DESIGN_TYPE = 'design:type';

// param type
export const DESIGN_PARAM_TYPES = 'design:paramtypes';

// return type
export const DESIGN_RETURN_TYPE = 'design:returntype';

export class Metadata {
  public static get(key: string, target: any, propertyKey: string | symbol): any {
    return Reflect.getMetadata(key, getClass(target), propertyKey);
  }

  public static set(key: string, value: any, target: any, propertyKey?: string | symbol): any {
    return propertyKey
      ? Reflect.defineMetadata(key, value, getClass(target), propertyKey)
      : Reflect.defineMetadata(key, value, getClass(target));
  }

  public static getOwn(key: string, target: any, propertyKey?: string | symbol): any {
    return propertyKey
      ? Reflect.getOwnMetadata(key, getClass(target), propertyKey)
      : Reflect.getOwnMetadata(key, getClass(target));
  }

  public static getType(target: any, propertyKey?: string | symbol) {
    return Reflect.getMetadata(DESIGN_TYPE, target, propertyKey);
  }
}
