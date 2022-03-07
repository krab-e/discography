import { getArtistAlbums } from './operations/get-album-cover';
import { createBoardCards } from './operations/create-cards';
import { createBoard } from './operations/create-board';
import { createBoardLists } from './operations/create-lists';
import { processDiscography } from './utils/file-processing';

(async () => {
  let sortedDiscographyMap = processDiscography();

  const newTrelloBoard = await createBoard({
    title: 'new board',
    description: 'a random desc',
  });

  const artistSpotifyAlbums = await getArtistAlbums();

  const listsTitles = Object.keys(sortedDiscographyMap);
  const createdLists = await createBoardLists(newTrelloBoard.id, listsTitles);

  /**
   * Using a setTimeOut of 15s as a hacky workoround trello's API rate limits.
   * Their rate limits are acting weirdly, API says "no more than 100 requests per 10 second interval for each token"
   * but the reality is that they cant even handle 47 card + 6 list creation requests in that period.
   * If this was a real production case, I think using a batch process would be ideal.
   */

  setTimeout(() => {
    createBoardCards(createdLists, sortedDiscographyMap, artistSpotifyAlbums);
  }, 15000);
})();
