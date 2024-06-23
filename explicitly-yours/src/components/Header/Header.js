import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <nav className="tabs">
        <NavLink to="/about-me" className="tab" activeClassName="active">About Me</NavLink>
        <NavLink to="/reviews" className="tab" activeClassName="active">Reviews</NavLink>
        <NavLink to="/favorites" className="tab" activeClassName="active">Favorites</NavLink>
      </nav>
    </header>
  );
}

export default Header;
