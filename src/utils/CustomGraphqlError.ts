import {GraphQLError} from "graphql";
import {ValidationError} from "class-validator";

export class CustomGraphqlError{
  private readonly message: string;
  private readonly status: number;
  private readonly error: string;
  private readonly detail: string;
  private isValidation: boolean = false;

  constructor(error: GraphQLError ) {
     this.message = this.getErrorMessage(error);
     this.status = this.getStatus(error);
     this.error = this.getErrorType(error);
     this.detail = error.extensions?.detail;
  }
  public getError(){
    return {
      error: this.error,
      status: this.status,
      message: this.message,
      detail: this.detail
    };
  }

  public getErrorMessage(error: GraphQLError){
    const validations = error?.extensions?.exception?.validationErrors as Array<any>;
    if(validations && validations.length){
      this.isValidation = true;
      return this.getAllFirstErrorMessage(error.extensions.exception.validationErrors);
    }
    return  error.message;
  }

  public getAllFirstErrorMessage(validateErrors: ValidationError[]): string{
    return validateErrors.map(v =>{
      if(v.constraints){
        return this.getFormattedErrorMessage(v);
      } else if(v.children){
        return this.getAllFirstErrorMessage(v.children);
      }
      return  "Internal server error";
    })[0];
  }

  public getFormattedErrorMessage(validateError: ValidationError):string{
    if(validateError.constraints){
      const prop = Object.getOwnPropertyNames(validateError.constraints)[0];
      return Reflect.get(validateError.constraints,prop);
    }
    return "Internal server error";
  }

  getStatus(error: GraphQLError){
    const code =  error?.extensions?.code;
    if(this.isValidation || error?.extensions?.code == "BAD_USER_INPUT") return 400;
    if(code) return code;
    return 500;
  }

  public getErrorType(error:GraphQLError){
    const errorType = error?.extensions?.errorType;
    if(this.isValidation) return "BAD_REQUEST";
    if(errorType) return errorType;
    return "INTERNAL_SERVER_ERROR";
  }
}
