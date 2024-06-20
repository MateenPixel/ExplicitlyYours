import React from 'react';
import { Link } from 'react-router-dom';
import './AlbumList.css';

const albums = [
  { name: 'Graduation by Kanye West', path: '#' },
  { name: 'HARDSTONE PSYCHO by Don Toliver', path: '/review/hardstone-psycho' },
  { name: 'Link 3', path: '#' },
  { name: 'Link 4', path: '#' },
  { name: 'Link 5', path: '#' },
  { name: 'Link 6', path: '#' },
  { name: 'Link 7', path: '#' },
  { name: 'Link 8', path: '#' },
  { name: 'Link 9', path: '#' },
  { name: 'Link 10', path: '#' },
  { name: 'Link 11', path: '#' },
  { name: 'Link 12', path: '#' },
  { name: 'Link 13', path: '#' },
];

function AlbumList() {
  return (
    <div className="album-list-container">
      <h2 className="album-list-header">Albums</h2>
      <ul className="album-list">
        {albums.map((album, index) => (
          <li key={index} className="album-item">
            <Link to={album.path}>{album.name}</Link>
          </li>
        ))}
      </ul>
      <div className="album-list-footer">by Mateen</div>
    </div>
  );
}

export default AlbumList;
