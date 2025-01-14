// src/pages/LandingPage.tsx
import React from 'react';
import './Home.css';
import '../index.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="container">
        <div className="landing-container">
          {/* 좌측: 타이틀 섹션 */}
          <div className="intro-section">
            <div className="empty-box"></div>
            <h1>Turn Your Diary<br/>Into Playlist</h1>
            <p>
              오늘의 일기를 작성하세요. 당신의 글 속 감정을 읽어내어, 하루의 분위기에 어울리는 맞춤형 플레이리스트를 추천해드립니다. 매일의 감정이 음악으로 공감받는 순간을 경험하세요.
            </p>
            <button className="start-button hover-button2" onClick={() => {
              if (isLoggedIn) {
                navigate('/diary');
              } else {
                navigate('/login', { state: { from: '/diary' } });
              }
            }}>
              지금 시작하기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→</button>
          </div>

          {/* 우측: 앨범 이미지 그리드 */}
          <div className="album-grid">
            <img
              src="/src/assets/Wonder.avif"
              alt="Wonder"
            />
            <img
              src="/src/assets/Immunity.avif"
              alt="Immunity"
            />
            <img
              src="/src/assets/Nevermind.avif"
              alt="Nevermind"
            />
            <img
              src="/src/assets/Night_Visions.avif"
              alt="Night_Visions"
            />
            <img
              src="/src/assets/Wasteland,_Baby!.avif"
              alt="Wasteland,_Baby!"
            />
            <img
              src="/src/assets/Torches.avif"
              alt="Torches"
            />
            <img
              src="/src/assets/Lover.avif"
              alt="Lover"
            />
            <img
              src="/src/assets/Folklore.avif"
              alt="Folklore"
            />
            <img
              src="/src/assets/Fine_Line.avif"
              alt="Fine_Line"
            />
            <img
              src="/src/assets/Houses_of_the_Holy.avif"
              alt="Houses_of_the_Holy"
            />
            <img
              src="/src/assets/The_Dark_Side_of_the_Moon.avif"
              alt="The_Dark_Side_of_the_Moon"
            />
            <img
              src="/src/assets/Shore.avif"
              alt="Shore"
            />
          </div>
        </div>
    </div>
  );
}

export default Home;
