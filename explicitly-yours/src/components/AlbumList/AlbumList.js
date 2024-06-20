import React from 'react';
import './AlbumList.css';

const albums = [
  'Graduation by Kanye West',
  'Link 2',
  'Link 3',
  'Link 4',
  'Link 5',
  'Link 6',
  'Link 7',
  'Link 8',
  'Link 9',
  'Link 10',
  'Link 11',
  'Link 12',
  'Link 13',
];

function AlbumList() {
  return (
    <div className="album-list-container">
      <h2 className="album-list-header">Albums</h2>
      <ul className="album-list">
        {albums.map((album, index) => (
          <li key={index} className="album-item">{album}</li>
        ))}
      </ul>
      <div className="album-list-footer">by Mateen</div>
    </div>
  );
}

export default AlbumList;
