import React from 'react';
import './AlbumList.css';
import { useLocation } from 'react-router-dom';

const albums = [
  { name: 'Graduation by Kanye West', path: '/review/Graduation' },
  { name: 'HARDSTONE PSYCHO by Don Toliver', path: '/review/hardstone-psycho' },
  { name: 'IGOR by Tyler the Creator', path: '/review/IGOR' },
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
  const location = useLocation();
  const showAlbumList = location.pathname === '/';

  return showAlbumList ? (
    <div className="album-list-container">
      <h2 className="album-list-header">Albums</h2>
      <ul className="album-list">
        {albums.map((album, index) => (
          <li key={index} className="album-item">
            {typeof album === 'string' ? album : <a href={album.path}>{album.name}</a>}
          </li>
        ))}
      </ul>
      <div className="album-list-footer">by Mateen</div>
    </div>
  ) : null;
}

export default AlbumList;
