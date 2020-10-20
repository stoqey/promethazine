import debug from 'debug';
import {APP_NAME} from './config';

const loggingPrefix = APP_NAME;

/**
 * Use to log in general case
 */
export const log = debug(`${loggingPrefix}:info`);

/**
 * Use for verbose log
 */
export const verbose = debug(`${loggingPrefix}:verbose`);
