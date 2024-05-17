// Query the API for a list of favorites
export const FAVORITES_QUERY = `#graphql:favoritesAPI
  query {
    favorites {
      id
      productId
    }
  }
`;
