/* eslint-disable no-unused-vars */
import { container, InjectionToken, ClassProvider } from '../decorator';
import { constructor } from '../types';
import { getClass } from '../utils';

export const load = <T>(target: InjectionToken<T>) => {
  return container.resolve<T>(target);
};

export const loadAll = <T>(target: InjectionToken<T>) => {
  return container.resolveAll<T>(target);
};

export const loadWithAny = <T>(target: any) => {
  return container.resolve<T>(getClass(target));
};

export const isRegistered = <T>(token: InjectionToken<T>, recursive?: boolean) => {
  return container.isRegistered(token, recursive);
};

/**
 * Register the target to the container through Class
 * @param target
 * @param provider
 */
export const register = <T>(target: InjectionToken<T>, provider: ClassProvider<T>, antiDuplication = false) => {
  if (antiDuplication && container.isRegistered(target)) {
    return;
  }
  container.register(target, provider);
};

export const registerSingleton = <T>(token: constructor<T>) => {
  container.registerSingleton(token);
};
