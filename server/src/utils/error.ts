import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

/**
 * Method that will manage the error due to bad authentication
 * @returns Object with the GraphQL Error declaration
 */
export const AuthenticationError = () => {
  const authErrMessage = 'You have an error on your authentication token';
  return new GraphQLError(authErrMessage, {
    extensions: {
      code: 'UNAUTHENTICATED',
      http: {
        status: 401,
      },
    },
  });
};

/**
 * This is a GraphQL plugin, it will allow you set a proper status code when Apollo Server detected
 * that the input of any mutation or query does not pass the schema validation
 */
export const badUserInputErrorPlugin = {
  async requestDidStart() {
    return {
      async willSendResponse({ response }) {
        if (response.body.kind === 'single' &&
            response.body.singleResult.errors?.[0]?.extensions?.code === ApolloServerErrorCode.BAD_USER_INPUT) {
          response.http.status = 400;
        }
      },
    };
  },
};
