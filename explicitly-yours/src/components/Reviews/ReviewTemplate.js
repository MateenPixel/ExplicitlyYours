import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import './ReviewTemplate.css';
import heartIcon from './heart.png'; // Ensure you replace this with the new icon path

const socket = io('https://explicitly-yours.vercel.app/'); // Change this to your server's URL

const ReviewTemplate = ({ albumName, coverImage, artistName, synopsis, rating, tracks, spotifyLink }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Listen for updates from the server
    socket.on('updateLikes', ({ albumName: updatedAlbumName, likes: updatedLikes }) => {
      if (updatedAlbumName === albumName) {
        setLikes(updatedLikes);
      }
    });

    // Fetch initial like count from the server
    const fetchLikes = async () => {
      const response = await fetch(`/api/likes?album=${albumName}`);
      const data = await response.json();
      setLikes(data.likes);
      setIsLiked(localStorage.getItem(`liked-${albumName}`) === 'true');
    };

    fetchLikes();

    return () => {
      socket.off('updateLikes');
    };
  }, [albumName]);

  const handleLike = () => {
    if (!isLiked) {
      socket.emit('like', albumName);
      setIsLiked(true);
      localStorage.setItem(`liked-${albumName}`, 'true');
    }
  };

  const handleUnlike = () => {
    if (isLiked) {
      socket.emit('unlike', albumName);
      setIsLiked(false);
      localStorage.removeItem(`liked-${albumName}`);
    }
  };

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
            <button className="like-button" onClick={isLiked ? handleUnlike : handleLike}>
              <img src={heartIcon} alt="Like" className="heart-icon" />
              {likes}
            </button>
          </div>
        </div>
      </div>
      <div className="tracklist">
        <h3>Tracklist</h3>
        <ul>
          {tracks.map((track, index) => (
            <li key={track.id || index}>
              <div className="track-info">
                <span className="track-name">{track.name}</span>
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
