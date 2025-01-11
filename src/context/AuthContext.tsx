// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 로그인 상태와 관련된 타입 정의
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

// Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider 컴포넌트 생성, 지금은 항상 로그인 상태
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = true;
  const setIsLoggedIn = () => {};
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Context 사용을 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 