// src/pages/Login.tsx
import React from 'react';

function Login() {
  return (
    <div className="container">
      <div className="login-form">
        <form onSubmit={(e) => {
          e.preventDefault();
          // TODO: 로그인 처리 로직 구현
        }}>
          <div className="input-group">
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              className="login-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="비밀번호를 입력하세요" 
              className="login-input"
            />
          </div>
          <button 
            type="submit"
            className="login-button"
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => {
              // TODO: 구글 로그인 처리
            }}
            className="google-login-button"
          >
            <img 
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="google-icon"
            />
            구글 계정으로 로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
