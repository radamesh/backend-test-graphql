import "reflect-metadata";
import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { resolvers } from "../../src/Contexts/Resolvers";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  headers?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;
export const graphCall = async ({ source, variableValues, headers}: Options) => {
  if (!schema) {
    schema = await buildSchema({
      resolvers,
    });
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        headers
      },
      res: {}
    }
  });
};
