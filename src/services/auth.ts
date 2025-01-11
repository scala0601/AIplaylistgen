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

export const googleLogin = async () => {
  return mockGoogleLoginAPI();
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