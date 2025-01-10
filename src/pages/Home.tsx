// src/pages/LandingPage.tsx
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="container">
        <div className="landing-container">
          {/* 좌측: 타이틀 섹션 */}
          <div className="intro-section">
            <h1>Turn Your Diary<br/>Into Playlist</h1>
            <p>
              오늘의 일기를 작성하세요. 일지의 키워드를 분석하여,<br/>
              분위기에 어울리는 곡들을 추천해드립니다.<br/>
              내 감정이 전환되는 순간을 경험해보세요.
            </p>
            <button className="start-button">지금 시작하기 →</button>
          </div>
    
          {/* 우측: 앨범 이미지 그리드 */}
          <div className="album-grid">
            {/* 임시 앨범 이미지 예시 */}
            <img
              src="https://via.placeholder.com/200x200?text=Album1"
              alt="Album 1"
            />
            <img
              src="https://via.placeholder.com/200x200?text=Album2"
              alt="Album 2"
            />
            <img
              src="https://via.placeholder.com/200x200?text=Album3"
              alt="Album 3"
            />
            <img
              src="https://via.placeholder.com/200x200?text=Album4"
              alt="Album 4"
            />
            <img
              src="https://via.placeholder.com/200x200?text=Album5"
              alt="Album 5"
            />
            <img
              src="https://via.placeholder.com/200x200?text=Album6"
              alt="Album 6"
            />
            <img
              src="https://via.placeholder.com/200x200?text=Album7"
              alt="Album 7"
            />
            <img
              src="https://via.placeholder.com/200x200?text=Album8"
              alt="Album 8"
            />
            <img
              src="https://via.placeholder.com/200x200?text=Album9"
              alt="Album 9"
            />
          </div>
        </div>
    </div>
  );
}

export default Home;
