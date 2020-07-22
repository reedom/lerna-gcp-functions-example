import { createHandler } from '@asdf/shared';

console.log('func1 loaded');

module.exports = {
  entry: createHandler('func1'),
};
