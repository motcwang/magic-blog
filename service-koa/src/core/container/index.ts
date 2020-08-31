/* eslint-disable no-unused-vars */
import { container, InjectionToken, ClassProvider } from 'tsyringe';

export const load = <T>(target: InjectionToken<T>) => {
  return container.resolve<T>(target);
};

export const loadAll = <T>(target: InjectionToken<T>) => {
  return container.resolveAll<T>(target);
};

export const isRegistered = <T>(token: InjectionToken<T>, recursive?: boolean) => {
  return container.isRegistered(token, recursive);
};

/**
 * Register the target to the container through Class
 * @param target
 * @param provider
 */
export const AntiDuplicateRegister = <T>(target: InjectionToken<T>, provider: ClassProvider<T>) => {
  if (container.isRegistered(target)) {
    return;
  }
  container.register(target, provider);
};
