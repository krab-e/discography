import { configSpotifyApi } from '../utils/spotify-api';

const spotifyWebApi = configSpotifyApi();

export const getArtistAlbums = async (
  artistId: string,
): Promise<SpotifyApi.AlbumObjectSimplified[]> => {
  const data = await spotifyWebApi.getArtistAlbums(artistId, {
    limit: 50,
  });

  return data.body.items;
};

export const findAlbumCover = async (
  album: string,
  artistSpotifyAlbums: SpotifyApi.AlbumObjectSimplified[],
) => {
  const albumTitle = album.split(' ').slice(1).join(' ');
  const matchedAlbum = artistSpotifyAlbums.find((spotifyAlbum) =>
    spotifyAlbum.name
      .trim()
      .toLowerCase()
      .match(albumTitle.trim().toLowerCase()),
  );

  return matchedAlbum?.images[0].url;
};
