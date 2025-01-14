
// src/services/Service.ts
import axios from 'axios';

  interface PlaylistItem {
    title: string;
    artist: string,
    videoId: string;
    description: string;
    thumbnail: string;
  }
  export interface DiaryData {
    title: string;
    content: string;
    date: string;
    emotion: string;
    playlist: PlaylistItem[];
    genre: string;
  }

// 일기 저장을 위한 mockup API 함수
export const saveDiary = async (diary: { date: string; title: string; content: string; genre: string }) => {
  try {
    const response = await axios.post('https://aigenbackend.onrender.com/api/save', diary, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    
    });
    if (response.data) {
      //const result = await response.json();
      console.log('DB에 데이터 저장됨:', response.data);
    } else {
      console.error('데이터 저장 실패');
    }

  } catch (error) {
    console.error('Error saving diary:', error);
    throw new Error('일기 저장에 실패했습니다.');
  }
}; 

  
  export const fetchDiaryData = async (date: string): Promise<DiaryData | null> => {
    try {
      const response = await axios.get(`https://aigenbackend.onrender.com/api/fetch?date=${date}`, {
        withCredentials: true,  // 세션을 사용하기 위해 필요
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data) {
        return response.data;
      } else {
        return null;  // 일기가 없으면 null 반환
      }
    } catch (error) {
      console.error('Error fetching diary:', error);
      throw new Error('일기 데이터를 가져오는 데 실패했습니다.');
    }
  };

  export const fetchAllDiaries = async () => {
    try {
      const response = await axios.get(`https://aigenbackend.onrender.com/api/fetchAll`, {
        withCredentials: true,  // 세션을 사용하기 위해 필요
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data) {
        return response.data;
      } else {
        return null;  // 일기가 없으면 null 반환
      }
    } catch (error) {
      console.error('Error fetching diary:', error);
      throw new Error('일기 데이터를 가져오는 데 실패했습니다.');
    }
  };
