// src/App.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/Profile';
import CourseDetailsPage from './pages/CourseDetailsPage';
import RoundDetailsPage from './pages/RoundDetails';
import ScorecardPage from './pages/ScorecardPage';
import GolferTrophyRoomPage from './pages/GolferTrophyRoomPage';
import GameTypes from './pages/GameTypes';

function App() {
  return (

    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
        <Route path="/rounds/:id" element={<RoundDetailsPage />} />
        <Route path="/scorecard/:id" element={<ScorecardPage />} />
        <Route path="/trophy-room/:golferId" element={<GolferTrophyRoomPage />} />
        <Route path="/game-types" element={<GameTypes />} />
      </Routes>
    </div>

  );
}

export default App;
