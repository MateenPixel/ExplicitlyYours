import React, { useEffect, useState } from 'react';
import { getTrackDetails } from '../../utils/spotify';
import { Link } from 'react-router-dom';
import './Favorites.css';

const personalFavoriteTracks = [
  { name: 'Blue Green Red', artist: 'Drake' },
  { name: 'LGLG', artist: 'Trippie Redd' },
  { name: 'Active', artist: 'Asake' },
  { name: 'Hate Me', artist: 'Ian' },
  { name: 'Lifestyle', artist: 'Kanye West' }
];

const highestRatedTracks = [
  { name: 'Devil in a New Dress', artist: 'Kanye West' },
  { name: 'Pink + White', artist: 'Frank Ocean' },
  { name: 'I Wonder', artist: 'Kanye West' },
  { name: 'SOLO STEPPIN CRETE BOY', artist: 'Lil Yachty' },
  { name: 'Nice For What', artist: 'Drake' }
];

const Favorites = () => {
  const [personalFavorites, setPersonalFavorites] = useState([]);
  const [highestRated, setHighestRated] = useState([]);

  useEffect(() => {
    const fetchPersonalFavorites = async () => {
      const details = await Promise.all(
        personalFavoriteTracks.map(async (track) => {
          const trackDetails = await getTrackDetails(track.name, track.artist);
          return trackDetails;
        })
      );
      setPersonalFavorites(details.filter(detail => detail !== null));
    };

    const fetchHighestRated = async () => {
      const details = await Promise.all(
        highestRatedTracks.map(async (track) => {
          const trackDetails = await getTrackDetails(track.name, track.artist);
          return { ...trackDetails, rating: track.rating };
        })
      );
      setHighestRated(details.filter(detail => detail !== null));
    };

    fetchPersonalFavorites();
    fetchHighestRated();
  }, []);

  return (
    <div className="favorites-section">
      <div className="favorites-content">
        <div className="personal-favorites">
          <h2>Current Favorites</h2>
          {personalFavorites.length === 0 ? (
            <p>Loading personal favorites...</p>
          ) : (
            <ul className="favorite-tracks-list">
              {personalFavorites.map((detail, index) => (
                <li key={index} className="favorite-track-item">
                  <img src={detail.cover} alt={detail.name} className="track-cover" />
                  <div className="track-info">
                    <p className="track-name">{detail.name}</p>
                    <p className="track-artist">{detail.artist}</p>
                    <div className="track-buttons">
                      <a href={detail.spotifyLink} target="_blank" rel="noopener noreferrer">Open in Spotify</a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="highest-rated">
          <h2>All Time Favorites</h2>
          {highestRated.length === 0 ? (
            <p>Loading highest rated tracks...</p>
          ) : (
            <ul className="favorite-tracks-list">
              {highestRated.map((detail, index) => (
                <li key={index} className="favorite-track-item">
                  <img src={detail.cover} alt={detail.name} className="track-cover" />
                  <div className="track-info">
                    <p className="track-name">{detail.name}</p>
                    <p className="track-artist">{detail.artist}</p>
                    <div className="track-buttons">
                      <a href={detail.spotifyLink} target="_blank" rel="noopener noreferrer">Open in Spotify</a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Link to="/" className="button-link">← Back to Home</Link>
    </div>
  );
};

export default Favorites;
