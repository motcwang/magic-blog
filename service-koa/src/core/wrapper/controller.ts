/* eslint-disable no-unused-vars */
import { Response, ResponseCodeType } from '../types';
import { Wrapper} from './index';

export class BaseController {
  protected isSuccess(data: Response): boolean {
    return Wrapper.isSuccess(data);
  }

  protected ok(data?: any): Response {
    return Wrapper.ok(data);
  }

  protected failure(code: ResponseCodeType, message?: string): Response {
    return Wrapper.failure(code, message);
  }

  protected result({ code, data, message }: Response): Response {
    return Wrapper.result({ code, data, message });
  }
}
