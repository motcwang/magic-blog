import { BaseError } from '../../core/wrapper';
import { ResponseCode } from '../respoonse_code';

export class IllegalParameterError extends BaseError {
  public constructor(message?: string) {
    super({
      code: ResponseCode.ILLEGAL_PARAMETERL.code,
      message: message || ResponseCode.ILLEGAL_PARAMETERL.message
    });
  }
}
