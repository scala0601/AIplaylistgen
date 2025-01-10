// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import WriteDiary from './pages/WriteDiary';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import DiaryDetail from './pages/DiaryDetail';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary/:date?" element={<WriteDiary />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar/diary-detail/:date" element={<DiaryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
