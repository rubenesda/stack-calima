import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { dbConnection } from './utils/db';
import { FavoriteDataSource } from './datasources/favorite-db';
import 'dotenv/config';
import { AuthenticationError, BadUserInputErrorPlugin } from './utils/error';

export async function createApolloServer () {
  await dbConnection();

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [BadUserInputErrorPlugin],
  });

  const { url } = await startStandaloneServer(server, {
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
  });

  return { server, url };
}

async function startApolloServer() {
  if (process.env.ENV !== 'test') {
    const { url } = await createApolloServer();
    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
  }
}

startApolloServer();