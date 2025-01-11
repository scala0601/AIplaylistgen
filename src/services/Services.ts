// src/services/Service.ts

// 일기 저장을 위한 mockup API 함수
export const saveDiary = async (diaryData: { date: string; title: string; content: string }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Mock API: 일기 저장됨', diaryData);
            resolve({ success: true, ...diaryData }); // 성공적으로 저장된 데이터 반환
        }, 1000); // 1초 후에 응답
    });
}; 

// 이 함수는 감정분석 및 플레이리스트 생성을 위한 목업입니다.
export const generatePlaylist = async (diaryData: { date: string; title: string; content: string; genre: string }) => {
    console.log('Emotion Analysis and Generating playlist based on content:', diaryData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          playlistId: 'mock-playlist-123',
          emotion: 'happy',
          playlist: [
            { title: 'Song A', artist: 'Artist 1' },
            { title: 'Song B', artist: 'Artist 2' },
            { title: 'Song C', artist: 'Artist 3' },
          ],
        });
      }, 3000); // 3초 후 목업 데이터 반환
    });
  };
  

  export interface DiaryData {
    title: string;
    content: string;
    date: string;
    emotion: string | null;
    playlist: Array<{
      title: string;
      artist: string;
      album: string;
      coverImage: string;
    }>;
  }
  
  export const fetchDiaryData = async (date: string): Promise<DiaryData> => {
    // 예시 데이터
    const mockData: DiaryData = {
      title: "행복한 하루",
      content: "오늘은 정말 행복한 하루였어요. 햇살이 따뜻하고 기분 좋은 바람이 불었어요.",
      date,
      emotion: "행복",
      playlist: [
        {
          title: "Blinding Lights",
          artist: "The Weeknd",
          album: "After Hours",
          coverImage: "https://upload.wikimedia.org/wikipedia/en/a/a0/The_Weeknd_-_Blinding_Lights.png",
        },
        {
          title: "Watermelon Sugar",
          artist: "Harry Styles",
          album: "Fine Line",
          coverImage: "https://upload.wikimedia.org/wikipedia/en/f/f4/Harry_Styles_-_Fine_Line.png",
        },
        {
          title: "Levitating",
          artist: "Dua Lipa",
          album: "Future Nostalgia",
          coverImage: "https://upload.wikimedia.org/wikipedia/en/0/0d/Dua_Lipa_-_Future_Nostalgia.png",
        },
      ],
    };
  
    // 목업 데이터를 반환
    return new Promise((resolve) => setTimeout(() => resolve(mockData), 1000)); // 1초 지연 후 반환
  };
