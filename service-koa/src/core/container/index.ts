/* eslint-disable no-unused-vars */
import { container, InjectionToken } from 'tsyringe';

export const load = <T>(target: InjectionToken<T>) => {
  return container.resolve<T>(target);
};
