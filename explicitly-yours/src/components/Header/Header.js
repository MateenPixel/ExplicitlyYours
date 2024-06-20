import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <nav className="tabs">
        <Link to="#about" className="tab">About Me</Link>
        <Link to="#reviews" className="tab">Reviews</Link>
        <Link to="#recently-listened" className="tab">Recently Listened</Link>
      </nav>
    </header>
  );
}

export default Header;
