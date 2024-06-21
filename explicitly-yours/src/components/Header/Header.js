import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <nav className="tabs">
        <Link to="/about-me" className="tab">About Me</Link>
        <Link to="/reviews" className="tab">Reviews</Link>
        <Link to="/recents" className="tab">Recents</Link>
      </nav>
    </header>
  );
}

export default Header;
