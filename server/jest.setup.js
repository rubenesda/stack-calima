/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('dotenv').DotenvConfigOptions } */
const path = require('path');
const dotenv = require('dotenv');

module.exports = async () => {
  dotenv.config({ path: [
    path.resolve(__dirname, '.env.test'),
    path.resolve(__dirname, '.env')
  ]});
};