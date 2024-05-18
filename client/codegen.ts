import type {CodegenConfig} from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
  schema: [
    {
      'http://localhost:4000': {
        headers: {
          Authorization: `Bearer ${process.env.FAVORITES_API_TOKEN}`,
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
