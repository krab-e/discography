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

  const artistSpotifyAlbums = await getArtistAlbums('74ASZWbe4lXaubB36ztrGX');

  const listsTitles = Object.keys(sortedDiscographyMap);
  const createdLists = await createBoardLists(newTrelloBoard.id, listsTitles);

  if (createdLists.length > 0) {
    createBoardCards(createdLists, sortedDiscographyMap, artistSpotifyAlbums);
  }
})();
