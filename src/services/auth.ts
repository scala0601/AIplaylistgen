
// src/services/auth.ts
// 인증 관련 타입 정의

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  password: string;
}

// mock API 함수들
export const mockLoginAPI = (credentials: LoginCredentials) => {
  // 모든 필드가 채워져 있는지 확인
  if (!credentials.username || !credentials.password) {
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
};

export const mockGoogleLoginAPI = () => Promise.resolve(true);
export const mockLogoutAPI = () => Promise.resolve(true);
export const mockSignupAPI = (credentials: SignupCredentials) => {
  // 모든 필드가 채워져 있는지 확인
  if (!credentials.username || !credentials.password) {
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
};

// 실제 API 구현을 위한 함수들
export const login = async (credentials: LoginCredentials) => {
  if (!credentials.username.trim() || !credentials.password.trim()) {
    alert("아이디와 비밀번호를 모두 입력해주세요.");
    return false;
  }
  return mockLoginAPI(credentials);
};

export const googleLogin = async (credential: string): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:5000/login/google/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 세션을 유지하기 위해 사용
      body: JSON.stringify({ token: credential }), // 구글에서 받은 인증 토큰을 보내기
    });

    const data = await response.json();
    if (response.ok) {
      // 로그인 성공 시
      if (data.success) {
        return true;  // 로그인 성공
      } else {
        console.error('로그인 실패:', data.message);
        return false;  // 로그인 실패
      }
    } else {
      // 응답이 실패일 경우
      console.error('서버 오류:', data.message);
      return false;
    }
    } catch (error) {
      console.error('구글 로그인 처리 중 오류:', error);
      throw error;
    }
};

export const fetchUserInfo = async (): Promise<any> => {
  try {
    const response = await fetch('http://localhost:5000/login/status', {
      method: 'GET',
      credentials: 'include', // 세션 정보를 포함하여 요청
    });

    if (!response.ok) {
      throw new Error('로그인된 사용자 정보를 가져오는 데 실패했습니다.');
    }

    const data = await response.json();
    return data;  // 사용자 정보를 반환
  } catch (error) {
    console.error('사용자 정보 가져오기 실패:', error);
    throw error;
  }
};

export const logout = async () => {
  return mockLogoutAPI();
};

export const signup = async (credentials: SignupCredentials) => {
  if (!credentials.username.trim() || !credentials.password.trim()) {
    alert("아이디와 비밀번호를 모두 입력해주세요.");
    return false;
  }
  return mockSignupAPI(credentials);
};

export const getUsername = () => {
  return '사용자이름'; // 여기에 실제 사용자 이름을 반환하는 로직을 추가하세요.

}; 