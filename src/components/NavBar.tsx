// src/components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">SERVICE</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/write-diary">Write Diary</Link>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
