import axios from 'axios';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const getSpotifyAccessToken = async () => {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        'grant_type': 'client_credentials'
      }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

export const getAlbumTracks = async (albumName) => {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=album:${encodeURIComponent(albumName)}&type=album&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        mode: 'cors' // Set CORS mode
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
        },
        mode: 'cors' // Set CORS mode
      }
    );
    console.log('Tracklist Response:', tracksResponse.data);
    return tracksResponse.data.items;
  } catch (error) {
    console.error('Error fetching tracklist:', error.response ? error.response.data : error.message);
    return [];
  }
};
