import React, { useEffect, useState } from 'react';

interface PlaylistItem {
    title: string;
    videoId: string;
    description: string;
    thumbnail: string;

}
interface Diary {
  _id: string;
  title: string;
  content: string;
  date: string;
  emotion: string;
  playlist: PlaylistItem[];
  genre: string;
}

function DiaryList() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/list', {
      method: 'GET',
      credentials: 'include',  // 세션을 사용하기 위한 옵션
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch diaries');
        }
      })
      .then((data) => {
        setDiaries(data);  // 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error('Error fetching diaries:', error);
      });
  }, []);

  return (
    <div>
      <h2>내 일기</h2>
      <ul>
        {diaries.map((diary) => (
          <li key={diary._id}>
            <h3>{diary.title}</h3>
            <p><strong>작성일:</strong> {diary.date}</p>
            <p><strong>감정:</strong> {diary.emotion}</p>
            <p><strong>내용:</strong> {diary.content}</p>
            <p><strong>플레이리스트:</strong></p>
            <ul>
              {diary.playlist.map((song, index) => (
                <li key={index}>
                  <img src={song.thumbnail} alt={`${song.title} thumbnail`} style={{ width: '120px', marginRight: '10px' }} />
                  <div>
                    <a href={`https://www.youtube.com/watch?v=${song.videoId}`} target="_blank" rel="noopener noreferrer">
                      {song.title}
                    </a>
                    <p>{song.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiaryList;
