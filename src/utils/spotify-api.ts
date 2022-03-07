import SpotifyWebApi from 'spotify-web-api-node';
import 'dotenv/config';

const clientId = process.env.SPOTIFY_API_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_API_CLIENT_SECRET;

export const configSpotifyApi = () => {
  // Create the api object with the credentials
  const spotifyApi = new SpotifyWebApi({
    clientId,
    clientSecret,
  });

  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
    (data) => {
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    (err) => {
      console.log('Something went wrong when retrieving an access token', err);
    },
  );

  return spotifyApi;
};
