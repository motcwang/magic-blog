/* eslint-disable no-unused-vars */
import { Wrapper, Response, ResponseCodeType } from '../types';
import { ResponseCode } from '../../common/respoonse_code';

export class ResponseWrapper implements Wrapper {
  public isSuccess(data: Response): boolean {
    return data.code && data.code === ResponseCode.SUCCESS.code;
  }

  public ok(data?: any): Response {
    return this.result({ ...ResponseCode.SUCCESS, data: data || {} });
  }

  public failure(code: ResponseCodeType, message?: string): Response {
    if (typeof code === 'object') {
      return this.result(code as Response);
    }
    let icode: number;
    let imessage: string;
    if (typeof code === 'string') {
      imessage = code;
      icode = ResponseCode.UNKNOW.code;
    } else {
      icode = code as number;
      imessage = message;
    }
    return this.result({ code: icode, message: imessage });
  }

  public result({ code, data, message }: Response): Response {
    return {
      code,
      data,
      message
    };
  }
}
