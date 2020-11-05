import dotenv from 'dotenv';

dotenv.config();

const {env = {}} = process || {};

export const APP_NAME = 'promethazine';

export const DO_TOKEN = env.DO_TOKEN;
export const CLUSTER_ID = env.CLUSTER_ID;
