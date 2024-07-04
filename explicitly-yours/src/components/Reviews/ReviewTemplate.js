import React from 'react';
import { Link } from 'react-router-dom';
import './ReviewTemplate.css';

const ReviewTemplate = ({ albumName, coverImage, artistName, synopsis, rating, tracks, spotifyLink, trackColor }) => {
  return (
    <div className="album-review-container">
      <div className="album-review-content">
        <div className="album-cover">
          <img src={coverImage} alt={albumName} />
          <a href={spotifyLink} target="_blank" rel="noopener noreferrer" className="spotify-button">Listen on Spotify</a>
        </div>
        <div className="album-details">
          <h2 className="album-name">{albumName}</h2>
          <p className="artist-name">by {artistName}</p>
          <p className="album-synopsis">{synopsis}</p>
          <div className="album-rating">
            <div className="rating-meter">
              <div className="rating-fill" style={{ width: `${rating}%` }}></div>
            </div>
            <p className="rating-text">{rating}/100</p>
          </div>
        </div>
      </div>
      <div className="tracklist">
        <h3>Tracklist</h3>
        <ul>
          {tracks.map((track, index) => (
            <li key={track.id || index}>
              <div className="track-info">
                <span className="track-name" style={{ color: trackColor }}>{track.name}</span>
                <div className="track-rating">
                  <div className="rating-meter">
                    <div className="rating-fill" style={{ width: `${track.rating}%` }}></div>
                  </div>
                  <span className="rating-text">{track.rating}/100</span>
                </div>
              </div>
              <div className="track-description">
                {track.thoughts}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/" className="button-link back-link">← Back to Home</Link>
    </div>
  );
};

export default ReviewTemplate;
