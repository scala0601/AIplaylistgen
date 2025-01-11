// src/pages/WriteDiary.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { saveDiary } from '../services/diaryService';
import './WriteDiary.css';

function WriteDiary() {
  const { date: urlDate } = useParams();
  const [currentDate, setCurrentDate] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  const genres = ['락', '케이팝', '힙합', '팝', '재즈', '클래식', 'EDM', '레게', 'R&B', '컨트리'];

  useEffect(() => {
    const today = new Date();
    const formattedDate = urlDate || today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, [urlDate]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const diaryData = { date: currentDate, title, content };
    await saveDiary(diaryData);
    console.log('일기 저장:', diaryData);
  };

  return (
    <div className="diary-container">
      <div style={{ padding: '20px' }}>
        <h1>Write Diary Page</h1>
        <h2>{currentDate}의 일기</h2>
        
        <form onSubmit={handleSubmit}>          
          <div className="input-group">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력하세요..."
              className="diary-title"
            />
          </div>
          <div className="input-group">
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="오늘의 이야기를 들려주세요..."
              className="diary-textarea" 
              rows={10}
            />
          </div>
          <div className="input-group">
            <select value={selectedGenre} onChange={handleGenreChange} className="diary-genre">
              <option value="">장르를 선택하세요...</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
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
