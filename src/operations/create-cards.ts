import axios from 'axios';
import 'dotenv/config';

import { DiscographyMap, List } from '../types';
import { URL } from 'url';
import { findAlbumCover } from './get-album-cover';

const key = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_API_TOKEN;

/**
 * @function createBoardCards Creates a new board card for each album using Trello's API.
 * @param {List[]} lists Trello board created lists.
 * @param {DiscographyMap} sortedDiscographyMap A sorted discography map (object).
 * @param {SpotifyApi.AlbumObjectSimplified[]} artistSpotifyAlbums A sorted discography map (object).
 * @returns {Promise} Response Promise
 */
export const createBoardCards = async (
  lists: List[],
  sortedDiscographyMap: DiscographyMap,
  artistSpotifyAlbums: SpotifyApi.AlbumObjectSimplified[],
) =>
  lists.forEach((list, listIdx) => {
    try {
      /**
       * Using a setTimeOut of 15s as a hacky workoround trello's API rate limits.
       * Their rate limits are acting weirdly, API says "no more than 100 requests per 10 second interval for each token"
       * but the reality is that they cant even handle 47 card + 6 list creation requests in that period.
       * If this was a real production case, I think using a batch process would be ideal.
       */
      setTimeout(() => {
        sortedDiscographyMap[list.name].forEach(async (album, idx) => {
          const coverImageUrl = await findAlbumCover(
            album,
            artistSpotifyAlbums,
          );

          const url = new URL(
            `https://api.trello.com/1/cards?idList=${list.id}&pos=${
              idx + 1
            }&name=${album}&key=${key}&token=${token}`,
          ).toString();

          const createdCardResponse = await axios.post(url);
          if (createdCardResponse.status === 200 && coverImageUrl) {
            await axios.post(
              `https://api.trello.com/1/cards/${createdCardResponse.data.id}/attachments?url=${coverImageUrl}&key=${key}&token=${token}`,
            );
          }
        });
      }, listIdx * 1000);
    } catch (error) {
      console.log(error);
    }
  });
