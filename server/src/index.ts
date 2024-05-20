import 'dotenv/config';
import { createApolloServer } from './app';

const port = process.env.PORT || 4000;

const startApolloServer = async () => {
  const { app, graphqlPath } = await createApolloServer();

  app.listen({ port }, () => {
    console.log(`
      🚀  Server is running!
      📭  Listening on http://localhost:${port}${graphqlPath}
    `);
  });
};

startApolloServer();