// src/pages/Login.tsx
import React, { useState } from 'react';
import { login, googleLogin } from '../services/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import googleIcon from '../assets/google.avif';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { setIsLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';
  const message = location.state?.message;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      {message && (
        <div className="login-message">
          {message}
        </div>
      )}
      <form onSubmit={async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const loginSuccess = await login({ 
            username,
            password
          });
          if (loginSuccess) {
            setIsLoggedIn(true);
            navigate(from);
          }
        } catch (error) {
          console.error('로그인 실패:', error);
        }
      }}>
        <h2 className="title-medium center">로그인</h2>
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력하세요"
            className="login-input"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요" 
            className="login-input"
          />
        </div>
        <button 
          type="submit"
          className="button login-button hover-button2"
        >
          로그인
        </button>
        <button
          type="button"
          onClick={async (e: React.MouseEvent) => {
            try {
              const googleLoginSuccess = await googleLogin();
              if (googleLoginSuccess) {
                setIsLoggedIn(true);
              }
            } catch (error) {
              console.error('구글 로그인 실패:', error);
            }
          }}
          className="button google-login-button hover-button2"
        >
          <img 
            src={googleIcon}
            alt="Google"
            className="google-icon"
          />
          구글 계정으로 로그인
        </button>
        <div className="form-footer">
          <p>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
