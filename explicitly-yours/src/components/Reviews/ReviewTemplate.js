import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAlbumTracks } from '../../utils/spotify';
import './ReviewTemplate.css';

const ReviewTemplate = ({ albumName, coverImage, artistName, synopsis, rating }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const albumTracks = await getAlbumTracks(albumName);
      setTracks(albumTracks);
    };
    fetchTracks();
  }, [albumName]);

  return (
    <div className="album-review-container">
      <Link to="/" className="back-link">← Back to Home</Link>
      <div className="album-review-content">
        <div className="album-cover">
          <img src={coverImage} alt={albumName} />
        </div>
        <div className="album-details">
          <h2>{albumName}</h2>
          <p>by {artistName}</p>
        </div>
      </div>
      <div className="album-synopsis-rating">
        <p className="album-synopsis">{synopsis}</p>
        <div className="album-rating">
          <div className="rating-meter">
            <div className="rating-fill" style={{ height: `${rating}%` }}></div>
          </div>
          <p>Rating: {rating}/10</p>
        </div>
      </div>
      <div className="tracklist">
        <h3>Tracklist</h3>
        <ul>
          {tracks.map(track => (
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewTemplate;
