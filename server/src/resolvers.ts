import type { Resolvers } from './types';

export const resolvers: Resolvers = {
  Query: {
    favorites: (_, { user }, { dataSources }) => {
      return dataSources.favoritesDB.getFavorites(user);
    },
  },
  Mutation: {
    createFavorite: (_, { createFavoriteInput }, { dataSources }) => {
      return dataSources.favoritesDB.createFavorite(createFavoriteInput);
    },
    deleteFavorite: (_, { id }, { dataSources }) => {
      return dataSources.favoritesDB.deleteFavorite(id);
    },
  },
};
