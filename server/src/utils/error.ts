import { GraphQLError } from 'graphql';

export const AuthenticationError = () => {
  const authErrMessage = 'You have an error on your authentication token';
  return new GraphQLError(authErrMessage, {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  });
};