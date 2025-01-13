import React, { useState } from 'react';
import { signup } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const signupSuccess = await signup({ username, password });
      if (signupSuccess) {
        navigate('/login'); // 회원가입 후 로그인 페이지로 이동
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      setMessage('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="login-container">
      {message && (
        <div className="login-message">
          {message}
        </div>
      )}
      <form onSubmit={handleSignup}>
        <h2 className="title-medium center">회원가입</h2>
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
        <div className="input-group">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
            className="login-input"
          />
        </div>
        <button 
          type="submit"
          className="button login-button hover-button2"
        >
          회원가입
        </button>
        <div className="form-footer">
          <p>
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup; 