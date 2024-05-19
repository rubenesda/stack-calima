
import { createApolloServer } from '../../src';
import { dbDisconnect } from '../../src/utils/db';
import request, { Response } from 'supertest';
import 'dotenv/config';

// GraphQL query for getting all favorite products by user
const ALL_FAVORITES_QUERY = `
  query ExampleQuery($user: String!) {
    favorites(user: $user) {
      id
      productId
      user
    }
  }`
;

// GraphQL mutation for creating one favorite product by user
const CREATE_FAVORITE_MUTATION = `
  mutation CreateFavorite($createFavoriteInput: createFavoriteInput!) {
    createFavorite(createFavoriteInput: $createFavoriteInput) {
      code
      success
      message
      favorite {
        id
        productId
        user
      }
    }
  }`
;

// Bad GraphQL mutation for creating one favorite product by user
const BAD_CREATE_FAVORITE_MUTATION = `
  mutation CreateFavorite($createFavoriteInput: createFavoriteInput!) {
    createFavorite(createFavoriteInput: $createFavoriteInput) {
      id
      productId
    }
  }`
;

// GraphQL mutation for delete one favorite product
const DELETE_FAVORITE_MUTATION = `
  mutation DeleteFavorite($deleteFavoriteId: ID!) {
    deleteFavorite(id: $deleteFavoriteId) {
      code
      success
      message
    }
  }`
;

describe('e2e testing', () => {
  let server, url, favoriteResponse, favoriteResponse2, favoriteResponse3;
  const graphlUrlPath = '/';
  const authToken = `Bearer ${process.env.SOURCE_TOKEN}`;
  const user01 = 'user01';
  const user02 = 'user02';
  const product01 = 'gid://shopify/Product/7982853619734';
  const product02 = 'gid://shopify/Product/7982853620049';
  const product03 = 'gid://shopify/Product/7982853613000';

  // before the tests we spin up a new Apollo Server
  beforeAll(async () => {
    ({ server, url } = await createApolloServer());
  });

  // after the tests we'll stop the server and remove all collections
  afterAll(async () => {
    await server?.stop();
    dbDisconnect();
  });

  it(`Get successfully zero favorites for ${user01}`, async () => {
    const queryData = {
      query: ALL_FAVORITES_QUERY,
      variables: {
        user: user01,
      },
    };

    const response = await request(url).post(graphlUrlPath).set('authorization', authToken)
      .send(queryData);
    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
    expect(response.body.data?.favorites).toEqual([]);
  });

  it(`Get a bad request trying to pull all favorites for ${user01}`, async () => {
    const queryData = {
      query: ALL_FAVORITES_QUERY,
      variables: {},
    };

    const response = await request(url).post(graphlUrlPath).set('authorization', authToken)
      .send(queryData);
    expect(response.error).toBeDefined();
    expect(response.status).toBe(400);
  });

  it(`Create successfully one favorite for ${user01}`, async () => {
    const mutationCreateFavorite = {
      query: CREATE_FAVORITE_MUTATION,
      variables: {
        createFavoriteInput: {
          productId: product01,
          user: user01,
        },
      },
    };

    const response = await request(url).post(graphlUrlPath).set('authorization', authToken)
      .send(mutationCreateFavorite);
    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
    favoriteResponse = response.body.data?.createFavorite;
    expect(favoriteResponse.success).toBe(true);
    expect(favoriteResponse.code).toBe(200);
    expect(favoriteResponse.favorite.productId).toBe(product01);
  });

  it(`Get bad request while tryinig create favorite for ${user01} with a bad graphql mutation`, async () => {
    const mutationCreateFavorite = {
      query: BAD_CREATE_FAVORITE_MUTATION,
      variables: {
        createFavoriteInput: {
          productId: product01,
          user: user01,
        },
      },
    };

    const response = await request(url).post(graphlUrlPath).set('authorization', authToken)
      .send(mutationCreateFavorite);
    expect(response.error).toBeDefined();
    expect(response.status).toBe(400);
  });

  it(`Create successfully two favorite products for ${user02}`, async () => {
    let response: Response;
    const mutationCreateFavorite = {
      query: CREATE_FAVORITE_MUTATION,
      variables: {
        createFavoriteInput: {
          productId: product02,
          user: user02,
        },
      },
    };

    response = await request(url).post(graphlUrlPath).set('authorization', authToken)
      .send(mutationCreateFavorite);

    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
    favoriteResponse2 = response.body.data?.createFavorite;
    expect(favoriteResponse2.success).toBe(true);
    expect(favoriteResponse2.code).toBe(200);
    expect(favoriteResponse2.favorite.productId).toBe(product02);

    mutationCreateFavorite.variables.createFavoriteInput.productId = product03;

    response = await request(url).post(graphlUrlPath).set('authorization', authToken)
      .send(mutationCreateFavorite);

    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
    favoriteResponse3 = response.body.data?.createFavorite;
    expect(favoriteResponse3.success).toBe(true);
    expect(favoriteResponse3.code).toBe(200);
    expect(favoriteResponse3.favorite.productId).toBe(product03);
  });

  it(`Get successfully one favorite product for ${user01}`, async () => {
    const queryData = {
      query: ALL_FAVORITES_QUERY,
      variables: {
        user: user01,
      },
    };

    const response = await request(url).post(graphlUrlPath).set('authorization', authToken)
      .send(queryData);
    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
    expect(response.body.data?.favorites.length).toBe(1);
  });

  it(`Get successfully two favorite products for ${user02}`, async () => {
    const queryData = {
      query: ALL_FAVORITES_QUERY,
      variables: {
        user: user02,
      },
    };

    const response = await request(url).post(graphlUrlPath).set('authorization', authToken)
      .send(queryData);
    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
    expect(response.body.data?.favorites.length).toBe(2);
  });

  it(`Get a failed attempt while trying delete one favorite for ${user01}`, async () => {
    // mutation graphql delete favorite
    const mutationDeleteFavorite = {
      query: DELETE_FAVORITE_MUTATION,
      variables: {
        deleteFavoriteId: 'fake',
      },
    };

    const response = await request(url).post(graphlUrlPath).set('authorization', authToken)
      .send(mutationDeleteFavorite);

    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
    expect(response.body.data?.deleteFavorite.success).toBe(false);
  });

  it(`Delete successfully one favorite product for ${user01}`, async () => {
    // mutation graphql delete favorite
    const mutationDeleteFavorite = {
      query: DELETE_FAVORITE_MUTATION,
      variables: {
        deleteFavoriteId: favoriteResponse.favorite.id,
      },
    };

    const response = await request(url).post(graphlUrlPath).set('authorization', authToken)
      .send(mutationDeleteFavorite);

    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
    expect(response.body.data?.deleteFavorite.success).toBe(true);
  });

  it(`Delete successfully two favorite products for ${user02}`, async () => {
    let response: Response;
    // mutation graphql delete favorite
    const mutationDeleteFavorite = {
      query: DELETE_FAVORITE_MUTATION,
      variables: {
        deleteFavoriteId: favoriteResponse2.favorite.id,
      },
    };

    response = await request(url).post(graphlUrlPath).set('authorization', authToken)
      .send(mutationDeleteFavorite);

    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
    expect(response.body.data?.deleteFavorite.success).toBe(true);

    mutationDeleteFavorite.variables.deleteFavoriteId = favoriteResponse3.favorite.id,

    response = await request(url).post(graphlUrlPath).set('authorization', authToken)
      .send(mutationDeleteFavorite);

    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
    expect(response.body.data?.deleteFavorite.success).toBe(true);
  });
});