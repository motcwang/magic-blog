// eslint-disable-next-line no-unused-vars
import constructor from '../types/constructor';
// import { container } from 'tsyringe';

/**
 * App start decorator.
 */
export function bootApp() {
  return (_target: constructor<any>) => {
    // const params: any[] = Reflect.getMetadata('design:paramtypes', target) || [];
    // params.forEach(item => {
    //   console.log(item);
    // });
    // container.register(target, {useClass: Inner});
    // console.log(container.resolve(target), 3);
  };
}

