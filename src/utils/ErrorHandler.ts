import {loggerError, setLogFormat} from "./Logger";
import { ErrorResponse } from "../Contexts/BaseType";
import {getTraceId} from "../service/base-api/baseApi";

export type ErrorOptional={
  message?: string,
  code?: number,
  errorDescription?:string,
  header?: any
}

export class ErrorHandler {

  public static errorHandler(methodCall: string, error: any,options?: ErrorOptional) {
    const status = options?.code || error?.response?.data?.status || 408;
    const errorMessage = options?.message || error?.response?.data?.message || error.message;
    const errorTypeDesc = options?.errorDescription || error?.code || 'REQUEST_TIMEOUT';
    const logMessage = error?.response?.data?.severity || 'ERROR';

    const traceId = getTraceId(options);

    loggerError(methodCall,options?.header ,setLogFormat({
      severity: logMessage,
      status: status,
      message: errorMessage,
      traceId: traceId,
      callMethod: methodCall
    }));

    return new ErrorResponse(status, errorMessage, errorTypeDesc);
  }

}
