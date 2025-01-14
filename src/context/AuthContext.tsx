
import React, { createContext, useContext, useState, ReactNode } from 'react';

// AuthContext의 타입 정의
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

// AuthContext 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthContextProvider 컴포넌트
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(false);

  // setIsLoggedIn 함수는 isLoggedIn 상태를 업데이트
  const setIsLoggedIn = (loggedIn: boolean) => {
    setIsLoggedInState(loggedIn);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하려는 컴포넌트에서 사용할 수 있는 custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
