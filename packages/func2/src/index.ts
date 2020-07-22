import { createHandler } from '@asdf/shared';

console.log('func2 loaded');

module.exports = {
  entry: createHandler('func2'),
};
