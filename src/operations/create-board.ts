import 'dotenv/config';

import axios from 'axios';

const key = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_API_TOKEN;

/**
 * @function createBoard Creates a new board using Trello's API.
 * @param {string} title New board's title.
 * @param {string} description New board's description.
 * @returns {String[]} Array where "i" is a utf-8 string that represents a line read from the given file.
 */
export const createBoard = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  if (!title || typeof title !== 'string')
    throw new Error('Board title must be a valid string.');

  const { data: newBoard } = await axios.post(
    `https://api.trello.com/1/boards/?name=${title}&desc=${description}&defaultLists=false&key=${key}&token=${token}`,
  );

  return newBoard;
};
