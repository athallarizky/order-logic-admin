/* eslint-disable import/no-import-module-exports */
import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
// console.dir(process.env);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    seeds: {
      directory: './seeds'
    },
    pool: {
      max: 7,
      min: 3,
    },
    acquireConnectionTimeout: 5000,
  },
};

module.exports = config;
