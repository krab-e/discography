import 'dotenv/config';

import axios from 'axios';
import { List } from '../types';

const key = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_API_TOKEN;

/**
 * @function createBoard Creates a new board using Trello's API.
 * @param {string} title New board's title.
 * @param {string} description New board's description.
 * @returns {String[]} Array where "i" is a utf-8 string that represents a line read from the given file.
 */
export const createBoardLists = async (
  boardId: string,
  lists: string[],
): Promise<List[]> => {
  if (!boardId || typeof boardId !== 'string')
    throw new Error('Board title must be a valid string.');

  const responses = await Promise.all(
    lists.map(async (list, idx) => {
      return axios.post(
        `https://api.trello.com/1/boards/${boardId}/lists?name=${list}&pos=${
          idx + 1
        }&key=${key}&token=${token}`,
      );
    }),
  );
  return responses.map((res) => res.data);
};
