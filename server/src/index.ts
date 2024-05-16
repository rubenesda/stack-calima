import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from './schema';

async function startApolloServer () {
  const mocks = {
    Query: () => ({
      favorites: () => [...new Array(15)],
    }),
    Favorite: () => ({
      id: () => 'f_01',
      productId: () => 'gid://shopify/Product/7982853619734'
    }),
  };

  const server = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs }),
      mocks
    }),
  });

  const { url } = await startStandaloneServer(server);
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();