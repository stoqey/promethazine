require("dotenv").config();

const { env = {} } = process || {};

export const APP_NAME = env.APP_NAME || 'promethazine';

export const DO_KEY = env.DO_KEY;
