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

export const getTrackDetails = async (trackName) => {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) return null;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(trackName)}&type=track&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        mode: 'cors'
      }
    );
    const track = response.data.tracks.items[0];
    console.log('Track Search Response:', response.data);
    if (!track) {
      console.error('Track not found');
      return null;
    }

    return {
      name: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      cover: track.album.images[0]?.url || '',
      spotifyLink: track.external_urls.spotify || ''
    };
  } catch (error) {
    console.error('Error fetching track details:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const getAlbumDetails = async (albumName) => {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) return null;

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
    console.log('Album Details Response:', response.data);
    if (!album) {
      console.error('Album not found');
      return null;
    }

    return {
      coverImage: album.images[0]?.url || '',
      spotifyLink: album.external_urls.spotify || ''
    };
  } catch (error) {
    console.error('Error fetching album details:', error.response ? error.response.data : error.message);
    return null;
  }



};
