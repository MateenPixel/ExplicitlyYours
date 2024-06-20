require('dotenv').config();
const axios = require('axios');

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const getSpotifyAccessToken = async () => {
  const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
  const encodedAuthString = Buffer.from(authString).toString('base64');

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${encodedAuthString}`
        }
      }
    );
    console.log('Access Token Response:', response.data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    console.error('Request Headers:', {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encodedAuthString}`
    });
    return null;
  }
};

const getAlbumTracks = async (albumName) => {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=album:${encodeURIComponent(albumName)}&type=album&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    const album = response.data.albums.items[0];
    console.log('Album Search Response:', response.data);
    if (!album) {
      console.error('Album not found');
      return [];
    }
    const tracksResponse = await axios.get(
      `https://api.spotify.com/v1/albums/${album.id}/tracks`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    console.log('Tracklist Response:', tracksResponse.data);
    return tracksResponse.data.items;
  } catch (error) {
    console.error('Error fetching tracklist:', error.response ? error.response.data : error.message);
    return [];
  }
};

getAlbumTracks('Hardstone Psycho').then(tracks => {
  console.log('Tracks:', tracks);
});
