/* eslint-disable no-unused-vars */

export interface Response {
  code: number;
  data?: any;
  message: string;
}

export interface Wrapper {
  isSuccess: (data: Response) => boolean;
  ok: (data?: any) => Response;
  failure: (code: Response | string | number, message?: string) => Response;
  result: (data: Response) => Response;
}

export type ResponseCodeType = Response | number | string;
