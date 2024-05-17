import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { dbConnection } from './utils/db';
import { FavoriteDataSource } from './datasources/favorite-db';

async function startApolloServer () {
  await dbConnection();

  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          favoritesDB: new FavoriteDataSource(),
        },
      };
    },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();