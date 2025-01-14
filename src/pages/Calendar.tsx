// src/pages/Calendar.tsx
import React, { MouseEvent } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { Value } from 'react-calendar/dist/cjs/shared/types.js';
import { useNavigate } from 'react-router-dom';

// 1) Mock 데이터
const mockDiaryData: { [key: string]: { albumImage: string, emotion: string } } = {
  '2025-01-05': {
    albumImage: 'https://picsum.photos/id/1015/200/200', 
    emotion: 'happiness',
  },
  '2025-01-12': {
    albumImage: 'https://picsum.photos/id/1025/200/200',
    emotion: 'sadness',
  },
  '2025-01-02': {
    albumImage: 'https://picsum.photos/id/1045/200/200',
    emotion: 'anger',
  },
  '2025-01-06': {
    albumImage: 'https://picsum.photos/id/1035/200/200',
    emotion: 'calmness',
  },
};


function Calendar() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="calendar-wrapper">
        <ReactCalendar
          prev2Label={null}
          next2Label={null}
          onChange={(value: Value) => {
            const date = value as Date;
            const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
              .toISOString()
              .split('T')[0];
            
            if (mockDiaryData[formattedDate]) {
              navigate(`/playlist?date=${formattedDate}`);
            } else {
              navigate(`/diary?date=${formattedDate}`);
            }
          }}
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
              if (mockDiaryData[formattedDate]) {
                const { emotion, albumImage } = mockDiaryData[formattedDate];
                return (
                  <div className="tile-container">
                    {/* 날짜(원 모양) */}
                    <div className={`emotion-badge ${emotion}`}>
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
      </div>
    </div>
  );
}

export default Calendar;