import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DiaryDetail() {
  const { date } = useParams();
  const [diary, setDiary] = useState<any>(null);

  useEffect(() => {
    // TODO: API 호출로 해당 날짜의 일기를 가져오는 로직 구현
    console.log(`Fetching diary for date: ${date}`);
  }, [date]);

  return (
    <div className="container">
      <div style={{ padding: '20px' }}>
        <h2>{date} 의 일기</h2>
        {diary ? (
          <div>
            <h3>{diary.title}</h3>
            <p>{diary.content}</p>
          </div>
        ) : (
          <>
          <button
            onClick={() => window.location.href = `/diary/${date}`}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f5bba7',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            이 날짜에 일기 작성하기
          </button>
          <p>이 날짜의 일기가 없습니다.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default DiaryDetail; 