// Query the API for a list of favorites
export const FAVORITES_QUERY = `#graphql:favoritesAPI
  query FavoritesQuery($user: String!){
    favorites(user: $user) {
      id
      productId
      user
    }
  }
`;
