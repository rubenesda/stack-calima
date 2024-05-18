import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { dbConnection } from './utils/db';
import { FavoriteDataSource } from './datasources/favorite-db';
import 'dotenv/config';
import { AuthenticationError } from './utils/error';

export async function createApolloServer () {
  await dbConnection();

  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({req}) => {

      // Evaluate simple authentication
      const token = req.headers.authorization || '';

      // Get the user token after "Bearer "
      const userId = token.split(' ')[1]; // e.g. "strongtoken123"

      if (userId !== process.env.AUTH_TOKEN) {
        throw AuthenticationError();
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