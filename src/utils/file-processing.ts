import { readFileSync } from 'fs';
import { resolve } from 'path';
import { DiscographyMap } from '../types';

/**
 * @function transformToArray Reads the specified file and transforms it to a string Array.
 * @param {string} path Path to file
 * @returns {String[]} Array where "i" is a utf-8 string that represents a line read from the given file.
 */
const transformFileToArray = (path: string): string[] => {
  if (!path || typeof path !== 'string')
    throw new Error('Invalid path provided.');
  return readFileSync(path, 'utf-8').split('\n');
};

/**
 * @function sortTitlesAlphabetically Given a string array, sorts it's item alphabertically taking into account a specific locale
 * @param {String[]} items Sortable string array
 * @param {String} locale Locale string
 * @returns {String[]} Alphabetically sorted array.
 */
const sortTitlesAlphabetically = (items: string[], locale: string): string[] =>
  items.sort((a, b) => a.localeCompare(b, locale, { sensitivity: 'base' }));

/**
 * @function processDiscography Transforms a discographt array to a filtered and sorted map (object).
 * @returns {Object} Filtered and sorted discography map.
 */
export const processDiscography = () => {
  // Transform discography file to array of albums
  const discographyArray = transformFileToArray(
    resolve('.') + '/discography.txt',
  );

  // create an empty map. It will be filled with albums grouped by age

  let sortedDiscographyMap: DiscographyMap = {};

  discographyArray.forEach((album) => {
    // separate each word
    const splitted = album.split(' ');
    const albumYear = parseInt(splitted[0]);
    const albumDecade = Math.floor(albumYear / 10) * 10;

    if (sortedDiscographyMap[albumDecade]) {
      sortedDiscographyMap[albumDecade] = sortTitlesAlphabetically(
        [...sortedDiscographyMap[albumDecade], album],
        'en',
      );
    } else {
      sortedDiscographyMap[albumDecade] = [album];
    }
  });

  return sortedDiscographyMap;
};
