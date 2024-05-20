import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { dbConnection } from './utils/db';
import { FavoriteDataSource } from './datasources/favorite-db';
import { AuthenticationError, BadUserInputErrorPlugin } from './utils/error';

// Required logic for integrating with Express
const app = express();
const graphqlPath = process.env.GRAPHQL_PATH || '/api';

export const createApolloServer = async () => {
  await dbConnection();

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [
      BadUserInputErrorPlugin,
    ],
  });

  // Ensure we wait for our server to start
  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use(graphqlPath,
    expressMiddleware(server, {
      context: async ({req}) => {
        // Get authorization token from the website
        const token = req.headers.authorization || '';
        // Evaluate whether the request came from graphql-codegen
        const codegen = req.headers['dev-codegen'] || '';

        // if the request was from graphql-codegen script,
        // it will jump the basic authentication
        if (!codegen) {
          // Get the source token after "Bearer "
          const source = token.split(' ')[1]; // e.g. "strongtoken123"

          // Evaluate a simple authentication from the website
          if (source !== process.env.SOURCE_TOKEN) {
            throw AuthenticationError();
          }
        }

        return {
          dataSources: {
            favoritesDB: new FavoriteDataSource(),
          },
        };
      },
    })
  );

  return { app, graphqlPath };
};
