import axios from 'axios';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

export const getSpotifyAccessToken = async () => {
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

export const getPublicPlaylist = async (playlistId) => {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) return null;

  try {
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching playlist:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const getRecentlyPlayedTracks = async () => {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data.items.map(item => ({
      name: item.track.name,
      artist: item.track.artists.map(artist => artist.name).join(', '),
      cover: item.track.album.images[0]?.url || '',
      spotifyLink: item.track.external_urls.spotify
    }));
  } catch (error) {
    console.error('Error fetching recently played tracks:', error.response ? error.response.data : error.message);
    return [];
  }
};

export const getAlbumTracks = async (albumName, artistName) => {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=album:${encodeURIComponent(albumName)}%20artist:${encodeURIComponent(artistName)}&type=album&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        mode: 'cors'
      }
    );
    const album = response.data.albums.items[0];
    console.log('Album Search Response:', response.data);
    if (!album || !album.artists.some(artist => artist.name.toLowerCase() === artistName.toLowerCase())) {
      console.error('Album not found or artist does not match');
      return [];
    }
    const tracksResponse = await axios.get(
      `https://api.spotify.com/v1/albums/${album.id}/tracks`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        mode: 'cors'
      }
    );
    console.log('Tracklist Response:', tracksResponse.data);
    return tracksResponse.data.items;
  } catch (error) {
    console.error('Error fetching tracklist:', error.response ? error.response.data : error.message);
    return [];
  }
};

export const getAlbumDetails = async (albumName, artistName) => {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) return null;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=album:${encodeURIComponent(albumName)}%20artist:${encodeURIComponent(artistName)}&type=album&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        mode: 'cors'
      }
    );
    const album = response.data.albums.items[0];
    console.log('Album Details Response:', response.data);
    if (!album || !album.artists.some(artist => artist.name.toLowerCase() === artistName.toLowerCase())) {
      console.error('Album not found or artist does not match');
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

export const getTrackDetails = async (trackName, artistName) => {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) return null;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(trackName)}%20artist:${encodeURIComponent(artistName)}&type=track&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        mode: 'cors'
      }
    );
    const track = response.data.tracks.items[0];
    console.log('Track Search Response:', response.data);
    if (!track || !track.artists.some(artist => artist.name.toLowerCase() === artistName.toLowerCase())) {
      console.error('Track not found or artist does not match');
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
