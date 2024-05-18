import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    "Get favorites array for favorites list page"
    favorites(user: String!): [Favorite!]!
  }

  type Mutation {
    "Delete a specfiic favorite product"
    deleteFavorite(id: ID!): DeleteFavoriteResponse!
    "Update a specific favorite product"
    createFavorite(createFavoriteInput: createFavoriteInput!): CreateFavoriteResponse!
  }

  type CreateFavoriteResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "New create Favorite after a successful mutation"
    favorite: Favorite
  }

  type DeleteFavoriteResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
  }

  "Favorite is an element that link a product store item as favorite"
  type Favorite {
    id: ID!
    "The Product's ID"
    productId: String!
    "The User's identifier"
    user: String!
  }

  "Favorite's data that will be stored"
  input createFavoriteInput {
    "The Product's ID"
    productId: String!
    "The User's identifier"
    user: String!
  }
`;
