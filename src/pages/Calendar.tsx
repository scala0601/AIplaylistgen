// src/pages/Calendar.tsx
import React, { MouseEvent } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value } from 'react-calendar/dist/cjs/shared/types.js';

function Calendar() {
  return (
    <div className="container">
        <div className="calendar-wrapper">
          <ReactCalendar
            onChange={(value: Value) => {
              const date = value as Date;
              const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
                .toISOString()
                .split('T')[0];
              window.location.href = `/calendar/diary-detail/${formattedDate}`;
            }}
            value={new Date()}
            locale="ko-KR" 
            className="react-calendar"
            formatDay={(locale, date) => 
              new Date(date).toLocaleDateString('ko-KR', {
                day: 'numeric'
              })
            }
            tileContent={({ date, view }) => {
              if (view === 'month') {
                return (
                  <div className="dot-container">
                    {/* 일기가 있는 날짜에 표시될 점 */}
                    {/* <div className="dot"></div> */}
                  </div>
                );
              }
            }}
          />
        </div>
    </div>
  );
}

export default Calendar;
