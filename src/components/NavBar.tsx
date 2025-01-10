// src/components/NavBar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'; 

function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">SERVICE</div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={`hover-primary ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/diary" className={`hover-primary ${location.pathname === '/diary' ? 'active' : ''}`}>
            Write Diary
          </Link>
        </li>
        <li>
          <Link to="/calendar" className={`hover-primary ${location.pathname === '/calendar' ? 'active' : ''}`}>
            Calendar
          </Link>
        </li>
        <li>
          <Link to="/login" className={`hover-primary ${location.pathname === '/login' ? 'active' : ''}`}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
