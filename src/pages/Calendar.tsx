// src/pages/Calendar.tsx
import { useState, useEffect } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { Value } from 'react-calendar/dist/cjs/shared/types.js';
import { useNavigate } from 'react-router-dom';
import {  fetchAllDiaries } from "../services/Services";
import Modal from '../components/Modal';

// interface PlaylistItem {
//   title: string;
//   artist: string,
//   videoId: string;
//   description: string;
//   thumbnail: string;
// }
// interface DiaryData {
//   title: string;
//   content: string;
//   date: string;
//   emotion: string;
//   playlist: PlaylistItem[];
//   genre: string;
// }

const emotionMapping: { [key: string]: string } = {
  행복: 'happiness',
  우울: 'sadness',
  평온: 'calmness',
  사랑: 'love',
  분노: 'anger',
  두려움: 'fear',
  흥분: 'excitement',
  지루함: 'boredom',
  외로움: 'loneliness',
  데이터없음: 'no-data',  // 데이터 없을 때의 기본 스타일
};

// 1) Mock 데이터
// const mockDiaryData: { [key: string]: { albumImage: string, emotion: string } } = {
//   '2025-01-05': {
//     albumImage: 'https://picsum.photos/id/1015/200/200', 
//     emotion: 'happiness',
//   },
//   '2025-01-12': {
//     albumImage: 'https://picsum.photos/id/1025/200/200',
//     emotion: 'sadness',
//   },
//   '2025-01-02': {
//     albumImage: 'https://picsum.photos/id/1045/200/200',
//     emotion: 'anger',
//   },
//   '2025-01-06': {
//     albumImage: 'https://picsum.photos/id/1035/200/200',
//     emotion: 'calmness',
//   },
// };


function Calendar() {
  const navigate = useNavigate();
  const [diaryData, setDiaryData] = useState<{ [key: string]: { albumImage: string; emotion: string } }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await fetchAllDiaries(); // 이미 만들어둔 fetchAllDiaries 함수 호출
        setDiaryData(data);  // 데이터를 상태에 저장
      } catch (err) {
        setError('일기 데이터를 가져오는 데 실패했습니다.');  // 에러 처리
      } finally {
        setLoading(false);  // 로딩 상태 종료
      }
    };

    fetchAll();
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  if (loading) {
    return <div>Loading...</div>;  // 로딩 중일 때 표시
  }

  if (error) {
    return <div>{error}</div>;  // 에러가 발생했을 때 표시
  }
  
  const today = new Date();

  const handleDateClick = async (value: Value) => {
    const date = value as Date;

    // 오늘 이후 날짜를 클릭했을 경우 모달 표시
    if (date > today) {
      setShowModal(true);
      return;
    }

    const formattedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0];

    if (diaryData[formattedDate]) {
      navigate(`/playlist?date=${formattedDate}`);
    } else {
      navigate(`/diary?date=${formattedDate}`);
    }
  };

  return (
    <div className="container">
      <div className="calendar-wrapper">
        <ReactCalendar
          prev2Label={null}
          next2Label={null}
          onChange={handleDateClick}
          value={new Date()}
          locale="ko-KR" 
          className="react-calendar"
          formatDay={() => ''}

          tileContent={({ date, view }) => {
            if (view === 'month') {
              const formattedDate = new Date(
                date.getTime() - date.getTimezoneOffset() * 60000
              )
                .toISOString()
                .split('T')[0];
  
              // Mock 데이터에 해당 날짜 키가 있으면 앨범 이미지를 표시
              if (diaryData[formattedDate]) {
                const { emotion, albumImage } = diaryData[formattedDate];
                const emotionClass = emotionMapping[emotion] || 'no-data';
                return (
                  <div className="tile-container">
                    {/* 날짜(원 모양) */}
                    <div className={`emotion-badge ${emotionClass}`}>
                      {date.getDate()}
                    </div>
                    {/* 앨범 이미지 */}
                    <img
                      src={albumImage}
                      alt="앨범 이미지"
                      className="tile-image"
                    />
                  </div>
                );
              }
  
              // mock 데이터가 없는 날짜
              return (
                <div className="tile-container">
                  <div className={`emotion-badge no-data`}>
                    {date.getDate()}
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        {showModal && (
          <Modal
            message="오늘 이후의 날짜는 선택할 수 없습니다."
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Calendar;