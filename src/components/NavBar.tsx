// src/components/NavBar.tsx
import {useState, useEffect} from 'react';
import { Link, useLocation} from 'react-router-dom';
import './NavBar.css'; 
import { useAuth } from '../context/AuthContext';
import profileImage from '../assets/profile.svg';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { fetchUserInfo } from '../services/auth';

function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 사용자 정보 가져오기
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUser(data); // 사용자 정보 설정
      
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
      
      }
    };

    getUserInfo();
  }, []);

  const handleLogout = async () => {
    setIsLoggedIn(false);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  //const [username, setUsername] = React.useState<string | null>(null);

  // React.useEffect(() => {
  //   if (isLoggedIn) {
  //     setUsername(localStorage.getItem('username') || null);
  //   } else {
  //     setUsername(null);
  //   }
  // }, [isLoggedIn]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <GoogleOAuthProvider clientId="518790916105-5vks5d48e409tqq2i616decr2ip9a38o.apps.googleusercontent.com">
    <nav className="navbar">
      <div className="logo">TUNETALES</div>
      {/* 데스크톱 네비게이션 바 */}
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

      {/* 햄버거 메뉴 */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <img src="/src/assets/menu-burger.svg" alt="Menu" className="menu-icon" />
      </div>

      {/* 모바일 메뉴 */}
      <ul className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {isLoggedIn && (
          <div className="mobile-profile-info">
            <img src={profileImage} alt="Profile" className="profile-image" />
            <span className="username">{user.name} 님</span>
          </div>
        )}
        <li>
          <Link
            to="/"
            className={currentPath === '/' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/diary"
            className={currentPath === '/diary' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Write Diary
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className={currentPath === '/calendar' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Calendar
          </Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </li>
        )}
      </ul>

      {/* 데스크톱 프로필 정보 */}
      {isLoggedIn && (
        <div className="profile-info">
          <span className="username">{user.name} 님</span>
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>
      )}
    </nav>
    </GoogleOAuthProvider>
  );
}

export default NavBar;