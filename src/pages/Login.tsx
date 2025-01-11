import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();  // 리디렉션을 위해 useNavigate 훅 사용

    const handleLoginSuccess = async (credential: string | undefined) => {
        if (credential) {  // credential이 있을 때만 처리
            try {
                // 구글 토큰을 백엔드로 보내기 위해 리디렉션
                window.location.href = `http://localhost:5000/login/google/callback?token=${credential}`;
            } catch (error) {
                console.error("Google Login Failed:", error);
            }
        } else {
            console.error("No credential received");
        }
    };

    return (
        <div>
            <h1>로그인</h1>
            <GoogleLogin 
                onSuccess={(response) => handleLoginSuccess(response.credential)} 
                onError={() => console.error("Login Failed")} 
            />
        </div>
    );
};

export default Login;
