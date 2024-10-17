import {addColors, format, transports} from "winston";
import {Logger} from "../server";
import {getTagsLogs} from "../service/base-api/baseApi";


export type LoggerFormat = {
  severity?: string,
  status?: any,
  apiVersion?: string,
  timeStamp?: Date,
  endpoint?: string,
  method?: string,
  traceId?: string,
  message?: string,
  body?: any
  tags?: Record<any, any>;
  callMethod?: string,
  logCode?: string,
  app?: string
}

export const Levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export const level = () => {
  const env = process.env.LOG_LEVEL || 'development';
  console.log(env);
  const isLocal = env === 'development';
  return isLocal ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

addColors(colors);

export const customFormat = format.combine(
  format.json()
);

export const customTransports = [
  new transports.Console(),
  new transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),
  new transports.File({
    filename: 'logs/all.log'
  })
];

export function setLogFormat({severity, status, message, traceId, body}: LoggerFormat) {
  return {
    severity: severity,
    status: status,
    apiVersion: "1.0",
    timeStamp: new Date(),
    endpoint: "/graphql",
    method: "POST",
    traceId: traceId,
    message: message,
    body: body
  };
}

export const addCustomTagHeaders = (headers: any, customHeaders?:Record<string,string>): any =>{
  for (let key in customHeaders) {
    headers[`custom_${key}`] = customHeaders[key];
  }
  return  headers;
};

export const getCustomTagHeaders = (headers: any,customHeaders : Record<string,string> ): Record<string,string> => {
  for (let key in headers) {
    if(key.includes("custom_")){
      const tag = key.replace('custom_','');
      customHeaders[tag] = headers[key];
    }
  }
  return  customHeaders;
};

export const loggerInfo = (callMethod:string,headers: any,messageFormat: LoggerFormat ) =>{
  messageFormat.tags = getTagsLogs(headers);
  messageFormat.callMethod = callMethod;
  messageFormat.logCode = `RN40BXBFF02I`;
  messageFormat.app = "backend-test-graphql";
  Logger.info("",messageFormat);
};

export const loggerError = (callMethod:string,headers: any,messageFormat: LoggerFormat) =>{
  messageFormat.tags = headers? getTagsLogs(headers): {};
  messageFormat.callMethod = callMethod;
  messageFormat.logCode = `RN40BXBFF02I`;
  messageFormat.app = "backend-test-graphql";
  Logger.error("",messageFormat);
};
