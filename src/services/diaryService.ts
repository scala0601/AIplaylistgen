// src/services/diaryService.ts

// 일기 저장을 위한 mockup API 함수
export const saveDiary = async (diaryData: { date: string; title: string; content: string }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Mock API: 일기 저장됨', diaryData);
            resolve({ success: true, ...diaryData }); // 성공적으로 저장된 데이터 반환
        }, 1000); // 1초 후에 응답
    });
}; 