import React, { useState, useEffect } from 'react';
import { getPublicPlaylist } from '../../utils/spotify';
import './ListeningTo.css';

const ListeningTo = () => {
  const [monthlyPlaylists, setMonthlyPlaylists] = useState([]);
  const [otherPlaylists, setOtherPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const monthlyPlaylistIds = [
        '0ZyTHVbOyM76UP4aoT1caH',
        '5q7NhzBSVwdzSqmhzttIo4',
        '1FUgFvTQ9qZqFeNtykorCd',
        '1b8Ao0Sb8EIiHAVhHZin6P',
      ];
      
      const otherPlaylistIds = [
        '7syicaDKR9wR7NmXW9qyfo',
        '0c6P2dVfbqS96phtBXZfSg',
  
        
      ];

      try {
        const monthlyPlaylistsData = await Promise.all(monthlyPlaylistIds.map(id => getPublicPlaylist(id)));
        const otherPlaylistsData = await Promise.all(otherPlaylistIds.map(id => getPublicPlaylist(id)));
        
        setMonthlyPlaylists(monthlyPlaylistsData.filter(playlist => playlist !== null));
        setOtherPlaylists(otherPlaylistsData.filter(playlist => playlist !== null));
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="listening-to-container">
      <div className="description-box">
        <h1 className="description-title">Welcome to My Playlists</h1>
        <p className="description-text">
          Here you can find a collection of my curated playlists. On the left, you'll find monthly playlists that reflect my current music tastes, while on the right, you'll discover other themed playlists I’ve created. Click on any playlist to explore it further on Spotify.
        </p>
      </div>
      <div className="playlists-content">
        <div className="playlists-column">
          <h2 className="playlists-section-title">Monthly Playlists</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="playlist-grid">
              {monthlyPlaylists.map((playlist, index) => (
                <a 
                  key={index} 
                  href={playlist.external_urls.spotify} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="playlist-link"
                >
                  <div className="playlist-card">
                    <img src={playlist.images[0]?.url} alt={playlist.name} className="playlist-cover-large" />
                    <p className="playlist-name-grid">{playlist.name}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="playlists-column">
          <h2 className="playlists-section-title">Other Playlists</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="playlist-grid">
              {otherPlaylists.map((playlist, index) => (
                <a 
                  key={index} 
                  href={playlist.external_urls.spotify} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="playlist-link"
                >
                  <div className="playlist-card">
                    <img src={playlist.images[0]?.url} alt={playlist.name} className="playlist-cover-large" />
                    <p className="playlist-name-grid">{playlist.name}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListeningTo;
