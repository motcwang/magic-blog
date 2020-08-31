import { BaseError } from '../../core/wrapper';
import { ResponseCode } from '../respoonse_code';

export const UNKNOW_ERROR = new BaseError(ResponseCode.UNKNOW);

