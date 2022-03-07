import { transformToArray } from '..';
import { resolve } from 'path';

describe('Given a .txt file', () => {
  it('should return an array composed of the file lines', () => {
    const stringArr = transformToArray(resolve('.') + '/discography.txt');
  });
});
