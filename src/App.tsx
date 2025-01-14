// src/App.tsx
//import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import WriteDiary from './pages/WriteDiary';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import { Signup } from './pages/Signup';
import DiaryDetail from './pages/DiaryDetail';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './pages/Loading';
import Playlist from './pages/Playlist';

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="518790916105-5vks5d48e409tqq2i616decr2ip9a38o.apps.googleusercontent.com">
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/diary/:date?" element={
            <ProtectedRoute>
              <WriteDiary />
            </ProtectedRoute>
          } />
          <Route path="/calendar" element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/calendar/diary-detail/:date" element={
            <ProtectedRoute>
              <DiaryDetail />
            </ProtectedRoute>
          } />
          <Route path="/loading" element={<Loading />} />
          <Route path="/playlist" element={
            <ProtectedRoute>
              <Playlist />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;