// src/pages/Playlist.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDiaryData, DiaryData } from "../services/Services";
import "./Playlist.css";
import "../index.css";
import MenuBurgerIcon from "../assets/menu-burger.svg";

type Status = "loading" | "error" | "success";

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
        setDiaryData(data);
        setStatus("success");
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

  return (
    <div className="container">
      <div className="playlist-container">
        {/* 왼쪽: 일기 정보 */}
        <div className="section-wrapper">
          <h2 className="section-header">지금 필요한 플레이리스트</h2>
          <h3 className="section-subheader">
            {new Date(date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',  
          })}</h3>
          <div className="diary-section">
            <div className="calendar-widget">
              <div className="date-display">
              <span className="day">
                {new Date(date).toLocaleDateString('en-US', {weekday: 'short'})}
              </span>
              <span className="date">
                {new Date(date).toLocaleDateString('en-US', {day: '2-digit'})}
              </span>
            </div>
            <div className="dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          <div className="diary-content">
              <h2>{diaryData!.title}</h2>
              <p>{diaryData!.content}</p>
            </div>
          </div>
        </div>
        {/* 오른쪽: 플레이리스트 */}
        <div className="playlist-section">
          <div className="playlist-header">
          <p>{diaryData!.emotion}한 하루에 어울리는 {diaryData!.genre} Playlist</p>
        </div>
        <ul style={{padding: 0}}>
          {diaryData!.playlist.map((song, index) => (
            <li key={index} className="playlist-item">
              <img src={MenuBurgerIcon} alt="icon" className="menu-burger-icon"/>
              <img src={song.coverImage} alt={`${song.title} 앨범 커버`} className="cover"/>
              <div>
                <p className="artist">{song.artist}</p>
                <p className="title">{song.title}</p>
                <p className="album">{song.album}</p>
              </div>  
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>  
  );
}

export default Playlist;
