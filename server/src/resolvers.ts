import type { Resolvers } from './types';

export const resolvers: Resolvers = {
  Query: {
    favorites: async (_, { user }, { dataSources }) => {
      return await dataSources.favoritesDB.getFavorites(user);
    },
  },
  Mutation: {
    createFavorite: async (_, { createFavoriteInput }, { dataSources }) => {
      try {
        const favorite = await dataSources.favoritesDB.createFavorite(createFavoriteInput);

        return {
          code: 200,
          success: true,
          message: `Successfully created a favorite product for ${createFavoriteInput.productId}`,
          favorite,
        };
      } catch (err) {
        return {
          code: 200,
          success: false,
          message: `Error while trying to create a new favorite ${err.message}`,
          favorite: null,
        };
      }
    },
    deleteFavorite: async (_, { id }, { dataSources }) => {
      try {
        const result = await dataSources.favoritesDB.deleteFavorite(id);

        const deleteFavoriteResponse = {
          code: 200,
          success: true,
          message: `Successfully deleted the favorite product ${id}`,
        };

        if (result.deletedCount === 0) {
          deleteFavoriteResponse.success = false,
          deleteFavoriteResponse.message = `The favorite product ${id} was not found`;
        }

        return deleteFavoriteResponse;

      } catch (err) {
        return {
          code: 200,
          success: false,
          message: `Error while trying to delete the favorite ${err.message}`,
        };
      }
    },
  },
};
