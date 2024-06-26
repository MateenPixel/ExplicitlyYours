import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Reviews.css';
import { graduationRating } from '../Reviews/Graduation';
import { hardstonePsychoRating } from '../Reviews/HardStonePsycho';
import { igorRating } from '../Reviews/Igor';
import { twopointfiveRating } from '../Reviews/TwoPointFive';

const reviews = [
  { name: 'Graduation', artist: 'Kanye West', path: '/review/graduation', cover: 'ye.jpeg', rating: graduationRating },
  { name: 'HARDSTONE PSYCHO', artist: 'Don Toliver', path: '/review/hardstone-psycho', cover: 'don.webp', rating: hardstonePsychoRating },
  { name: 'IGOR', artist: 'Tyler the Creator', path: '/review/igor', cover: 'igor.jpeg', rating: igorRating },
  { name: 'TWOPOINTFIVE', artist: 'Aminé', path: '/review/twopointfive', cover: 'amine.jpeg', rating: twopointfiveRating },
  // Add more albums here with their respective ratings
];

const Reviews = () => {
  const [sortedReviews, setSortedReviews] = useState(reviews);
  const [sortCriteria, setSortCriteria] = useState('name');

  useEffect(() => {
    let sortedArray = [...reviews];
    switch (sortCriteria) {
      case 'name':
        sortedArray.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'artist':
        sortedArray.sort((a, b) => a.artist.localeCompare(b.artist));
        break;
      case 'rating':
        sortedArray.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setSortedReviews(sortedArray);
  }, [sortCriteria]);

  return (
    <div className="review-list-container">
      <h2 className="review-list-header">Album Reviews</h2>
      <div className="sort-container">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="name">Album Name</option>
          <option value="artist">Artist</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="review-list">
        {sortedReviews.map((review, index) => (
          <div key={index} className="review-item">
            <Link to={review.path}>
              <img src={review.cover} alt={review.name} className="review-cover" />
              <p className="review-name">{review.name} by {review.artist}</p>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/" className="button-link">← Back to Home</Link>
    </div>
  );
};

export default Reviews;
