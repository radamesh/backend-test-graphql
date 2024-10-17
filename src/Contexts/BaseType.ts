import { Field, ObjectType } from "type-graphql";
import {GraphQLError} from "graphql";

@ObjectType()
export class ErrorResponse  extends GraphQLError{

    constructor(status: string| undefined, errorMessage: string, error: string,detail?:string ) {
      const extensions = {
        code: status,
        errorType:  error,
        detail: detail
      };

      super(
        errorMessage,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        extensions
      );
        this.status = status;
        this.errorMessage = errorMessage;
        this.error = error;
    }

    @Field()
    status?: string;

    @Field()
    errorMessage: string;

    @Field()
    error?: string;

  getGraphqlError() {
    return this;
  }
}
