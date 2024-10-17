import axios, {AxiosInstance} from "axios";
import {getCustomTagHeaders, loggerError, loggerInfo} from "../../utils/Logger";

export class BaseApi {
  constructor(readonly timeoutSec?: number){}

  public getApi(baseUrl: string): AxiosInstance{
    const api =  axios.create({
      baseURL: baseUrl,
      timeout: this.timeoutSec ? (this.timeoutSec * 1000) : 10000
    });

    api?.interceptors?.request?.use((config) => {
      setInfo(true,config);
      return config;
    }, function (error) {
      // setError(true,error);
      return Promise.reject(error);
    });

    api?.interceptors?.response?.use((config) => {
      setInfo(false,config);
      return config;
    }, function (error) {
       setError(false,error);
      return Promise.reject(error);
    });
    return api;
  }
}

const setInfo = (isRequest: boolean, config: any) => {
  if(config === undefined || isRequest == undefined) return;
  const conf = isRequest ? config : config.config;
  if(conf == undefined) return;
  const desc = isRequest ? "axios_request" : "axios_response";
  const endpoint = getEndpoint(conf);
  const traceId = getTraceId(conf);
  const method = conf?.method === undefined ? "" : conf.method.toUpperCase();
  const timeStamp = new Date();

  loggerInfo(`${desc}`,conf.headers, {
    apiVersion: "1.0",
    status: config.status,
    endpoint: endpoint,
    traceId: traceId,
    method: method,
    timeStamp: timeStamp,
    severity: "INFO",
    message: config.message,
    body: config.data
  });
};

const setError = (isRequest: boolean, config: any) => {
  if(config === undefined || isRequest == undefined) return;
  const conf = isRequest ? config : config.config;
  if(conf == undefined) return;
  const desc = isRequest ? "axios_request" : "axios_response";
  const endpoint = getEndpoint(conf);
  const traceId = getTraceId(conf);
  const method = conf.method ? conf?.method.toUpperCase() : "";
  const timeStamp = new Date();
  const status = config.status ? config.status : config?.response?.status;

  loggerError(`${desc}`,conf.headers,{
    apiVersion: "1.0",
    status: status,
    endpoint: endpoint,
    traceId: traceId,
    method: method,
    timeStamp: timeStamp,
    severity: "INFO",
    message: config.message,
    body: config.body
  });
};

const getEndpoint = (config:any) =>{
  if(config == undefined) return "";
  const baseUrl =  config.baseURL? config.baseURL : "";
  const url = config.url ? config.url : "";
  return baseUrl + url;
};

export const getTraceId = (conf: any) =>{
  if(conf && conf?.header){
    return conf.header["X-Trace-Id"];
  } else if(conf && conf?.headers){
    return conf.headers["X-Trace-Id"];
  }
  return "";
};

export const getTagsLogs = (headers: any): Record<string, any> => {
    const userId = getHeader("X-User-Id", headers);
    const applicationNameOms = getHeader("X-Application-Name",headers);
    const applicationId = applicationNameOms === "uninformed"?  getHeader("X-Application-Id",headers): applicationNameOms ;
    const localeOms = getHeader("X-Locale",headers);
    const companyId = localeOms === "uninformed" ? getHeader("X-Company-Id",headers) : localeOms ;
    const collaboratorId = getHeader("X-Collaborator-Id",headers);
    const storeIdOms = getHeader("x-In-Local-Store-Id",headers);
    const storeId = storeIdOms === "uninformed" ? getHeader("X-Store-Id",headers) : storeIdOms;
    const cartId = getHeader("X-Cart-Id",headers);
    const defaultHeaders = {
                  "applicationId":applicationId,
                  "companyId":companyId,
                  "storeId" :storeId,
                  "cartId": cartId,
                  "userId": addEmailMask(userId),
                  "collaboratorId": collaboratorId,
                  "timestamp": Date.now()
      } as Record<string, any>;
    return getCustomTagHeaders(headers,defaultHeaders);
};

export const getHeader = (prop: string,headers: any) =>{
  if(prop == undefined || headers == undefined) return "";
  const value = headers[prop];
  if(value && value.length > 0){
    return `${value}`;
  }
  return "uninformed";
};

const addEmailMask = (email: string) =>{
  if(email && email.length > 0 && email.includes("@")){
    return email.replace(/(\w{2})[\w.-]+@([\w.]+\w)/, "$1***@$2");
  }
  return email;
};

