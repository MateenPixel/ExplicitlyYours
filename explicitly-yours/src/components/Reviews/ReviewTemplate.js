import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ReviewTemplate.css';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

function ReviewTemplate({ albumId, coverImage, albumName, artistName, synopsis, rating }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
          }
        });
        console.log('Access Token Response:', response.data);
        return response.data.access_token;
      } catch (error) {
        console.error('Error fetching access token', error.response);
      }
    };

    const fetchTracklist = async (accessToken) => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log('Tracklist Response:', response.data);
        setTracks(response.data.items);
      } catch (error) {
        console.error('Error fetching tracklist', error.response);
      }
    };

    const getTracklist = async () => {
      const accessToken = await fetchAccessToken();
      if (accessToken) {
        await fetchTracklist(accessToken);
      }
    };

    getTracklist();
  }, [albumId]);

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
}

export default ReviewTemplate;
