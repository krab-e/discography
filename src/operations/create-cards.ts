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
  lists.forEach((list) => {
    sortedDiscographyMap[list.name].forEach(async (album, idx) => {
      try {
        const coverImageUrl = await findAlbumCover(album, artistSpotifyAlbums);
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
      } catch (error) {
        console.log(error);
      }
    });
  });
