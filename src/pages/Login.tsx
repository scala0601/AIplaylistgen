// src/pages/Login.tsx
import React, { useState } from 'react';
import { login, googleLogin, fetchUserInfo } from '../services/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import googleIcon from '../assets/google.avif';
import { useAuth } from '../context/AuthContext';

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function Login() {
  const { setIsLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';
  const message = location.state?.message;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSuccess = async (response: any) => {
    const credential = response.credential;

    if (!credential) {
      console.error('구글 로그인 자격 증명이 없습니다.');
      return;
    }

    try {
      // 자격 증명을 백엔드로 전송
      
      const googleLoginSuccess = await googleLogin(credential);
      if (googleLoginSuccess) {
        setIsLoggedIn(true);
        const userInfo = await fetchUserInfo();
        console.log('사용자 정보:', userInfo);
        
        // 로그인 후 홈 화면으로 리디렉션
        navigate('/');
      }
    } catch (error) {
      console.error('구글 로그인 실패:', error);
    }
  };

  // 구글 로그인 실패 시 처리
  const handleLoginFailure = (error: any) => {
    console.error('구글 로그인 실패:', error);
    alert('로그인에 실패했습니다. 다시 시도해주세요.');
  };


  return (
    <GoogleOAuthProvider clientId="518790916105-5vks5d48e409tqq2i616decr2ip9a38o.apps.googleusercontent.com">
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
        <div className="login-input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력하세요"
            className="login-input"
          />
        </div>
        <div className="login-input-group">
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

        <GoogleLogin
          //clientId="YOUR_GOOGLE_CLIENT_ID"
          onSuccess={handleLoginSuccess}
          onError={() => console.error("Login Failed")}
          useOneTap
        />

        <div className="form-footer">
          <p>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </p>
        </div>
      </form>
    </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
