"use strict";
require("dotenv").config();
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev"; // 'dev' or 'prod'

const dev = {
  DB_CONFIG: {
    USER: process.env.DEV_DB_USER,
    PASSWORD: process.env.DEV_DB_PASSWORD,
    HOST: process.env.DEV_DB_HOST,
    DATABASE: process.env.DEV_DATABASE,
    PORT: process.env.DEV_DB_PORT,
    CONNECTION_TIMEOUT: process.env.DEV_DB_CONNECTION_TIMEOUT,
    REQUEST_TIMEOUT: process.env.DEV_DB_REQUEST_TIMEOUT,
    POOL_MAX: process.env.DEV_DB_POOL_MAX,
    POOL_MIN: process.env.DEV_DB_POOL_MIN,
    IDLE_TIMEOUT_MILLIS: process.env.DEV_DB_IDLE_TIMEOUT_MILLIS,
    OPTION_ENCRYPT: process.env.DEV_DB_OPTION_ENCRYPT,
  },
  AES_CONFIG: {
    SECRET_KEY: process.env.DEV_SECRET_KEY,
    SECRETIV_KEY: process.env.DEV_SECRETIV_KEY,
  },
  AZURE_STORAGE_CONNECTION_STRING:process.env.DEV_AZURE_STORAGE_CONNECTION_STRING
};

const prod = {
  DB_CONFIG: {
    USER: process.env.PROD_DB_USER,
    PASSWORD: process.env.PROD_DB_PASSWORD,
    HOST: process.env.PROD_DB_HOST,
    DATABASE: process.env.PROD_DATABASE,
    PORT: process.env.PROD_DB_PORT,
    CONNECTION_TIMEOUT: process.env.PROD_DB_CONNECTION_TIMEOUT,
    REQUEST_TIMEOUT: process.env.PROD_DB_REQUEST_TIMEOUT,
    POOL_MAX: process.env.PROD_DB_POOL_MAX,
    POOL_MIN: process.env.PROD_DB_POOL_MIN,
    IDLE_TIMEOUT_MILLIS: process.env.PROD_DB_IDLE_TIMEOUT_MILLIS,
    OPTION_ENCRYPT: process.env.PROD_DB_OPTION_ENCRYPT,
  },
  AES_CONFIG: {
    SECRET_KEY: process.env.PROD_SECRET_KEY,
    SECRETIV_KEY: process.env.PROD_SECRETIV_KEY,
  },
  AZURE_STORAGE_CONNECTION_STRING:process.env.PROD_AZURE_STORAGE_CONNECTION_STRING
};

const config = { dev, prod };
module.exports = config[env];
