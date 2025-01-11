// src/pages/Playlist.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDiaryData, DiaryData } from "../services/Services";
import "./Playlist.css";

type Status = "loading" | "error" | "no-data" | "success";

function Playlist() {
  const location = useLocation();
  const navigate = useNavigate();
  const [diaryData, setDiaryData] = useState<DiaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<Status>("loading");

  // URL에서 date 파라미터 추출
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get("date") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDiaryData(date);
        if (!data) {
          setStatus("no-data");
        } else {
          setDiaryData(data);
          setStatus("success");
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setStatus("error");
      }
    };

    fetchData();
  }, [date]);

  if (status === "loading") {
    return (
      <div className="loading-container">
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="error-container">
        <p>데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.</p>
      </div>
    );
  }

  if (status === "no-data") {
    return (
      <div className="no-data-container">
        <p>이 날짜의 일기가 없습니다.</p>
        <button
          onClick={() => navigate(`/write-diary?date=${date}`)}
          className="write-diary-button"
        >
          이 날짜에 일기 작성하기
        </button>
      </div>
    );
  }

  return (
    <div className="playlist-container">
      {/* 왼쪽: 일기 정보 */}
      <div className="diary-section">
        <h2>{new Date(diaryData!.date).toLocaleDateString()}</h2>
        <p><strong>감정:</strong> {diaryData!.emotion || "분석되지 않음"}</p>
        <h3>{diaryData!.title}</h3>
        <p>{diaryData!.content}</p>
      </div>

      {/* 오른쪽: 플레이리스트 */}
      <div className="playlist-section">
        <h2>오늘의 플레이리스트</h2>
        <ul>
          {diaryData!.playlist.map((song, index) => (
            <li key={index} className="playlist-item">
              <img src={song.coverImage} alt={`${song.title} 앨범 커버`} />
              <div>
                <p><strong>{song.title}</strong></p>
                <p>{song.artist}</p>
                <p>{song.album}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Playlist;
