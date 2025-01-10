// src/pages/WriteDiary.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function WriteDiary() {
  const { date: urlDate } = useParams();
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = urlDate || today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, [urlDate]);
  
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출로 일기 저장 구현
    console.log('일기 저장:', { date: currentDate, title, content });
  };

  return (
    <div className="container">
      <div style={{ padding: '20px' }}>
        <h1>Write Diary Page</h1>
        <h2>{currentDate}의 일기</h2>
        
        <form onSubmit={handleSubmit}>          
          <div className="input-group">
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="오늘의 이야기를 들려주세요..."
              className="diary-textarea"
              rows={10}
            />
          </div>

          <button 
            type="submit"
            className="submit-button"
          >
            일기 저장하기
          </button>
          <button
            type="button"
            onClick={() => {
              // TODO: 감정 분석 및 플레이리스트 생성 API 호출
              console.log('플레이리스트 생성:', { content });
            }}
            className="playlist-button"
          >
            오늘의 플레이리스트 생성하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default WriteDiary;
