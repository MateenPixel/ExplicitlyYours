import React, { useEffect, useState } from 'react';
import { getTrackDetails } from '../../utils/spotify';
import './Favorites.css';

const favoriteTrackNames = [
  'Pink + White',
  'Devil in a New Dress',
  'Nice for What',
  'Matinee',
  'New Magic Wand'
];

const Favorites = () => {
  const [favoriteTracks, setFavoriteTracks] = useState([]);

  useEffect(() => {
    const fetchFavoriteTracks = async () => {
      const tracks = await Promise.all(
        favoriteTrackNames.map(async (trackName) => {
          const trackDetails = await getTrackDetails(trackName);
          return trackDetails;
        })
      );
      setFavoriteTracks(tracks.filter(track => track !== null));
    };

    fetchFavoriteTracks();
  }, []);

  return (
    <div className="page-container">
      <h1>Favorites</h1>
      {favoriteTracks.length === 0 ? (
        <p>Loading favorite tracks...</p>
      ) : (
        <ul className="favorite-tracks-list">
          {favoriteTracks.map((track, index) => (
            <li key={index} className="favorite-track-item">
              <img src={track.cover} alt={track.name} className="track-cover" />
              <div className="track-info">
                <p className="track-name">{track.name}</p>
                <p className="track-artist">{track.artist}</p>
                <div className="track-buttons">
                  <a href={track.spotifyLink} target="_blank" rel="noopener noreferrer">Open in Spotify</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
