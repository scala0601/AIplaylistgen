import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generatePlaylist, saveDiary } from '../services/Services';
import './Loading.css';

function Loading() {
  const location = useLocation();
  const navigate = useNavigate();
  const { date, title, content, genre } = location.state || {};

  useEffect(() => {
    const processDiaryAndPlaylist = async () => {
      try {
        // 1. 일기 저장
        const diaryData = { date, title, content, genre };
        await saveDiary(diaryData);
        console.log('일기 저장 완료:', diaryData);

        // 2. 감정분석 및 플레이리스트 생성
        const response = await generatePlaylist(diaryData);
        console.log('감정분석 및 플레이리스트 생성 완료:', response);

        // 3. 플레이리스트 페이지로 이동
        navigate(`/playlist?date=${date}`);
      } catch (error) {
        console.error('오류 발생:', error);
        navigate(`/error`, { state: { message: '오류가 발생했습니다.' } });
      }
    };

    processDiaryAndPlaylist();
  }, [date, title, content, navigate]);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>작업을 처리 중입니다. 잠시만 기다려주세요...</p>
    </div>
  );
}

export default Loading;
