import type {CodegenConfig} from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
  schema: [
    {
      [`${process.env.FAVORITES_API_URL}`]: {
        headers: {
          'dev-codegen': 'true',
        },
      },
    },
  ],
  documents: ['src/**/*.tsx'],
  generates: {
    './app/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
