import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    "Get favorites array for favorites list page"
    favorites: [Favorite!]!
  }

  type Mutation {
    "Delete a specfiic favorite product"
    deleteFavorite(id: ID!): Boolean
    "Update a specific favorite product"
    updateFavorite(id: ID!): Favorite!
  }

  "Favorite is an element that link a product store item as favorite"
  type Favorite {
    id: ID!
    "The Product's ID"
    productId: String!
  }
`;
