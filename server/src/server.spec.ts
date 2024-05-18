import { createApolloServer } from '.';
import { dbDisconnect } from './utils/db';
import request from 'supertest';

// query graphql get all favorites
const queryData = {
  query: `query ExampleQuery {
    favorites {
      id
      productId
    }
  }`,
};

// mutation graphql create favorite
const mutationCreateFavorite = {
  query: `mutation CreateFavorite($createFavoriteInput: createFavoriteInput!) {
    createFavorite(createFavoriteInput: $createFavoriteInput) {
      id
      productId
    }
  }`,
  variables: {
    createFavoriteInput: {
      productId: 'gid://shopify/Product/7982853619734',
    },
  },
};

describe('e2e testing', () => {
  let server, url, favorite;

  // before the tests we spin up a new Apollo Server
  beforeAll(async () => {
    ({ server, url } = await createApolloServer());
  });

  // after the tests we'll stop the server and remove all collections
  afterAll(async () => {
    await server?.stop();
    dbDisconnect();
  });

  it('Get zero favorites', async () => {
    const response = await request(url).post('/').send(queryData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.favorites).toEqual([]);
  });

  it('Create one favorite', async () => {
    const response = await request(url).post('/').send(mutationCreateFavorite);
    expect(response.errors).toBeUndefined();
    favorite = response.body.data?.createFavorite;
    expect(favorite.productId).toBe('gid://shopify/Product/7982853619734');
  });

  it('Get one favorite', async () => {
    const response = await request(url).post('/').send(queryData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.favorites.length).toBe(1);
  });

  it('Delete one favorite', async () => {
    // mutation graphql delete favorite
    const mutationDeleteFavorite = {
      query: `mutation DeleteFavorite($deleteFavoriteId: ID!) {
        deleteFavorite(id: $deleteFavoriteId)
      }`,
      variables: {
        deleteFavoriteId: favorite.id,
      },
    };

    const response = await request(url).post('/').send(mutationDeleteFavorite);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.deleteFavorite).toBe(true);
  });
});