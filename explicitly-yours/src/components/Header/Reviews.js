import React from 'react';
import { Link } from 'react-router-dom';
import './Reviews.css';

const reviews = [
  { name: 'Graduation by Kanye West', path: '/review/graduation', cover: 'ye.jpeg' },
  { name: 'HARDSTONE PSYCHO by Don Toliver', path: '/review/hardstone-psycho', cover: 'don.webp' },
  // Add more albums here
];

const Reviews = () => {
  return (
    <div className="review-list-container">
      <h2 className="review-list-header">Album Reviews</h2>
      <div className="review-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <Link to={review.path}>
              <img src={review.cover} alt={review.name} className="review-cover" />
              <p className="review-name">{review.name}</p>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
};

export default Reviews;
