/* eslint-env node */
/* eslint-disable no-restricted-imports */
import { format } from 'util';

import './matchers';
import './polyfills';

// give tests more time as taking screenshots takes a while
jest.setTimeout(50000);

const error = global.console.error;

global.console.error = function (...args: unknown[]) {
  error(...args);
  // eslint-disable-next-line prefer-spread
  throw new Error(format.apply(null, args));
};

const warn = global.console.warn;

global.console.warn = function (...args: unknown[]) {
  warn(...args);
  // eslint-disable-next-line prefer-spread
  throw new Error(format.apply(null, args));
};
