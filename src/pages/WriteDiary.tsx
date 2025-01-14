// src/pages/WriteDiary.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './WriteDiary.css';

function WriteDiary() {
  const { date: urlDate } = useParams();
  const [currentDate, setCurrentDate] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const navigate = useNavigate();

  const genres = ['장르 무관','락', '케이팝', '힙합', '팝', '재즈', '클래식', 'EDM', '레게', 'R&B', '컨트리'];

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 기본 제출 방지
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  try {
    navigate(`/loading`, {
      state: { date: currentDate, title, content, genre: selectedGenre },
    });
  } catch (error) {
    console.error('오류 발생:', error);
  }
  };

  return (
    <div className="container">
      <div className="diary-container">
        <h1 className="diary-header">오늘의 일기를 작성해보세요</h1>
        <h2 className="diary-date">{new Date(currentDate).toLocaleDateString('ko-KR', {year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'})}</h2>
          <form onSubmit={handleSubmit} className="diary-form">          
            <div className="input-group">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="제목을 입력하세요..."
                className = "diary-title"
              />
            </div>
            <div className="input-group">
              <textarea
                value={content}
                onChange={handleContentChange}
                onKeyDown={handleKeyDown}
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
              className="submit-button hover-button2"
            >
              오늘의 플레이리스트 생성하기
            </button>
          </form>
      </div>
    </div>
  );
}

export default WriteDiary;
