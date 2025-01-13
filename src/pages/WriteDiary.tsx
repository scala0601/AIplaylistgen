import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WriteDiary.css';

// 장르 리스트 상수 분리
const GENRES = ['장르 무관', '락', '케이팝', '힙합', '팝', '재즈', '클래식', 'EDM', '레게', 'R&B', '컨트리'];

function WriteDiary() {
  const navigate = useNavigate();

  // 쿼리 문자열에서 date 값을 추출
  const getQueryDate = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('date');
  };

  // 상태 초기값 설정
  const [form, setForm] = useState({
    diaryDate: getQueryDate() || new Date().toISOString().split('T')[0], // 쿼리 문자열의 date 또는 오늘 날짜
    title: '',
    content: '',
    genre: '',
  });

  const isToday = form.diaryDate === new Date().toISOString().split('T')[0];

  // 상태 업데이트 함수 통합
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      navigate(`/loading`, {
        state: {
          date: form.diaryDate,
          title: form.title,
          content: form.content,
          genre: form.genre,
        },
      });
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  return (
    <div className="container">
      <div className="diary-container">
        <h1 className="diary-header">
          {isToday ? '오늘의 일기를 작성해보세요' : '이 날의 일기를 작성해보세요'}
        </h1>
        <h2 className="diary-date">
          {new Date(form.diaryDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </h2>
        <form onSubmit={handleSubmit} className="diary-form">
          <div className="input-group">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요..."
              className="diary-title"
            />
          </div>
          <div className="input-group">
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="오늘의 이야기를 들려주세요..."
              className="diary-textarea"
              rows={10}
            />
          </div>
          <div className="input-group">
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="diary-genre"
            >
              <option value="">장르를 선택하세요...</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button hover-button2">
            오늘의 플레이리스트 생성하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default WriteDiary;
