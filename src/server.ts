import "reflect-metadata";

import path from "node:path";
import express from "express";
import cors from "cors";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { resolvers } from "./Contexts/Resolvers";
import { createLogger } from "winston";

const PORT = 4000;
export let Logger = createLogger();

async function Bootstrap() {

  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, "../../schema.gql"),
  });

  const server = new ApolloServer({
    schema,
    //context: ({ req, res }: any) => ({req, res}),
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  app.use("/graphql", cors<cors.CorsRequest>(), express.json(), () => server);
  await new Promise<void>((resolve) => app.listen({ port: PORT }, resolve));

  console.log("[\x1b[36m","HTTP","\x1b[0m]",`server running on http://localhost:4000${server.graphqlPath} 🚀`);
  Logger.info(`server running on http://localhost:4000${server.graphqlPath}`);

  app.get('/api/health', (req, res) => {
    res.status(200).send('Okay!');
  });
}

Bootstrap();
