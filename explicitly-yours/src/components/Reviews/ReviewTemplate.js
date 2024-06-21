import React from 'react';
import { Link } from 'react-router-dom';
import './ReviewTemplate.css';

const ReviewTemplate = ({ albumName, coverImage, artistName, synopsis, rating, tracks }) => {
  return (
    <div className="album-review-container">
      <Link to="/" className="back-link">← Back to Home</Link>
      <div className="album-review-content">
        <div className="album-cover">
          <img src={coverImage} alt={albumName} />
        </div>
        <div className="album-details">
          <h2>{albumName}</h2>
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
          {tracks.map(track => (
            <li key={track.id}>
              <span>{track.name}</span>
              <div className="track-rating">
                <div className="rating-meter">
                  <div className="rating-fill" style={{ width: `${track.rating}%` }}></div>
                </div>
                <p className="rating-text">{track.rating}/100</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewTemplate;
