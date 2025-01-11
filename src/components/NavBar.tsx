// src/components/NavBar.tsx
import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import './NavBar.css'; 
import { useAuth } from '../context/AuthContext';
import profileImage from '../assets/profile.svg';

function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = async () => {
    setIsLoggedIn(false);
  };

  const [username, setUsername] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isLoggedIn) {
      setUsername(localStorage.getItem('username') || null);
    } else {
      setUsername(null);
    }
  }, [isLoggedIn]);

  return (
    <nav className="navbar">
      <div className="logo">SERVICE</div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={`hover-gray ${currentPath === '/' ? 'active' : ''}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/diary" className={`hover-gray ${currentPath === '/diary' ? 'active' : ''}`}>
            Write Diary
          </Link>
        </li>
        <li>
          <Link to="/calendar" className={`hover-gray ${currentPath === '/calendar' ? 'active' : ''}`}>
            Calendar
          </Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      {isLoggedIn && (
        <div className="profile-info">
          <span className="username">{username} 님</span>
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>
      )}
    </nav>
  );
}

export default NavBar;
