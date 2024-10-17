import {ErrorResponse} from "../Contexts/BaseType";


export const validations = new Map<string,ErrorResponse>();

export const hasError = (cartId:string) => {
    return validations.has(cartId);
};

export const getError = (cartId:string) => {
  const error =  validations.get(cartId);
  validations.delete(cartId);
  return error;
};

export const addError = (cartId:string,error: ErrorResponse) => {
  return validations.set(cartId,error);
};


